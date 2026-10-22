import { useEffect, useRef, useState } from 'react'
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    ob.observe(ref.current)
    return () => ob.disconnect()
  }, [threshold])
  return { ref, inView }
}
export function useOnScreen<T extends HTMLElement>(threshold = 0.05) {
  const ref = useRef<T | null>(null)
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const ob = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold })
    ob.observe(ref.current)
    return () => ob.disconnect()
  }, [threshold])
  return { ref, onScreen }
}
