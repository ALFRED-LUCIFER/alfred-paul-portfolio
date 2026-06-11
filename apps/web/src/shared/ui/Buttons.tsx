import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

const glowClasses =
  'inline-flex items-center justify-center gap-2 rounded-md bg-accent-cyan px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_24px_hsl(var(--accent-cyan)/0.45)] hover:brightness-110'

const ghostClasses =
  'inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-accent-cyan/50 hover:text-foreground'

export function GlowLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(glowClasses, className)} {...props} />
}

export function GhostLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(ghostClasses, className)} {...props} />
}

export function GlowButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(glowClasses, className)} {...props} />
}

export function GhostButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(ghostClasses, className)} {...props} />
}
