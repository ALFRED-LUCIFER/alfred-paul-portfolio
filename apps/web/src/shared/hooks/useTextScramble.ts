import { useState, useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from './useReducedMotion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export function useTextScramble(text: string) {
  const prefersReduced = useReducedMotion()
  const [displayText, setDisplayText] = useState(text)
  const frameRef = useRef<number | null>(null)

  const scramble = useCallback(() => {
    if (prefersReduced) {
      setDisplayText(text)
      return
    }

    let iteration = 0
    const totalFrames = text.length * 4

    const tick = () => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < Math.floor(iteration / 4)) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration++
      if (iteration < totalFrames) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayText(text)
      }
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(tick)
  }, [text, prefersReduced])

  useEffect(() => {
    const t = setTimeout(scramble, 300)
    return () => {
      clearTimeout(t)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [scramble])

  return { displayText, scramble }
}
