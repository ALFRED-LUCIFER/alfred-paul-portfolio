import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react'

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
      period: "2021 - Present",
      title: "Team Leader – Software Development & AI Initiatives",
      company: "LiSEC Automation Middle East FZ-LLC",
      location: "Dubai, UAE",
      type: "Full-time",
      highlights: [
        "Directed development of AI-driven software tools including proprietary chatbots with RAG pipelines",
        "Introduced GitHub Copilot and Cursor.ai workflows, achieving 40% improvement in code generation efficiency",
        "Managed distributed teams of 15-20 engineers across Dubai and Austria",
        "Built enterprise RAG chatbot with Quin for internal documentation queries",
        "Reduced testing cycles significantly through AI-assisted development"
      ],
      skills: ["Python", "LangChain", "RAG", "GitHub Copilot", "Cursor.ai", ".NET Core", "React", "Azure"]
    },
    {
      period: "2020 - 2021",
      title: "Senior Software Developer – .NET & Agile Product Delivery",
      company: "LiSEC Automation Middle East FZ-LLC",
      location: "Dubai, UAE", 
      type: "Full-time",
      highlights: [
        "Built full-stack applications using .NET Core and React with emphasis on scalability within Azure cloud",
        "Converted legacy monolithic applications into modular services, reducing deployment downtime",
        "30% improvement in sprint goal completion through Agile delivery routines",
        "High-availability architecture design and implementation"
      ],
      skills: [".NET Core", "React", "Azure", "SQL Server", "Agile", "Microservices"]
    },
    {
      period: "2013 - 2020",
      title: "Computer Programmer – Full-Stack Software Developer",
      company: "LiSEC Automation Middle East FZ-LLC",
      location: "Dubai, UAE",
      type: "Full-time", 
      highlights: [
        "Developed software for industrial automation systems using C# and .NET Framework",
        "Built internal development tools and reusable libraries",
        "Migrated legacy components to Python and mentored junior developers",
        "Established technical documentation standards"
      ],
      skills: ["C#", ".NET Framework", "Python", "Industrial Automation", "Unit Testing"]
    }
  ]

  // Education Data (Updated from portfolio-data.md)
  const education = [
    {
      period: "2004 - 2008",
      degree: "Bachelor of Engineering in Computer Science",
      institution: "RGPV Technical University",
      location: "Bhopal, India",
      highlights: [
        "Comprehensive computer science education with focus on software engineering principles",
        "Specialized in algorithms, data structures, and system design",
        "Active participant in technical competitions and programming contests",
        "Foundation in distributed computing systems and database management"
      ],
      grade: "First Class Honours"
    }
  ]

  // Certifications (Updated from portfolio-data.md)
  const certifications = [
    {
      title: "Professional Scrum Master™ I",
      issuer: "Scrum.org",
      year: "2023",
      description: "Certified in Scrum framework implementation and Agile team leadership methodologies"
    },
    {
      title: "Professional Scrum Developer™ I", 
      issuer: "Scrum.org",
      year: "2023",
      description: "Advanced certification in Scrum development practices and code quality standards"
    },
    {
      title: "PCEP Python Programmer",
      issuer: "Python Institute",
      year: "2022",
      description: "Professional certification in Python programming fundamentals and best practices"
    }
  ]

  return (
    <section id="resume" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      
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
            11+ years of evolution from developer to AI-integrated team leader
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
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-primary/20" />

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
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
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
            {/* Timeline Elements */}
            <div className="absolute left-4 md:left-8 top-0 h-full w-0.5 bg-primary/20" />
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
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
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
                className="card-drake p-6 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-2">{cert.title}</h4>
                <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Resume
