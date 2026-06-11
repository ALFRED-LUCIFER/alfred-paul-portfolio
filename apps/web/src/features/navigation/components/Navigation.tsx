import { useState } from 'react'
import { motion } from 'motion/react'
import { Menu, X, Linkedin, Command } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useCommandPalette } from '../../../shared/hooks/useCommandPalette'
import { StatusBadge } from '../../../shared/ui/StatusBadge'
import { cn } from '../../../shared/lib/cn'

const NAV_LINKS = [
  { href: '#systems', label: 'Systems' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#sdlc', label: 'SDLC' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  const { open: openCommandPalette } = useCommandPalette()

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 px-3"
    >
      <nav
        aria-label="Main"
        className="glass-panel mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-lg px-4 py-2.5 sm:px-6"
      >
        <a href="#home" className="font-mono text-sm font-bold tracking-tight">
          AP<span className="text-accent-cyan">://</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  activeSection === link.href.slice(1)
                    ? 'text-accent-cyan'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/alfred-paul-56438454"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden text-muted-foreground transition-colors hover:text-accent-cyan sm:block"
          >
            <Linkedin className="size-4" />
          </a>
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden items-center gap-1.5 rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent-cyan/50 hover:text-foreground sm:inline-flex"
            aria-label="Open command palette"
          >
            <Command className="size-3" />K
          </button>
          <StatusBadge status="online" className="hidden sm:inline-flex" />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.25 }}
        className="mx-auto mt-2 max-w-5xl overflow-hidden md:hidden"
      >
        <div className="glass-panel rounded-lg p-3">
          <ul className="grid grid-cols-2 gap-1">
            {[{ href: '#home', label: 'Home' }, ...NAV_LINKS].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm transition-colors',
                    activeSection === link.href.slice(1)
                      ? 'bg-accent-cyan/10 text-accent-cyan'
                      : 'text-muted-foreground hover:bg-panel hover:text-foreground'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Navigation
