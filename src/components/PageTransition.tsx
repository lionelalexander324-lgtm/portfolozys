import { useEffect, useRef, useState } from 'react'

const TRANSITION_EVENT = 'portfolio:navigate'

type NavigationEvent = {
  preventDefault: () => void
  metaKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

export function requestPageTransition(event: NavigationEvent, href: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  window.dispatchEvent(new CustomEvent(TRANSITION_EVENT, { detail: { href } }))
}

type TransitionState = {
  active: boolean
  leaving: boolean
  label: string
}

const labels: Record<string, string> = {
  '#top': '张雅书 / HOME',
  '#about': 'ABOUT / 关于我',
  '#work-index': 'WORK INDEX / 作品目录',
  '#campaigns': '01 / CAMPAIGNS',
  '#splash': '02 / VISUAL DESIGN',
  '#web': '03 / WEB EXPERIENCES',
  '#motion': '04 / MOTION CREATIONS',
  '#contact': 'CONTACT / 联系',
}

export function PageTransition() {
  const [state, setState] = useState<TransitionState>({ active: false, leaving: false, label: '' })
  const busyRef = useRef(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const clearTimers = () => timersRef.current.forEach(timer => window.clearTimeout(timer))
    const jumpTo = (destination: HTMLElement, href: string) => {
      const previousBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      destination.scrollIntoView({ block: 'start' })
      document.documentElement.style.scrollBehavior = previousBehavior
      window.history.replaceState(null, '', href)
    }
    const startTransition = (href: string) => {
      const destination = document.querySelector<HTMLElement>(href)
      if (!destination) return
      if (busyRef.current) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        jumpTo(destination, href)
        return
      }

      busyRef.current = true
      document.documentElement.classList.add('is-transitioning')
      setState({ active: true, leaving: false, label: labels[href] })

      timersRef.current = [
        window.setTimeout(() => {
          jumpTo(destination, href)
          setState(current => ({ ...current, leaving: true }))
        }, 560),
        window.setTimeout(() => {
          setState({ active: false, leaving: false, label: '' })
          document.documentElement.classList.remove('is-transitioning')
          busyRef.current = false
        }, 1080),
      ]
    }

    const onRequestedNavigation = (event: Event) => {
      const href = (event as CustomEvent<{ href?: string }>).detail?.href
      if (href && labels[href]) startTransition(href)
    }

    const onClickFallback = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
      const href = target?.getAttribute('href')
      if (!target || !href || href === '#' || !labels[href]) return
      event.preventDefault()
      startTransition(href)
    }

    window.addEventListener(TRANSITION_EVENT, onRequestedNavigation)
    document.addEventListener('click', onClickFallback)
    return () => {
      window.removeEventListener(TRANSITION_EVENT, onRequestedNavigation)
      document.removeEventListener('click', onClickFallback)
      clearTimers()
      document.documentElement.classList.remove('is-transitioning')
    }
  }, [])

  return <div className={`page-transition${state.active ? ' is-active' : ''}${state.leaving ? ' is-leaving' : ''}`} aria-hidden="true">
    <span>{state.label}</span>
  </div>
}
