import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

type Phase = 'typing' | 'pausing' | 'deleting' | 'switching'

interface UseTypewriterOptions {
  strings: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}

export function useTypewriter({
  strings,
  typingSpeed = 55,
  deletingSpeed = 35,
  pauseTime = 2200,
}: UseTypewriterOptions): { displayText: string; isTyping: boolean } {
  const prefersReduced = useReducedMotion()
  const [displayText, setDisplayText] = useState(prefersReduced ? strings[0] : '')
  const [isTyping, setIsTyping] = useState(true)

  const phaseRef = useRef<Phase>('typing')
  const indexRef = useRef(0)
  const charRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(strings[0])
      return
    }

    const tick = () => {
      const current = strings[indexRef.current]
      const phase = phaseRef.current

      if (phase === 'typing') {
        setIsTyping(true)
        if (charRef.current < current.length) {
          charRef.current++
          setDisplayText(current.slice(0, charRef.current))
          timerRef.current = setTimeout(tick, typingSpeed)
        } else {
          phaseRef.current = 'pausing'
          timerRef.current = setTimeout(tick, pauseTime)
        }
      } else if (phase === 'pausing') {
        setIsTyping(false)
        phaseRef.current = 'deleting'
        timerRef.current = setTimeout(tick, deletingSpeed)
      } else if (phase === 'deleting') {
        if (charRef.current > 0) {
          charRef.current--
          setDisplayText(current.slice(0, charRef.current))
          timerRef.current = setTimeout(tick, deletingSpeed)
        } else {
          phaseRef.current = 'switching'
          timerRef.current = setTimeout(tick, 200)
        }
      } else {
        indexRef.current = (indexRef.current + 1) % strings.length
        phaseRef.current = 'typing'
        timerRef.current = setTimeout(tick, typingSpeed)
      }
    }

    timerRef.current = setTimeout(tick, typingSpeed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [strings, typingSpeed, deletingSpeed, pauseTime, prefersReduced])

  return { displayText, isTyping }
}
