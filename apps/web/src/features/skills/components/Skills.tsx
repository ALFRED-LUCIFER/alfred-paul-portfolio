import { motion } from 'motion/react'
import { Brain, Code, Database, Cloud, Users, Cog, Zap, TrendingUp, Award } from 'lucide-react'
import { ClipReveal } from '../../../shared/ui/ClipReveal'

// ─── Data ────────────────────────────────────────────────────────────────────

const MARQUEE_ROW_1 = [
  '.NET Core', 'Python', 'React 19', 'TypeScript', 'Azure', 'Docker',
  'LangChain', 'Qwen', 'RAG', 'GitHub Copilot', 'Cursor.ai', 'Kubernetes',
  'SQL Server', 'Node.js', 'CI/CD', 'Terraform', 'C#', 'Next.js',
  '.NET Core', 'Python', 'React 19', 'TypeScript', 'Azure', 'Docker',
  'LangChain', 'Qwen', 'RAG', 'GitHub Copilot', 'Cursor.ai', 'Kubernetes',
  'SQL Server', 'Node.js', 'CI/CD', 'Terraform', 'C#', 'Next.js',
]

const MARQUEE_ROW_2 = [
  'Microservices', 'Agile', 'Scrum', 'REST APIs', 'PostgreSQL', 'Redis',
  'GitHub Actions', 'OpenAI', 'Tailwind CSS', 'VS Code', 'Prisma', 'NestJS',
  'MongoDB', 'GraphQL', 'Azure DevOps', 'Jira', 'Figma', 'Linux',
  'Microservices', 'Agile', 'Scrum', 'REST APIs', 'PostgreSQL', 'Redis',
  'GitHub Actions', 'OpenAI', 'Tailwind CSS', 'VS Code', 'Prisma', 'NestJS',
  'MongoDB', 'GraphQL', 'Azure DevOps', 'Jira', 'Figma', 'Linux',
]

// accent color, card glow color (rgb for shadow), gradient stops
const CATEGORIES = [
  {
    id: 'ai',
    label: 'AI & ML Engineering',
    icon: Brain,
    accent: '#28e98c',
    shadow: '40, 233, 140',
    span: 'md:col-span-2 xl:col-span-2',
    tools: [
      { name: 'Qwen + RAG', tag: 'Expert' },
      { name: 'LangChain', tag: 'Expert' },
      { name: 'GitHub Copilot', tag: 'Expert' },
      { name: 'Cursor.ai', tag: 'Expert' },
      { name: 'OpenAI APIs', tag: 'Advanced' },
      { name: 'Prompt Engineering', tag: 'Expert' },
      { name: 'Vector Databases', tag: 'Advanced' },
      { name: 'Python ML Libs', tag: 'Advanced' },
    ],
    highlight: '40% faster dev · 98% search reduction',
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: Database,
    accent: '#14c5fd',
    shadow: '20, 197, 253',
    span: 'md:col-span-1 xl:col-span-1',
    tools: [
      { name: '.NET Core / C#', tag: 'Expert' },
      { name: 'Python', tag: 'Expert' },
      { name: 'NestJS', tag: 'Advanced' },
      { name: 'REST APIs', tag: 'Expert' },
      { name: 'SQL Server', tag: 'Expert' },
      { name: 'PostgreSQL', tag: 'Advanced' },
    ],
    highlight: '12 yrs backend mastery',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code,
    accent: '#fe6f1d',
    shadow: '254, 111, 29',
    span: 'md:col-span-1 xl:col-span-1',
    tools: [
      { name: 'React 19', tag: 'Expert' },
      { name: 'TypeScript', tag: 'Expert' },
      { name: 'Next.js', tag: 'Advanced' },
      { name: 'Tailwind CSS', tag: 'Expert' },
      { name: 'Motion', tag: 'Advanced' },
    ],
    highlight: 'Component-driven architecture',
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: Cloud,
    accent: '#e4af12',
    shadow: '228, 175, 18',
    span: 'md:col-span-1 xl:col-span-1',
    tools: [
      { name: 'Microsoft Azure', tag: 'Expert' },
      { name: 'Docker', tag: 'Expert' },
      { name: 'Kubernetes', tag: 'Advanced' },
      { name: 'GitHub Actions', tag: 'Expert' },
      { name: 'Terraform', tag: 'Advanced' },
    ],
    highlight: '60% faster release cycle',
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: Users,
    accent: '#a855f7',
    shadow: '168, 85, 247',
    span: 'md:col-span-1 xl:col-span-1',
    tools: [
      { name: 'Team Leadership', tag: 'Expert' },
      { name: 'Scrum Master', tag: 'Certified' },
      { name: 'Agile / Kanban', tag: 'Expert' },
      { name: 'Code Review', tag: 'Expert' },
      { name: 'Mentoring', tag: 'Expert' },
    ],
    highlight: 'Led 15–20 eng teams globally',
  },
  {
    id: 'arch',
    label: 'System Architecture',
    icon: Cog,
    accent: '#f31313',
    shadow: '243, 49, 19',
    span: 'md:col-span-2 xl:col-span-1',
    tools: [
      { name: 'Microservices', tag: 'Expert' },
      { name: 'DDD Patterns', tag: 'Advanced' },
      { name: 'System Integration', tag: 'Expert' },
      { name: 'Performance Tuning', tag: 'Expert' },
    ],
    highlight: '99.7% uptime achieved',
  },
]

