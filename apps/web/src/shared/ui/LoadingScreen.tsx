import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center gap-3"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-sm text-accent-cyan"
          >
            AP://command-center
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-mono text-xs text-muted-foreground"
          >
            initializing systems…
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' as const }}
            className="h-[2px] rounded-full bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet"
            style={{ boxShadow: '0 0 8px hsl(var(--accent-cyan) / 0.6)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
