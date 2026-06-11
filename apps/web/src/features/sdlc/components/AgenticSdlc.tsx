import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bot, ShieldCheck, User, Workflow } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'
import { PIPELINE, SDLC_THESIS, type PipelineStage } from '../data/pipeline.data'
import { cn } from '../../../shared/lib/cn'

gsap.registerPlugin(ScrollTrigger)

const kindStyle: Record<PipelineStage['kind'], { icon: typeof Bot; chip: string; label: string }> =
  {
    human: { icon: User, chip: 'border-border text-foreground', label: 'HUMAN' },
    agent: { icon: Bot, chip: 'border-accent-cyan/40 text-accent-cyan', label: 'AGENT' },
    gate: { icon: ShieldCheck, chip: 'border-status-ok/40 text-status-ok', label: 'GATE' },
    system: {
      icon: Workflow,
      chip: 'border-accent-indigo/40 text-accent-indigo',
      label: 'SYSTEM',
    },
  }

export function AgenticSdlc() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !containerRef.current) return
      const stages = gsap.utils.toArray<HTMLElement>('[data-stage]')
      const beam = containerRef.current.querySelector<HTMLElement>('[data-beam]')
      if (!beam || stages.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      })
      tl.fromTo(beam, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top' }, 0)
      stages.forEach((stage, i) => {
        tl.to(stage, { opacity: 1, x: 0, duration: 1 / PIPELINE.length }, i / PIPELINE.length)
      })
    },
    { scope: containerRef, dependencies: [reduced] }
  )

  return (
    <SectionShell
      index="04"
      label="AGENTIC SDLC"
      title="From idea to production — orchestrated, guarded, reviewed."
      subtitle={SDLC_THESIS}
      accent="violet"
    >
      <div ref={containerRef} className="relative mx-auto max-w-3xl">
        {/* Track + animated beam */}
        <div aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]">
          <div
            data-beam
            className={cn(
              'h-full w-full bg-gradient-to-b from-accent-cyan via-accent-indigo to-accent-violet',
              'shadow-[0_0_12px_hsl(var(--accent-cyan)/0.5)]',
              reduced ? '' : 'scale-y-0'
            )}
          />
        </div>

        <ol className="space-y-4">
          {PIPELINE.map((stage) => {
            const k = kindStyle[stage.kind]
            return (
              <li
                key={stage.id}
                data-stage
                className={cn(
                  'relative flex gap-4 pl-12 sm:pl-14',
                  reduced ? '' : 'opacity-30 -translate-x-2'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-0 top-1 flex size-8 items-center justify-center rounded-full border bg-panel sm:size-10',
                    k.chip
                  )}
                >
                  <k.icon className="size-4" />
                </span>
                <div className="glass-panel flex-1 rounded-lg px-5 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold sm:text-base">{stage.name}</h3>
                    <span
                      className={cn(
                        'rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-widest',
                        k.chip
                      )}
                    >
                      {k.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stage.detail}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <p aria-hidden className="mt-6 pl-12 font-mono text-[11px] text-accent-violet sm:pl-14">
          ⟲ learning memory feeds the next cycle
        </p>
      </div>
    </SectionShell>
  )
}
