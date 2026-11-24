import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export function ScrollPanel({ children, index }: { children: ReactNode, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 102%', 'start 76%'] })
  const lift = useTransform(scrollYProgress, [0, 1], [reduced ? '0px' : '72px', '0px'])

  return <motion.div ref={ref} className="panel-shell" style={{ '--panel-lift': lift, zIndex: 10 + index } as MotionStyle} data-panel-index={index}>
    {children}
  </motion.div>
}
