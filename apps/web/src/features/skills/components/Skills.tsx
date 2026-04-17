import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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

type Tier = 'Expert' | 'Advanced' | 'Certified' | 'Proficient'

interface Skill {
  name: string
  tier: Tier
  level: number
}

interface Category {
  id: string
  label: string
  icon: typeof Brain
  accent: string
  rgb: string
  highlight: string
  skills: Skill[]
}

const CATEGORIES: Category[] = [
  {
    id: 'ai',
    label: 'AI & ML',
    icon: Brain,
    accent: '#28e98c',
    rgb: '40,233,140',
    highlight: '40% dev speed gain · 98% search reduction',
    skills: [
      { name: 'Qwen + RAG', tier: 'Expert', level: 95 },
      { name: 'LangChain', tier: 'Expert', level: 92 },
      { name: 'GitHub Copilot', tier: 'Expert', level: 98 },
      { name: 'Cursor.ai', tier: 'Expert', level: 95 },
      { name: 'OpenAI APIs', tier: 'Advanced', level: 88 },
      { name: 'Prompt Engineering', tier: 'Expert', level: 93 },
      { name: 'Vector Databases', tier: 'Advanced', level: 85 },
      { name: 'Python ML Libs', tier: 'Advanced', level: 82 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Database,
    accent: '#14c5fd',
    rgb: '20,197,253',
    highlight: '12 yrs enterprise backend mastery',
    skills: [
      { name: '.NET Core / C#', tier: 'Expert', level: 98 },
      { name: 'Python', tier: 'Expert', level: 92 },
      { name: 'NestJS', tier: 'Advanced', level: 82 },
      { name: 'REST APIs', tier: 'Expert', level: 97 },
      { name: 'SQL Server', tier: 'Expert', level: 95 },
      { name: 'PostgreSQL', tier: 'Advanced', level: 85 },
      { name: 'MongoDB', tier: 'Advanced', level: 78 },
      { name: 'Redis', tier: 'Proficient', level: 72 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code,
    accent: '#fe6f1d',
    rgb: '254,111,29',
    highlight: 'Component-driven, performance-first',
    skills: [
      { name: 'React 19', tier: 'Expert', level: 95 },
      { name: 'TypeScript', tier: 'Expert', level: 94 },
      { name: 'Next.js', tier: 'Advanced', level: 84 },
      { name: 'Tailwind CSS', tier: 'Expert', level: 96 },
      { name: 'Framer Motion', tier: 'Advanced', level: 82 },
      { name: 'GraphQL', tier: 'Proficient', level: 70 },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: Cloud,
    accent: '#e4af12',
    rgb: '228,175,18',
    highlight: '60% faster release cycles',
    skills: [
      { name: 'Microsoft Azure', tier: 'Expert', level: 94 },
      { name: 'Docker', tier: 'Expert', level: 96 },
      { name: 'Kubernetes', tier: 'Advanced', level: 83 },
      { name: 'GitHub Actions', tier: 'Expert', level: 92 },
      { name: 'Terraform', tier: 'Advanced', level: 78 },
      { name: 'AWS', tier: 'Proficient', level: 68 },
    ],
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: Users,
    accent: '#a855f7',
    rgb: '168,85,247',
    highlight: 'Led 15–20 engineers globally',
    skills: [
      { name: 'Team Leadership', tier: 'Expert', level: 98 },
      { name: 'Scrum Master', tier: 'Certified', level: 95 },
      { name: 'Agile / Kanban', tier: 'Expert', level: 96 },
      { name: 'Code Review', tier: 'Expert', level: 97 },
      { name: 'Mentoring', tier: 'Expert', level: 95 },
      { name: 'Stakeholder Mgmt', tier: 'Expert', level: 90 },
    ],
  },
  {
    id: 'arch',
    label: 'Architecture',
    icon: Cog,
    accent: '#f31313',
    rgb: '243,49,19',
    highlight: '99.7% uptime · zero-downtime migrations',
    skills: [
      { name: 'Microservices', tier: 'Expert', level: 95 },
      { name: 'DDD Patterns', tier: 'Advanced', level: 84 },
      { name: 'System Integration', tier: 'Expert', level: 96 },
      { name: 'Performance Tuning', tier: 'Expert', level: 93 },
      { name: 'Security Patterns', tier: 'Advanced', level: 82 },
    ],
  },
]

const TIER_STYLE: Record<Tier, string> = {
  Expert: 'bg-primary/15 text-primary border-primary/30',
  Advanced: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  Certified: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  Proficient: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
}

const ACHIEVEMENTS = [
  { icon: Zap, value: '+40%', label: 'Dev Productivity', sub: 'via AI tooling adoption' },
  { icon: TrendingUp, value: '-60%', label: 'Release Cycles', sub: 'through DevOps pipelines' },
  { icon: Award, value: '5', label: 'Certifications', sub: 'Scrum · Microsoft · Google · Python' },
]

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

function SkillBar({ skill, accent, rgb, index }: { skill: Skill; accent: string; rgb: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5 gap-3">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium shrink-0 ${TIER_STYLE[skill.tier]}`}>
          {skill.tier}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.7, delay: index * 0.04 + 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, rgba(${rgb},0.6), ${accent})` }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Skills = () => {
  const [activeId, setActiveId] = useState('ai')
  const active = CATEGORIES.find(c => c.id === activeId)!

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #28e98c 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

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
            TECH STACK & EXPERTISE
          </span>
          <ClipReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Skills &{' '}
              <span className="text-gradient">Technologies</span>
            </h2>
          </ClipReveal>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            12 years across AI engineering, full-stack development, cloud architecture, and leading distributed teams.
          </p>
        </motion.div>

        {/* Marquee ticker */}
        <div className="mb-14 -mx-4 sm:-mx-6 lg:-mx-8 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 z-10 bg-linear-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 z-10 bg-linear-to-l from-background to-transparent pointer-events-none" />
          <MarqueeRow items={MARQUEE_ROW_1} />
          <MarqueeRow items={MARQUEE_ROW_2} reverse />
        </div>

        {/* Tab panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon
              const isActive = cat.id === activeId
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(cat.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-250 border shrink-0"
                  style={
                    isActive
                      ? {
                          borderColor: `rgba(${cat.rgb}, 0.45)`,
                          background: `rgba(${cat.rgb}, 0.12)`,
                          color: cat.accent,
                        }
                      : { borderColor: 'rgba(255,255,255,0.07)', background: 'transparent', color: '' }
                  }
                >
                  <Icon size={15} style={isActive ? { color: cat.accent } : {}} className={isActive ? '' : 'text-muted-foreground'} />
                  <span className={isActive ? '' : 'text-muted-foreground'}>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Active panel */}
          <div
            className="rounded-2xl border p-6 md:p-8 min-h-[320px]"
            style={{
              borderColor: `rgba(${active.rgb}, 0.2)`,
              background: `rgba(${active.rgb}, 0.03)`,
            }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: `rgba(${active.rgb}, 0.15)` }}
                >
                  <active.icon size={18} style={{ color: active.accent }} />
                </div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: active.accent }}>
                    {active.label}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{active.highlight}</p>
                </div>
              </div>
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-lg"
                style={{ background: `rgba(${active.rgb}, 0.1)`, color: `rgba(${active.rgb}, 0.7)` }}
              >
                {active.skills.length} skills
              </span>
            </div>

            {/* Skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-x-8 gap-y-4"
              >
                {active.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} accent={active.accent} rgb={active.rgb} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Achievement stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {ACHIEVEMENTS.map(({ icon: Icon, value, label, sub }, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-primary/15 bg-primary/5 p-6 text-center overflow-hidden group hover:border-primary/30 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Icon size={20} className="text-primary mx-auto mb-3 relative z-10" />
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
