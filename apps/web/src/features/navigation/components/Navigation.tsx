import { useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import {
  Menu, X, Home, User, FileText, Briefcase,
  Code, FolderOpen, MessageSquare, Phone, Linkedin, Command, BookOpen, Award,
} from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useCommandPalette } from '../../../shared/hooks/useCommandPalette'
import { ThemeToggle } from '../../../shared/ui/ThemeToggle'
import { useTheme } from '../../../shared/context/ThemeContext'

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Resume', href: '#resume', icon: FileText },
  { name: 'Services', href: '#services', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Portfolio', href: '#portfolio', icon: FolderOpen },
  { name: 'Leadership', href: '#leadership', icon: Award },
  { name: 'Insights', href: '#insights', icon: BookOpen },
  { name: 'Testimonials', href: '#testimonials', icon: MessageSquare },
  { name: 'Contact', href: '#contact', icon: Phone },
]

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  const { open: openCommandPalette } = useCommandPalette()
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/images/apex-logo-white.png' : '/images/apex-logo-dark.png'
  const { scrollY } = useScroll()

  const navBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(42,47,58,0.6)', 'rgba(42,47,58,0.97)']
  )
  const navHeight = useTransform(scrollY, [0, 80], [80, 64])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ backgroundColor: navBg, height: navHeight }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      {/* Dynamic border */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border"
      />

      <div className="container-drake h-full">
        <div className="flex items-center justify-between h-full">

          {/* Logo + Open to Work */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-linear-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center p-1.5">
              <img
                src={logoSrc}
                alt="Apex Forge"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden md:block">
              <div className="text-base font-bold leading-tight">Alfred Paul</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Team Leader · AI Engineering</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1)
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </motion.button>
              )
            })}

            <motion.a
              href="https://www.linkedin.com/in/alfred-paul-56438454"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </motion.a>

            <ThemeToggle />

            {/* ⌘K Command Palette trigger */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 1) * 0.05 }}
              onClick={openCommandPalette}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors text-xs font-mono"
              title="Open command palette"
            >
              <Command size={12} />
              <span>K</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-background/97 backdrop-blur-lg border-t border-border"
      >
        <div className="container-drake py-4">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.slice(1)
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-primary' : 'text-primary'} />
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.button>
              )
            })}

            <motion.a
              href="https://www.linkedin.com/in/alfred-paul-56438454"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
              transition={{ delay: navItems.length * 0.04 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
            >
              <Linkedin size={16} className="text-primary" />
              <span className="text-sm font-medium">LinkedIn</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navigation
