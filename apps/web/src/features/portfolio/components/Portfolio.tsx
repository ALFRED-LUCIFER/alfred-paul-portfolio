import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, BookOpen, Star, ChevronRight } from 'lucide-react'
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects.data'
import type { Project, ProjectCategory } from '../data/projects.data'
import { useTilt } from '../hooks/useTilt'
import { ClipReveal } from '../../../shared/ui/ClipReveal'
import { CaseStudyModal } from './CaseStudyModal'

// ─── Color map ────────────────────────────────────────────────────────────────
const CATEGORY_COLOR: Record<string, { accent: string; shadow: string; bg: string }> = {
  'AI Development':         { accent: '#28e98c', shadow: '40, 233, 140',  bg: 'rgba(40,233,140,0.06)' },
  'Full-Stack Development': { accent: '#14c5fd', shadow: '20, 197, 253',  bg: 'rgba(20,197,253,0.06)' },
  'Developer Tools':        { accent: '#a855f7', shadow: '168, 85, 247',  bg: 'rgba(168,85,247,0.06)' },
  'Cloud & DevOps':         { accent: '#e4af12', shadow: '228, 175, 18',  bg: 'rgba(228,175,18,0.06)' },
  'Team Management':        { accent: '#fe6f1d', shadow: '254, 111, 29',  bg: 'rgba(254,111,29,0.06)' },
}
const DEFAULT_COLOR = { accent: '#28e98c', shadow: '40, 233, 140', bg: 'rgba(40,233,140,0.06)' }

const PROJECT_INITIALS: Record<number, string> = { 1: 'RAG', 2: 'ERP', 3: 'AI', 4: 'OPS', 5: 'TMS' }

// ─── Filter tab labels (short for mobile) ─────────────────────────────────────
const TAB_LABEL: Record<string, string> = {
  'All': 'All',
  'AI Development': 'AI',
  'Full-Stack Development': 'Full-Stack',
  'Developer Tools': 'Dev Tools',
  'Cloud & DevOps': 'Cloud',
  'Team Management': 'Leadership',
}

