import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { splashVisuals } from '../data/portfolio'

type DragState = { x: number, left: number } | null

export function SplashVisuals() {
  const [selected, setSelected] = useState<number | null>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const drag = useRef<DragState>(null)
  const rows = [splashVisuals.slice(0, 6), splashVisuals.slice(6)]

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  const scroll = (row: number, direction: -1 | 1) => rowRefs.current[row]?.scrollBy({ left: direction * Math.min(window.innerWidth * .72, 720), behavior: 'smooth' })
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.classList.add('is-dragging')
  }
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x)
  }
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = null
    event.currentTarget.classList.remove('is-dragging')
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return <section id="splash" className="splash work-panel panel-light work-section">
    <header className="work-heading"><div><span>02 / VISUAL DESIGN</span><h2>启动视觉</h2></div><p>左右滑动，查看更多图片。</p></header>
    <div className="splash-rows">
      {rows.map((row, rowIndex) => <div className="splash-row-wrap" key={rowIndex}>
        <div className="splash-row-tools"><span>0{rowIndex + 1}</span><div><button type="button" onClick={() => scroll(rowIndex, -1)} aria-label={`第 ${rowIndex + 1} 排向左滑动`}><ChevronLeft /></button><button type="button" onClick={() => scroll(rowIndex, 1)} aria-label={`第 ${rowIndex + 1} 排向右滑动`}><ChevronRight /></button></div></div>
        <div ref={node => { rowRefs.current[rowIndex] = node }} className="splash-row" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
          {row.map(item => {
            const index = splashVisuals.indexOf(item)
            return <article key={item.id} className="splash-card">
              <button type="button" onClick={() => setSelected(index)} aria-label={`查看完整 ${item.title} 启动页`}><img src={item.image} alt={item.alt} loading="lazy" decoding="async" width="508" height="1100" /></button>
              <div><h3>{item.title}</h3><small>{String(index + 1).padStart(2, '0')} / {splashVisuals.length}</small></div>
            </article>
          })}
        </div>
      </div>)}
    </div>
    {selected !== null && <div className="lightbox splash-lightbox" role="dialog" aria-modal="true" aria-label={`${splashVisuals[selected].title} 启动页预览`} onClick={() => setSelected(null)}>
      <button type="button" className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭预览"><X /></button>
      <figure onClick={event => event.stopPropagation()}><img src={splashVisuals[selected].fullImage || splashVisuals[selected].image} alt={splashVisuals[selected].alt} /><figcaption>{splashVisuals[selected].title}</figcaption></figure>
    </div>}
  </section>
}
