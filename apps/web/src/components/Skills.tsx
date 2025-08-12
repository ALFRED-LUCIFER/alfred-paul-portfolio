import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Brain, Code, Database, Cloud, Users, Cog } from 'lucide-react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setStartAnimation(true), 500)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  // Animation variants
  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariant = {
    initial: { opacity: 0, y: 40 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  // Skills Data
  const skillCategories = [
    {
      category: "AI & Development Tools",
      icon: Brain,
      color: "from-blue-500 to-purple-600",
      skills: [
        { name: "GitHub Copilot", level: 95, description: "AI-powered code completion and generation" },
        { name: "Cursor.ai", level: 90, description: "AI-enhanced code editing and refactoring" },
        { name: "OpenAI APIs", level: 85, description: "Integration of AI language models" },
        { name: "Machine Learning", level: 80, description: "Model training and deployment" }
      ]
    },
    {
      category: "Backend Development",
      icon: Database,
      color: "from-green-500 to-teal-600", 
      skills: [
        { name: ".NET Core", level: 95, description: "Enterprise application development" },
        { name: "Python", level: 90, description: "Data processing and web services" },
        { name: "SQL Server", level: 92, description: "Database design and optimization" },
        { name: "RESTful APIs", level: 93, description: "Scalable web service architecture" }
      ]
    },
    {
      category: "Frontend Development",
      icon: Code,
      color: "from-orange-500 to-red-600",
      skills: [
        { name: "React", level: 90, description: "Modern component-based UI development" },
        { name: "TypeScript", level: 88, description: "Type-safe JavaScript development" },
        { name: "Next.js", level: 85, description: "Full-stack React framework" },
        { name: "Tailwind CSS", level: 87, description: "Utility-first CSS framework" }
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      color: "from-purple-500 to-pink-600",
      skills: [
        { name: "Azure", level: 88, description: "Cloud infrastructure and services" },
        { name: "Docker", level: 85, description: "Containerization and deployment" },
        { name: "CI/CD Pipelines", level: 90, description: "Automated testing and deployment" },
        { name: "Kubernetes", level: 80, description: "Container orchestration" }
      ]
    },
    {
      category: "Leadership & Management",
      icon: Users,
      color: "from-indigo-500 to-blue-600",
      skills: [
        { name: "Team Leadership", level: 95, description: "Managing distributed development teams" },
        { name: "Agile Methodologies", level: 92, description: "Scrum and Kanban implementation" },
        { name: "Code Review", level: 90, description: "Quality assurance and mentoring" },
        { name: "Project Management", level: 88, description: "Strategic planning and delivery" }
      ]
    },
    {
      category: "System Architecture",
      icon: Cog,
      color: "from-teal-500 to-green-600",
      skills: [
        { name: "Microservices", level: 87, description: "Distributed system design" },
        { name: "System Integration", level: 92, description: "Legacy system modernization" },
        { name: "Performance Optimization", level: 89, description: "Scalability and efficiency" },
        { name: "Security Best Practices", level: 85, description: "Application and data security" }
      ]
    }
  ]

  // Progress bar component
  const ProgressBar = ({ skill, delay = 0 }: { skill: { name: string; level: number; description: string }; delay?: number }) => {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-sm">{skill.name}</span>
          <span className="text-primary font-bold text-sm">{skill.level}%</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{skill.description}</p>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
            initial={{ width: 0 }}
            animate={startAnimation ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: delay * 0.1,
              ease: "easeOut"
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden" ref={ref}>
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
              MY EXPERTISE
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Technical{' '}
            <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive expertise across AI integration, full-stack development, and team leadership
          </p>
        </motion.div>

        {/* Skills Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Core Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">11+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">6</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Skill Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Average Proficiency</div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                variants={cardVariant}
                className="card-drake p-8 group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 bg-gradient-to-br ${category.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {category.category}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.skills.length} core competencies
                      </p>
                    </div>
                  </div>

                  {/* Skills Progress Bars */}
                  <div>
                    {category.skills.map((skill, skillIndex) => (
                      <ProgressBar 
                        key={skillIndex} 
                        skill={skill} 
                        delay={index * 2 + skillIndex} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Additional{' '}
            <span className="text-gradient">Competencies</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Enterprise Architecture", "Code Quality Assurance", "Performance Monitoring",
              "Automated Testing", "Technical Documentation", "Cross-platform Development",
              "Database Administration", "Security Implementation", "API Design",
              "Mobile Development", "Version Control", "Deployment Strategies"
            ].map((competency, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-all duration-200 cursor-default"
              >
                {competency}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
