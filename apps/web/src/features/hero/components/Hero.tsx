import { lazy, Suspense, Component, useState, useEffect, type ReactNode } from 'react'
import { ArrowRight, FileDown } from 'lucide-react'
import { GlowLink, GhostLink } from '../../../shared/ui/Buttons'
import { StatusBadge } from '../../../shared/ui/StatusBadge'
import { Reveal } from '../../../shared/ui/Reveal'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'
import { GraphFallback } from './GraphFallback'
import resumePdf from '../../../assets/Alfred_Paul_Engineering_Manager.pdf'

const OrchestrationGraph = lazy(() => import('./OrchestrationGraph'))

/** WebGL failure → static SVG */
class GraphErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <GraphFallback /> : this.props.children
  }
}

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

export function Hero() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const interactive = isDesktop && !reduced

  return (
    <div className="container-grid relative flex min-h-[calc(100svh-4rem)] items-center pt-24 lg:pt-16">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal stagger={0.08}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-panel/60 px-4 py-1.5 backdrop-blur">
            <StatusBadge status="online" />
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
              AI ENGINEERING MANAGER · TRANSFORMATION LEAD · AGENTIC SDLC
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Engineering AI-native software delivery
            <span className="text-accent-cyan text-glow-cyan">.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            12+ years of enterprise engineering, leading a 20-engineer team across Dubai and
            Austria — building agentic AI systems, LLM platforms, Model Context Protocol (MCP)
            integrations, and governed enterprise AI adoption.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <GlowLink href="#systems">
              View AI Systems <ArrowRight aria-hidden className="size-4" />
            </GlowLink>
            <GhostLink href="#architecture">Architecture Thinking</GhostLink>
            <GhostLink href={resumePdf} download="Alfred_Paul_Resume.pdf">
              <FileDown aria-hidden className="size-4" /> Resume
            </GhostLink>
          </div>
        </Reveal>

        <div className="relative h-[400px] sm:h-[480px] lg:h-[600px]">
          {interactive ? (
            <GraphErrorBoundary>
              <Suspense fallback={<GraphFallback />}>
                <OrchestrationGraph />
              </Suspense>
            </GraphErrorBoundary>
          ) : (
            <GraphFallback />
          )}
        </div>
      </div>
    </div>
  )
}
