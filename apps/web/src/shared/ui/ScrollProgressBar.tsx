import { motion, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const prefersReduced = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  })

  if (prefersReduced) return null

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        boxShadow: '0 0 8px hsl(var(--accent-cyan) / 0.6)',
      }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet z-[100]"
    />
  )
}
