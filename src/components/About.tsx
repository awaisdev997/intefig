import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { LottieIllustration } from './LottieIllustration'
import { ORBIT_WORDS, TEAM, WHY } from '../data/content'
import { fadeUp } from '../animations/textAnimations'

type TeamPhotosModule = typeof import('../data/teamPhotos')

const initials = (name: string) => name.split(' ').map((x) => x[0]).slice(0, 2).join('')

export function About() {
  // Team photos live in a separate (large, data-URI) module — load it lazily so
  // it never blocks first paint, and reserve fixed-size slots so layout never shifts.
  const [photos, setPhotos] = useState<TeamPhotosModule | null>(null)
  useEffect(() => {
    let alive = true
    import('../data/teamPhotos')
      .then((m) => { if (alive) setPhotos(m) })
      .catch(() => { /* photos are decorative; monogram fallbacks remain */ })
    return () => { alive = false }
  }, [])

  const founderPhoto = photos?.FOUNDER_PHOTO

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
            <motion.div variants={fadeUp} custom={3} className="mt-9 rounded-3xl bg-white p-6 shadow-card">
              <div className="flex items-start gap-5">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-sage-100 ring-2 ring-sage-100" aria-hidden={founderPhoto ? undefined : 'true'}>
                  {founderPhoto
                    ? <img src={founderPhoto} alt="Portrait of Hafiz Hamza, Founder & Lead Strategist at INTEFIG" className="h-full w-full object-cover object-top" loading="lazy" />
                    : <span className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-sage-700">HH</span>}
                </div>
                <div>
                  <p className="eyebrow text-accent">FOUNDER</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">Hafiz Hamza — Founder &amp; Lead Strategist</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">Hafiz Hamza founded INTEFIG in 2017 out of Gujranwala, Pakistan, growing it from a one-person email consultancy into a full-service retention team trusted by 200+ brands worldwide.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-16">
          <p className="eyebrow mb-6 text-ink/50">THE TEAM</p>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{TEAM.map((m, i) => {
            const photo = m.photoKey ? photos?.TEAM_PHOTOS[m.photoKey] : undefined
            return (
              <motion.li key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl border border-ink/10 bg-white/70 shadow-card backdrop-blur">
                <div className="relative aspect-[5/6] overflow-hidden bg-sage-100">
                  {photo
                    ? <img src={photo} alt={`Portrait of ${m.name}, ${m.role} at INTEFIG`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    : <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-sage-700" aria-hidden="true">{initials(m.name)}</div>}
                  <span className="absolute bottom-0 left-0 h-[3px] w-10 bg-accent transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-ink">{m.name}</h3><p className="text-sm text-ink/60">{m.role}</p>
                </div>
              </motion.li>
            )
          })}
          </ul>
        </div>
      </div>
    </section>
  )
}
