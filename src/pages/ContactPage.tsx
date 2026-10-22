import { ArrowUpRight, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { Seo, breadcrumbLd } from '../components/Seo'
import { PAGE_SEO } from '../lib/seo'
const CONTACT_CRUMBS = [{ label: 'Home', to: '/' }, { label: 'Contact' }]
import { PageHeader } from '../components/PageHeader'
import { ContactForm } from '../components/ContactForm'
import { CALENDLY, CONTACT, SOCIALS } from '../data/content'

/** Dedicated contact page: direct contact methods on the left, the shared
 *  Formspree-backed ContactForm on a dark panel on the right. */
export function ContactPage() {
  const methods = [
    { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: 'Phone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: MapPin, label: 'Location', value: CONTACT.location },
    { icon: Globe, label: 'Website', value: CONTACT.site, href: `https://${CONTACT.site}` },
  ]
  return (
    <>
      <Seo {...PAGE_SEO.contact} jsonLd={breadcrumbLd(CONTACT_CRUMBS)} />
      <PageHeader
        crumbs={CONTACT_CRUMBS}
        eyebrow="CONTACT"
        title={<>Let&apos;s build your <span className="text-accent">retention engine</span></>}
        intro="Tell us where your email program is today and where you want it to go — we'll reply with honest next steps, no obligation."
      />
      <section aria-label="Contact details and form" className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {methods.map((m) => {
                const inner = (
                  <>
                    <span className="rounded-full bg-sage-100 p-2.5 text-accent"><m.icon size={18} /></span>
                    <span>
                      <span className="eyebrow block !text-[10px] text-ink/50">{m.label}</span>
                      <span className="mt-1 block font-display text-base font-semibold text-ink">{m.value}</span>
                    </span>
                  </>
                )
                const cls = 'flex items-center gap-4 rounded-3xl border border-ink/10 bg-white/70 p-5 shadow-card'
                return (
                  <li key={m.label}>
                    {m.href
                      ? <a href={m.href} {...(m.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})} className={`${cls} transition hover:-translate-y-0.5 hover:border-accent/40`}>{inner}</a>
                      : <div className={cls}>{inner}</div>}
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 rounded-3xl bg-sage-100/70 p-6 ring-1 ring-ink/5">
              <h2 className="font-display text-lg font-bold text-ink">Prefer to talk?</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">Book a free 15-minute call and we&apos;ll look at your current setup together.</p>
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary mt-5 !px-6 !py-2.5">Book a free 15-min call <ArrowUpRight size={15} /></a>
            </div>
            <h2 className="eyebrow mb-4 mt-8 !text-[10px] text-ink/50">FOLLOW INTEFIG</h2>
            <ul className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={`INTEFIG on ${s.label}`} className="inline-block rounded-full border border-ink/15 bg-white/50 px-3.5 py-1.5 text-xs font-semibold text-ink/75 transition hover:border-ink hover:text-ink">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2.5rem] bg-ink-deep p-3 shadow-depth md:p-4">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
