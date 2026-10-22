import { Link } from 'react-router-dom'
import { Seo, breadcrumbLd } from '../components/Seo'
import { PAGE_SEO } from '../lib/seo'
const SERVICE_CRUMBS = [{ label: 'Home', to: '/' }, { label: 'Services' }]
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { LottieIllustration } from '../components/LottieIllustration'
import { Process } from '../components/Process'
import { CtaBand } from '../components/CtaBand'
import { SERVICES } from '../data/content'
import { SERVICE_DETAILS, SERVICE_LOTTIE, SERVICE_SLUGS } from '../data/serviceDetails'
import { fadeUp } from '../animations/textAnimations'

/** Detailed services page: one anchored section per service (deep-linkable
 *  as /services#<slug> from the footer), then the Process and a CTA band. */
export function ServicesPage() {
  return (
    <>
      <Seo {...PAGE_SEO.services} jsonLd={[breadcrumbLd(SERVICE_CRUMBS), ...SERVICES.map((sv) => ({ '@context': 'https://schema.org', '@type': 'Service', name: sv.title, description: sv.desc, provider: { '@type': 'Organization', name: 'INTEFIG', url: 'https://intefig.com' }, areaServed: 'Worldwide' }))]} />
      <PageHeader
        crumbs={SERVICE_CRUMBS}
        eyebrow="OUR SERVICES"
        title={<>Everything retention needs, <span className="text-accent">in detail.</span></>}
        intro="Six services, one goal: turning subscribers into repeat buyers. Here's exactly what each one covers — and what it does for your brand."
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {SERVICES.map((s, i) => {
          const slug = SERVICE_SLUGS[i]
          const detail = SERVICE_DETAILS[slug]
          const flip = i % 2 === 1
          return (
            <section key={slug} id={slug} aria-label={s.title} className="scroll-mt-28 border-t border-ink/10 py-14 first:border-t-0 first:pt-2 md:py-20">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className={flip ? 'lg:order-2' : ''}>
                  <motion.div variants={fadeUp} custom={0} className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-[2rem] bg-white/70 shadow-card ring-1 ring-ink/5 md:h-[380px]">
                    <div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(211,224,201,.9),transparent_65%)] blur-2xl md:h-[320px] md:w-[320px]" aria-hidden="true" />
                    <LottieIllustration
                      loadData={SERVICE_LOTTIE[slug]}
                      label={`${s.title} illustration`}
                      className="relative h-[220px] w-[220px] md:h-[280px] md:w-[280px]"
                    />
                  </motion.div>
                </motion.div>
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className={flip ? 'lg:order-1' : ''}>
                  <motion.p variants={fadeUp} custom={0} className="eyebrow flex items-center gap-3 text-ink/45">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} aria-hidden="true" />
                    SERVICE 0{i + 1}
                  </motion.p>
                  <motion.h2 variants={fadeUp} custom={1} className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">{s.title}</motion.h2>
                  {detail.paragraphs.map((p, j) => (
                    <motion.p key={j} variants={fadeUp} custom={2 + j} className="mt-4 leading-relaxed text-ink/70">{p}</motion.p>
                  ))}
                  <motion.div variants={fadeUp} custom={4}>
                    <p className="eyebrow mt-7 !text-[10px] text-ink/50">WHAT&apos;S INCLUDED</p>
                    <ul className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
                      {detail.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5 text-sm font-medium text-ink/85">
                          <span className="mt-0.5 rounded-full bg-sage-100 p-1 text-sage-700"><Check size={13} /></span>{inc}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.p variants={fadeUp} custom={5} className="mt-7 border-l-[3px] pl-4 font-display text-base font-semibold leading-snug text-ink" style={{ borderColor: s.color }}>{detail.benefit}</motion.p>
                  <motion.p variants={fadeUp} custom={6} className="mt-6">
                    <Link to="/contact" className="group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-accent">
                      Start with this service <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </motion.p>
                </motion.div>
              </div>
            </section>
          )
        })}
      </div>
      <Process />
      <CtaBand />
    </>
  )
}
