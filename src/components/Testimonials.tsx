import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { TESTIMONIALS } from '../data/content'
import { SectionHeading } from './SectionHeading'
export function Testimonials() {
  const [[index, dir], setIndex] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const go = (d: number) => setIndex(([i]) => [(i + d + TESTIMONIALS.length) % TESTIMONIALS.length, d])
  useEffect(() => { if (paused) return; const t = setInterval(() => go(1), 5200); return () => clearInterval(t) }, [paused])
  const t = TESTIMONIALS[index]
  return (
    <section id="testimonials" className="relative overflow-hidden bg-sage-700 py-24 md:py-32" aria-label="Testimonials" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="pointer-events-none absolute -top-10 left-4 select-none font-display text-[22rem] font-extrabold leading-none text-white/10" aria-hidden="true">&ldquo;</span>
      <div className="relative mx-auto max-w-5xl px-5 md:px-8" style={{ perspective: 1100 }}>
        <SectionHeading dark index="05" label="TESTIMONIALS" title={<>Clients who<br />came back.</>} />
        <div className="relative min-h-[260px] md:min-h-[240px]">
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.figure key={index} custom={dir} initial={{ opacity: 0, z: -180, rotateY: dir * -10, y: 24 }} animate={{ opacity: 1, z: 0, rotateY: 0, y: 0 }} exit={{ opacity: 0, z: -220, rotateY: dir * 12, y: -16 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="rounded-[2rem] bg-white p-8 shadow-depth md:p-12" style={{ transformStyle: 'preserve-3d' }}>
              <div className="flex gap-1 text-accent" aria-label="5 star rating">{[0,1,2,3,4].map(i => <Star key={i} size={17} fill="currentColor" aria-hidden="true" />)}</div>
              <blockquote className="mt-5 font-display text-2xl font-semibold leading-snug text-ink md:text-[2rem]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">{t.name}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-full border border-white/40 p-3 text-white transition hover:bg-white hover:text-ink active:scale-90"><ChevronLeft size={18} /></button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="rounded-full border border-white/40 p-3 text-white transition hover:bg-white hover:text-ink active:scale-90"><ChevronRight size={18} /></button>
          <span className="ml-2 font-display text-sm font-semibold text-white/80" aria-live="polite">{index + 1} / {TESTIMONIALS.length}</span>
          <div className="ml-auto flex gap-1.5">{TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setIndex([i, i > index ? 1 : -1])} aria-label={`Go to testimonial ${i + 1}`} className={`h-2 rounded-full transition-all ${i === index ? 'w-7 bg-white' : 'w-2 bg-white/40'}`} />)}</div>
        </div>
      </div>
    </section>
  )
}
