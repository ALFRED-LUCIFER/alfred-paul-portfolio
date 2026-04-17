import { motion, AnimatePresence } from 'motion/react'
import { X, TrendingUp, Lightbulb, Target, BarChart3 } from 'lucide-react'
import type { Project } from '../data/projects.data'

interface Props {
  project: Project | null
  onClose: () => void
  accentColor: string
}

export function CaseStudyModal({ project, onClose, accentColor }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-in panel from right */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[151] w-full max-w-xl bg-card border-l border-border overflow-y-auto"
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-6 py-4 border-b border-border bg-card/95 backdrop-blur-sm"
              style={{ borderTopColor: accentColor, borderTopWidth: 3 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="text-xs font-mono uppercase tracking-wider mb-1"
                    style={{ color: accentColor }}
                  >
                    Case Study
                  </div>
                  <h2 className="text-lg font-bold leading-tight">{project.title}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">

              {/* Metrics */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={16} style={{ color: accentColor }} />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Impact Metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {project.caseStudy.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-4 border text-center"
                      style={{ borderColor: `${accentColor}30`, background: `${accentColor}08` }}
                    >
                      <div className="text-2xl font-bold mb-1" style={{ color: accentColor }}>
                        {m.value}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} className="text-red-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">The Problem</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 rounded-xl p-4 border border-border">
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-yellow-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">The Solution</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 rounded-xl p-4 border border-border">
                  {project.caseStudy.solution}
                </p>
              </div>

              {/* Impact */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} style={{ color: accentColor }} />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">The Impact</span>
                </div>
                <p className="text-sm leading-relaxed rounded-xl p-4 border" style={{ borderColor: `${accentColor}30`, background: `${accentColor}08` }}>
                  {project.caseStudy.impact}
                </p>
              </div>

              {/* Features */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Key Features</div>
                <ul className="space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accentColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
