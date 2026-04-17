import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Terminal } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const LINES = [
  { delay: 0,    text: '> Initializing developer mode...',          color: 'text-primary' },
  { delay: 300,  text: '> Loading Alfred Paul\'s secret stats...',   color: 'text-muted-foreground' },
  { delay: 700,  text: '> Coffee consumed today: ∞',                color: 'text-yellow-400' },
  { delay: 1100, text: '> Bugs squashed this week: 42',              color: 'text-green-400' },
  { delay: 1500, text: '> AI models fine-tuned: Qwen, RAG pipeline', color: 'text-blue-400' },
  { delay: 1900, text: '> Stack: .NET 9 · React 19 · Python · Azure',color: 'text-muted-foreground' },
  { delay: 2300, text: '> Cursor.ai sessions: daily driver 🚀',      color: 'text-primary' },
  { delay: 2700, text: '> Dev productivity boost via AI: +40%',      color: 'text-green-400' },
  { delay: 3100, text: '> Release cycles reduced: -60%',             color: 'text-green-400' },
  { delay: 3500, text: '> Fun fact: This site has a Konami code 😄', color: 'text-yellow-400' },
  { delay: 3900, text: '> Status: OPEN TO WORK ✓',                   color: 'text-primary' },
  { delay: 4200, text: '> alfred.v.paul@gmail.com',                  color: 'text-muted-foreground' },
  { delay: 4500, text: '█',                                          color: 'text-primary animate-pulse' },
]

export function DeveloperMode({ isOpen, onClose }: Props) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!isOpen) { setVisibleLines(0); return }

    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-xl"
          >
            <div className="bg-[#0d1117] border border-primary/30 rounded-xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(40, 233, 140, 0.2)' }}>

              {/* Terminal title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <Terminal size={14} className="text-primary" />
                    <span className="text-xs text-muted-foreground font-mono">alfred@portfolio ~ developer-mode</span>
                  </div>
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-sm space-y-1.5 min-h-[280px]">
                <div className="text-primary/60 text-xs mb-3">// ↑↑↓↓←→←→BA — you found the easter egg!</div>
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${line.color} leading-relaxed`}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-primary/20 bg-[#161b22] flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-mono">ESC or click outside to close</span>
                <span className="text-xs text-primary font-mono">developer_mode_v2.0</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
