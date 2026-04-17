import { useRef, Suspense, lazy } from 'react'
import { motion, useInView } from 'motion/react'
import { ChevronDown, Download } from 'lucide-react'
import { TypewriterText } from '../../../shared/ui/TypewriterText'
import { useCountUp } from '../../../shared/hooks/useCountUp'
import { useParallax } from '../../../shared/hooks/useParallax'
import { useMagnetic } from '../../../shared/hooks/useMagnetic'
import { ScrambleText } from './ScrambleText'

const HeroParticles = lazy(() =>
  import('./HeroParticles').then((m) => ({ default: m.HeroParticles }))
)

const ROLES = [
  'Team Leader Software & AI Development',
  'Full-Stack .NET & React Architect',
  'AI Integration Specialist',
  'Enterprise Solutions Engineer',
]

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true })

  const yearsCount = useCountUp({ target: 12, enabled: isStatsInView })
  const projectsCount = useCountUp({ target: 50, enabled: isStatsInView })

  useParallax(sectionRef, imageRef, -60)
  const magnetic = useMagnetic()

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Particle background — lazy loaded */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/5" />

      <div className="container-drake relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="text-center lg:text-left order-2 lg:order-1">
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

            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            >
              Say Hi from{' '}
              <ScrambleText text="Alfred" className="text-gradient" />,{' '}
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal mt-2 block min-h-[1.5em]">
                <TypewriterText strings={ROLES} />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              12 years building scalable enterprise apps with .NET Core, React &amp; Python.
              Boosted dev productivity by 40% through Copilot &amp; Cursor.ai. Certified Scrum Master.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <motion.a
                ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
                href="/Alfred_Paul_Resume.pdf"
                download
                style={{ x: magnetic.x, y: magnetic.y }}
                onMouseMove={magnetic.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
                onMouseLeave={magnetic.onMouseLeave}
                className="btn-drake text-base px-8 py-4 inline-flex items-center gap-2 no-underline"
              >
                <Download size={18} />
                DOWNLOAD RESUME
              </motion.a>
            </motion.div>

            {/* Stats with counter animation */}
            <div ref={statsRef}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 gap-6 sm:gap-8 max-w-md mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                    {yearsCount}+
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground leading-tight">
                    YEARS OF<br />EXPERIENCE
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                    {projectsCount}+
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground leading-tight">
                    PROJECTS COMPLETED<br />ACROSS INDUSTRIES
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Profile Image (parallax target) */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' as const } }}
              className="relative"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5 rounded-full" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
                <img
                  src="/images/alfred-paul-profile.jpg"
                  alt="Alfred Paul - Team Leader AI Engineering"
                  className="absolute inset-3 sm:inset-4 w-[calc(100%-24px)] sm:w-[calc(100%-32px)] h-[calc(100%-24px)] sm:h-[calc(100%-32px)] rounded-full object-cover shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const fb = e.currentTarget.nextElementSibling as HTMLElement
                    if (fb) fb.style.display = 'flex'
                  }}
                />
                <div className="absolute inset-3 sm:inset-4 bg-linear-to-br from-primary/20 to-primary/5 rounded-full items-center justify-center hidden">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">AP</div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-primary text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg"
              >
                AI Leader
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white text-primary border-2 border-primary px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg"
              >
                Full-Stack
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="text-primary cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={24} className="sm:w-8 sm:h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
