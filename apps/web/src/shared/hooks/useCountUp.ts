import { useEffect, useState } from 'react'
import { animate } from 'motion/react'
import { useReducedMotion } from './useReducedMotion'

interface UseCountUpOptions {
  target: number
  duration?: number
  enabled?: boolean
}

export function useCountUp({ target, duration = 1.5, enabled = true }: UseCountUpOptions): number {
  const [value, setValue] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!enabled) return
    if (prefersReduced) {
      setValue(target)
      return
    }

    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })

    return () => controls.stop()
  }, [target, duration, enabled, prefersReduced])

  return value
}
