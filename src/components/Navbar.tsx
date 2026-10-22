import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAV, CALENDLY } from '../data/content'
import { NavItemLink } from './NavItemLink'
import { useMagnetic } from '../hooks/useMagnetic'
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const mag = useMagnetic<HTMLAnchorElement>(0.3)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); fn(); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open ])
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${scrolled ? 'bg-sage-50/80 shadow-[0_1px_0_rgba(59,63,66,.12)] backdrop-blur-xl' : 'bg-transparent'}`}>
        <nav aria-label="Main" className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-8 ${scrolled ? 'py-3' : 'py-5'}`}>
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-ink">INTEFIG<span className="text-accent">.</span></Link>
          <ul className="hidden items-center gap-8 lg:flex">{NAV.map(n => <li key={n.to}><NavItemLink entry={n} className="nav-link font-display text-sm font-medium text-ink/85 hover:text-ink" /></li>)}</ul>
          <div className="flex items-center gap-3">
            <a ref={mag.ref} onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave} href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary hidden !px-6 !py-2.5 transition-transform sm:inline-flex">Let's Talk <ArrowUpRight size={16} /></a>
            <button className="rounded-full border border-ink/15 bg-white/60 p-2.5 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
          </div>
        </nav>
      </header>
      <AnimatePresence>{open && (
        <motion.div initial={{ opacity: 0, clipPath: 'circle(0% at 92% 6%)' }} animate={{ opacity: 1, clipPath: 'circle(150% at 92% 6%)' }} exit={{ opacity: 0, clipPath: 'circle(0% at 92% 6%)' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[96] flex flex-col bg-ink-deep px-6 py-6" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between"><span className="font-display text-2xl font-extrabold text-white">INTEFIG<span className="text-accent">.</span></span><button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full border border-white/25 p-2.5 text-white"><X size={20} /></button></div>
          <ul className="mt-14 flex flex-col gap-2">{NAV.map((n, i) => (<motion.li key={n.to} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.07 }}><NavItemLink entry={n} onClick={() => setOpen(false)} className="font-display text-4xl font-bold text-white hover:text-sage-300" activeClassName="!text-sage-300" /></motion.li>))}</ul>
          <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary mt-auto w-fit">Let's Talk <ArrowUpRight size={16} /></motion.a>
        </motion.div>)}
      </AnimatePresence>
    </>
  )
}
