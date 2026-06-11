import { ArrowUpRight } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { POSTS } from '../data/posts.data'

export function Signals() {
  return (
    <SectionShell
      index="09"
      label="SIGNALS"
      title="Thinking out loud."
      subtitle="Selected writing on agentic engineering, AI governance, and enterprise adoption — from my LinkedIn."
      accent="indigo"
    >
      <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-3">
        {POSTS.map((post) => (
          <RevealItem key={post.id} className="h-full">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="block h-full">
              <GlassPanel hoverable className="group flex h-full flex-col p-5">
                <div className="flex items-center justify-between">
                  <MonoChip className="border-accent-indigo/30 text-accent-indigo">
                    {post.topic}
                  </MonoChip>
                  <span className="font-mono text-[10px] text-muted-foreground">{post.date}</span>
                </div>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed">{post.hook}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-accent-cyan">
                  READ ON LINKEDIN{' '}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </GlassPanel>
            </a>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
