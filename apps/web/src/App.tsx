import './App.css'

import { Navigation, Footer } from './features/navigation'
import { Hero } from './features/hero'
import { About } from './features/about'
import { Resume } from './features/resume'
import { Services } from './features/services'
import { Skills } from './features/skills'
import { Portfolio } from './features/portfolio'
import { Testimonials } from './features/testimonials'
import { Contact } from './features/contact'
import { Insights } from './features/insights'
import { LeadershipPhilosophy } from './features/leadership'
import { AIRoadmap } from './features/roadmap'
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

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main>
          <section id="home" className="section-padding">
            <Hero />
          </section>

          <section id="about" className="section-padding bg-muted/20">
            <About />
          </section>

          <section id="resume" className="section-padding">
            <Resume />
          </section>

          <section id="services" className="section-padding bg-muted/20">
            <Services />
          </section>

          <section id="skills" className="section-padding">
            <Skills />
          </section>

          <section id="portfolio" className="section-padding bg-muted/20">
            <Portfolio />
          </section>

          <section id="leadership" className="section-padding">
            <LeadershipPhilosophy />
          </section>

          <section id="ai-roadmap" className="section-padding">
            <AIRoadmap />
          </section>

          <section id="insights" className="section-padding bg-muted/20">
            <Insights />
          </section>

          <section id="testimonials" className="section-padding">
            <Testimonials />
          </section>

          <section id="contact" className="section-padding bg-muted/20">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
