import { useTextScramble } from '../../../shared/hooks/useTextScramble'

interface ScrambleTextProps {
  text: string
  className?: string
}

export function ScrambleText({ text, className = '' }: ScrambleTextProps) {
  const { displayText, scramble } = useTextScramble(text)

  return (
    <span
      className={`font-mono cursor-default select-none ${className}`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  )
}
