import { motion } from 'motion/react'
import { FlaskConical, Layers, Target, TrendingUp } from 'lucide-react'
import { ClipReveal } from '../../../shared/ui/ClipReveal'

const ROADMAP_ITEMS = [
  {
    phase: '01',
    status: 'studying',
    label: 'Currently Studying',
    icon: FlaskConical,
    accent: '#a78bfa',
    rgb: '167,139,250',
    items: [
      { name: 'LLM Fine-Tuning', detail: 'LoRA & QLoRA for domain-specific model adaptation' },
      { name: 'AI Evaluation Frameworks', detail: 'RAGAS, TruLens — measuring RAG quality beyond vibes' },
      { name: 'LangSmith / LLMOps', detail: 'Observability, tracing, and prompt versioning at scale' },
      { name: 'AI Governance & Safety', detail: 'Responsible AI principles, bias auditing, model cards' },
    ],
  },
  {
    phase: '02',
    status: 'experimenting',
    label: 'Experimenting With',
    icon: Layers,
    accent: '#38bdf8',
    rgb: '56,189,248',
    items: [
      { name: 'Multimodal Agents', detail: 'Vision + language pipelines — GPT-4V, LLaVA, Gemini' },
      { name: 'Computer Use / AI Automation', detail: 'Claude Computer Use, browser-control agents' },
      { name: 'Hugging Face Transformers', detail: 'Local model hosting, embedding fine-tuning' },
      { name: 'Synthetic Data Generation', detail: 'Building training sets from enterprise knowledge bases' },
    ],
  },
  {
    phase: '03',
    status: 'building-toward',
    label: 'Building Toward',
    icon: Target,
    accent: '#28e98c',
    rgb: '40,233,240',
    items: [
      { name: 'AI Platform Architecture', detail: 'End-to-end ML systems: training → evaluation → serving → monitoring' },
      { name: 'MLOps at Scale', detail: 'MLflow, feature stores, model registries, A/B testing for LLMs' },
      { name: 'Edge AI Deployment', detail: 'ONNX, quantization, on-device inference for enterprise' },
      { name: 'DP-100 Azure ML Certification', detail: 'Targeting Q3 2026 — Azure Data Scientist Associate' },
    ],
  },
  {
    phase: '04',
    status: 'horizon',
    label: 'On the Horizon',
    icon: TrendingUp,
    accent: '#fb923c',
    rgb: '251,146,60',
    items: [
      { name: 'Agentic AI at Org Scale', detail: 'Multi-agent systems managing entire SDLC workflows' },
      { name: 'AI Product Strategy', detail: 'Bridging the EM↔AI Product crossover at MNC scale' },
      { name: 'Responsible AI Leadership', detail: 'Policy, ethics frameworks, and governance at enterprise level' },
      { name: 'AWS ML Specialty', detail: 'Cloud-agnostic ML engineering credentials' },
    ],
  },
]

const STATUS_LABEL: Record<string, string> = {
  studying: 'Studying',
  experimenting: 'Experimenting',
  'building-toward': 'Building Toward',
  horizon: 'On Horizon',
}

const AIRoadmap = () => {
  return (
    <section id="ai-roadmap" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background to-background/95" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#28e98c 1px, transparent 1px), linear-gradient(90deg, #28e98c 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-drake relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
            WHERE AI IS HEADING
          </span>
          <ClipReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              My AI{' '}
              <span className="text-gradient">Roadmap</span>
            </h2>
          </ClipReveal>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Staying ahead of the curve — what I'm actively learning, experimenting with, and building toward as AI engineering evolves.
          </p>
        </motion.div>

        {/* Roadmap grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {ROADMAP_ITEMS.map((phase, i) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border p-6 group hover:border-opacity-60 transition-all duration-300"
                style={{
                  borderColor: `rgba(${phase.rgb}, 0.2)`,
                  background: `rgba(${phase.rgb}, 0.03)`,
                }}
                whileHover={{ borderColor: `rgba(${phase.rgb}, 0.4)` } as never}
              >
                {/* Phase number */}
                <div
                  className="absolute top-4 right-5 text-5xl font-black opacity-[0.06] select-none"
                  style={{ color: phase.accent }}
                >
                  {phase.phase}
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ background: `rgba(${phase.rgb}, 0.15)` }}
                  >
                    <Icon size={18} style={{ color: phase.accent }} />
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold uppercase tracking-wider"
                      style={{ color: phase.accent, borderColor: `rgba(${phase.rgb}, 0.3)`, background: `rgba(${phase.rgb}, 0.1)` }}
                    >
                      {STATUS_LABEL[phase.status]}
                    </span>
                    <h3 className="font-bold text-sm mt-1" style={{ color: phase.accent }}>
                      {phase.label}
                    </h3>
                  </div>
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: phase.accent }}
                      />
                      <div>
                        <span className="text-sm font-semibold">{item.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto"
        >
          This roadmap is a living document — AI is moving fast and so am I.
          My 12 years of enterprise delivery gives me the context to know{' '}
          <em className="text-foreground">which</em> new capabilities matter in production.
        </motion.p>
      </div>
    </section>
  )
}

export default AIRoadmap
