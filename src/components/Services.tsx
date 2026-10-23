import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SERVICES } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { LottieIllustration } from './LottieIllustration'
/** One Lottie illustration per service, in SERVICES order. Each JSON is a
 *  separate lazy chunk, fetched only when the services panel nears the viewport. */
const SERVICE_LOTTIE_LOADERS = [
  () => import('../assets/lottie/email-campaigns.json'),
  () => import('../assets/lottie/ecommerce-automation.json'),
  () => import('../assets/lottie/sms-automation.json'),
  () => import('../assets/lottie/tools-integration.json'),
  () => import('../assets/lottie/landing-pages.json'),
  () => import('../assets/lottie/lead-generation.json'),
]
/**
 * Home services section. A service opens only when the visitor clicks it —
 * scrolling the page never changes the open service. The first service starts
 * open so the panel is never empty.
 */
export function Services() {
  const [active, setActive] = useState(0)
  const shown = active
  return (
    <section id="services" aria-label="Services" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="01" label="SERVICES" title={<>Everything retention<br />needs. <span className="text-accent">One team.</span></>} />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative order-2 h-[300px] pb-10 lg:order-1 lg:h-[420px]" data-cursor="EXPLORE">
            <AnimatePresence initial={false}>
              <motion.div
                key={shown}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center pb-10"
              >
                <LottieIllustration
                  loadData={SERVICE_LOTTIE_LOADERS[shown]}
                  label={`${SERVICES[shown].title} illustration`}
                  className="h-[228px] w-[228px] sm:h-[248px] sm:w-[248px] lg:h-[328px] lg:w-[328px]"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-deep/85 px-4 py-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-white backdrop-blur">SERVICE 0{shown + 1} — {SERVICES[shown].title.toUpperCase()}</div>
          </div>
          <ol className="order-1 flex flex-col lg:order-2">
            {SERVICES.map((s, i) => {
              const isActive = shown === i
              return (
                <motion.li key={s.title} animate={isActive ? 'active' : 'inactive'} variants={{ active: { opacity: 1, x: 10 }, inactive: { opacity: 0.5, x: 0 } }} transition={{ duration: 0.4 }} className={`border-b border-ink/10 py-4 transition-all duration-300 ${isActive ? '[transform:translateZ(30px)]' : ''}`} style={{ transform: isActive ? 'translateX(10px) scale(1.015)' : undefined, filter: isActive ? 'brightness(1.05)' : undefined }}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-current={isActive || undefined}
                    data-cursor="OPEN"
                    className="block w-full cursor-pointer text-left hover:opacity-100"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={`font-display text-sm font-bold ${isActive ? 'text-accent' : 'text-ink/40'}`}>0{i + 1}</span>
                      <span className="font-display text-xl font-bold text-ink md:text-2xl">{s.title}</span>
                      {isActive && <span className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-glow" aria-hidden="true" />}
                    </span>
                  </button>
                  <motion.div initial={false} animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                    <p className="pl-9 pr-2 pt-1.5 text-sm leading-relaxed text-ink/65 md:pl-10">{s.desc}</p>
                  </motion.div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
