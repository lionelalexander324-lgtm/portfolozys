import { useState } from 'react'
import { campaigns, splashVisuals, webProjects, motionWorks } from '../data/portfolio'
import { requestPageTransition } from './PageTransition'

const rows = [
  ['01', '活动企划', 'CAMPAIGNS', '#campaigns', campaigns[0].image!],
  ['02', '启动视觉', 'VISUAL DESIGN', '#splash', splashVisuals[0].image!],
  ['03', '互动网页', 'WEB EXPERIENCES', '#web', webProjects[0].image!],
  ['04', '动态创作', 'MOTION CREATIONS', '#motion', motionWorks[0].poster!],
]

export function WorkIndex() {
  const [active, setActive] = useState<number | null>(null)
  return <section id="work-index" className="work-index">
    <div className="section-label dark-label">WORK INDEX</div>
    <h2 className="display-title ink-title">WORK INDEX.</h2>
    <div className="index-list">
      {rows.map(([number, title, english, href, image], index) => <a key={href} className="index-row" href={href} onClick={event => requestPageTransition(event, href)} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)}>
        <strong>{number}</strong><span className="index-name">{title}</span><small>{english}</small><i aria-hidden="true">↘</i>
        <img className={active === index ? 'index-preview is-active' : 'index-preview'} src={image} alt="" aria-hidden="true" />
      </a>)}
    </div>
  </section>
}
