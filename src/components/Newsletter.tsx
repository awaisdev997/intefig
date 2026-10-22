import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { FORMSPREE } from '../data/content'
export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [focused, setFocused] = useState(false)
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email: fd.get('email'), form: 'Newsletter' }) })
      setStatus(res.ok ? 'ok' : 'error'); if (res.ok) e.currentTarget.reset()
    } catch { setStatus('error') }
  }
  return (
    <section className="py-20 md:py-24" aria-label="Newsletter">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:px-8 lg:flex-row lg:items-center">
        <div><p className="eyebrow mb-3 text-accent">NEWSLETTER</p><h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">Stay in touch</h2><p className="mt-2 max-w-md text-ink/65">Retention tactics, flow teardowns and deliverability notes — occasionally, and only when they're useful.</p></div>
        <form onSubmit={submit} className="w-full max-w-md" aria-label="Newsletter signup">
          <div className={`flex items-center gap-2 rounded-full bg-white p-2 shadow-card transition-shadow duration-300 ${focused ? 'shadow-glow ring-2 ring-accent/50' : ''}`}>
            <label htmlFor="nl-email" className="sr-only">Your email</label>
            <input id="nl-email" name="email" type="email" required placeholder="Your email" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="w-full bg-transparent px-4 py-2 text-ink placeholder:text-ink/40 focus:outline-none" />
            <button type="submit" disabled={status === 'sending'} className="btn-primary shrink-0 !px-6 !py-2.5 disabled:opacity-60">GO <Send size={14} /></button>
          </div>
          <AnimatePresence>{status === 'ok' && <motion.p initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 text-sm font-medium text-sage-700" role="status"><CheckCircle2 size={16} /> You're in — welcome aboard.</motion.p>}</AnimatePresence>
          {status === 'error' && <p className="mt-4 text-sm text-accent" role="alert">Could not subscribe just now — please try again.</p>}
        </form>
      </div>
    </section>
  )
}
