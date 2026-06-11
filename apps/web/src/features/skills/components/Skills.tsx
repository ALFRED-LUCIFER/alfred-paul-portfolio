import { useState } from 'react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { Reveal } from '../../../shared/ui/Reveal'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { SkillConstellation } from './SkillConstellation'
import { SKILL_GROUPS } from '../data/skills.data'
import { cn } from '../../../shared/lib/cn'

const groupHeading = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
  ok: 'text-status-ok',
  warn: 'text-status-warn',
} as const

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  return (
    <SectionShell
      index="06"
      label="SKILLS"
      title="A full-spectrum toolkit."
      subtitle="Frontend to governance — every layer of the stack I architect, I can also build."
      accent="indigo"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <SkillConstellation activeGroup={activeGroup} onGroupHover={setActiveGroup} />
        </div>

        <Reveal className="space-y-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              onMouseEnter={() => setActiveGroup(group.id)}
              onMouseLeave={() => setActiveGroup(null)}
              className={cn(
                'rounded-lg border border-transparent p-3 transition-colors duration-300',
                activeGroup === group.id && 'glass-panel'
              )}
            >
              <h3 className={cn('font-mono text-xs tracking-[0.2em]', groupHeading[group.accent])}>
                {group.name.toUpperCase()}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <MonoChip key={skill}>{skill}</MonoChip>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </SectionShell>
  )
}
