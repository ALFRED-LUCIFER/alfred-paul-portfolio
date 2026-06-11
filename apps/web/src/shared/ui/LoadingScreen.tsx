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
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center gap-4"
        >
          {/* Circuit-A logo, booting up with a cyan glow */}
          <motion.img
            src="/images/apex-logo-white.png"
            alt="Apex Forge"
            className="h-14 w-auto"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: [
                'drop-shadow(0 0 0px hsl(var(--accent-cyan) / 0))',
                'drop-shadow(0 0 14px hsl(var(--accent-cyan) / 0.65))',
                'drop-shadow(0 0 8px hsl(var(--accent-cyan) / 0.4))',
              ],
            }}
            transition={{ duration: 1.2, ease: 'easeOut' as const, times: [0, 0.7, 1] }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-mono text-sm text-accent-cyan"
          >
            AP://command-center
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
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
