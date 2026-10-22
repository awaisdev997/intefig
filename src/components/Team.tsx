import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TEAM, TEAM_BIOS } from '../data/content'
import { fadeUp } from '../animations/textAnimations'

type TeamPhotosModule = typeof import('../data/teamPhotos')

/**
 * Team photos live in a separate (large, data-URI) module — load it lazily so
 * it never blocks first paint; fixed-size slots mean layout never shifts and
 * monograms remain as fallbacks if the import fails.
 */
function useTeamPhotos() {
  const [photos, setPhotos] = useState<TeamPhotosModule | null>(null)
  useEffect(() => {
    let alive = true
    import('../data/teamPhotos')
      .then((m) => { if (alive) setPhotos(m) })
      .catch(() => { /* photos are decorative; monogram fallbacks remain */ })
    return () => { alive = false }
  }, [])
  return photos
}

const initials = (name: string) => name.split(' ').map((x) => x[0]).slice(0, 2).join('')

/** The founder spotlight card shown in About and on the Team page. */
export function FounderCard() {
  const photos = useTeamPhotos()
  const founderPhoto = photos?.FOUNDER_PHOTO
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      <motion.div variants={fadeUp} custom={0} className="rounded-3xl bg-white p-6 shadow-card">
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
  )
}

/** The team card grid. `detailed` adds the one-line bio under each role (Team page). */
export function TeamGrid({ detailed = false }: { detailed?: boolean }) {
  const photos = useTeamPhotos()
  return (
    <div>
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
              <h3 className="font-display text-base font-bold text-ink">{m.name}</h3>
              <p className="text-sm text-ink/60">{m.role}</p>
              {detailed && TEAM_BIOS[m.name] && <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{TEAM_BIOS[m.name]}</p>}
            </div>
          </motion.li>
        )
      })}
      </ul>
    </div>
  )
}
