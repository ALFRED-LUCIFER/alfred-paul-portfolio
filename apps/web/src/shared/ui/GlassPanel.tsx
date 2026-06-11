import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'indigo' | 'violet'
  hoverable?: boolean
}

const glowClass = {
  cyan: 'glow-border-cyan',
  indigo: 'glow-border-indigo',
  violet: 'glow-border-violet',
} as const

export function GlassPanel({ glow, hoverable = false, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-lg',
        glow && glowClass[glow],
        hoverable &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-[0_0_32px_hsl(var(--accent-cyan)/0.12)]',
        className
      )}
      {...props}
    />
  )
}
