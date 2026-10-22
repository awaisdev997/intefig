import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Check } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { LottieIllustration } from './LottieIllustration'
import { FounderCard } from './Team'
import { ORBIT_WORDS, WHY } from '../data/content'
import { fadeUp } from '../animations/textAnimations'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32" aria-label="About INTEFIG">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" label="ABOUT" title={<>Technology fueled<br />by <span className="text-accent">User Experience</span></>} />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="relative flex h-[340px] items-center justify-center md:h-[440px]" data-cursor="EXPLORE">
              <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(211,224,201,.85),transparent_65%)] blur-2xl md:h-[380px] md:w-[380px]" aria-hidden="true" />
              <LottieIllustration
                label="Animated globe with locations connected around the world"
                loadData={() => import('../assets/lottie/global-network.json')}
                className="relative h-[280px] w-[280px] md:h-[320px] md:w-[320px]"
              />
            </div>
            {/* Orbit words live in HTML — always legible, never overlapping the animation. */}
            <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Disciplines we combine">
              {ORBIT_WORDS.map((w) => (
                <li key={w} className="rounded-full border border-sage-700/25 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">{w}</li>
              ))}
            </ul>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} custom={0} className="font-display text-xl font-semibold leading-snug text-ink md:text-2xl">We combine email experts, creatives and data analysts to create measurable growth.</motion.p>
            <motion.p variants={fadeUp} custom={1} className="mt-5 leading-relaxed text-ink/70">INTEFIG isn't a freelancer roster — it's a dedicated retention team. Since 2017 we've helped 200+ eCommerce brands and local businesses turn one-time buyers into repeat customers through email, SMS, automation, web development, and UI/UX design, all under one roof in Gujranwala, Pakistan.</motion.p>
            <motion.ul variants={fadeUp} custom={2} className="mt-7 grid gap-3 sm:grid-cols-2">{WHY.map(w => <li key={w} className="flex items-start gap-2.5 text-sm font-medium text-ink/85"><span className="mt-0.5 rounded-full bg-sage-100 p-1 text-sage-700"><Check size={13} /></span>{w}</li>)}</motion.ul>
            <div className="mt-9"><FounderCard /></div>
          </motion.div>
        </div>
        <div className="mt-14 text-center">
          <Link to="/team" className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-ink transition hover:text-accent">
            Meet the whole team <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
