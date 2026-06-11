import { Navigation, Footer } from './features/navigation'
import { Hero } from './features/hero'
import { Identity } from './features/identity'
import { Systems } from './features/systems'
import { ArchitectureLayers } from './features/architecture'
import { AgenticSdlc } from './features/sdlc'
import { Leadership } from './features/leadership'
import { Skills } from './features/skills'
import { CaseStudies } from './features/case-studies'
import { Certifications } from './features/certifications'
import { Signals } from './features/signals'
import { Testimonials } from './features/testimonials'
import { Contact } from './features/contact'
import { GridBackdrop } from './shared/ui/GridBackdrop'
import { ScrollProgressBar } from './shared/ui/ScrollProgressBar'
import { BackToTop } from './shared/ui/BackToTop'
import { LoadingScreen } from './shared/ui/LoadingScreen'
import { CustomCursor } from './shared/ui/CustomCursor'
import { CommandPalette } from './shared/ui/CommandPalette'
import { DeveloperMode } from './shared/ui/DeveloperMode'
import { useCommandPalette } from './shared/hooks/useCommandPalette'
import { useKonamiCode } from './shared/hooks/useKonamiCode'

function App() {
  const { isOpen, close } = useCommandPalette()
  const { activated: devMode, dismiss: closeDev } = useKonamiCode()

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <ScrollProgressBar />
      <BackToTop />
      <CommandPalette isOpen={isOpen} onClose={close} />
      <DeveloperMode isOpen={devMode} onClose={closeDev} />

      <div className="relative min-h-screen bg-background text-foreground">
        <GridBackdrop />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent-cyan focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Navigation />

        <main className="relative z-10">
          <section id="home" aria-label="Introduction">
            <Hero />
          </section>
          <section id="identity" className="section-padding" aria-label="Identity">
            <Identity />
          </section>
          <section
            id="systems"
            className="section-padding bg-surface/60"
            aria-label="Featured AI systems"
          >
            <Systems />
          </section>
          <section id="architecture" className="section-padding" aria-label="Architecture thinking">
            <ArchitectureLayers />
          </section>
          <section id="sdlc" className="section-padding bg-surface/60" aria-label="Agentic SDLC">
            <AgenticSdlc />
          </section>
          <section id="leadership" className="section-padding" aria-label="Engineering leadership">
            <Leadership />
          </section>
          <section id="skills" className="section-padding bg-surface/60" aria-label="Skills">
            <Skills />
          </section>
          <section id="case-studies" className="section-padding" aria-label="Case studies">
            <CaseStudies />
          </section>
          <section
            id="certifications"
            className="section-padding bg-surface/60"
            aria-label="Certifications"
          >
            <Certifications />
          </section>
          <section id="signals" className="section-padding" aria-label="Writing and posts">
            <Signals />
          </section>
          <section
            id="testimonials"
            className="section-padding bg-surface/60"
            aria-label="Testimonials"
          >
            <Testimonials />
          </section>
          <section id="contact" className="section-padding" aria-label="Contact">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
