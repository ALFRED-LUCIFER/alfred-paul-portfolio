import { motion } from 'framer-motion'
import { Code2, Lightbulb, Users, Rocket, Award, Target, Download } from 'lucide-react'

const About = () => {
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
        staggerChildren: 0.2
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

  const highlights = [
    {
      icon: Code2,
      title: "AI-Integrated Development",
      description: "Leading the integration of AI tools and technologies into enterprise applications, boosting productivity by 40%"
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Successfully managing distributed teams of 8+ developers across multiple time zones and complex projects"
    },
    {
      icon: Lightbulb,
      title: "Innovation Catalyst",
      description: "Driving digital transformation initiatives and modernizing legacy systems with cutting-edge technologies"
    },
    {
      icon: Rocket,
      title: "Enterprise Solutions",
      description: "Architecting scalable solutions for manufacturing, logistics, and enterprise resource planning systems"
    },
    {
      icon: Award,
      title: "Technical Excellence",
      description: "11+ years of proven expertise in .NET, Python, React, and cloud technologies with measurable results"
    },
    {
      icon: Target,
      title: "Strategic Vision",
      description: "Aligning technical implementations with business objectives to deliver high-impact software solutions"
    }
  ]

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
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
              ABOUT ME
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Passionate About{' '}
            <span className="text-gradient">Innovation</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming ideas into reality through AI-integrated development and technical leadership
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left Column - Story */}
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  My Professional Journey
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over <strong className="text-primary">11 years of experience</strong> in software development, 
                    I've evolved from a passionate developer to a strategic leader who bridges the gap between 
                    cutting-edge technology and business success.
                  </p>
                  <p>
                    At <strong className="text-foreground">LiSEC Group</strong>, I've spearheaded the integration of AI tools 
                    into our development workflows, resulting in <strong className="text-primary">40% productivity gains </strong> 
                    and more reliable software delivery across our global teams.
                  </p>
                  <p>
                    My approach combines technical excellence with strategic thinking - I don't just write code, 
                    I architect solutions that solve real-world problems and drive business growth. From modernizing 
                    legacy ERP systems to implementing cloud-native architectures, I'm passionate about leveraging 
                    technology to create measurable impact.
                  </p>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">8+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">Team Members Led</div>
                </div>
              </div>

              {/* Download Resume Button */}
              <div className="pt-6">
                <motion.a
                  href="/assets/Alfred-Paul-Resume.pdf"
                  download="Alfred-Paul-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-black font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Professional Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Professional Image Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl -rotate-3" />
                
                {/* Main Image Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                  {/* Professional Image */}
                  <img 
                    src="/images/alfred-paul-about.jpg" 
                    alt="Alfred Paul - Professional Photo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200';
                      fallback.innerHTML = '<div class="text-6xl font-bold text-muted-foreground">AP</div>';
                      e.currentTarget.parentElement?.appendChild(fallback);
                    }}
                  />
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Floating Achievement Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-4 -right-4 bg-white border border-border rounded-lg px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">11+ Years</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-primary text-black rounded-lg px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  <span className="text-sm font-medium ">AI Leader</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon
            return (
              <motion.div
                key={index}
                variants={cardVariant}
                className="card-drake p-6 group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{highlight.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default About
