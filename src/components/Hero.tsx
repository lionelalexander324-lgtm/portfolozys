import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { requestPageTransition } from './PageTransition'
import { shouldSkipIntro } from './IntroLoader'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const skipIntro = shouldSkipIntro()
  const introDelay = skipIntro ? 0 : .72

  const replayGreeting = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play().catch(() => undefined)
  }

  return <section id="top" className="hero">
    <div className="hero-kicker hero-kicker-location"><span>SHANGHAI</span></div>
    <div className="hero-copy">
      <motion.p className="hero-eyebrow" initial={skipIntro ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: introDelay, duration: .55 }}>HELLO, MY NAME IS</motion.p>
      <h1 aria-label="张雅书">
        {['张', '雅', '书'].map((character, index) => <span className="hero-character-mask" key={character}><motion.i initial={skipIntro ? false : { y: '118%', rotate: index === 1 ? 4 : -3, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ delay: introDelay + .06 + index * .08, duration: .78, ease: [.22, 1,.36,1] }}>{character}</motion.i></span>)}
      </h1>
      <motion.div className="hero-intro" initial={skipIntro ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: introDelay + .38, duration: .58 }}>
        <p className="hero-role">活动运营 / 视觉内容 / 创意实践</p>
        <p>从活动创意到视觉呈现，把想法真正做出来。</p>
      </motion.div>
    </div>
    <button type="button" className="hero-video" aria-label="重新播放张雅书人物打招呼动画" onClick={replayGreeting}>
      <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="./assets/hero/zhang-yashu-hero-poster.webp" disablePictureInPicture>
        <source src="./assets/hero/zhang-yashu-hero.mp4" type="video/mp4" />
      </video>
    </button>
    <motion.div className="hero-actions" initial={skipIntro ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: introDelay + .48, duration: .55 }}>
      <a className="hero-action is-primary" href="#work-index" onClick={event => requestPageTransition(event, '#work-index')}><span>探索作品</span><ArrowRight aria-hidden="true" /></a>
      <a className="hero-action" href="#about" onClick={event => requestPageTransition(event, '#about')}><span>关于我</span><ArrowDown aria-hidden="true" /></a>
    </motion.div>
  </section>
}
