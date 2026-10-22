import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Lights } from './CameraRig'
function ReactiveCore({ boost }: { boost: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)
  const speed = useRef(0.4)
  useFrame((state, delta) => {
    if (!ref.current) return
    speed.current = THREE.MathUtils.damp(speed.current, boost ? 1.6 : 0.4, 3, delta)
    ref.current.rotation.y += delta * speed.current; ref.current.rotation.x += delta * speed.current * 0.6
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * (boost ? 2.4 : 1)) * 0.02)
    const p = state.pointer; ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, p.x * 0.4, 3, delta); ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, p.y * 0.3, 3, delta)
  })
  return (<group><mesh ref={ref}><sphereGeometry args={[1.3, 48, 48]} /><meshPhysicalMaterial color="#A83315" roughness={0.3} metalness={0.05} clearcoat={0.7} clearcoatRoughness={0.45} /></mesh><mesh rotation={[1.1, 0.3, 0]}><torusGeometry args={[2.05, 0.02, 8, 90]} /><meshStandardMaterial color="#EBF5DD" transparent opacity={0.35} /></mesh></group>)
}
export default function ContactCore({ boost, active }: { boost: boolean; active: boolean }) {
  return <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 5.4], fov: 42 }} gl={{ antialias: true, alpha: true }} aria-hidden="true"><Suspense fallback={null}><Lights /><ReactiveCore boost={boost} /></Suspense></Canvas>
}
