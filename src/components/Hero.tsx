import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Star, Users } from 'lucide-react'
import { CALENDLY } from '../data/content'
import { DitheredLogoHero } from './DitheredLogoHero'
import { useMagnetic } from '../hooks/useMagnetic'
import { heroContainer } from '../animations/heroAnimations'
import { fadeUp } from '../animations/textAnimations'
const LINES = ['Increase', 'sales,', 'not your', 'workload.']
const HERO_PILLS = ['EMAIL', 'AUTOMATION', 'DATA', 'CUSTOMERS', 'REVENUE']
export function Hero() {
  const mag = useMagnetic<HTMLAnchorElement>(0.3)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 80); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32" aria-label="Introduction">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,64,27,.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(122,149,126,.25),transparent_60%)]" />
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" aria-hidden="true" />
      <div className="relative z-0 mx-auto flex h-[300px] w-full max-w-6xl flex-col items-center justify-center px-5 md:h-[360px]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(211,224,201,.9),transparent_65%)] blur-2xl md:h-[320px] md:w-[560px]" aria-hidden="true" />
        {/* The original INTEFIG logo as an interactive dithered-particle field
            (static ink logo under reduced motion / no canvas — see DitheredLogoHero). */}
        <DitheredLogoHero className="relative w-[min(620px,88vw)] aspect-[813/251]" />
        {/* Decorative glass stat chips flanking the logo (real stats repeat in the strip below). */}
        <div className="animate-float-soft pointer-events-none absolute left-[3%] top-[32%] hidden items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-card ring-1 ring-ink/5 backdrop-blur lg:flex xl:left-[6%]" aria-hidden="true">
          <span className="rounded-full bg-sage-100 p-2 text-accent"><Star size={16} fill="currentColor" /></span>
          <span><span className="block font-display text-lg font-bold leading-none text-ink">490+</span><span className="mt-1 block text-xs text-ink/60">Five-star reviews</span></span>
        </div>
        <div className="animate-float-soft pointer-events-none absolute right-[3%] top-[24%] hidden items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-card ring-1 ring-ink/5 backdrop-blur lg:flex xl:right-[6%]" style={{ animationDelay: '1.4s' }} aria-hidden="true">
          <span className="rounded-full bg-sage-100 p-2 text-sage-700"><Users size={16} /></span>
          <span><span className="block font-display text-lg font-bold leading-none text-ink">200+</span><span className="mt-1 block text-xs text-ink/60">Brands served</span></span>
        </div>
        <ul className="relative mt-2 flex flex-wrap items-center justify-center gap-2" aria-hidden="true">
          {HERO_PILLS.map((w, i) => (
            <li
              key={w}
              className={`animate-float-soft rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${w === 'REVENUE' ? 'border-accent bg-accent text-white' : 'border-sage-700/25 bg-white/60 text-ink/70'}`}
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              {w}
            </li>
          ))}
        </ul>
      </div>
      <motion.div variants={heroContainer} initial="hidden" animate="show" className="relative z-10 mx-auto -mt-4 w-full max-w-7xl px-5 pb-20 text-center md:-mt-6 md:px-8">
        <motion.p variants={fadeUp} custom={0} className="eyebrow mb-5 text-accent">ALL ABOUT EMAIL — RETENTION. AUTOMATED. DELIVERED.</motion.p>
        <h1 className="font-display text-[13vw] font-extrabold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-8xl">
          {LINES.map((line, i) => (<span key={line} className="block overflow-hidden"><motion.span variants={fadeUp} custom={i + 1} className={`block ${i === 1 ? 'text-accent' : ''}`}>{line}</motion.span></span>))}
        </h1>
        <motion.p variants={fadeUp} custom={5} className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">We build the email marketing engine behind your revenue — campaigns, automated flows, and list growth that turn subscribers into repeat buyers.</motion.p>
        <motion.div variants={fadeUp} custom={6} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave} href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary transition-transform">Let's Talk <ArrowUpRight size={17} /></a>
          <Link to="/services" className="btn-ghost">Explore Services</Link>
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
