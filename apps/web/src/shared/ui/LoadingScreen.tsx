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
          <motion.img
            src="/images/apex-logo-white.png"
            alt="Alfred Paul"
            className="w-20 h-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' as const }}
            className="h-[2px] bg-primary rounded-full"
            style={{ boxShadow: '0 0 8px rgba(40, 233, 140, 0.6)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
