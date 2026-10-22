import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp } from '../animations/textAnimations'
import { Seo } from '../components/Seo'

/** Branded 404 for any unmatched route. */
export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found | INTEFIG" description="The page you’re looking for doesn’t exist. Head back to the INTEFIG homepage." path="/404" noindex />
    <section className="relative overflow-hidden pb-28 pt-40 md:pt-48" aria-label="Page not found">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,64,27,.08),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(122,149,126,.22),transparent_60%)]" aria-hidden="true" />
      <motion.div initial="hidden" animate="show" className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <motion.p variants={fadeUp} custom={0} className="eyebrow text-accent">404 — PAGE NOT FOUND</motion.p>
        <motion.h1 variants={fadeUp} custom={1} className="mt-5 font-display text-6xl font-extrabold leading-none tracking-tight text-ink md:text-8xl">This inbox<br />is <span className="text-accent">empty.</span></motion.h1>
        <motion.p variants={fadeUp} custom={2} className="mx-auto mt-6 max-w-md leading-relaxed text-ink/70">The page you&apos;re looking for doesn&apos;t exist — but your next repeat customer could. Head back home or tell us what you need.</motion.p>
        <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary">Back to home <ArrowUpRight size={16} /></Link>
          <Link to="/contact" className="btn-ghost">Contact us</Link>
        </motion.div>
      </motion.div>
    </section>
    </>
  )
}
