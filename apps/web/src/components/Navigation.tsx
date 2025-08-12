import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Home, User, FileText, Briefcase, Code, FolderOpen, MessageSquare, Phone } from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Resume', href: '#resume', icon: FileText },
    { name: 'Services', href: '#services', icon: Briefcase },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Portfolio', href: '#portfolio', icon: FolderOpen },
    { name: 'Testimonials', href: '#testimonials', icon: MessageSquare },
    { name: 'Contact', href: '#contact', icon: Phone },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container-drake">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">AP</span>
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-bold">Alfred Paul</div>
              <div className="text-xs text-muted-foreground">Team Leader AI Engineering</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </motion.button>
            ))}
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
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-t border-border"
      >
        <div className="container-drake py-4">
          <div className="grid grid-cols-2 gap-4">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <Icon size={18} className="text-primary" />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navigation
