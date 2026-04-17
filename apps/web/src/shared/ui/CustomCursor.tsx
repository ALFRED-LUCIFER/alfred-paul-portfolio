import { motion, useTransform } from 'motion/react'
import { useCustomCursor } from '../hooks/useCustomCursor'

export function CustomCursor() {
  const { dotX, dotY, ringX, ringY, isHovering, prefersReduced } = useCustomCursor()

  const ringSize = useTransform(isHovering, [0, 1], [32, 52])

  if (prefersReduced) return null

  return (
    <>
      {/* Inner dot — tight spring */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full bg-primary"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Outer ring — lazy spring */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full border-2 border-primary opacity-60"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
