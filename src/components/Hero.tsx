import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Star } from 'lucide-react'
import { CALENDLY } from '../data/content'
import { HeroScene } from './HeroScene'
import { useMagnetic } from '../hooks/useMagnetic'
import { heroContainer } from '../animations/heroAnimations'
import { fadeUp } from '../animations/textAnimations'
const LINES = ['Increase', 'sales,', 'not your', 'workload.']
export function Hero() {
  const mag = useMagnetic<HTMLAnchorElement>(0.3)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 80); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32" aria-label="Introduction">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,64,27,.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(122,149,126,.25),transparent_60%)]" />
      <div className="relative z-0 mx-auto h-[340px] w-full max-w-6xl md:h-[430px]"><HeroScene /></div>
      <motion.div variants={heroContainer} initial="hidden" animate="show" className="relative z-10 mx-auto -mt-16 w-full max-w-7xl px-5 pb-20 text-center md:-mt-24 md:px-8">
        <motion.p variants={fadeUp} custom={0} className="eyebrow mb-5 text-accent">ALL ABOUT EMAIL — RETENTION. AUTOMATED. DELIVERED.</motion.p>
        <h1 className="font-display text-[13vw] font-extrabold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-8xl">
          {LINES.map((line, i) => (<span key={line} className="block overflow-hidden"><motion.span variants={fadeUp} custom={i + 1} className={`block ${i === 1 ? 'text-accent' : ''}`}>{line}</motion.span></span>))}
        </h1>
        <motion.p variants={fadeUp} custom={5} className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">We build the email marketing engine behind your revenue — campaigns, automated flows, and list growth that turn subscribers into repeat buyers.</motion.p>
        <motion.div variants={fadeUp} custom={6} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave} href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary transition-transform">Let's Talk <ArrowUpRight size={17} /></a>
          <a href="#services" className="btn-ghost">Explore Services</a>
        </motion.div>
        <motion.p variants={fadeUp} custom={7} className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-ink/70">
          <span className="flex text-accent" aria-hidden="true">{[0,1,2,3,4].map(i => <Star key={i} size={15} fill="currentColor" />)}</span>
          490+ five-star reviews across Upwork, Fiverr &amp; Behance
        </motion.p>
      </motion.div>
      <motion.a href="#services" aria-label="Scroll to services" animate={{ opacity: scrolled ? 0 : 1 }} className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink/60">
        <span className="eyebrow !text-[10px]">SCROLL</span>
        <span className="block h-10 w-[2px] overflow-hidden rounded bg-ink/15"><span className="animate-scroll-line block h-full w-full bg-accent" /></span>
        <ArrowDown size={14} />
      </motion.a>
    </section>
  )
}
