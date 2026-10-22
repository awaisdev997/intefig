import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { CALENDLY, CONTACT, FORMSPREE } from '../data/content'

/**
 * The contact form (home Contact section + Contact page). Posts to the
 * configured Formspree endpoint; the success state is shown ONLY when the
 * submission actually succeeds (res.ok).
 */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: fd.get('name'), email: fd.get('email'), message: fd.get('message'), form: 'Contact', _gotcha: fd.get('_gotcha') }) })
      setStatus(res.ok ? 'ok' : 'error'); if (res.ok) e.currentTarget.reset()
    } catch { setStatus('error') }
  }
  return (
    <motion.form onSubmit={submit} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-[2rem] bg-white/[0.06] p-7 ring-1 ring-white/12 backdrop-blur md:p-9" aria-label="Contact form">
      {/* Honeypot: hidden from people, bots fill it and Formspree discards the submission. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-5">
        <div><label htmlFor="c-name" className="eyebrow !text-[10px] text-white/60">Your name</label><input id="c-name" name="name" type="text" required maxLength={100} autoComplete="name" className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent focus:outline-none" placeholder="Jane Smith" /></div>
        <div><label htmlFor="c-email" className="eyebrow !text-[10px] text-white/60">Email</label><input id="c-email" name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent focus:outline-none" placeholder="jane@brand.com" /></div>
        <div><label htmlFor="c-msg" className="eyebrow !text-[10px] text-white/60">Project details</label><textarea id="c-msg" name="message" required minLength={10} maxLength={5000} rows={4} className="mt-2 w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 focus:border-accent focus:outline-none" placeholder="Tell us about your email program…" /></div>
      </div>
      {status === 'ok' && <p className="mt-5 flex items-center gap-2 rounded-2xl bg-sage-700/50 px-4 py-3 text-sm text-sage-50" role="status"><CheckCircle2 size={17} /> Thanks — we’ll be in touch shortly.</p>}
      {status === 'error' && <p className="mt-5 rounded-2xl bg-accent/25 px-4 py-3 text-sm text-white" role="alert">Something went wrong. Please email {CONTACT.email} directly.</p>}
      <div className="mt-7 flex flex-wrap gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Contact Us'} <ArrowUpRight size={16} /></button>
        <a href={CALENDLY} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-display text-sm font-semibold text-white transition hover:bg-white hover:text-ink active:scale-95">Book a 15-min call</a>
      </div>
    </motion.form>
  )
}
