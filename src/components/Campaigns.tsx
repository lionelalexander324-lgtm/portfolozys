import { useEffect, useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { campaigns } from '../data/portfolio'
import { ExternalLinkButton } from './ExternalLinkButton'

export function Campaigns() {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [broken, setBroken] = useState<Set<string>>(() => new Set())
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  const visible = expanded ? campaigns : campaigns.slice(0, 4)
  const toggleExpanded = () => {
    if (expanded && selected !== null && selected >= 4) setSelected(null)
    setExpanded(current => !current)
  }
  return <section id="campaigns" className="campaigns work-panel panel-dark work-section">
    <header className="work-heading dark-heading"><div><span>01 / CAMPAIGNS</span><h2>活动企划</h2></div><p>活动机制、活动文案与物料制作。</p></header>
    <motion.div layout className="campaign-grid">
      <AnimatePresence initial={false}>{visible.map((item, index) => <motion.article layout initial={index >= 4 ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: .32, ease: [.22, 1, .36, 1] }} className="campaign-card" key={item.id}>
        <button type="button" className="campaign-image" onClick={() => setSelected(campaigns.indexOf(item))} aria-label={`放大查看 ${item.title}`}>
          {broken.has(item.id) ? <span className="media-fallback">图片暂时无法载入<br /><small>{item.title}</small></span> : <img src={item.image} alt={item.alt} loading="lazy" decoding="async" onError={() => setBroken(current => new Set(current).add(item.id))} />}
        </button>
        <div className="campaign-meta"><div><small>{String(campaigns.indexOf(item) + 1).padStart(2, '0')} / {campaigns.length}</small><h3>{item.title}</h3><p>{item.description}</p></div>{item.url && <ExternalLinkButton href={item.url}>打开网页</ExternalLinkButton>}</div>
      </motion.article>)}</AnimatePresence>
    </motion.div>
    <button className="expand-button" type="button" aria-expanded={expanded} onClick={toggleExpanded}>{expanded ? <Minus size={20} /> : <Plus size={20} />}{expanded ? '收起作品' : '查看更多作品'}</button>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${campaigns[selected].title} 图片预览`} onClick={() => setSelected(null)}>
      <button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭预览"><X /></button>
      <figure onClick={e => e.stopPropagation()}><img src={campaigns[selected].image} alt={campaigns[selected].alt} /><figcaption>{campaigns[selected].title}</figcaption></figure>
    </div>}
  </section>
}