const ACHIEVEMENTS = [
  { icon: Zap, value: '+40%', label: 'Dev Productivity', sub: 'via AI tooling adoption' },
  { icon: TrendingUp, value: '-60%', label: 'Release Cycles', sub: 'through DevOps pipelines' },
  { icon: Award, value: '5', label: 'Certifications', sub: 'Scrum · Microsoft · Google · Python' },
]

const TAG_COLORS: Record<string, string> = {
  Expert: 'bg-primary/15 text-primary border-primary/30',
  Advanced: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Certified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Proficient: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden py-2 mask-fade-x">
      <div
        className="flex gap-6 whitespace-nowrap w-max"
        style={{ animation: `${reverse ? 'marquee-reverse' : 'marquee'} 35s linear infinite` }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function BentoCard({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const Icon = cat.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`group relative rounded-2xl border bg-card/50 backdrop-blur-sm p-6 overflow-hidden transition-all duration-500 ${cat.span}`}
      style={{
        borderColor: `rgba(${cat.shadow}, 0.15)`,
        boxShadow: `0 0 0 0 rgba(${cat.shadow}, 0)`,
      }}
      whileHover={{
        boxShadow: `0 0 32px rgba(${cat.shadow}, 0.18), 0 0 0 1px rgba(${cat.shadow}, 0.3)`,
        borderColor: `rgba(${cat.shadow}, 0.4)`,
      } as never}
    >
      {/* Top accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${cat.accent}, transparent)` }}
      />

      {/* Background glow blob */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{ background: cat.accent }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: `rgba(${cat.shadow}, 0.12)` }}
          >
            <Icon size={20} style={{ color: cat.accent }} />
          </div>
          <h3 className="font-bold text-base leading-tight">{cat.label}</h3>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/50 mt-1">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        {cat.tools.map((tool) => (
          <span
            key={tool.name}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${TAG_COLORS[tool.tag] || TAG_COLORS.Proficient}`}
          >
            {tool.name}
            <span className="text-[9px] opacity-60">{tool.tag}</span>
          </span>
        ))}
      </div>

      {/* Highlight stat */}
      <div className="relative z-10 mt-auto pt-3 border-t border-white/5">
        <span className="text-xs text-muted-foreground font-mono">{cat.highlight}</span>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Skills = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background" />

      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #28e98c 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-drake relative z-10">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
            TECH STACK & EXPERTISE
          </span>
          <ClipReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Skills &{' '}
              <span className="text-gradient">Technologies</span>
            </h2>
          </ClipReveal>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            12 years across AI engineering, full-stack development, cloud architecture, and leading distributed teams
          </p>
        </motion.div>

        {/* ── Marquee ticker ─────────────────────────────────── */}
        <div className="mb-16 -mx-4 sm:-mx-6 lg:-mx-8 relative overflow-hidden">
          {/* Edge fade masks */}
          <div className="absolute inset-y-0 left-0 w-24 z-10 bg-linear-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 z-10 bg-linear-to-l from-background to-transparent pointer-events-none" />

          <MarqueeRow items={MARQUEE_ROW_1} />
          <MarqueeRow items={MARQUEE_ROW_2} reverse />
        </div>

        {/* ── Bento Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-16">
          {CATEGORIES.map((cat, i) => (
            <BentoCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

        {/* ── Achievement stats ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {ACHIEVEMENTS.map(({ icon: Icon, value, label, sub }, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-primary/15 bg-primary/5 p-6 text-center overflow-hidden group hover:border-primary/30 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Icon size={22} className="text-primary mx-auto mb-3 relative z-10" />
              <div className="text-4xl font-bold text-primary mb-1 relative z-10">{value}</div>
              <div className="font-semibold text-sm mb-1 relative z-10">{label}</div>
              <div className="text-xs text-muted-foreground relative z-10">{sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Skills
