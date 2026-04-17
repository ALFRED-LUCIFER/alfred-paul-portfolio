import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Brain, Code2, Users, Cog, ChevronDown, ArrowRight, Zap, TrendingUp, Shield, Layers } from 'lucide-react'
import { ClipReveal } from '../../../shared/ui/ClipReveal'

const SERVICES = [
  {
    id: 'ai',
    number: '01',
    icon: Brain,
    title: 'AI-Integrated Development',
    tagline: 'From idea to production-ready AI in weeks, not months',
    outcome: { value: '40%', label: 'Faster Delivery' },
    color: { accent: '#28e98c', rgb: '40,233,140' },
    features: [
      'RAG pipelines & vector search architectures',
      'AI-powered code generation & review workflows',
      'LLM integration with enterprise APIs',
      'Intelligent automation & process optimization',
    ],
    stack: ['Python', 'LangChain', 'Qwen', 'OpenAI', 'Vector DBs'],
  },
  {
    id: 'fullstack',
    number: '02',
    icon: Code2,
    title: 'Full-Stack Engineering',
    tagline: 'Scalable, maintainable systems built for growth',
    outcome: { value: '50+', label: 'Projects Shipped' },
    color: { accent: '#14c5fd', rgb: '20,197,253' },
    features: [
      'React 19 + TypeScript frontend applications',
      '.NET Core / Python backend microservices',
      'Cloud-native architecture on Azure & AWS',
      'Database design, optimization & migrations',
    ],
    stack: ['React', 'TypeScript', '.NET Core', 'SQL Server', 'Docker'],
  },
  {
    id: 'leadership',
    number: '03',
    icon: Users,
    title: 'Technical Leadership',
    tagline: 'Building high-performance teams that ship great software',
    outcome: { value: '20+', label: 'Engineers Led' },
    color: { accent: '#a855f7', rgb: '168,85,247' },
    features: [
      'Agile / Scrum team management & coaching',
      'Technical architecture decisions & reviews',
      'Cross-functional stakeholder alignment',
      'Engineering culture & best practice standards',
    ],
    stack: ['Scrum', 'Jira', 'Azure DevOps', 'Code Review', 'Mentoring'],
  },
  {
    id: 'modernization',
    number: '04',
    icon: Cog,
    title: 'Legacy Modernization',
    tagline: 'Transform aging systems into competitive advantages',
    outcome: { value: '60%', label: 'Faster Releases' },
    color: { accent: '#fe6f1d', rgb: '254,111,29' },
    features: [
      'Legacy codebase assessment & roadmap planning',
      'Cloud migration & infrastructure uplift',
      'API-first re-architecture strategies',
      'Zero-downtime migration execution',
    ],
    stack: ['Azure', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
  },
]

const STATS = [
  { icon: Zap, value: '12+', label: 'Years Enterprise Experience' },
  { icon: TrendingUp, value: '99.7%', label: 'System Uptime' },
  { icon: Shield, value: '7', label: 'Industry Certifications' },
  { icon: Layers, value: '50+', label: 'Projects Delivered' },
]

const Services = () => {
  const [activeId, setActiveId] = useState<string | null>(null)

  const toggle = (id: string) => setActiveId(prev => (prev === id ? null : id))

  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background to-background/95" />

      <div className="container-drake relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
            MY SERVICES
          </span>
          <ClipReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              What I <span className="text-gradient">Deliver</span>
            </h2>
          </ClipReveal>
          <p className="text-lg text-muted-foreground max-w-2xl">
            End-to-end capabilities across AI, full-stack engineering, technical leadership, and system modernization.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2 mb-20">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            const isOpen = activeId === service.id

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <button
                  onClick={() => toggle(service.id)}
                  className="w-full text-left group"
                >
                  <div
                    className="flex items-center gap-4 md:gap-6 py-5 px-5 md:px-6 rounded-2xl border transition-all duration-300"
                    style={
                      isOpen
                        ? {
                            borderColor: `rgba(${service.color.rgb}, 0.4)`,
                            background: `rgba(${service.color.rgb}, 0.05)`,
                          }
                        : { borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }
                    }
                  >
                    {/* Number */}
                    <span
                      className="text-3xl md:text-4xl font-bold font-mono w-12 shrink-0 text-right transition-colors duration-300"
                      style={{ color: isOpen ? `rgba(${service.color.rgb}, 0.5)` : 'rgba(255,255,255,0.08)' }}
                    >
                      {service.number}
                    </span>

                    {/* Icon */}
                    <div
                      className="p-2.5 md:p-3 rounded-xl shrink-0 transition-all duration-300"
                      style={{ background: `rgba(${service.color.rgb}, ${isOpen ? 0.18 : 0.08})` }}
                    >
                      <Icon size={20} style={{ color: service.color.accent }} />
                    </div>

                    {/* Title + tagline */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base md:text-xl font-bold transition-colors duration-300 leading-tight"
                        style={isOpen ? { color: service.color.accent } : {}}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block truncate">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Metric */}
                    <div className="text-right shrink-0 hidden md:block mr-2">
                      <div className="text-2xl font-bold" style={{ color: service.color.accent }}>
                        {service.outcome.value}
                      </div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
                        {service.outcome.label}
                      </div>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 ml-1"
                    >
                      <ChevronDown size={18} className="text-muted-foreground" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mx-1 rounded-b-2xl border-x border-b px-6 pt-5 pb-6"
                        style={{ borderColor: `rgba(${service.color.rgb}, 0.2)`, background: `rgba(${service.color.rgb}, 0.03)` }}
                      >
                        <div className="grid md:grid-cols-2 gap-6 md:pl-[calc(3rem+1.25rem+1rem)]">
                          {/* Features */}
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                              What's Included
                            </p>
                            <ul className="space-y-2.5">
                              {service.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm">
                                  <ArrowRight
                                    size={13}
                                    className="mt-0.5 shrink-0"
                                    style={{ color: service.color.accent }}
                                  />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Stack */}
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                              Tech & Tools
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.stack.map(tech => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 rounded-lg text-xs font-medium border"
                                  style={{
                                    borderColor: `rgba(${service.color.rgb}, 0.35)`,
                                    background: `rgba(${service.color.rgb}, 0.1)`,
                                    color: service.color.accent,
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <div
              key={i}
              className="text-center py-6 px-4 rounded-2xl border border-border/40 bg-card/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Icon size={17} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl font-bold text-primary mb-1">{value}</div>
              <div className="text-xs text-muted-foreground leading-snug">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