// ─── Shared visual backdrop for cards ────────────────────────────────────────
function CardVisual({ project, color, className = '', children }: { project: Project; color: typeof DEFAULT_COLOR; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative overflow-hidden bg-muted/20 ${className}`}>
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 30% 50%, ${color.accent}20 0%, transparent 65%), radial-gradient(ellipse at 80% 20%, ${color.accent}0c 0%, transparent 60%)`,
      }} />
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `linear-gradient(${color.accent} 1px, transparent 1px), linear-gradient(90deg, ${color.accent} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />
      <div className="absolute inset-0 flex items-center justify-center text-7xl font-black tracking-tighter select-none"
        style={{ color: `${color.accent}22` }}>
        {PROJECT_INITIALS[project.id] || project.title.substring(0, 3).toUpperCase()}
      </div>
      {children}
    </div>
  )
}

// ─── Hero card (first featured, full-width landscape) ─────────────────────────
function HeroCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const color = CATEGORY_COLOR[project.category] || DEFAULT_COLOR

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4 }}
      onClick={() => onOpen(project)}
      className="group relative rounded-2xl border bg-card/60 backdrop-blur-sm overflow-hidden cursor-pointer mb-5 transition-all duration-500"
      style={{ borderColor: `rgba(${color.shadow}, 0.18)` }}
      whileHover={{ boxShadow: `0 0 48px rgba(${color.shadow}, 0.18)`, borderColor: `rgba(${color.shadow}, 0.4)` } as never}
    >
      {/* Top accent strip */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ background: `linear-gradient(90deg, ${color.accent}, ${color.accent}40)` }} />

      <div className="grid md:grid-cols-[2fr_3fr]">
        {/* Visual side */}
        <CardVisual project={project} color={color} className="min-h-[200px] md:min-h-[280px]">
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <BookOpen size={15} /> Open Case Study
            </div>
          </div>
        </CardVisual>

        {/* Content side */}
        <div className="p-6 md:p-8 flex flex-col justify-between relative">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: color.bg }} />

          <div className="relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider"
                style={{ background: `${color.accent}20`, color: color.accent, border: `1px solid ${color.accent}40` }}>
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary text-black flex items-center gap-1">
                <Star size={8} className="fill-black" /> Featured
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {project.caseStudy.metrics.map((m) => (
                <div key={m.label} className="rounded-xl p-3 text-center border"
                  style={{ borderColor: `${color.accent}25`, background: `${color.accent}08` }}>
                  <div className="text-base font-bold" style={{ color: color.accent }}>{m.value}</div>
                  <div className="text-[9px] text-muted-foreground leading-tight mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono">{t}</span>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-5 pt-4 border-t border-white/5">
            <span className="text-xs text-muted-foreground font-mono">{project.features[0]}</span>
            <button className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
              style={{ color: color.accent }}>
              Case Study <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Regular card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt()
  const color = CATEGORY_COLOR[project.category] || DEFAULT_COLOR

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onOpen(project)}
      className="group relative rounded-2xl border bg-card/60 backdrop-blur-sm overflow-hidden cursor-pointer flex flex-col transition-all duration-500"
      whileHover={{ boxShadow: `0 0 36px rgba(${color.shadow}, 0.2)`, borderColor: `rgba(${color.shadow}, 0.4)` } as never}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ background: `linear-gradient(90deg, ${color.accent}, ${color.accent}40)` }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: color.bg }} />

      {/* Visual */}
      <CardVisual project={project} color={color} className="h-40">
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider"
            style={{ background: `${color.accent}22`, color: color.accent, border: `1px solid ${color.accent}40` }}>
            {TAB_LABEL[project.category] || project.category}
          </span>
        </div>
        {/* Metric callout */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold"
          style={{ background: `${color.accent}20`, color: color.accent, border: `1px solid ${color.accent}30` }}>
          {project.caseStudy.metrics[0].value}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-1.5 text-white text-xs font-medium">
            <BookOpen size={13} /> Open Case Study
          </span>
        </div>
      </CardVisual>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 relative z-10">
        <h3 className="font-bold text-sm mb-1.5 group-hover:text-white transition-colors duration-200 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3 flex-1">
          {project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 3).map((t) => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">{t}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer metrics */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex gap-3">
            {project.caseStudy.metrics.slice(1, 3).map((m) => (
              <div key={m.label}>
                <div className="text-[10px] font-bold" style={{ color: color.accent }}>{m.value}</div>
                <div className="text-[8px] text-muted-foreground leading-tight">{m.label}</div>
              </div>
            ))}
          </div>
          <span className="flex items-center gap-0.5 text-[10px] font-medium group-hover:gap-1.5 transition-all"
            style={{ color: color.accent }}>
            Details <ArrowUpRight size={10} />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────
function FilterTabs({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {(PROJECT_CATEGORIES as readonly string[]).map((tab) => {
        const color = CATEGORY_COLOR[tab]
        const isActive = active === tab
        const label = TAB_LABEL[tab] || tab
        return (
          <motion.button
            key={tab}
            onClick={() => onChange(tab)}
            whileTap={{ scale: 0.95 }}
            className="relative px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200"
            style={{
              background: isActive ? (color ? `${color.accent}18` : 'rgba(40,233,140,0.18)') : 'transparent',
              color: isActive ? (color?.accent || '#28e98c') : 'hsl(var(--muted-foreground))',
              border: `1px solid ${isActive ? (color?.accent || '#28e98c') + '50' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {label}
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === (activeFilter as ProjectCategory))

  // In "All" mode, the first featured project becomes the hero card
  const heroProject = activeFilter === 'All' ? filtered.find((p) => p.featured) ?? null : null
  const gridProjects = heroProject ? filtered.filter((p) => p.id !== heroProject.id) : filtered

  const selectedColor = selectedProject
    ? (CATEGORY_COLOR[selectedProject.category] || DEFAULT_COLOR).accent
    : '#28e98c'

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-muted/5 to-background" />

      <div className="container-drake relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
            SELECTED WORK
          </span>
          <ClipReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </ClipReveal>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Real-world systems built at enterprise scale — click any card to read the full case study
          </p>
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        {/* Hero card */}
        <AnimatePresence mode="wait">
          {heroProject && (
            <HeroCard key={`hero-${heroProject.id}`} project={heroProject} onOpen={setSelectedProject} />
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {gridProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">No projects in this category yet.</div>
        )}
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accentColor={selectedColor}
      />
    </section>
  )
}

export default Portfolio
