import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { CAREER, EDUCATION } from '../data/career.data'

export function CareerTimeline() {
  return (
    <Reveal stagger={0.1}>
      <h3 className="font-mono text-xs tracking-[0.2em] text-accent-cyan">CAREER TIMELINE</h3>
      <div className="mt-6 space-y-8 border-l border-accent-cyan/30 pl-6">
        {CAREER.map((role) => (
          <RevealItem key={role.period} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-accent-cyan shadow-[0_0_8px_hsl(var(--accent-cyan)/0.8)]"
            />
            <p className="font-mono text-[11px] text-muted-foreground">
              {role.period} · {role.type}
            </p>
            <h4 className="mt-1 text-sm font-bold sm:text-base">{role.title}</h4>
            <p className="text-xs text-muted-foreground">
              {role.company} · {role.location}
            </p>
            <ul className="mt-2 space-y-1">
              {role.highlights.slice(0, 3).map((h) => (
                <li key={h} className="text-xs leading-relaxed text-muted-foreground">
                  — {h}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {role.skills.slice(0, 6).map((s) => (
                <MonoChip key={s}>{s}</MonoChip>
              ))}
            </div>
          </RevealItem>
        ))}
        {EDUCATION.map((edu) => (
          <RevealItem key={edu.period} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-accent-indigo"
            />
            <p className="font-mono text-[11px] text-muted-foreground">{edu.period}</p>
            <h4 className="mt-1 text-sm font-bold">{edu.degree}</h4>
            <p className="text-xs text-muted-foreground">
              {edu.institution} · {edu.location}
            </p>
          </RevealItem>
        ))}
      </div>
    </Reveal>
  )
}
