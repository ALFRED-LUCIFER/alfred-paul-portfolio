import { useEffect, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useParallax(
  triggerRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  yOffset = -80
) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !triggerRef.current || !targetRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tween: any

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!targetRef.current || !triggerRef.current) return

      tween = gsap.to(targetRef.current, {
        y: yOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    init()

    return () => {
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
  }, [triggerRef, targetRef, yOffset, prefersReduced])
}
