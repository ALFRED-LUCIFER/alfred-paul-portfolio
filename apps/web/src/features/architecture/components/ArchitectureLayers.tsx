import { motion } from 'motion/react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { Reveal } from '../../../shared/ui/Reveal'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'
import { LAYERS, PRACTICES } from '../data/layers.data'
import { cn } from '../../../shared/lib/cn'

const layerAccent = {
  cyan: 'glow-border-cyan text-accent-cyan',
  indigo: 'glow-border-indigo text-accent-indigo',
  none: 'border-border text-foreground',
} as const

export function ArchitectureLayers() {
  const reduced = useReducedMotion()

  return (
    <SectionShell
      index="03"
      label="ARCHITECTURE THINKING"
      title="System-level thinking, layer by layer."
      subtitle="From user experience down to governance — every layer is a deliberate decision, recorded and reviewable."
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div
          className="flex flex-col gap-3"
          role="list"
          aria-label="Architecture layers, top layer is governance"
        >
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.id}
              role="listitem"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (LAYERS.length - 1 - i) * 0.12, ease: 'easeOut' }}
              className={cn('glass-panel rounded-lg border px-5 py-4', layerAccent[layer.accent])}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-bold sm:text-base">{layer.name}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">
                  L{LAYERS.length - i}
                </span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{layer.detail}</p>
            </motion.div>
          ))}
        </div>

        <Reveal>
          <div className="glass-panel rounded-lg p-6">
            <h3 className="font-mono text-xs tracking-[0.2em] text-accent-cyan">PRACTICE</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Architecture is a decision log, not a diagram archive. Every significant choice gets
              an ADR; every system gets a C4 view; boundaries follow the domain, not the org chart.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PRACTICES.map((p) => (
                <MonoChip key={p}>{p}</MonoChip>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
