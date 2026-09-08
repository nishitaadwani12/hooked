import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles, ContactShadows, Environment } from '@react-three/drei'

// A modern, cute hero: a big squishy candy blob that gently wobbles and
// morphs, orbited by glossy little companions, with sparkles drifting around.
// All soft primitive geometry, so it stays light and fast.

function Blob() {
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh castShadow>
        <sphereGeometry args={[1.25, 128, 128]} />
        <MeshDistortMaterial
          color="#FFB8CB"
          distort={0.38}
          speed={2.2}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>
    </Float>
  )
}

function Companion({ position, scale, color, speed }) {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.4}>
      <mesh position={position} scale={scale} castShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={3} roughness={0.2} metalness={0.05} />
      </mesh>
    </Float>
  )
}

function Scene() {
  const group = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y += (pointer.x * 0.4 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-pointer.y * 0.25 - group.current.rotation.x) * 0.05
  })

  return (
    <group ref={group}>
      <Blob />
      <Companion position={[-2.1, 0.6, -0.5]} scale={0.7} color="#B5D8CC" speed={2.4} />
      <Companion position={[2.1, -0.3, -0.6]} scale={0.85} color="#A6C1EE" speed={2} />
      <Companion position={[1.2, 1.4, -1]} scale={0.5} color="#FCE38A" speed={2.8} />
      <Sparkles count={40} scale={6} size={4} speed={0.4} color="#ffffff" opacity={0.8} />
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
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#A6C1EE" />
      <Suspense fallback={null}>
        <Scene />
        <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={11} blur={2.8} far={4} color="#5B4B57" />
        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  )
}
