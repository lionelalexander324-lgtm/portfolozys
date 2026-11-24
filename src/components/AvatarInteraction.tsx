import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export function AvatarInteraction() {
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 55, damping: 18, mass: .8 })
  const y = useSpring(my, { stiffness: 55, damping: 18, mass: .8 })

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return
    const r = event.currentTarget.getBoundingClientRect()
    mx.set(((event.clientX - r.left) / r.width - .5) * 22)
    my.set(((event.clientY - r.top) / r.height - .5) * 14)
  }
  const reset = () => { mx.set(0); my.set(0) }

  return <motion.div className="avatar-stage" onPointerMove={move} onPointerLeave={reset} initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .85 }}>
    <motion.div className="avatar-float" style={reduced ? undefined : { x, y }}>
      <img src="./assets/avatar/avatar.webp" alt="张雅书的卡通 3D 头像" draggable="false" />
    </motion.div>
  </motion.div>
}
