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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">{p.name}</h3>
                  <p className="mt-2 text-sm font-medium text-accent">{p.sub}</p>
                </div>
                <img src={PARTNER_LOGOS[p.name]} alt={`${p.name} logo`} loading="lazy" className="mt-1 max-h-10 w-auto max-w-[118px] shrink-0 object-contain object-right" />
              </div>
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
