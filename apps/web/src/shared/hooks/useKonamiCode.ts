import { useState, useEffect } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonamiCode() {
  const [activated, setActivated] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let sequence: string[] = []

    const onKey = (e: KeyboardEvent) => {
      sequence = [...sequence, e.key].slice(-KONAMI.length)
      const matched = KONAMI.slice(0, sequence.length).every((k, i) => k === sequence[i])

      if (matched) {
        setProgress(sequence.length)
        if (sequence.length === KONAMI.length) {
          setActivated(true)
          sequence = []
        }
      } else {
        sequence = []
        setProgress(0)
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return { activated, progress, dismiss: () => setActivated(false) }
}
