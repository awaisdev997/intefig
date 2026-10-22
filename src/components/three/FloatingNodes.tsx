import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Html } from '@react-three/drei'
import * as THREE from 'three'
export const NODE_DATA = [
  { label: 'EMAIL', pos: [-2.6, 1.1, 0] as const, color: '#C8401B' },
  { label: 'AUTOMATION', pos: [-1.2, -1.2, 0.6] as const, color: '#7A957E' },
  { label: 'DATA', pos: [0.4, 1.5, -0.4] as const, color: '#3B3F42' },
  { label: 'CUSTOMERS', pos: [1.9, -0.7, 0.4] as const, color: '#9AB395' },
  { label: 'REVENUE', pos: [3.0, 1.0, 0] as const, color: '#C8401B' },
]
export function FloatingNodes({ showLabels = true }: { showLabels?: boolean }) {
  const group = useRef<THREE.Group>(null!)
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => { child.position.y = NODE_DATA[i].pos[1] + Math.sin(t * 0.8 + i * 1.4) * 0.14; child.rotation.y = Math.sin(t * 0.4 + i) * 0.18 })
  })
  return (<group ref={group}>{NODE_DATA.map((n) => (
    <group key={n.label} position={[n.pos[0], n.pos[1], n.pos[2]]}>
      <RoundedBox args={[1.05, 0.68, 0.32]} radius={0.09} smoothness={4}><meshStandardMaterial color={n.color} roughness={0.32} metalness={0.15} /></RoundedBox>
      {showLabels && <Html center distanceFactor={9} style={{ pointerEvents: 'none' }}><span style={{ fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: '#fff', whiteSpace: 'nowrap' }}>{n.label}</span></Html>}
    </group>))}
  </group>)
}
