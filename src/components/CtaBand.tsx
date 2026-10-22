import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { CALENDLY } from '../data/content'
import { fadeUp } from '../animations/textAnimations'

/** Shared closing call-to-action band for the dedicated pages. */
export function CtaBand() {
  return (
    <section aria-label="Start a project" className="pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="relative overflow-hidden rounded-[2.5rem] bg-ink-deep px-7 py-14 text-center text-white shadow-depth md:px-12 md:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-[3rem] border border-white/10" aria-hidden="true" />
          <motion.p variants={fadeUp} custom={0} className="eyebrow relative text-sage-300">READY WHEN YOU ARE</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="relative mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">Let&apos;s build your <span className="text-accent">retention engine.</span></motion.h2>
          <motion.p variants={fadeUp} custom={2} className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">Tell us about your email program — or book a free 15-minute call and we&apos;ll map the first steps together.</motion.p>
          <motion.div variants={fadeUp} custom={3} className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">Start a project <ArrowUpRight size={16} /></Link>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-display text-sm font-semibold text-white transition hover:bg-white hover:text-ink active:scale-95">Book a 15-min call</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
