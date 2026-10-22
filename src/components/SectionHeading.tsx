import { motion } from 'framer-motion'
import { fadeUp } from '../animations/textAnimations'
export function SectionHeading({ index, label, title, dark = false }: { index: string; label: string; title: React.ReactNode; dark?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mb-12 md:mb-16">
      <motion.p variants={fadeUp} custom={0} className={`eyebrow mb-4 ${dark ? 'text-sage-100' : 'text-accent'}`}>{index} / {label}</motion.p>
      <motion.h2 variants={fadeUp} custom={1} className={`font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>{title}</motion.h2>
    </motion.div>
  )
}
