import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, ContactShadows, Environment } from '@react-three/drei'

// A cluster of soft pastel "yarn balls" that gently bob and drift toward the
// pointer. Deliberately built from simple geometry (no downloaded models) so
// it stays tiny and fast on phones.

const BALLS = [
  { pos: [0, 0.2, 0], scale: 1.15, color: '#FFB8CB', strand: '#F58BA6' },
  { pos: [-1.9, -0.5, -0.6], scale: 0.7, color: '#B5D8CC', strand: '#87BBA9' },
  { pos: [1.8, 0.4, -0.8], scale: 0.8, color: '#A6C1EE', strand: '#7C9BE0' },
  { pos: [0.9, -0.9, 0.4], scale: 0.55, color: '#FCE38A', strand: '#E8C64A' },
]

// Densely wind a sphere with many overlapping strands at golden-angle
// rotations so it reads as a full, tightly-wound ball of yarn (not a bare
// sphere). Still just primitive geometry, so it stays light and fast.
const WRAP_COUNT = 22
const GOLDEN = 2.399963 // golden angle in radians — spreads wraps evenly
const WRAPS = Array.from({ length: WRAP_COUNT }, (_, i) => ({
  rot: [i * GOLDEN, i * GOLDEN * 0.5, i * 1.13],
  r: 0.6 + (i % 3) * 0.012, // slight radius variation so layers overlap
}))

function YarnBall({ pos, scale, color, strand }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.9}>
      <group position={pos} scale={scale}>
        {/* Inner core, slightly darker so gaps between strands read as depth. */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.58, 40, 40]} />
          <meshStandardMaterial color={strand} roughness={1} metalness={0} />
        </mesh>
        {WRAPS.map((w, i) => (
          <mesh key={i} rotation={w.rot} castShadow>
            <torusGeometry args={[w.r, 0.072, 10, 72]} />
            <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Scene() {
  const group = useRef()
  const { pointer } = useThree()

  // Ease the whole group toward the pointer for a friendly parallax tilt.
  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y += (pointer.x * 0.5 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-pointer.y * 0.3 - group.current.rotation.x) * 0.05
  })

  return (
    <group ref={group}>
      {BALLS.map((b) => (
        <YarnBall key={b.color + b.pos.join()} {...b} />
      ))}
    </group>
  )
}

export default function Hero3D({ animate = true }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#A6C1EE" />
      <Suspense fallback={null}>
        <Scene />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.35}
          scale={10}
          blur={2.6}
          far={4}
          color="#5B4B57"
        />
        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  )
}
