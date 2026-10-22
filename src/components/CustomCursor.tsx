import { useEffect, useRef, useState } from 'react'
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEnabled(true)
    const move = (e: MouseEvent) => { if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%) scale(${active ? 2.1 : 1})` }
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a,button,[data-cursor],input,textarea') as HTMLElement | null
      setActive(!!t); setLabel(t?.dataset?.cursor || '')
    }
    window.addEventListener('mousemove', move); window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [active])
  if (!enabled) return null
  return <div ref={ref} className="custom-cursor pointer-events-none fixed left-0 top-0 z-[95] flex h-8 w-8 items-center justify-center rounded-full border border-accent/70 bg-accent/10 backdrop-blur-[2px] transition-[width,height,background-color] duration-200" aria-hidden="true">{label && <span className="font-display text-[5px] font-bold tracking-widest text-accent">{label}</span>}</div>
}
