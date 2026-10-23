import { motion } from 'framer-motion'
import { PARTNERS, CLIENTS } from '../data/content'
import { PARTNER_LOGOS } from '../data/partnerLogos'
import { SectionHeading } from './SectionHeading'
export function Partners() {
  const marquee = [...CLIENTS, ...CLIENTS]
  return (
    <section className="py-24 md:py-32" aria-label="Partners and clients">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading index="04" label="PARTNERS" title={<>INTEFIG Proudly<br />Partner with</>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 900 }}>
          {PARTNERS.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30, rotateX: 8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08, duration: 0.6 }} whileHover={{ y: -8, scale: 1.02, z: 30 }} className="rounded-3xl bg-white p-7 shadow-card" style={{ transform: `translateZ(${i % 3 * 14}px)` }}>
              <div className="flex h-12 items-center">
                <img src={PARTNER_LOGOS[p.name]} alt={`${p.name} logo`} loading="lazy" className="max-h-11 w-auto max-w-[190px] object-contain object-left" />
              </div>
              <p className="mt-5 inline-flex rounded-full bg-sage-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-sage-800">{p.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-16 overflow-hidden border-y border-ink/10 py-5" aria-label="Clients">
        <div className="animate-marquee flex w-max items-center gap-12 pr-12 hover:[animation-play-state:paused]">
          {marquee.map((c, i) => <span key={i} className="whitespace-nowrap font-display text-lg font-semibold text-ink/45">{c}</span>)}
        </div>
      </div>
    </section>
  )
}
