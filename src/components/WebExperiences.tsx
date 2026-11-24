import { webProjects } from '../data/portfolio'
import { StackingCard } from './StackingCard'

export function WebExperiences() {
  return <section id="web" className="web-experiences work-panel panel-dark work-section">
    <header className="work-heading dark-heading"><div><span>03 / WEB EXPERIENCES</span><h2>互动网页</h2></div><p>先查看真实截图，需要时再载入实时网页。</p></header>
    <div className="stack-list">{webProjects.map((item, index) => <StackingCard key={item.id} item={item} index={index} total={webProjects.length} />)}</div>
  </section>
}
