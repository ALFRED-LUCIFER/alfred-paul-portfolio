import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { ROLES } from '../data/roles.data'

const iconColor = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
} as const

export function Identity() {
  return (
    <SectionShell
      index="01"
      label="IDENTITY"
      title="Not just writing code. Building the system that builds the software."
      subtitle="Systems, governance, enablement, and AI adoption strategy for engineering teams — backed by hands-on full-stack delivery."
    >
      <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {ROLES.map((role) => (
          <RevealItem key={role.title}>
            <GlassPanel hoverable className="h-full p-6">
              <role.icon aria-hidden className={`size-7 ${iconColor[role.accent]}`} />
              <h3 className="mt-4 text-base font-bold">{role.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {role.description}
              </p>
            </GlassPanel>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
