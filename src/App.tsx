import { useEffect } from 'react'
import Lenis from 'lenis'
import { motion } from 'framer-motion'
import { pageTransition } from './animations/pageTransitions'
import { useReducedMotion } from './hooks/useReducedMotion'
import { Loader } from './components/Loader'
import { ScrollProgress } from './components/ScrollProgress'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Stats } from './components/Stats'
import { Partners } from './components/Partners'
import { Testimonials } from './components/Testimonials'
import { Results } from './components/Results'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'

export default function App() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
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
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy() }
  }, [reduced])
  return (
    <div className="noise">
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-white">Skip to content</a>
      <Loader /><ScrollProgress /><CustomCursor /><Navbar />
      <motion.main initial={pageTransition.initial} animate={pageTransition.animate}>
        <Hero />
        <Services />
        <About />
        <Stats />
        <Partners />
        <Testimonials />
        <Results />
        <Process />
        <Contact />
        <Newsletter />
      </motion.main>
      <Footer />
    </div>
  )
}
