import { motion } from 'motion/react'
import { BookOpen, Clock, Tag, ArrowRight, Brain, Cpu, Users, Shield, Linkedin } from 'lucide-react'

interface Article {
  id: number
  title: string
  excerpt: string
  readTime: string
  tag: string
  tagColor: string
  tagBg: string
  icon: React.ComponentType<{ className?: string }>
  date: string
  body: string[]
}

const articles: Article[] = [
  {
    id: 4,
    title: 'Agentic AI in the Enterprise: What Works, What Fails, and What\'s Next',
    excerpt:
      'We shipped an AI agent that reads Jira tickets and produces reviewed, tested code in 4 hours. Here\'s what we learned about when agentic systems succeed in production — and when they silently fail.',
    readTime: '7 min read',
    tag: 'Agentic AI',
    tagColor: 'text-primary',
    tagBg: 'bg-primary/10',
    icon: Brain,
    date: 'Mar 2025',
    body: [
      'Everyone is talking about AI agents. Most enterprise pilots quietly fail. The difference between demo and production is not the model — it\'s the guardrails, the human-in-the-loop design, and whether the agent\'s outputs can be verified before they cause damage.',
      'In our Jira-to-production agent (built with Claude Agent SDK and MCP), the turning point was introducing a satisfaction scoring system. Each sub-agent — code generation, test writing, Cypress, code review — scores its own output on a 100-point rubric against company standards. Agents iterate until the threshold is met. This removed the inconsistency that makes agents unpredictable in enterprise settings.',
      'The biggest failure mode we observed was "confident wrongness" — agents that produce plausible-looking code that subtly violates architecture constraints. The fix: always include a domain-aware review agent with access to your actual coding standards, not just generic best practices.',
      'What\'s next: multi-agent systems where agents can spawn sub-agents dynamically, escalate to humans intelligently, and maintain shared context across long-running workflows. The frontier is not smarter models — it\'s better orchestration.',
    ],
  },
  {
    id: 5,
    title: 'Responsible AI in the Enterprise: Why Governance Is Now an Engineering Problem',
    excerpt:
      'AI governance used to be a policy team\'s problem. Now it\'s in every sprint. How engineering leaders can build responsible AI into their delivery pipelines — not bolt it on after.',
    readTime: '6 min read',
    tag: 'Responsible AI',
    tagColor: 'text-orange-400',
    tagBg: 'bg-orange-500/10',
    icon: Shield,
    date: 'Jan 2025',
    body: [
      'When we built our on-prem MCP server for Jira and Confluence, the number one constraint was data sovereignty — zero cloud egress. That wasn\'t a legal afterthought; it was a first-class engineering requirement that shaped every architectural decision.',
      'Responsible AI in enterprise settings means: data stays where compliance requires it, model outputs are auditable, human override is always available, and the system fails safe. None of these are impossible — but they require engineering teams to own them, not outsource them to a policy document.',
      'Practical steps that worked for us: (1) All AI outputs are logged with the context that generated them — full auditability. (2) Every AI action that affects external systems requires human confirmation. (3) We built a "sensitivity classifier" that routes queries containing PII or confidential terms to on-prem models only. (4) Monthly red-team sessions where engineers try to jailbreak our own systems.',
      'The engineering leaders who will be most valuable at big AI companies aren\'t just the ones who can ship agents — they\'re the ones who can ship agents that are auditable, governable, and trustworthy. That\'s the real moat.',
    ],
  },
  {
    id: 1,
    title: 'Building RAG Pipelines for Enterprise Knowledge Management',
    excerpt:
      'How we reduced documentation search time by 98% at LiSEC using Retrieval-Augmented Generation over 800+ industrial manuals — the architecture, the trade-offs, and what we wish we knew earlier.',
    readTime: '6 min read',
    tag: 'AI Engineering',
    tagColor: 'text-primary',
    tagBg: 'bg-primary/10',
    icon: Brain,
    date: 'Dec 2024',
    body: [
      'When our engineering team was spending 2–3 hours daily searching across 800+ German and English technical manuals, we knew we needed a smarter approach than keyword search.',
      'We built a RAG (Retrieval-Augmented Generation) pipeline using LangChain, the Qwen internal LLM, and OpenAI embeddings. Documents are chunked at 512 tokens with 50-token overlap, embedded, and stored in a vector database. At query time, the top-5 semantically similar chunks are retrieved and passed as context to the LLM.',
      'The key architectural decision was choosing an on-premise Qwen model over GPT-4 — driven by data sovereignty requirements. This also forced us to fine-tune our chunk size and retrieval strategy to compensate for the smaller context window.',
      'Result: documentation lookup dropped from ~2 hours to under 2 minutes. 100% team adoption within the first sprint. The lesson: start with retrieval quality, not model quality — a better search strategy beats a bigger model every time.',
    ],
  },
  {
    id: 2,
    title: 'How I Led a 15-Engineer Team Through a DevOps Transformation',
    excerpt:
      'Moving from 4-hour manual deployment windows to zero-downtime CI/CD pipelines on Azure — the people challenges were harder than the technical ones. Here\'s what actually worked.',
    readTime: '8 min read',
    tag: 'Engineering Leadership',
    tagColor: 'text-blue-400',
    tagBg: 'bg-blue-500/10',
    icon: Users,
    date: 'Oct 2024',
    body: [
      'When I took over as Team Leader in 2021, our release process required a 4-hour Saturday maintenance window, a Slack channel full of anxious stakeholders, and a rollback plan that had never actually been tested.',
      'The technical fix — GitHub Actions pipelines, blue-green deployments on AKS, Terraform for IaC — took about 6 months. The cultural fix took longer. Engineers who had been doing manual deployments for 7 years needed to trust the pipeline before they\'d let go of the old process.',
      'The approach that worked: don\'t ask people to trust automation they don\'t understand. We ran pipeline deployments and manual deployments in parallel for 8 weeks. Engineers could see the pipeline\'s behaviour and override it at any stage. Only after they\'d watched it succeed 30+ times did we retire the manual process.',
      'Outcome: zero failed production releases in the 12 months following the transition. MTTR dropped from 6 hours to 8 minutes. More importantly, the team\'s confidence and ownership of delivery increased measurably — sprint throughput rose 30% because engineers weren\'t anxious about releases anymore.',
    ],
  },
  {
    id: 3,
    title: 'AI-Augmented Development: What Copilot + Cursor.ai Did to Our Sprint Velocity',
    excerpt:
      'We measured it rigorously over 6 sprints. Here are the real numbers, the unexpected side effects, and why "40% faster" undersells what actually changed for the team.',
    readTime: '5 min read',
    tag: 'Developer Productivity',
    tagColor: 'text-purple-400',
    tagBg: 'bg-purple-500/10',
    icon: Cpu,
    date: 'Aug 2024',
    body: [
      'Before we rolled out GitHub Copilot and Cursor.ai across the team, I made a deliberate decision to measure baseline metrics for 3 sprints. Story points delivered, PR cycle time, time-in-review, and developer-reported "flow time" per day.',
      'After 3 sprints with AI tooling, the headline number was +40% sprint velocity. But the more interesting finding was where the time went. Engineers weren\'t coding 40% faster — they were spending 40% less time on the work they hated: boilerplate, test scaffolding, and writing documentation they\'d been putting off.',
      'We built a shared prompt library — standard patterns for DTO generation, unit test scaffolding, API contract docs, and Cursor.ai rules aligned to our .NET/React coding standards. This was the force multiplier. Without a shared prompt strategy, AI tools produce inconsistent, hallucinated code that costs more time in review than it saves.',
      'One unexpected outcome: junior engineers improved faster. When the AI fills boilerplate, juniors spend more time reading and reviewing architecture decisions rather than typing syntax they don\'t fully understand. After 6 months, our junior-to-mid promotion pipeline accelerated noticeably.',
    ],
  },
]

