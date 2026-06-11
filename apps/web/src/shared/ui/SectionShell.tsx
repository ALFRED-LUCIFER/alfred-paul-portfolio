import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

interface SectionShellProps {
  /** Mono index label, e.g. "04" */
  index: string
  /** Mono label after the index, e.g. "AGENTIC SDLC" */
  label: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  accent?: 'cyan' | 'indigo' | 'violet'
}

const accentText = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
} as const

export function SectionShell({
  index,
  label,
  title,
  subtitle,
  children,
  className,
  accent = 'cyan',
}: SectionShellProps) {
  return (
    <div className={cn('container-grid', className)}>
      <Reveal>
        <p className={cn('font-mono text-xs tracking-[0.2em]', accentText[accent])}>
          {index} / {label}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        )}
      </Reveal>
      <div className="mt-12">{children}</div>
    </div>
  )
}
