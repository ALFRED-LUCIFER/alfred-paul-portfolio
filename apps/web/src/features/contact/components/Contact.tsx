import { motion } from 'motion/react'
import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Paperclip,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Github,
  FileDown,
} from 'lucide-react'
import { submitContact } from '../../../infrastructure/api/contact.client'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal } from '../../../shared/ui/Reveal'
import { GhostLink } from '../../../shared/ui/Buttons'
import resumePdf from '../../../assets/Alfred_Paul_2026.pdf'

const inputClasses =
  'w-full px-4 py-3 rounded-lg border border-border bg-background/60 text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-colors placeholder:text-muted-foreground/60'

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: '',
    attachment: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitContact({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        budget: formData.budget || undefined,
        message: formData.message,
      })
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        budget: '',
        message: '',
        attachment: null,
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, attachment: file }))
  }

  const contactInfo = {
    email: 'alfred.v.paul@gmail.com',
    phone: '+971 56 131 1506',
    location: 'Dubai, UAE',
  }

  const inquiryOptions = [
    'Job Opportunity',
    'Technical Collaboration',
    'Consulting Inquiry',
    'Speaking / Advisory',
    'General Inquiry',
  ]

  return (
    <SectionShell
      index="11"
      label="CONTACT"
      title="Let's build AI-native engineering systems."
      subtitle="Open to AI Engineering Manager, AI Transformation Lead, and AI Architect roles — or a conversation about building agentic platforms at scale."
    >
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column — channels + positioning */}
        <Reveal stagger={0.08} className="order-2 space-y-8 lg:order-1">
          <div className="space-y-3">
            {[
              { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
              { icon: Phone, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
              { icon: MapPin, label: 'Location', value: contactInfo.location, href: undefined },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="glass-panel flex items-center gap-4 rounded-lg p-4 transition-colors hover:border-accent-cyan/40"
              >
                <span className="rounded-lg bg-accent-cyan/10 p-3">
                  <item.icon className="size-5 text-accent-cyan" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-widest text-muted-foreground">
                    {item.label.toUpperCase()}
                  </span>
                  <span className="text-sm text-foreground">{item.value}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <GhostLink
              href="https://www.linkedin.com/in/alfred-paul-56438454"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-4" /> LinkedIn
            </GhostLink>
            <GhostLink href="https://github.com/ALFRED-LUCIFER" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" /> GitHub
            </GhostLink>
            <GhostLink href={resumePdf} download="Alfred_Paul_Resume.pdf">
              <FileDown className="size-4" /> Resume
            </GhostLink>
          </div>

          <GlassPanel glow="cyan" className="p-6">
            <h3 className="font-mono text-xs tracking-[0.2em] text-accent-cyan">
              WHAT I'M LOOKING FOR
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                ['Role', 'AI Engineering Manager, AI Transformation Lead, or AI Architect'],
                ['Location', 'Dubai-based with transferable UAE residence visa — remote, hybrid, or relocation'],
                ['Domain', 'AI-first products, enterprise AI platforms, developer tooling'],
                ['Team', 'High-ownership culture, shipping AI to production (not just R&D)'],
              ].map(([label, value]) => (
                <li key={label} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-cyan" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{label}:</strong> {value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
              12 years at one company means 12 years of compounding enterprise trust — ask my
              references.
            </p>
          </GlassPanel>
        </Reveal>

        {/* Right column — form */}
        <Reveal className="order-1 lg:order-2">
          <GlassPanel className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-lg border border-status-ok/30 bg-status-ok/10 p-4"
                >
                  <CheckCircle className="size-5 text-status-ok" />
                  <span className="text-sm text-status-ok">
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4"
                >
                  <AlertCircle className="size-5 text-destructive" />
                  <span className="text-sm text-destructive">
                    Something went wrong. Please try again.
                  </span>
                </motion.div>
              )}

              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground"
                >
                  FULL NAME *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                  placeholder="Your full name"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground"
                  >
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClasses}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground"
                  >
                    PHONE
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="+971 ..."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground"
                >
                  SUBJECT *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                  placeholder="Job opportunity, collaboration, consulting…"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-inquiry"
                  className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground"
                >
                  INQUIRY TYPE
                </label>
                <select
                  id="contact-inquiry"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={inputClasses}
                >
                  <option value="">Select inquiry type</option>
                  {inquiryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground"
                >
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell me about your team, role, and what you're building…"
                />
              </div>

              <div>
                <label
                  htmlFor="attachment"
                  className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground"
                >
                  ATTACHMENT
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only"
                  id="attachment"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label
                  htmlFor="attachment"
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-border bg-background/60 px-4 py-3 transition-colors hover:border-accent-cyan/40"
                >
                  <Paperclip className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formData.attachment ? formData.attachment.name : 'Choose file (PDF, DOC, TXT)'}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-cyan py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_24px_hsl(var(--accent-cyan)/0.45)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </GlassPanel>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default Contact
