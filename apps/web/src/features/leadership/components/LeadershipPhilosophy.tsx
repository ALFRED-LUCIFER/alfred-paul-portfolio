import { motion } from 'motion/react'
import { Target, Heart, Zap, Users, Quote } from 'lucide-react'

const principles = [
  {
    icon: Target,
    title: 'Clarity Over Cleverness',
    body: 'I set explicit outcome metrics before any project starts. Engineers should know what "done" looks like and why it matters to the business — not just what\'s in the Jira ticket.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Users,
    title: 'Grow People Faster Than Products',
    body: 'The best investment I make is time with my engineers — pairing, reviewing, and explaining the "why" behind architecture decisions. A team that understands reasoning ships better software.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Zap,
    title: 'Remove Friction Relentlessly',
    body: 'My job is to unblock — slow CI, unclear requirements, misaligned stakeholders. Every hour an engineer spends fighting tooling or process is an hour not spent on the problem we\'re paid to solve.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Heart,
    title: 'Psychological Safety First',
    body: 'Teams that can say "I don\'t know" and "that won\'t work" without fear ship faster and with fewer outages. I create the conditions for honest, low-ego conversations across all levels.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
]

const LeadershipPhilosophy = () => {
  const stagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1 } },
  }

  const item = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="leadership" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background to-background/80" />

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
              HOW I LEAD
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Leadership{' '}
            <span className="text-gradient">Philosophy</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            12 years of building and leading engineering teams taught me that great software is a people problem, not a technology problem
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="card-drake p-8 md:p-12 mb-16 relative"
        >
          <Quote className="w-10 h-10 text-primary/30 absolute top-6 left-6" />
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold text-center leading-relaxed max-w-4xl mx-auto px-8">
            "My measure of success as an engineering manager is not the code I ship —
            it is the engineers who grow faster{' '}
            <span className="text-gradient">because I was their lead."</span>
          </blockquote>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Alfred Paul · Team Leader, AI Initiatives · LiSEC Austria GmbH
          </p>
        </motion.div>

        {/* Principles Grid */}
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {principles.map((p) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                variants={item}
                className="card-drake p-6 md:p-8 group hover:shadow-lg transition-all duration-300"
              >
                <div className={`p-3 ${p.bg} rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${p.color}`}>{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{p.body}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '8+', label: 'Engineers Mentored' },
            { value: '3', label: 'Timezones Led' },
            { value: '12+', label: 'Years of Craft' },
            { value: '100%', label: 'Team Retention (2023–24)' },
          ].map((stat) => (
            <div key={stat.label} className="card-drake p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LeadershipPhilosophy
