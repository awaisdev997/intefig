import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Mail, Phone, Globe, MapPin } from 'lucide-react'
import { CALENDLY, CONTACT, FORMSPREE } from '../data/content'
import { LottieIllustration } from './LottieIllustration'
export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: fd.get('name'), email: fd.get('email'), message: fd.get('message'), form: 'Contact' }) })
      setStatus(res.ok ? 'ok' : 'error'); if (res.ok) e.currentTarget.reset()
    } catch { setStatus('error') }
  }
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-deep py-24 text-white md:py-32" aria-label="Contact INTEFIG">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4 text-sage-300">08 / CONTACT</p>
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">Need help with<br />your <span className="text-accent">projects?</span></h2>
          <div className="relative mt-4 h-[260px] md:h-[320px]">
            {/* Light panel: the ink line-draw animation needs a light ground to stay legible on this dark section. */}
            <div className="flex h-full items-center justify-center rounded-[2rem] bg-sage-50 shadow-card">
              <LottieIllustration
                label="Animated chat message bubbles"
                loadData={() => import('../assets/lottie/contact-message.json')}
                className="h-[200px] w-[200px] md:h-[248px] md:w-[248px]"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={16} className="text-accent" />{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone size={16} className="text-accent" />{CONTACT.phoneDisplay}</a>
            <span className="flex items-center gap-2"><Globe size={16} className="text-accent" />{CONTACT.site}</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-accent" />{CONTACT.location}</span>
          </div>
        </div>
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-[2rem] bg-white/[0.06] p-7 ring-1 ring-white/12 backdrop-blur md:p-9" aria-label="Contact form">
          <div className="grid gap-5">
            <div><label htmlFor="c-name" className="eyebrow !text-[10px] text-white/60">Your name</label><input id="c-name" name="name" required autoComplete="name" className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent focus:outline-none" placeholder="Jane Smith" /></div>
            <div><label htmlFor="c-email" className="eyebrow !text-[10px] text-white/60">Email</label><input id="c-email" name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent focus:outline-none" placeholder="jane@brand.com" /></div>
            <div><label htmlFor="c-msg" className="eyebrow !text-[10px] text-white/60">Project details</label><textarea id="c-msg" name="message" required rows={4} className="mt-2 w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent focus:outline-none" placeholder="Tell us about your email program…" /></div>
          </div>
          {status === 'ok' && <p className="mt-5 flex items-center gap-2 rounded-2xl bg-sage-700/50 px-4 py-3 text-sm text-sage-50" role="status"><CheckCircle2 size={17} /> Thanks — we’ll be in touch shortly.</p>}
          {status === 'error' && <p className="mt-5 rounded-2xl bg-accent/25 px-4 py-3 text-sm text-white" role="alert">Something went wrong. Please email {CONTACT.email} directly.</p>}
          <div className="mt-7 flex flex-wrap gap-4">
            <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Contact Us'} <ArrowUpRight size={16} /></button>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-display text-sm font-semibold text-white transition hover:bg-white hover:text-ink active:scale-95">Book a 15-min call</a>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
