import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'

const STIFFNESS = 300
const DAMPING = 30
const MAX_TILT = 12

export function useTilt() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  const rotateX = useSpring(rawRotateX, { stiffness: STIFFNESS, damping: DAMPING })
  const rotateY = useSpring(rawRotateY, { stiffness: STIFFNESS, damping: DAMPING })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      rawRotateX.set((y - 0.5) * MAX_TILT * -1)
      rawRotateY.set((x - 0.5) * MAX_TILT)
    },
    [prefersReduced, rawRotateX, rawRotateY]
  )

  const onMouseLeave = useCallback(() => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }, [rawRotateX, rawRotateY])

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}
