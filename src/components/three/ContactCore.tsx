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
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * (boost ? 2.4 : 1)) * 0.05)
    const p = state.pointer; ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, p.x * 0.4, 3, delta); ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, p.y * 0.3, 3, delta)
  })
  return (<group><mesh ref={ref}><icosahedronGeometry args={[1.35, 1]} /><meshStandardMaterial color="#C8401B" roughness={0.22} metalness={0.35} flatShading /></mesh><mesh rotation={[1.1, 0.3, 0]}><torusGeometry args={[2.05, 0.02, 8, 90]} /><meshStandardMaterial color="#EBF5DD" transparent opacity={0.55} /></mesh></group>)
}
export default function ContactCore({ boost, active }: { boost: boolean; active: boolean }) {
  return <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 5.4], fov: 42 }} gl={{ antialias: true, alpha: true }} aria-hidden="true"><Suspense fallback={null}><Lights /><ReactiveCore boost={boost} /></Suspense></Canvas>
}
