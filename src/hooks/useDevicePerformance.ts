import { useEffect, useState } from 'react'
import { hasWebGL, useReducedMotion } from './useReducedMotion'
export function useDevicePerformance() {
  const reduced = useReducedMotion()
  const [state, setState] = useState({ isMobile: false, low: false, webgl: true })
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window
    const cores = navigator.hardwareConcurrency || 4
    setState({ isMobile, low: isMobile || cores <= 4, webgl: hasWebGL() })
  }, [])
  return { ...state, reduced, canUse3D: state.webgl && !reduced }
}
