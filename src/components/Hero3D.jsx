import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// A dreamy cloud of cute 3D charms — hearts, stars and little donuts — drifting
// and spinning across the hero. Soft candy colours with a glossy finish.

function useHeartGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0.25, 0.25)
    s.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0)
    s.bezierCurveTo(-0.3, 0, -0.3, 0.35, -0.3, 0.35)
    s.bezierCurveTo(-0.3, 0.55, -0.1, 0.77, 0.25, 0.95)
    s.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35)
    s.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0)
    s.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25)
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 6,
    })
    geo.center()
    geo.rotateZ(Math.PI) // point the heart the right way up
    return geo
  }, [])
}

function useStarGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    const spikes = 5
    const outer = 0.55
    const inner = 0.24
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)
    }
    s.closePath()
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 6,
    })
    geo.center()
    return geo
  }, [])
}

function Charm({ geometry, position, scale, color, floatSpeed, spin }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * spin
  })
  return (
    <Float speed={floatSpeed} rotationIntensity={0.7} floatIntensity={1.5}>
      <mesh ref={ref} geometry={geometry} position={position} scale={scale} castShadow>
        <meshStandardMaterial color={color} roughness={0.28} metalness={0.06} />
      </mesh>
    </Float>
  )
}

function Donut({ position, scale, color, floatSpeed, spin }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * spin
  })
  return (
    <Float speed={floatSpeed} rotationIntensity={0.8} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale} castShadow>
        <torusGeometry args={[0.42, 0.2, 24, 48]} />
        <meshStandardMaterial color={color} roughness={0.28} metalness={0.06} />
      </mesh>
    </Float>
  )
}

const COLORS = ['#FF9DB6', '#FFD1DC', '#B5D8CC', '#A6C1EE', '#FCE38A']

function Scene() {
  const heart = useHeartGeometry()
  const star = useStarGeometry()
  const group = useRef()
  const { pointer } = useThree()

  // A spread-out arrangement of charms across the whole hero.
  const charms = useMemo(
    () => [
      { kind: 'heart', geo: heart, position: [-3.2, 1.4, -1], scale: 0.9, spin: 0.3 },
      { kind: 'star', geo: star, position: [3.1, 1.7, -1.5], scale: 0.8, spin: 0.5 },
      { kind: 'donut', position: [-2.6, -1.4, -0.5], scale: 0.9, spin: 0.6 },
      { kind: 'heart', geo: heart, position: [2.6, -1.1, 0], scale: 1.1, spin: -0.35 },
      { kind: 'star', geo: star, position: [0.2, 2.1, -1], scale: 0.6, spin: 0.5 },
      { kind: 'donut', position: [3.6, 0.1, -1], scale: 0.7, spin: -0.5 },
      { kind: 'heart', geo: heart, position: [-3.8, -0.3, -1.5], scale: 0.65, spin: 0.4 },
      { kind: 'star', geo: star, position: [-1.2, -1.9, 0.2], scale: 0.75, spin: -0.45 },
      { kind: 'donut', position: [1.1, 1.1, 0.3], scale: 1, spin: 0.4 },
      { kind: 'heart', geo: heart, position: [0.4, -0.4, 0.6], scale: 1.3, spin: -0.25 },
    ],
    [heart, star],
  )

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * 0.04
    group.current.rotation.x += (-pointer.y * 0.15 - group.current.rotation.x) * 0.04
  })

  return (
    <group ref={group}>
      {charms.map((c, i) => {
        const color = COLORS[i % COLORS.length]
        const floatSpeed = 1.4 + (i % 4) * 0.4
        if (c.kind === 'donut') {
          return <Donut key={i} position={c.position} scale={c.scale} color={color} floatSpeed={floatSpeed} spin={c.spin} />
        }
        return (
          <Charm
            key={i}
            geometry={c.geo}
            position={c.position}
            scale={c.scale}
            color={color}
            floatSpeed={floatSpeed}
            spin={c.spin}
          />
        )
      })}
      <Sparkles count={60} scale={10} size={4} speed={0.4} color="#ffffff" opacity={0.7} />
    </group>
  )
}

export default function Hero3D({ animate = true }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 48 }}
      frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 2, -2]} intensity={0.5} color="#A6C1EE" />
      <Suspense fallback={null}>
        <Scene />
        <ContactShadows position={[0, -2.6, 0]} opacity={0.22} scale={14} blur={3} far={5} color="#5B4B57" />
        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  )
}
