import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { Star } from 'lucide-react'
import { STATS } from '../data/content'
import { useInView } from '../hooks/useInView'
function Counter({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>(0.4)
  useEffect(() => {
    if (!inView || !ref.current) return
    const obj = { v: 0 }
    anime({ targets: obj, v: value, duration: 1700, easing: 'easeOutExpo', update: () => { if (ref.current) ref.current.textContent = obj.v.toFixed(decimals) + suffix } })
  }, [inView, value, suffix, decimals])
  return <div ref={wrapRef}><span ref={ref}>0{suffix}</span></div>
}
export function Stats() {
  return (
    <section className="bg-ink-deep py-20 md:py-28" aria-label="Statistics">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow mb-12 text-sage-300">03 / BY THE NUMBERS</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} style={{ transform: `perspective(800px) translateZ(${i * 6}px)` }}>
              <div className="flex items-start gap-2 font-display text-6xl font-extrabold tracking-tight text-white md:text-7xl"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />{s.label === 'Average Rating' && <Star className="mt-2 text-accent" size={26} fill="currentColor" aria-hidden="true" />}</div>
              <p className="eyebrow mt-3 !text-[10px] text-sage-300">{s.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
