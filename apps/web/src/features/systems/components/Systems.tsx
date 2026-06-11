import { lazy, Suspense, useState } from 'react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { SystemModule } from './SystemModule'
import { FEATURED_SYSTEMS, type Project } from '../data/projects.data'

// Heavy modal (mermaid + syntax highlighting) loads on first open, not with the page
const CaseStudyModal = lazy(() =>
  import('./CaseStudyModal').then((m) => ({ default: m.CaseStudyModal }))
)

/** Mirrors --accent-cyan; the modal API takes a hex accent for mermaid/inline styles */
const MODAL_ACCENT = '#22d3ee'

export function Systems() {
  const [active, setActive] = useState<Project | null>(null)
  const [hasOpened, setHasOpened] = useState(false)

  const open = (project: Project) => {
    setActive(project)
    setHasOpened(true)
  }

  return (
    <SectionShell
      index="02"
      label="FEATURED AI SYSTEMS"
      title="Production systems, not prototypes."
      subtitle="Agentic platforms, MCP integrations, and full-stack products — each one a module in a larger engineering operating system."
      accent="indigo"
    >
      <Reveal stagger={0.06} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {FEATURED_SYSTEMS.map((project) => (
          <RevealItem key={project.id} className="h-full">
            <SystemModule project={project} onOpen={open} />
          </RevealItem>
        ))}
      </Reveal>

      {hasOpened && (
        <Suspense fallback={null}>
          <CaseStudyModal
            project={active}
            onClose={() => setActive(null)}
            accentColor={MODAL_ACCENT}
          />
        </Suspense>
      )}
    </SectionShell>
  )
}
