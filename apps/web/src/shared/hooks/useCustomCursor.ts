import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import { useReducedMotion } from './useReducedMotion'

export function useCustomCursor() {
  const prefersReduced = useReducedMotion()

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  const dotX = useSpring(rawX, { stiffness: 500, damping: 28 })
  const dotY = useSpring(rawY, { stiffness: 500, damping: 28 })
  const ringX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(rawY, { stiffness: 150, damping: 20 })

  const isHovering = useMotionValue(0)

  useEffect(() => {
    if (prefersReduced) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        isHovering.set(1)
      }
    }

    const onLeave = () => isHovering.set(0)

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter, { passive: true })
    document.addEventListener('mouseout', onLeave, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [prefersReduced, rawX, rawY, isHovering])

  return { dotX, dotY, ringX, ringY, isHovering, prefersReduced }
}
