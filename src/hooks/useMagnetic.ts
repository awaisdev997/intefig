import { useRef } from 'react'
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null)
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const onMouseLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)' }
  return { ref, onMouseMove, onMouseLeave }
}
