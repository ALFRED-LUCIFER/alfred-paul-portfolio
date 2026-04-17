import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Home, User, FileText, Briefcase, Code, FolderOpen,
  MessageSquare, Phone, Linkedin, Download, X, Search,
} from 'lucide-react'

interface Command {
  id: string
  label: string
  icon: React.ElementType
  action: () => void
  shortcut?: string
}

const makeCommands = (close: () => void): Command[] => [
  { id: 'home', label: 'Go to Home', icon: Home, action: () => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'about', label: 'Go to About', icon: User, action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'resume', label: 'Go to Resume', icon: FileText, action: () => { document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'services', label: 'Go to Services', icon: Briefcase, action: () => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'skills', label: 'Go to Skills', icon: Code, action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'portfolio', label: 'Go to Portfolio', icon: FolderOpen, action: () => { document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'testimonials', label: 'Go to Testimonials', icon: MessageSquare, action: () => { document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'contact', label: 'Get in Touch', icon: Phone, action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); close() } },
  { id: 'download', label: 'Download Resume', icon: Download, action: () => { const a = document.createElement('a'); a.href = '/Alfred_Paul_Resume.pdf'; a.download = ''; a.click(); close() }, shortcut: '⌘R' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: Linkedin, action: () => { window.open('https://www.linkedin.com/in/alfred-paul-56438454', '_blank'); close() } },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = makeCommands(onClose)
  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
      if (e.key === 'Enter') { e.preventDefault(); filtered[selected]?.action() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, filtered, selected])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[151] w-full max-w-lg glass-effect rounded-xl border border-primary/30 shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(40, 233, 140, 0.15)' }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Search size={18} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
                placeholder="Search commands..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              />
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Commands list */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground text-sm">No commands found</div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelected(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors text-sm ${
                        idx === selected ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon size={16} className={idx === selected ? 'text-primary' : 'text-muted-foreground'} />
                      <span className="flex-1">{cmd.label}</span>
                      {cmd.shortcut && (
                        <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                          {cmd.shortcut}
                        </span>
                      )}
                    </button>
                  )
                })
              )}
            </div>

            <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>Esc close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
