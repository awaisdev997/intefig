import { motion } from 'framer-motion'
import { TrendingUp, Zap, Heart, ShoppingCart } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
const BARS = [34, 48, 42, 61, 57, 74, 69, 86]
const CARDS = [
  { icon: TrendingUp, label: 'Campaign Performance', value: 'Open & click trends' },
  { icon: Zap, label: 'Automation', value: 'Flows running 24/7' },
  { icon: Heart, label: 'Engagement', value: 'Repeat interaction' },
  { icon: ShoppingCart, label: 'Conversions', value: 'Subscriber → buyer' },
]
export function Results() {
  return (
    <section id="work" className="py-24 md:py-32" aria-label="Work and results">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="06" label="WORK / RESULTS" title={<>Measurable outcomes,<br /><span className="text-accent">not vanity metrics.</span></>} />
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3" style={{ perspective: 1100 }}>
            <motion.div initial={{ opacity: 0, rotateX: 14, rotateY: -10, y: 40 }} whileInView={{ opacity: 1, rotateX: 6, rotateY: -7, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} whileHover={{ rotateX: 2, rotateY: -3 }} className="rounded-[2rem] bg-ink-deep p-6 shadow-depth md:p-8" role="img" aria-label="Illustrative analytics dashboard showing campaign performance, automation, engagement and conversions">
              <div className="mb-6 flex items-center justify-between"><span className="font-display text-sm font-bold tracking-widest text-white">CAMPAIGN PERFORMANCE</span><span className="rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold tracking-wider text-orange-200">ILLUSTRATIVE</span></div>
              <div className="flex h-44 items-end gap-2.5 md:gap-3.5" aria-hidden="true">{BARS.map((h, i) => (<motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease: 'easeOut' }} className={`flex-1 rounded-t-lg ${i === BARS.length - 1 ? 'bg-accent' : 'bg-sage-500/80'}`} />))}</div>
              <svg viewBox="0 0 400 60" className="mt-4 w-full" aria-hidden="true"><motion.path d="M0,50 C60,44 90,30 140,32 S250,14 300,16 S370,6 400,4" fill="none" stroke="#C8401B" strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeInOut' }} /></svg>
              <p className="mt-3 text-xs text-white/45">Revenue line — illustrative visualisation, not client data.</p>
            </motion.div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1 xl:grid-cols-2">
            {CARDS.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }} className="rounded-3xl bg-white p-6 shadow-card">
                <c.icon className="text-accent" size={22} aria-hidden="true" />
                <h3 className="mt-3 font-display text-base font-bold text-ink">{c.label}</h3>
                <p className="mt-1 text-sm text-ink/60">{c.value}</p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ink/35">Illustrative</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
