import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { AboutScene } from './AboutScene'
import { TEAM, WHY } from '../data/content'
import { fadeUp } from '../animations/textAnimations'
export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32" aria-label="About INTEFIG">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" label="ABOUT" title={<>Technology fueled<br />by <span className="text-accent">User Experience</span></>} />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[340px] md:h-[440px]" data-cursor="EXPLORE"><AboutScene /></div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} custom={0} className="font-display text-xl font-semibold leading-snug text-ink md:text-2xl">We combine email experts, creatives and data analysts to create measurable growth.</motion.p>
            <motion.p variants={fadeUp} custom={1} className="mt-5 leading-relaxed text-ink/70">INTEFIG isn't a freelancer roster — it's a dedicated retention team. Since 2017 we've helped 200+ eCommerce brands and local businesses turn one-time buyers into repeat customers through email, SMS, automation, web development, and UI/UX design, all under one roof in Gujranwala, Pakistan.</motion.p>
            <motion.ul variants={fadeUp} custom={2} className="mt-7 grid gap-3 sm:grid-cols-2">{WHY.map(w => <li key={w} className="flex items-start gap-2.5 text-sm font-medium text-ink/85"><span className="mt-0.5 rounded-full bg-sage-100 p-1 text-sage-700"><Check size={13} /></span>{w}</li>)}</motion.ul>
            <motion.div variants={fadeUp} custom={3} className="mt-9 rounded-3xl bg-white p-6 shadow-card">
              <p className="eyebrow text-accent">FOUNDER</p>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">Hafiz Hamza — Founder &amp; Lead Strategist</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">Hafiz Hamza founded INTEFIG in 2017 out of Gujranwala, Pakistan, growing it from a one-person email consultancy into a full-service retention team trusted by 200+ brands worldwide.</p>
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-16">
          <p className="eyebrow mb-6 text-ink/50">THE TEAM</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{TEAM.map((m, i) => (
            <motion.li key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} whileHover={{ y: -6 }} className="rounded-3xl border border-ink/10 bg-white/70 p-5 shadow-card backdrop-blur">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 font-display text-sm font-bold text-sage-700" aria-hidden="true">{m.name.split(' ').map(x => x[0]).slice(0, 2).join('')}</div>
              <h3 className="font-display text-base font-bold text-ink">{m.name}</h3><p className="text-sm text-ink/60">{m.role}</p>
            </motion.li>))}
          </ul>
        </div>
      </div>
    </section>
  )
}
