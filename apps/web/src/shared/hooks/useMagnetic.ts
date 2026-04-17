import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from './useReducedMotion'

const RADIUS = 80
const STRENGTH = 0.35

export function useMagnetic() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 300, damping: 25 })
  const y = useSpring(rawY, { stiffness: 300, damping: 25 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < RADIUS) {
        rawX.set(dx * STRENGTH)
        rawY.set(dy * STRENGTH)
      }
    },
    [prefersReduced, rawX, rawY]
  )

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { ref, x, y, onMouseMove, onMouseLeave }
}
