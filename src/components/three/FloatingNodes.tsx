import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import { LABEL_FONT } from '../../data/labelFont'

/**
 * Hero node cards — one per stage of the INTEFIG pipeline.
 * Widths are sized to each label so text never overflows the card face.
 * Palette is deliberately quiet: mostly neutral cards, a single terracotta accent (REVENUE).
 */
export const NODE_DATA = [
  { label: 'EMAIL', pos: [-2.35, 1.05, 0] as const, color: '#FFFFFF', textColor: '#3B3F42' },
  { label: 'AUTOMATION', pos: [-1.35, -1.05, 0.5] as const, color: '#7A957E', textColor: '#FFFFFF' },
  { label: 'DATA', pos: [0.15, 1.35, -0.3] as const, color: '#3B3F42', textColor: '#FFFFFF' },
  { label: 'CUSTOMERS', pos: [1.55, -0.85, 0.35] as const, color: '#D3E0C9', textColor: '#3B3F42' },
  { label: 'REVENUE', pos: [2.55, 0.95, 0] as const, color: '#C8401B', textColor: '#FFFFFF' },
]

const CARD_HEIGHT = 0.6
const CARD_DEPTH = 0.16
const cardWidth = (label: string) => Math.max(1.0, label.length * 0.145 + 0.35)

export function FloatingNodes({ showLabels = true }: { showLabels?: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const cards = useRef<(THREE.Group | null)[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Very subtle float for the whole ecosystem.
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.4) * 0.05
      group.current.rotation.z = Math.sin(t * 0.22) * 0.008
    }
    // Gentle per-card bob and sway — small enough to read as calm drift, not bouncing.
    cards.current.forEach((card, i) => {
      if (!card) return
      card.position.y = NODE_DATA[i].pos[1] + Math.sin(t * 0.55 + i * 1.4) * 0.055
      card.rotation.y = Math.sin(t * 0.35 + i) * 0.05
      card.rotation.x = Math.sin(t * 0.3 + i * 0.7) * 0.03
    })
  })

  return (
    <group ref={group}>
      {NODE_DATA.map((n, i) => {
        const width = cardWidth(n.label)
        return (
          <group
            key={n.label}
            ref={(el) => { cards.current[i] = el }}
            position={[n.pos[0], n.pos[1], n.pos[2]]}
          >
            <RoundedBox args={[width, CARD_HEIGHT, CARD_DEPTH]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color={n.color} roughness={0.38} metalness={0.05} />
            </RoundedBox>
            {showLabels && (
              <Suspense fallback={null}>
                <Text
                  position={[0, 0, CARD_DEPTH / 2 + 0.012]}
                  font={LABEL_FONT}
                  fontSize={0.155}
                  letterSpacing={0.06}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={width - 0.15}
                  color={n.textColor}
                >
                  {n.label}
                </Text>
              </Suspense>
            )}
          </group>
        )
      })}
    </group>
  )
}
