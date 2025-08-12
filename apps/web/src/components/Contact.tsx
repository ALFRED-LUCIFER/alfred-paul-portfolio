import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Paperclip, CheckCircle, AlertCircle, Linkedin, Github, Twitter } from 'lucide-react'

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: '',
    attachment: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        budget: '',
        message: '',
        attachment: null
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, attachment: file }))
  }

  // Contact information
  const contactInfo = {
    email: "Alfred.v.paul@gmail.com",
    phone: "+971-561311506",
    location: "Dubai, UAE"
  }

  const socialLinks = [
    { platform: "LinkedIn", url: "https://linkedin.com/in/alfredpaul", icon: Linkedin, color: "text-primary hover:text-primary/80" },
    { platform: "GitHub", url: "https://github.com/alfredpaul", icon: Github, color: "text-foreground hover:text-primary" },
    { platform: "Twitter", url: "https://twitter.com/alfredpaul", icon: Twitter, color: "text-muted-foreground hover:text-primary" }
  ]

  const budgetOptions = [
    "Under $10k",
    "$10k - $25k", 
    "$25k - $50k",
    "$50k - $100k",
    "$100k+"
  ]

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
      
      <div className="container-drake relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="mb-4">
            <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Let's Work{' '}
            <span className="text-gradient">Together!</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to build something amazing with AI-integrated development? Let's discuss your project
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            {/* Contact Information */}
            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Get In Touch
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always interested in new opportunities and exciting projects. Whether you need 
                  AI integration, full-stack development, or technical leadership, let's start a conversation.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">{contactInfo.email}</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">{contactInfo.phone}</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">{contactInfo.location}</div>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 bg-muted hover:bg-primary/10 rounded-xl transition-colors duration-300 ${social.color}`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Project Benefits */}
            <div className="card-drake p-6">
              <h4 className="font-bold text-lg mb-4">Why Work With Me?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    40% faster development with AI-integrated workflows
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    11+ years of enterprise-level experience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Proven track record leading distributed teams
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Full-stack expertise from frontend to cloud deployment
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="card-drake p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 dark:text-green-300 text-sm">
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 dark:text-red-300 text-sm">
                      Something went wrong. Please try again.
                    </span>
                  </motion.div>
                )}

                {/* Form Fields */}
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {/* Full Name */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </motion.div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={fadeInUp}>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Project discussion, collaboration, etc."
                    />
                  </motion.div>

                  {/* Budget */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                      PROJECT BUDGET
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                      MESSAGE *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                      placeholder="Tell me about your project, timeline, and requirements..."
                    />
                  </motion.div>

                  {/* File Attachment */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                      ADD AN ATTACHMENT
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        id="attachment"
                        accept=".pdf,.doc,.docx,.txt"
                      />
                      <label
                        htmlFor="attachment"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <Paperclip className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {formData.attachment ? formData.attachment.name : 'Choose file (PDF, DOC, TXT)'}
                        </span>
                      </label>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={fadeInUp} className="pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full btn-drake text-lg py-4 flex items-center justify-center gap-3 relative group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          SEND MESSAGE
                        </>
                      )}
                      <div className="absolute inset-0 bg-primary rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
