import { MoveRight } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { CASE_STUDIES } from '../data/case-studies.data'

const accentText = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
} as const

export function CaseStudies() {
  return (
    <SectionShell
      index="07"
      label="CASE STUDIES"
      title="Three problems. Three systems. Three outcomes."
      accent="violet"
    >
      <Reveal stagger={0.1} className="grid gap-4 lg:grid-cols-3">
        {CASE_STUDIES.map((cs) => (
          <RevealItem key={cs.id} className="h-full">
            <GlassPanel glow={cs.accent} hoverable className="flex h-full flex-col p-6">
              <p className={`font-mono text-[10px] tracking-[0.2em] ${accentText[cs.accent]}`}>
                {cs.label}
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug">{cs.title}</h3>

              {/* Mini flow diagram */}
              <div
                aria-hidden
                className="mt-4 flex items-center gap-1.5 rounded-md border border-border bg-background/60 p-3"
              >
                {cs.diagram.map((node, i) => (
                  <span key={node} className="flex min-w-0 items-center gap-1.5">
                    {i > 0 && (
                      <MoveRight className={`size-3 shrink-0 ${accentText[cs.accent]}`} />
                    )}
                    <span className="truncate rounded border border-border px-1.5 py-1 font-mono text-[9px] text-muted-foreground">
                      {node}
                    </span>
                  </span>
                ))}
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    CHALLENGE
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {cs.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    APPROACH
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {cs.approach}
                  </dd>
                </div>
                <div>
                  <dt className={`font-mono text-[10px] tracking-widest ${accentText[cs.accent]}`}>
                    OUTCOME
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-foreground">{cs.outcome}</dd>
                </div>
              </dl>
            </GlassPanel>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
