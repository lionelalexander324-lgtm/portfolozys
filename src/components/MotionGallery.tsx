import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Minus, Pause, Play, Plus, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { motionWorks } from '../data/portfolio'

export function MotionGallery() {
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  const [playing, setPlaying] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [failed, setFailed] = useState<Set<number>>(() => new Set())
  const expandButtonRef = useRef<HTMLButtonElement>(null)
  const collapseAnchor = useRef<number | null>(null)

  const markFailed = (index: number) => setFailed(current => new Set(current).add(index))
  const clearFailed = (index: number) => setFailed(current => {
    if (!current.has(index)) return current
    const next = new Set(current)
    next.delete(index)
    return next
  })

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    const preloadObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement
      if (!entry.isIntersecting || video.dataset.prefetched === 'true') return
      video.dataset.prefetched = 'true'
      video.preload = 'metadata'
      if (video.readyState === HTMLMediaElement.HAVE_NOTHING) video.load()
      preloadObserver.unobserve(video)
    }), { rootMargin: '700px 0px', threshold: .01 })
    refs.current.forEach(video => video && preloadObserver.observe(video))
    return () => preloadObserver.disconnect()
  }, [expanded])

  useLayoutEffect(() => {
    if (expanded || collapseAnchor.current === null) return
    const nextTop = expandButtonRef.current?.getBoundingClientRect().top
    if (nextTop !== undefined) window.scrollBy(0, nextTop - collapseAnchor.current)
    collapseAnchor.current = null
  }, [expanded])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const video = entry.target as HTMLVideoElement
      const index = refs.current.indexOf(video)
      if (!entry.isIntersecting || entry.intersectionRatio < .15) { video.pause(); setPlaying(current => current === index ? null : current) }
    }), { threshold: [.15, .65] })
    refs.current.forEach(video => video && observer.observe(video))
    return () => observer.disconnect()
  }, [expanded])

  const toggle = (index: number) => {
    const video = refs.current[index]
    if (!video || failed.has(index)) return
    if (video.paused) { refs.current.forEach(other => other?.pause()); video.play().then(() => { clearFailed(index); setPlaying(index) }).catch(error => { if (!(error instanceof DOMException && error.name === 'AbortError')) markFailed(index); setPlaying(null) }) }
    else { video.pause(); setPlaying(null) }
  }

  const toggleExpanded = () => {
    if (expanded) {
      collapseAnchor.current = expandButtonRef.current?.getBoundingClientRect().top ?? null
      refs.current.slice(5).forEach(video => video?.pause())
      setPlaying(current => current !== null && current >= 5 ? null : current)
      setSelected(current => current !== null && current >= 5 ? null : current)
    }
    setExpanded(current => !current)
  }

  const renderCard = (item: (typeof motionWorks)[number], index: number, entering = false) => {
    const wideSeat = item.id === 'purple-yellow'
    const content = <>
      <div className={`motion-media${item.video ? '' : ' is-poster-only'}${failed.has(index) ? ' has-video-error' : ''}${wideSeat ? ' is-wide-seat' : ''}`} onDoubleClick={() => item.video && !failed.has(index) && setSelected(index)}>
        {wideSeat && <img className="motion-media-backdrop" src={item.poster} alt="" aria-hidden="true" />}
        <div className="motion-video-frame">
          {item.video ? <video ref={node => { refs.current[index] = node }} src={item.video} poster={item.poster} muted loop playsInline preload="none" aria-label={item.alt} onClick={() => toggle(index)} onCanPlay={() => clearFailed(index)} onError={() => markFailed(index)} onPlay={() => setPlaying(index)} onPause={() => setPlaying(current => current === index ? null : current)} /> : <img className="motion-poster" src={item.poster} alt={item.alt} loading="lazy" />}
          {failed.has(index) && <img className="motion-error-poster" src={item.poster} alt={item.alt} />}
        </div>
        {item.video && !failed.has(index) && <button type="button" className="play-button" aria-label={playing === index ? `暂停 ${item.title}` : `播放 ${item.title}`} onClick={() => toggle(index)}>{playing === index ? <Pause /> : <Play />}</button>}
        {item.video && !failed.has(index) ? <button type="button" className="view-video" onClick={() => setSelected(index)}>放大播放</button> : item.video ? <span className="video-error" role="status">视频暂时无法播放，已显示封面</span> : <span className="poster-note">静态预览</span>}
      </div>
      <div className="motion-meta"><small>{String(index + 1).padStart(2, '0')}</small><div><h3>{item.title}</h3><p>{item.description}</p></div></div>
    </>

    return entering
      ? <motion.article key={item.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, ease: [.22, 1, .36, 1] }} className="motion-card">{content}</motion.article>
      : <article key={item.id} className="motion-card">{content}</article>
  }

  const featured = motionWorks.slice(0, 2)
  const primarySeats = motionWorks.slice(2, 5)
  const extraSeats = motionWorks.slice(5)

  return <section id="motion" className="motion-gallery work-panel panel-light work-section">
    <header className="work-heading"><div><span>04 / MOTION CREATIONS</span><h2>动态创作</h2></div><p>座位框与座驾动态作品。</p></header>
    <div className="motion-grid motion-groups">
      <div className="featured-grid">{featured.map((item, index) => renderCard(item, index))}</div>
      <div className="seat-frame-grid">
        {primarySeats.map((item, offset) => renderCard(item, offset + 2))}
        {expanded && extraSeats.map((item, offset) => renderCard(item, offset + 5, true))}
      </div>
    </div>
    <button ref={expandButtonRef} className="expand-button motion-expand" type="button" aria-expanded={expanded} onClick={toggleExpanded}>{expanded ? <Minus size={20} /> : <Plus size={20} />}{expanded ? '收起作品' : '查看更多作品'}</button>
    {selected !== null && <div className="lightbox video-lightbox" role="dialog" aria-modal="true" aria-label={`${motionWorks[selected].title} 视频预览`} onClick={() => setSelected(null)}>
      <button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭视频"><X /></button>
      <figure onClick={e => e.stopPropagation()}>{failed.has(selected) ? <img className="motion-error-poster" src={motionWorks[selected].poster} alt={motionWorks[selected].alt} /> : <video src={motionWorks[selected].video} poster={motionWorks[selected].poster} controls autoPlay muted loop playsInline preload="auto" onCanPlay={() => clearFailed(selected)} onError={() => markFailed(selected)} />}<figcaption>{motionWorks[selected].title}</figcaption></figure>
    </div>}
  </section>
}
