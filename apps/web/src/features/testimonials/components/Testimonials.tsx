import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Quote, X, ExternalLink } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { TESTIMONIALS, type Testimonial } from '../data/testimonials.data'

function Initials({ name }: { name: string }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10 font-mono text-sm font-bold text-accent-cyan">
      {name
        .split(' ')
        .map((n) => n[0])
        .join('')}
    </div>
  )
}

function TestimonialDialog({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel glow-border-cyan max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Recommendation from ${testimonial.name}`}
      >
        <div className="space-y-6 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <Initials name={testimonial.name} />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-bold">{testimonial.name}</h3>
                <p className="text-sm leading-snug text-muted-foreground">{testimonial.position}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {testimonial.relationship} · {testimonial.date}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close recommendation"
              className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-panel hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          <Quote aria-hidden className="size-8 text-accent-cyan/40" />

          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground md:text-base">
            "{testimonial.fullContent}"
          </p>

          <div className="glass-panel flex items-center justify-between gap-4 rounded-lg p-4">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <ExternalLink className="size-4 text-accent-cyan" /> LinkedIn Recommendation
            </span>
            <span className="font-mono text-[10px] tracking-wider text-status-ok">● VERIFIED</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Testimonials = () => {
  const [selected, setSelected] = useState<Testimonial | null>(null)

  return (
    <SectionShell
      index="10"
      label="TESTIMONIALS"
      title="What colleagues say."
      subtitle="Real LinkedIn recommendations from managers and colleagues across 13+ years of working together."
    >
      <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <RevealItem key={t.id} className="h-full">
            <GlassPanel hoverable className="flex h-full flex-col p-6">
              <Quote aria-hidden className="size-6 text-accent-cyan/50" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                "{t.content}"
              </p>
              <button
                type="button"
                onClick={() => setSelected(t)}
                className="mt-2 self-start font-mono text-[11px] tracking-wider text-accent-cyan hover:underline"
              >
                READ FULL →
              </button>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <Initials name={t.name} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.relationship}</p>
                </div>
              </div>
            </GlassPanel>
          </RevealItem>
        ))}
      </Reveal>

      <AnimatePresence>
        {selected && <TestimonialDialog testimonial={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </SectionShell>
  )
}

export default Testimonials
