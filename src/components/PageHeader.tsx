import { motion } from 'framer-motion'
import { fadeUp } from '../animations/textAnimations'

/** Consistent header for the dedicated pages (Services / Team / Contact):
 *  clears the fixed navbar and reuses the site's eyebrow + display-title rhythm. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro: string }) {
  return (
    <header className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,64,27,.08),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(122,149,126,.22),transparent_60%)]" aria-hidden="true" />
      <motion.div initial="hidden" animate="show" className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.p variants={fadeUp} custom={0} className="eyebrow mb-5 text-accent">{eyebrow}</motion.p>
        <motion.h1 variants={fadeUp} custom={1} className="max-w-4xl font-display text-5xl font-extrabold leading-[1.0] tracking-tight text-ink md:text-7xl">{title}</motion.h1>
        <motion.p variants={fadeUp} custom={2} className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">{intro}</motion.p>
      </motion.div>
    </header>
  )
}
