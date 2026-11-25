import { useEffect } from 'react'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { WorkMarquee } from './components/WorkMarquee'
import { About } from './components/About'
import { WorkIndex } from './components/WorkIndex'
import { Campaigns } from './components/Campaigns'
import { SplashVisuals } from './components/SplashVisuals'
import { WebExperiences } from './components/WebExperiences'
import { MotionGallery } from './components/MotionGallery'
import { ContactFooter } from './components/ContactFooter'
import { SectionReveal } from './components/SectionReveal'
import { IntroLoader, shouldSkipIntro } from './components/IntroLoader'
import { ScrollPanel } from './components/ScrollPanel'

export default function App() {
  useEffect(() => {
    if (!window.location.hash) return
    let timer = 0
    const scrollToTarget = () => {
      timer = window.setTimeout(() => {
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
          document.querySelector<HTMLElement>(window.location.hash)?.scrollIntoView({ block: 'start' })
        }))
      }, 420)
    }
    const afterIntro = () => {
      timer = window.setTimeout(scrollToTarget, 680)
    }
    if (shouldSkipIntro()) scrollToTarget()
    else window.addEventListener('portfolio:intro-complete', afterIntro, { once: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('portfolio:intro-complete', afterIntro)
    }
  }, [])

  return <main>
    <IntroLoader />
    <SectionReveal />
    <Navbar />
    <Hero />
    <WorkMarquee />
    <About />
    <WorkIndex />
    <div className="panel-stage">
      <ScrollPanel index={0}><Campaigns /></ScrollPanel>
      <ScrollPanel index={1}><SplashVisuals /></ScrollPanel>
      <ScrollPanel index={2}><WebExperiences /></ScrollPanel>
      <ScrollPanel index={3}><MotionGallery /></ScrollPanel>
      <ScrollPanel index={4}><ContactFooter /></ScrollPanel>
    </div>
  </main>
}
