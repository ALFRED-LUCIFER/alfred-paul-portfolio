import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8 }
  }

  const profileImageVariant = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const countVariant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.4 }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="container-drake relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Introduce Label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-6"
            >
              <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-medium">
                INTRODUCE
              </span>
            </motion.div>

            {/* Main Heading */}
                        {/* Main Heading */}
            <motion.h1 
              {...fadeInLeft}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Say Hi from{' '}
              <span className="text-gradient">Alfred</span>,{' '}
              <br className="sm:hidden" />
              <br className="sm:hidden" />
              <span className="text-heading text-muted-foreground font-normal">
                Team Leader Software & AI Development
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 lg:px-0"
            >
              I architect and code AI-integrated enterprise applications and lead distributed teams. 
              Passionate about what I do. Just like that!
            </motion.p>

            {/* CTA Button */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <button className="btn-drake text-lg px-8 py-4 relative group">
                DOWNLOAD RESUME
                <div className="absolute inset-0 bg-primary rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              {...countVariant}
              className="grid grid-cols-2 gap-6 sm:gap-8 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                  11+
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground leading-tight">
                  YEARS OF<br />EXPERIENCE
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                  50+
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground leading-tight">
                  PROJECTS COMPLETED<br />ACROSS INDUSTRIES
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div 
              {...profileImageVariant}
              className="relative"
            >
              {/* Profile Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
                
                {/* Profile Image */}
                <img 
                  src="/images/alfred-paul-profile.jpg" 
                  alt="Alfred Paul - Team Leader AI Engineering"
                  className="absolute inset-3 sm:inset-4 w-[calc(100%-24px)] sm:w-[calc(100%-32px)] h-[calc(100%-24px)] sm:h-[calc(100%-32px)] rounded-full object-cover shadow-lg"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200', 'flex', 'items-center', 'justify-center');
                    const fallback = document.createElement('div');
                    fallback.className = 'text-4xl sm:text-5xl md:text-6xl font-bold text-muted-foreground';
                    fallback.textContent = 'AP';
                    e.currentTarget.parentElement?.appendChild(fallback);
                  }}
                />
                
                {/* Fallback container - hidden when image loads */}
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-muted-foreground">
                    AP
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0] 
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-primary text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg"
              >
                AI Leader
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5 
                }}
                className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white text-primary border-2 border-primary px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg"
              >
                Full-Stack
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="text-primary cursor-pointer"
        >
          <ChevronDown size={24} className="sm:w-8 sm:h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
