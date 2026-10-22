import { useEffect, useRef } from 'react'
export function useMousePosition() {
  const pos = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const fn = (e: MouseEvent) => { pos.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 } }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return pos
}
