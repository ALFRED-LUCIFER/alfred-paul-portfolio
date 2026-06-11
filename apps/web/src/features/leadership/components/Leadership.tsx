import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { PILLARS, LEADERSHIP_STATEMENT } from '../data/pillars.data'
import { CareerTimeline } from './CareerTimeline'

export function Leadership() {
  return (
    <SectionShell
      index="05"
      label="ENGINEERING LEADERSHIP"
      title={LEADERSHIP_STATEMENT}
      subtitle="Leadership pillars proven over a decade of building and leading software teams at LiSEC — Dubai and Austria."
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal stagger={0.05} className="grid gap-3 sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <RevealItem key={pillar.title}>
              <GlassPanel hoverable className="h-full p-5">
                <pillar.icon aria-hidden className="size-5 text-accent-cyan" />
                <h3 className="mt-3 text-sm font-bold">{pillar.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </GlassPanel>
            </RevealItem>
          ))}
        </Reveal>
        <CareerTimeline />
      </div>
    </SectionShell>
  )
}
