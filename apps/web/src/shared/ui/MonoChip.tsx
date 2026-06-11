import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function MonoChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border border-border bg-panel/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  )
}
