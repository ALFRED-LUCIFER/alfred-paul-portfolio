import { cn } from '../lib/cn'

type Status = 'prod' | 'internal' | 'online' | 'learning'

const config: Record<Status, { label: string; dot: string; text: string }> = {
  prod: {
    label: 'PROD',
    dot: 'bg-status-ok shadow-[0_0_8px_hsl(var(--status-ok)/0.8)]',
    text: 'text-status-ok',
  },
  internal: {
    label: 'INTERNAL',
    dot: 'bg-status-warn shadow-[0_0_8px_hsl(var(--status-warn)/0.8)]',
    text: 'text-status-warn',
  },
  online: {
    label: 'ONLINE',
    dot: 'bg-status-ok animate-pulse-dot',
    text: 'text-status-ok',
  },
  learning: {
    label: 'IN PROGRESS',
    dot: 'bg-accent-indigo shadow-[0_0_8px_hsl(var(--accent-indigo)/0.8)]',
    text: 'text-accent-indigo',
  },
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const c = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest',
        c.text,
        className
      )}
    >
      <span aria-hidden className={cn('size-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  )
}
