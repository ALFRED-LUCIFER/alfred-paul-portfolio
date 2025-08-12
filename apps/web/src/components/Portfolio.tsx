import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, Eye, Filter, Star } from 'lucide-react'

const Portfolio = () => {
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

  // Filter state
  const [activeFilter, setActiveFilter] = useState('All')

  // Portfolio Projects Data (from portfolio-data.md)
  const portfolioProjects = [
    {
      id: 1,
      title: "Enterprise RAG Chatbot with Quin",
      description: "Built an AI-powered chatbot using Retrieval-Augmented Generation pipelines for internal documentation queries with semantic search capabilities.",
      image: "/assets/projects/rag-chatbot.jpg",
      category: "AI Development",
      technologies: ["Python", "LangChain", "RAG", "Quin", "OpenAI"],
      liveUrl: null, // Internal tool
      githubUrl: null, // Private
      features: [
        "Semantic search across technical manuals",
        "Context-aware responses", 
        "Document-level indexing",
        "Multi-language support"
      ],
      featured: true
    },
    {
      id: 2,
      title: "Industrial Automation Platform", 
      description: "Modernized legacy monolithic industrial automation system into microservices architecture with React frontend and .NET Core APIs.",
      image: "/assets/projects/automation-platform.jpg",
      category: "Full-Stack Development",
      technologies: [".NET Core", "React", "Azure", "SQL Server", "Docker"],
      liveUrl: null, // Enterprise
      githubUrl: null, // Private
      features: [
        "Real-time machine data processing",
        "Modular microservices architecture",
        "Azure cloud deployment",
        "30% faster deployment cycles"
      ],
      featured: true
    },
    {
      id: 3,
      title: "AI-Assisted Development Toolkit",
      description: "Created internal tools integrating GitHub Copilot and Cursor.ai workflows to accelerate development with automated code generation and testing.",
      image: "/assets/projects/ai-toolkit.jpg", 
      category: "Developer Tools",
      technologies: ["GitHub Copilot", "Cursor.ai", "VS Code", "Python", "TypeScript"],
      liveUrl: null,
      githubUrl: null,
      features: [
        "40% improvement in code generation",
        "Automated documentation drafts",
        "Inline code suggestions",
        "Reduced testing cycles"
      ],
      featured: true
    },
    {
      id: 4,
      title: "Cloud Migration & DevOps Pipeline",
      description: "Led migration of enterprise applications to Azure with comprehensive CI/CD pipelines, reducing deployment time and improving system reliability.", 
      image: "/assets/projects/devops-pipeline.jpg",
      category: "Cloud & DevOps",
      technologies: ["Azure", "GitHub Actions", "Docker", "Kubernetes", "Terraform"],
      liveUrl: null,
      githubUrl: null,
      features: [
        "Automated deployment pipelines",
        "Infrastructure as Code",
        "Zero-downtime deployments", 
        "Comprehensive monitoring"
      ],
      featured: false
    },
    {
      id: 5,
      title: "Team Collaboration Platform",
      description: "Built internal platform for distributed team collaboration with real-time communication, project tracking, and code review workflows.",
      image: "/assets/projects/collaboration-platform.jpg",
      category: "Team Management",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Docker"],
      liveUrl: null,
      githubUrl: null,
      features: [
        "Real-time team communication",
        "Integrated code review",
        "Project tracking dashboard",
        "Multi-timezone support"
      ],
      featured: false
    }
  ]

  // Get unique categories
  const categories = ['All', ...new Set(portfolioProjects.map(project => project.category))]

  // Filter projects
  const filteredProjects = activeFilter === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter)

  // Project Card Component
  const ProjectCard = ({ project }: { project: typeof portfolioProjects[0] }) => {
    return (
      <motion.div
        variants={cardVariant}
        className="group card-drake overflow-hidden hover:shadow-2xl transition-all duration-500 relative"
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10 bg-primary text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}

        {/* Project Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-muted to-muted/50 h-48 sm:h-56 md:h-64">
          {/* Placeholder for project image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-6xl font-bold text-primary/30">
              {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </div>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {project.liveUrl && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-primary text-black rounded-full shadow-lg hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.button>
            )}
            {project.githubUrl && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-background text-foreground rounded-full shadow-lg hover:bg-primary/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-background/90 text-foreground rounded-full shadow-lg hover:bg-primary/10 transition-colors"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Category */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {project.category}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <ul className="space-y-1">
              {project.features.slice(0, 2).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
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
              MY PORTFOLIO
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Featured{' '}
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of AI-integrated development, enterprise solutions, and innovative technical leadership
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === category
                  ? 'bg-primary text-black shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Filter className="w-4 h-4" />
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          key={activeFilter} // Re-animate on filter change
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* Portfolio Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="card-drake p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Project{' '}
              <span className="text-gradient">Impact</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Total Projects
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">40%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Efficiency Gain
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Team Members Led
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Interested in My Work?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help bring your next project to life with AI-integrated solutions
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-drake text-lg px-8 py-4 relative group"
          >
            View All Projects
            <div className="absolute inset-0 bg-primary rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
