import './App.css'

// Components
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import Services from './components/Services'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section id="home" className="section-padding">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" className="section-padding bg-muted/20">
          <About />
        </section>

        {/* Resume Section */}
        <section id="resume" className="section-padding">
          <Resume />
        </section>

        {/* Services Section */}
        <section id="services" className="section-padding bg-muted/20">
          <Services />
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-padding">
          <Skills />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="section-padding bg-muted/20">
          <Portfolio />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section-padding">
          <Testimonials />
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding bg-muted/20">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
