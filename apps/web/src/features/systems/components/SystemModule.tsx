import { ArrowUpRight } from 'lucide-react'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { StatusBadge } from '../../../shared/ui/StatusBadge'
import { MonoChip } from '../../../shared/ui/MonoChip'
import type { Project } from '../data/projects.data'

interface SystemModuleProps {
  project: Project
  onOpen: (project: Project) => void
}

export function SystemModule({ project, onOpen }: SystemModuleProps) {
  return (
    <GlassPanel hoverable className="group h-full">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="flex h-full w-full flex-col p-6 text-left"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-accent-cyan">
            {project.title}
          </h3>
          <StatusBadge status={project.status} className="mt-1 shrink-0" />
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <dl className="mt-4 space-y-2 border-t border-border pt-4">
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-accent-indigo">
              ARCHITECTURE
            </dt>
            <dd className="mt-0.5 text-xs text-muted-foreground">
              {project.architectureHighlight}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-accent-violet">AI IMPACT</dt>
            <dd className="mt-0.5 text-xs text-muted-foreground">{project.aiImpact}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <MonoChip key={tech}>{tech}</MonoChip>
          ))}
          {project.technologies.length > 5 && (
            <MonoChip>+{project.technologies.length - 5}</MonoChip>
          )}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
          OPEN CASE STUDY <ArrowUpRight aria-hidden className="size-3.5" />
        </span>
      </button>
    </GlassPanel>
  )
}
