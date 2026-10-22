import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FOOTER_NAV, SERVICES, SOCIALS, CONTACT, CALENDLY } from '../data/content'
import { SERVICE_SLUGS } from '../data/serviceDetails'
import { NavItemLink } from './NavItemLink'
import { LogoLockup } from './Logo'
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sage-800 pt-20 text-white" aria-label="Footer">
      <div className="footer-geo pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-[3rem] border border-white/10" aria-hidden="true" />
      <div className="footer-geo pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full border border-white/10" style={{ animationDelay: '-6s' }} aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoLockup variant="dark" idSuffix="footer" markClassName="h-11 w-11 md:h-12 md:w-12" textClassName="text-[24px] md:text-[26px]" />
            <p className="eyebrow mt-3 !text-[10px] text-sage-100">ALL ABOUT EMAIL</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">Retention. Automated. Delivered. Email, SMS and automation for brands that want repeat buyers.</p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary mt-6 !px-6 !py-2.5">Let's Talk <ArrowUpRight size={15} /></a>
          </div>
          <nav aria-label="Footer navigation"><h3 className="eyebrow mb-5 !text-[10px] text-sage-100">NAVIGATION</h3><ul className="space-y-3 text-sm">{FOOTER_NAV.map(n => <li key={n.to}><NavItemLink entry={n} className="text-white/90 transition hover:text-white hover:underline underline-offset-4" activeClassName="text-white underline" /></li>)}</ul></nav>
          <div><h3 className="eyebrow mb-5 !text-[10px] text-sage-100">SERVICES</h3><ul className="space-y-3 text-sm">{SERVICES.map((s, i) => <li key={s.title}><Link to={`/services#${SERVICE_SLUGS[i]}`} className="text-white/90 transition hover:text-white hover:underline underline-offset-4">{s.title}</Link></li>)}</ul></div>
          <div>
            <h3 className="eyebrow mb-5 !text-[10px] text-sage-100">CONTACT</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
              <li><a href={CONTACT.phoneHref} className="hover:text-white">{CONTACT.phoneDisplay}</a></li>
              <li>{CONTACT.site}</li><li>{CONTACT.location}</li>
            </ul>
            <h3 className="eyebrow mb-4 mt-8 !text-[10px] text-sage-100">FOLLOW</h3>
            <ul className="flex flex-wrap gap-2">{SOCIALS.map(s => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" aria-label={`INTEFIG on ${s.label}`} className="inline-block rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white hover:text-ink">{s.label}</a></li>)}</ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-7 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} INTEFIG. Gujranwala, Pakistan.</p>
          <p className="font-display font-semibold tracking-[0.2em]">RETENTION. AUTOMATED. DELIVERED.</p>
        </div>
      </div>
    </footer>
  )
}
