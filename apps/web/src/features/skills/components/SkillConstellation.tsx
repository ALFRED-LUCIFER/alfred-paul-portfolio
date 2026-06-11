import { SKILL_GROUPS } from '../data/skills.data'
import { cn } from '../../../shared/lib/cn'

const dotAccent = {
  cyan: 'border-accent-cyan/50 text-accent-cyan',
  indigo: 'border-accent-indigo/50 text-accent-indigo',
  violet: 'border-accent-violet/50 text-accent-violet',
  ok: 'border-status-ok/50 text-status-ok',
  warn: 'border-status-warn/50 text-status-warn',
} as const

interface SkillConstellationProps {
  activeGroup: string | null
  onGroupHover: (id: string | null) => void
}

/** Decorative orbit visual — the grouped list is the accessible representation */
export function SkillConstellation({ activeGroup, onGroupHover }: SkillConstellationProps) {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Static orbit rings */}
      {[100, 72, 44].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-border/60"
          style={{ inset: `${(100 - size) / 2}%` }}
        />
      ))}

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/40 bg-panel px-4 py-2 font-mono text-[11px] text-accent-cyan shadow-[0_0_24px_hsl(var(--accent-cyan)/0.25)]">
        AP
      </div>

      {/* Rotating layer with group nodes */}
      <div className="absolute inset-0 animate-orbit motion-reduce:animate-none">
        {SKILL_GROUPS.map((group, i) => {
          const angle = (i / SKILL_GROUPS.length) * 2 * Math.PI - Math.PI / 2
          const radius = 50 // % of container
          const x = 50 + radius * Math.cos(angle)
          const y = 50 + radius * Math.sin(angle)
          return (
            <div
              key={group.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => onGroupHover(group.id)}
              onMouseLeave={() => onGroupHover(null)}
            >
              <span
                className={cn(
                  'block whitespace-nowrap rounded-full border bg-panel px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all duration-300 animate-orbit-reverse motion-reduce:animate-none',
                  dotAccent[group.accent],
                  activeGroup === group.id && 'scale-110 shadow-[0_0_16px_currentColor]'
                )}
              >
                {group.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
