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

// A soft sphere wrapped in a few thin strands so it reads as a real wound
// ball of yarn — still just primitive geometry, so it stays light.
const WRAPS = [
  [0.2, 0.4, 0.1],
  [1.1, 0.9, 0.5],
  [0.6, 1.7, 1.2],
  [1.9, 0.3, 0.8],
]

function YarnBall({ pos, scale, color, strand }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.9}>
      <group position={pos} scale={scale}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
        </mesh>
        {WRAPS.map((rot, i) => (
          <mesh key={i} rotation={rot}>
            <torusGeometry args={[0.62, 0.045, 12, 80]} />
            <meshStandardMaterial color={strand} roughness={0.9} metalness={0} />
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
