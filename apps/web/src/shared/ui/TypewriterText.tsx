import { useTypewriter } from '../hooks/useTypewriter'

interface TypewriterTextProps {
  strings: string[]
  className?: string
}

export function TypewriterText({ strings, className = '' }: TypewriterTextProps) {
  const { displayText, isTyping } = useTypewriter({ strings })

  return (
    <span className={className}>
      {displayText}
      <span
        className={`inline-block w-0.5 h-[1em] bg-primary ml-0.5 align-middle transition-opacity duration-300 ${
          isTyping ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animation: isTyping ? 'none' : 'pulse 1s ease-in-out infinite' }}
      />
    </span>
  )
}
