import { useEffect, useState } from 'react'

const INTRO_KEY = 'zys-v10-intro-seen'
const INTRO_REPLAY_EVENT = 'portfolio:intro-replay'

export function shouldSkipIntro() {
  if (typeof window === 'undefined') return false
  const query = new URLSearchParams(window.location.search)
  const forceReplay = query.get('intro') === 'replay'
  return !forceReplay && (query.get('qa') === '1' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem(INTRO_KEY) === '1')
}

export function IntroLoader() {
  const [visible, setVisible] = useState(() => !shouldSkipIntro())
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const replay = () => {
      setLeaving(false)
      setVisible(true)
    }
    window.addEventListener(INTRO_REPLAY_EVENT, replay)
    return () => window.removeEventListener(INTRO_REPLAY_EVENT, replay)
  }, [])

  useEffect(() => {
    if (!visible) return
    document.documentElement.classList.add('intro-active')
    const startedAt = performance.now()
    let hideTimer = 0
    let leaveTimer = 0
    const poster = new Image()
    const posterReady = new Promise<void>(resolve => {
      poster.onload = () => resolve()
      poster.onerror = () => resolve()
      poster.src = './assets/hero/zhang-yashu-hero-poster.webp'
    })
    const timeout = new Promise<void>(resolve => window.setTimeout(resolve, 1200))

    Promise.race([Promise.all([posterReady, document.fonts.ready]), timeout]).then(() => {
      const remaining = Math.max(0, 850 - (performance.now() - startedAt))
      leaveTimer = window.setTimeout(() => {
        sessionStorage.setItem(INTRO_KEY, '1')
        setLeaving(true)
        window.dispatchEvent(new Event('portfolio:intro-complete'))
        hideTimer = window.setTimeout(() => {
          setVisible(false)
          document.documentElement.classList.remove('intro-active')
        }, 650)
      }, remaining)
    })

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
      document.documentElement.classList.remove('intro-active')
    }
  }, [visible])

  if (!visible) return null
  return <div className={`intro-loader${leaving ? ' is-leaving' : ''}`} role="status" aria-label="正在进入张雅书作品集">
    <div className="intro-mark"><span>Hello</span><div className="smile" aria-hidden="true"><i /><i /><b /></div></div>
  </div>
}
