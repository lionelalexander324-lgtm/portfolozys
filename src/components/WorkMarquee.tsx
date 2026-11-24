import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { campaigns } from '../data/portfolio'
import { requestPageTransition } from './PageTransition'

export function WorkMarquee() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['-10%', '7%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['5%', '-12%'])
  const rows = [campaigns.slice(0, 4), campaigns.slice(4)]
  return <section ref={ref} className="marquee" aria-label="作品快速预览">
    {rows.map((row, rowIndex) => <motion.div className="marquee-row" key={rowIndex} style={reduced ? undefined : { x: rowIndex ? x2 : x1 }}>
      {[...row, ...row].map((item, index) => <a key={`${item.id}-${index}`} className="marquee-card" href="#campaigns" onClick={event => requestPageTransition(event, '#campaigns')} aria-label={`查看 ${item.title}`}>
        <img src={item.image} alt={item.alt} loading="lazy" />
        <span>{item.title}</span>
      </a>)}
    </motion.div>)}
  </section>
}
