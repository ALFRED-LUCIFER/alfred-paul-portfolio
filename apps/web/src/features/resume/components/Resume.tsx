import { motion } from 'motion/react'
import { Calendar, MapPin, Award, BookOpen, Briefcase, GraduationCap, ExternalLink, Shield } from 'lucide-react'

const Resume = () => {
  // Animation variants
  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const timelineVariant = {
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  // Experience Data (Updated from portfolio-data.md)
  const experiences = [
    {
      period: "Oct 2021 - Present",
      title: "Team Leader – Software Development & AI Initiatives",
      company: "LiSEC Austria GmbH",
      location: "Dubai, UAE",
      type: "Full-time · 4 yrs 7 mos",
      highlights: [
        "Delivered AI-powered chatbot using Qwen + RAG for dynamic Q&A over internal docs",
        "Introduced Copilot + Cursor.ai workflows — boosted dev productivity by 40%",
        "Spearheaded DevOps pipelines; reduced release cycle by 60%",
        "Led Agile delivery with global teams across Dubai and Austria",
        "Mentored developers in AI-assisted development & modern full-stack design patterns"
      ],
      skills: ["Python", "Qwen", "RAG", ".NET Core", "React", "Azure", "Docker", "Copilot", "Cursor.ai"]
    },
    {
      period: "Oct 2020 - Oct 2021",
      title: "Senior Software Developer – .NET & Agile Product Delivery",
      company: "LiSEC Austria GmbH",
      location: "Dubai, UAE",
      type: "Full-time · 1 yr 1 mo",
      highlights: [
        "Delivered mission-critical features for industrial applications in React + .NET",
        "Refactored monoliths into modular services with CI/CD pipelines",
        "Acted as Scrum lead, ensuring high sprint throughput and minimal blockers",
        "High-availability architecture design for glass automation systems"
      ],
      skills: [".NET Core", "React", "Azure", "SQL Server", "Agile", "Microservices"]
    },
    {
      period: "Sep 2013 - Oct 2020",
      title: "Software Engineer",
      company: "LiSEC Austria GmbH",
      location: "Dubai, UAE",
      type: "Full-time · 7 yrs 2 mos",
      highlights: [
        "Developed software for industrial glass automation systems using C# and .NET",
        "Built internal development tools and reusable component libraries",
        "Migrated legacy components to Python and mentored junior developers",
        "Established technical documentation and code review standards"
      ],
      skills: ["C#", ".NET Framework", "Python", "Industrial Automation", "SQL Server"]
    }
  ]

  // Education Data
  const education = [
    {
      period: "2008 - 2012",
      degree: "Bachelor of Engineering – Computer Science",
      institution: "Oriental Engineering College",
      location: "India",
      highlights: [
        "Specialized in software engineering, algorithms, and system design",
        "Strong foundation in distributed computing and database management",
        "Active participant in technical competitions and programming contests"
      ],
      grade: "Bachelor of Engineering (BE)"
    }
  ]

  // Certifications — sorted by year descending
  const certifications = [
    {
      title: "Microsoft Certified: AI Transformation Leader",
      issuer: "Microsoft",
      year: "2024",
      description: "Enterprise AI adoption, transformation strategy, and responsible AI practices",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      badge: "/images/ai-transformation-leader.png",
      verifyUrl: "https://www.linkedin.com/in/alfred-paul-56438454/details/certifications/"
    },
    {
      title: "Professional Scrum Master™ I (PSM I)",
      issuer: "Scrum.org",
      year: "2023",
      description: "Certified in Scrum framework implementation and Agile team leadership",
      color: "text-primary",
      bg: "bg-primary/10",
      badge: "/images/PSM1.png",
      verifyUrl: "https://www.scrum.org/certificates"
    },
    {
      title: "Microsoft Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      year: "2023",
      description: "Cloud concepts, Azure services, security, privacy, compliance, and pricing fundamentals",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      badge: "/images/azure_fundamental.png",
      verifyUrl: "https://www.linkedin.com/in/alfred-paul-56438454/details/certifications/"
    },
    {
      title: "Google People Management Essentials",
      issuer: "Google",
      year: "2023",
      description: "People management, coaching techniques, and high-performance team building",
      color: "text-red-400",
      bg: "bg-red-500/10",
      badge: "/images/Google.png",
      verifyUrl: "https://www.linkedin.com/in/alfred-paul-56438454/details/certifications/"
    },
    {
      title: "PCEP – Certified Entry-Level Python Programmer",
      issuer: "Python Institute",
      year: "2022",
      description: "Professional certification in Python programming fundamentals and best practices",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      badge: "/images/pythoncert.png",
      verifyUrl: "https://pythoninstitute.org/pcep"
    },
    {
      title: "Programming in Python",
      issuer: "Meta / Coursera",
      year: "2022",
      description: "Advanced Python patterns, OOP, functional programming, and data structures",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      badge: "/images/pythoncert.png",
      verifyUrl: "https://www.coursera.org/account/accomplishments"
    },
  ]

  return (
    <section id="resume" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background" />
      
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
              MY RESUME
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Professional{' '}
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            12+ years of evolution from software engineer to AI-integrated team leader
          </p>
        </motion.div>

        {/* Experience Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-3 bg-primary/10 rounded-xl">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Work Experience</h3>
          </motion.div>

          <div className="relative">
            {/* Animated SVG Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 overflow-hidden" style={{ pointerEvents: 'none' }}>
              <svg width="2" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                <motion.line
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeInOut' as const }}
                />
              </svg>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={timelineVariant}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2.5 md:left-6.5 w-3 h-3 bg-primary rounded-full border-4 border-background shadow-lg" />
                  
                  {/* Content Card */}
                  <div className="card-drake p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold mb-2">{exp.title}</h4>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-medium mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-3 bg-primary/10 rounded-xl">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Education</h3>
          </motion.div>

          <motion.div
            variants={timelineVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative pl-16 md:pl-20"
          >
            {/* Animated SVG Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 h-full w-0.5 overflow-hidden" style={{ pointerEvents: 'none' }}>
              <svg width="2" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                <motion.line
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeInOut' as const }}
                />
              </svg>
            </div>
            <div className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 bg-primary rounded-full border-4 border-background shadow-lg" />
            
            <div className="card-drake p-6 md:p-8">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold mb-2">{edu.degree}</h4>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-medium">{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium mt-2 md:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                    <Award className="w-4 h-4" />
                    <span>{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-3 bg-primary/10 rounded-xl">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Certifications</h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={timelineVariant}
                className="card-drake p-6 group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${cert.badge ? 'p-1' : 'p-3'} ${cert.bg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    {cert.badge ? (
                      <img src={cert.badge} alt={cert.issuer} className="w-12 h-12 object-contain" />
                    ) : (
                      <Shield className={`w-6 h-6 ${cert.color}`} />
                    )}
                  </div>
                  <span className={`px-3 py-1 ${cert.bg} ${cert.color} rounded-full text-xs font-bold`}>
                    {cert.year}
                  </span>
                </div>
                <h4 className="font-bold text-base mb-1 leading-snug">{cert.title}</h4>
                <p className={`text-sm font-semibold mb-2 ${cert.color}`}>{cert.issuer}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{cert.description}</p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${cert.color} hover:underline transition-all`}
                >
                  <ExternalLink className="w-3 h-3" />
                  Verify Certificate
                </a>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Resume
