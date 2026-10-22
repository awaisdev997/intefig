import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
export function ParticleField({ count = 90, color = '#7A957E' }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) { arr[i * 3] = (Math.random() - 0.5) * 11; arr[i * 3 + 1] = (Math.random() - 0.5) * 7; arr[i * 3 + 2] = (Math.random() - 0.5) * 5 }
    return arr
  }, [count])
  useFrame((state, delta) => { if (ref.current) { ref.current.rotation.y += delta * 0.02; ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12 } })
  return (<points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial size={0.045} color={color} transparent opacity={0.55} sizeAttenuation depthWrite={false} /></points>)
}
