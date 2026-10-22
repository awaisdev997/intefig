import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export function Loader() {
  const [done, setDone] = useState(false)
  useEffect(() => { const t = setTimeout(() => setDone(true), 1450); return () => clearTimeout(t) }, [])
  return (
    <AnimatePresence>{!done && (
      <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-deep" exit={{ opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.45 }} role="status" aria-label="Loading INTEFIG">
        <div className="flex overflow-hidden">{'INTEFIG'.split('').map((ch, i) => (
          <motion.span key={i} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white">{ch}</motion.span>))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="eyebrow mt-4 text-sage-300">ALL ABOUT EMAIL</motion.p>
        <motion.div className="mt-8 h-[2px] w-44 origin-left bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
      </motion.div>)}
    </AnimatePresence>
  )
}
