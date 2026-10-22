import { useEffect, useRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { motion } from 'framer-motion'
import { pageTransition } from './animations/pageTransitions'
import { useReducedMotion } from './hooks/useReducedMotion'
import { Loader } from './components/Loader'
import { ScrollProgress } from './components/ScrollProgress'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { TeamPage } from './pages/TeamPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Route-change scroll behaviour: with a hash (e.g. /#about, /services#email-campaigns)
 * scroll to that element, offset for the fixed navbar; otherwise jump to the top.
 * Uses the Lenis instance when one is running, native scroll otherwise.
 */
function ScrollManager({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const scrollToEl = (): boolean => {
        const el = document.getElementById(id)
        if (!el) return false
        const lenis = lenisRef.current
        if (lenis) lenis.scrollTo(el, { offset: -80, duration: 0.9 })
        else {
          const y = el.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top: y, behavior: 'auto' })
        }
        return true
      }
      // The home page's layout keeps growing for a moment after a cross-page
      // navigation (pinned services section, lazy media). Re-measure and
      // correct at intervals until the target position is stable, otherwise
      // the scroll lands short of the section.
      scrollToEl()
      const timers = [400, 1000, 1800].map((ms) =>
        setTimeout(() => {
          const el = document.getElementById(id)
          if (!el) return
          const target = el.getBoundingClientRect().top + window.scrollY - 80
          if (Math.abs(window.scrollY - target) > 60) scrollToEl()
        }, ms),
      )
      return () => timers.forEach(clearTimeout)
    }
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenisRef])
  return null
}

export default function App() {
  const reduced = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenisRef.current = lenis
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')
      if (id && id.length > 1) { const el = document.querySelector(id); if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: -70 }) } }
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy(); lenisRef.current = null }
  }, [reduced])
  return (
    <div className="noise">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-white">Skip to content</a>
      <Loader /><ScrollProgress /><CustomCursor />
      <ScrollManager lenisRef={lenisRef} />
      <Navbar />
      <motion.main id="main" tabIndex={-1} initial={pageTransition.initial} animate={pageTransition.animate}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}
