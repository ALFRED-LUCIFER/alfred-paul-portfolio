import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Home,
  Fingerprint,
  Boxes,
  DraftingCompass,
  Workflow,
  Users,
  Code,
  BookOpen,
  Award,
  Radio,
  MessageSquare,
  Phone,
  Linkedin,
  Download,
  X,
  Search,
  type LucideIcon,
} from 'lucide-react'

interface Command {
  id: string
  label: string
  icon: LucideIcon
  action: () => void
  shortcut?: string
}

const go = (id: string, close: () => void) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  close()
}

const makeCommands = (close: () => void): Command[] => [
  { id: 'home', label: 'Go to Home', icon: Home, action: go('home', close) },
  { id: 'identity', label: 'Go to Identity', icon: Fingerprint, action: go('identity', close) },
  { id: 'systems', label: 'Go to AI Systems', icon: Boxes, action: go('systems', close) },
  { id: 'architecture', label: 'Go to Architecture', icon: DraftingCompass, action: go('architecture', close) },
  { id: 'sdlc', label: 'Go to Agentic SDLC', icon: Workflow, action: go('sdlc', close) },
  { id: 'leadership', label: 'Go to Leadership', icon: Users, action: go('leadership', close) },
  { id: 'skills', label: 'Go to Skills', icon: Code, action: go('skills', close) },
  { id: 'case-studies', label: 'Go to Case Studies', icon: BookOpen, action: go('case-studies', close) },
  { id: 'certifications', label: 'Go to Certifications', icon: Award, action: go('certifications', close) },
  { id: 'signals', label: 'Go to Signals', icon: Radio, action: go('signals', close) },
  { id: 'testimonials', label: 'Go to Testimonials', icon: MessageSquare, action: go('testimonials', close) },
  { id: 'contact', label: 'Get in Touch', icon: Phone, action: go('contact', close) },
  {
    id: 'download',
    label: 'Download Resume',
    icon: Download,
    action: () => {
      const a = document.createElement('a')
      a.href = '/Alfred_Paul_Resume.pdf'
      a.download = ''
      a.click()
      close()
    },
    shortcut: '⌘R',
  },
  {
    id: 'linkedin',
    label: 'Open LinkedIn',
    icon: Linkedin,
    action: () => {
      window.open('https://www.linkedin.com/in/alfred-paul-56438454', '_blank')
      close()
    },
  },
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
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        filtered[selected]?.action()
      }
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
            className="glass-panel glow-border-cyan fixed top-[20%] left-1/2 z-[151] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Search size={18} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelected(0)
                }}
                placeholder="Search commands..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={onClose}
                aria-label="Close command palette"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Commands list */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No commands found
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelected(idx)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                        idx === selected
                          ? 'bg-accent-cyan/10 text-accent-cyan'
                          : 'text-foreground hover:bg-panel'
                      }`}
                    >
                      <Icon
                        size={16}
                        className={idx === selected ? 'text-accent-cyan' : 'text-muted-foreground'}
                      />
                      <span className="flex-1">{cmd.label}</span>
                      {cmd.shortcut && (
                        <span className="rounded bg-panel px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                          {cmd.shortcut}
                        </span>
                      )}
                    </button>
                  )
                })
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2 font-mono text-xs text-muted-foreground">
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
