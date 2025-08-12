import { motion } from 'framer-motion'
import { Code2, Users, Cog, Brain, Database, Cloud } from 'lucide-react'

const Services = () => {
  // Animation variants
  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariant = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.6 }
    }
  }

  // Services Data
  const services = [
    {
      icon: Brain,
      title: "AI-Integrated Development",
      description: "Transform your development workflow with cutting-edge AI tools and automation",
      features: [
        "AI-powered code generation and optimization",
        "Automated testing and quality assurance", 
        "Intelligent deployment pipelines",
        "Machine learning model integration"
      ],
      projects: "25+",
      highlight: "40% faster delivery",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "End-to-end application development using modern technologies and best practices",
      features: [
        "React/Next.js frontend applications",
        ".NET/Python backend services",
        "Cloud-native architecture design",
        "Database design and optimization"
      ],
      projects: "50+", 
      highlight: "Enterprise grade",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Users,
      title: "Technical Leadership",
      description: "Guide distributed teams to success with proven methodologies and strategic vision",
      features: [
        "Agile team management and mentoring",
        "Technical architecture decisions",
        "Code review and quality standards",
        "Cross-functional collaboration"
      ],
      projects: "8+",
      highlight: "Team members led",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Cog,
      title: "Legacy System Modernization", 
      description: "Breathe new life into existing systems with modern architecture and technologies",
      features: [
        "Legacy code assessment and refactoring",
        "Migration to cloud platforms",
        "API development and integration",
        "Performance optimization"
      ],
      projects: "15+",
      highlight: "Systems upgraded",
      color: "from-purple-500 to-pink-600"
    }
  ]

  // Technology Stacks
  const techStacks = [
    {
      category: "Frontend",
      icon: Code2,
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend", 
      icon: Database,
      technologies: [".NET Core", "Python", "Node.js", "SQL Server", "MongoDB"]
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      technologies: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD Pipelines"]
    },
    {
      category: "AI & Tools",
      icon: Brain,
      technologies: ["GitHub Copilot", "Cursor.ai", "OpenAI APIs", "Machine Learning", "Automation"]
    }
  ]

  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
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
              MY SERVICES
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What I{' '}
            <span className="text-gradient">Deliver</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions from AI integration to team leadership
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-20"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                variants={cardVariant}
                className="card-drake p-8 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Service Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br ${service.color} rounded-2xl shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.projects}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {service.highlight}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full flex-shrink-0`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Technology Stacks */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Technology{' '}
              <span className="text-gradient">Stack</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Modern tools and technologies I use to build exceptional solutions
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {techStacks.map((stack, index) => {
              const IconComponent = stack.icon
              return (
                <motion.div
                  key={index}
                  variants={cardVariant}
                  className="card-drake p-6 text-center group hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h4 className="font-bold text-lg mb-4">{stack.category}</h4>
                  
                  <div className="space-y-2">
                    {stack.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="card-drake p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how I can help transform your ideas into powerful, AI-integrated solutions
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-drake text-lg px-8 py-4 relative group"
              >
                Let's Work Together
                <div className="absolute inset-0 bg-primary rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
