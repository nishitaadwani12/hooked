import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, ContactShadows, Environment } from '@react-three/drei'

// A cluster of soft pastel "yarn balls" that gently bob and drift toward the
// pointer. Deliberately built from simple geometry (no downloaded models) so
// it stays tiny and fast on phones.

const BALLS = [
  { pos: [0, 0.2, 0], scale: 1.15, color: '#FFD1DC' },
  { pos: [-1.9, -0.5, -0.6], scale: 0.7, color: '#B5D8CC' },
  { pos: [1.8, 0.4, -0.8], scale: 0.8, color: '#A6C1EE' },
  { pos: [0.9, -0.9, 0.4], scale: 0.55, color: '#FCE38A' },
]

function YarnBall({ pos, scale, color }) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh position={pos} scale={scale} castShadow>
        {/* A knotted torus reads as a wound ball of yarn. */}
        <torusKnotGeometry args={[0.6, 0.26, 160, 24, 2, 3]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
      </mesh>
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
      {BALLS.map((b, i) => (
        <YarnBall key={i} {...b} />
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
