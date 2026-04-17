import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ClipRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ClipReveal({ children, className = '', delay = 0 }: ClipRevealProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
      whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
