import { ExternalLink } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { CERTIFICATIONS } from '../data/certifications.data'

export function Certifications() {
  return (
    <SectionShell
      index="08"
      label="CERTIFICATIONS"
      title="Credentialed, not just claimed."
      subtitle="Every badge links to its verification source."
    >
      <Reveal stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <RevealItem key={cert.title} className="h-full">
            <GlassPanel hoverable className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <img
                  src={cert.badge}
                  alt=""
                  loading="lazy"
                  className="size-12 rounded-md object-contain"
                />
                <span className="font-mono text-[10px] text-muted-foreground">{cert.year}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold">{cert.title}</h3>
              <p className="font-mono text-[11px] text-accent-indigo">{cert.issuer}</p>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                {cert.description}
              </p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-accent-cyan hover:underline"
              >
                VERIFY <ExternalLink aria-hidden className="size-3" />
              </a>
            </GlassPanel>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