const Insights = () => {
  const stagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.12 } },
  }

  const card = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="insights" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background" />

      <div className="container-drake relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="mb-4">
            <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
              THOUGHT LEADERSHIP
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Published{' '}
            <span className="text-gradient">Thinking</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Real lessons from 12+ years building enterprise AI systems, leading distributed teams, and transforming development workflows
          </p>
          <a
            href="https://www.linkedin.com/in/alfred-paul-56438454"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" />
            Follow on LinkedIn for more
          </a>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article) => {
            const Icon = article.icon
            return (
              <motion.article
                key={article.id}
                variants={card}
                className="card-drake p-6 group flex flex-col hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Tag + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${article.tagBg} ${article.tagColor}`}>
                    <Tag className="w-3 h-3" />
                    {article.tag}
                  </span>
                  <div className={`p-2 rounded-lg ${article.tagBg}`}>
                    <Icon className={`w-5 h-5 ${article.tagColor}`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <button
                    onClick={() => {
                      const dialog = document.getElementById(`article-${article.id}`) as HTMLDialogElement | null
                      dialog?.showModal()
                    }}
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${article.tagColor} hover:underline transition-all`}
                  >
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Article Dialogs */}
        {articles.map((article) => {
          const Icon = article.icon
          return (
            <dialog
              key={article.id}
              id={`article-${article.id}`}
              className="backdrop:bg-black/60 bg-card text-foreground rounded-2xl p-8 max-w-2xl w-full mx-auto shadow-2xl border border-border open:animate-in open:fade-in open:zoom-in-95"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${article.tagBg} ${article.tagColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {article.tag}
                </div>
                <button
                  onClick={() => {
                    const dialog = document.getElementById(`article-${article.id}`) as HTMLDialogElement | null
                    dialog?.close()
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none"
                  aria-label="Close article"
                >
                  ×
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-2 leading-snug">{article.title}</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                <span>{article.date}</span>
                <span>Alfred Paul</span>
              </div>
              <div className="space-y-4">
                {article.body.map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-sm">{para}</p>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Written by Alfred Paul · AI Engineering Manager · Dubai, UAE</span>
                </div>
                <a
                  href="https://www.linkedin.com/in/alfred-paul-56438454"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-medium"
                >
                  <Linkedin className="w-3 h-3" />
                  Follow on LinkedIn
                </a>
              </div>
            </dialog>
          )
        })}
      </div>
    </section>
  )
}

export default Insights
