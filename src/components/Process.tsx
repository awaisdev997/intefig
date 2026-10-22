import { motion } from 'framer-motion'
import { Search, Map, PenTool, Zap, TrendingUp } from 'lucide-react'
import { PROCESS } from '../data/content'
import { SectionHeading } from './SectionHeading'
const ICONS = [Search, Map, PenTool, Zap, TrendingUp]
export function Process() {
  return (
    <section className="overflow-hidden bg-sage-100/60 py-24 md:py-32" aria-label="How we work">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="07" label="HOW WE WORK" title={<>From first call<br />to <span className="text-accent">compounding growth.</span></>} />
        <div className="relative">
          <div className="absolute left-0 right-0 top-10 hidden h-[2px] bg-ink/10 lg:block" aria-hidden="true" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => { const Icon = ICONS[i]; return (
              <motion.li key={p.title} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} className="group relative">
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-card transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-depth group-hover:[transform:perspective(600px)_rotateX(8deg)_rotateY(-8deg)]"><Icon size={26} className="text-accent" aria-hidden="true" /></div>
                <p className="mt-5 font-display text-sm font-bold text-ink/35">0{i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-extrabold tracking-wide text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{p.desc}</p>
              </motion.li>) })}
          </ol>
        </div>
      </div>
    </section>
  )
}
