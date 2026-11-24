import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function RevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .9', 'end .35'] })
  return <p ref={ref} className="reveal-text" aria-label={text}>
    {Array.from(text).map((char, index) => <RevealChar key={index} char={char} index={index} total={text.length} progress={scrollYProgress} />)}
  </p>
}

function RevealChar({ char, index, total, progress }: { char: string, index: number, total: number, progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const start = index / total * .72
  const opacity = useTransform(progress, [start, Math.min(start + .16, 1)], [.28, 1])
  return <motion.span style={{ opacity }}>{char}</motion.span>
}
