import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'
import type { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three'
import { HUB, CLUSTERS, leafPosition, ACCENT_HEX, type ClusterNode } from '../data/graph.data'

const ORIGIN = new Vector3(0, 0, 0)

/** Central core: pulsing sphere wrapped in a counter-rotating wireframe shell */
function Hub() {
  const shell = useRef<Mesh>(null)
  const core = useRef<MeshStandardMaterial>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (shell.current) {
      shell.current.rotation.y = -t * 0.25
      shell.current.rotation.x = t * 0.12
    }
    if (core.current) core.current.emissiveIntensity = 1.6 + Math.sin(t * 2) * 0.4
  })

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          ref={core}
          color={ACCENT_HEX.cyan}
          emissive={ACCENT_HEX.cyan}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.58, 1]} />
        <meshBasicMaterial wireframe color={ACCENT_HEX.cyan} transparent opacity={0.22} toneMapped={false} />
      </mesh>
      <Html
        center
        distanceFactor={8}
        position={[0, -0.98, 0]}
        style={{ pointerEvents: 'none', textAlign: 'center' }}
      >
        <div className="font-mono whitespace-nowrap">
          <div className="text-[13px] font-bold tracking-tight" style={{ color: '#e2e8f0' }}>
            {HUB.title}
          </div>
          <div className="text-[9px] tracking-wider" style={{ color: '#94a3b8' }}>
            {HUB.subtitle}
          </div>
        </div>
      </Html>
    </group>
  )
}

/** Glowing signal traveling from the hub along a spoke — neural firing */
function SignalPulse({
  to,
  color,
  offset,
}: {
  to: [number, number, number]
  color: string
  offset: number
}) {
  const ref = useRef<Mesh>(null)
  const target = useMemo(() => new Vector3(...to), [to])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (clock.getElapsedTime() * 0.18 + offset) % 1
    ref.current.position.lerpVectors(ORIGIN, target, t)
    const fade = Math.sin(t * Math.PI)
    ref.current.scale.setScalar(0.5 + fade)
    ;(ref.current.material as MeshBasicMaterial).opacity = fade * 0.9
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} transparent toneMapped={false} />
    </mesh>
  )
}

/** One capability cluster: spoke, breathing node, leaf neurons, labels on focus */
function Cluster({
  cluster,
  index,
  active,
  onHover,
}: {
  cluster: ClusterNode
  index: number
  active: boolean
  onHover: (id: string | null) => void
}) {
  const matRef = useRef<MeshStandardMaterial>(null)
  const color = ACCENT_HEX[cluster.accent]

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.emissiveIntensity =
        (active ? 1.9 : 1.0) + Math.sin(clock.getElapsedTime() * 1.7 + index * 1.3) * 0.3
    }
  })

  const leaves = useMemo(
    () =>
      cluster.leaves.map((leaf, i) => ({
        leaf,
        pos: leafPosition(cluster, i, cluster.leaves.length),
      })),
    [cluster]
  )

  return (
    <group>
      <Line
        points={[[0, 0, 0], cluster.position]}
        color={color}
        transparent
        opacity={active ? 0.5 : 0.22}
        lineWidth={active ? 1.4 : 1}
      />
      <group position={cluster.position}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation()
            onHover(cluster.id)
          }}
          onPointerOut={() => onHover(null)}
          scale={active ? 1.25 : 1}
        >
          <sphereGeometry args={[0.15, 24, 24]} />
          <meshStandardMaterial ref={matRef} color={color} emissive={color} toneMapped={false} />
        </mesh>
        <Html center distanceFactor={8} position={[0, 0.36, 0]} style={{ pointerEvents: 'none' }}>
          <span
            className="font-mono text-[11px] whitespace-nowrap transition-colors"
            style={{
              color: active ? color : '#94a3b8',
              textShadow: active ? `0 0 12px ${color}` : 'none',
            }}
          >
            {cluster.label}
          </span>
        </Html>
      </group>
      {leaves.map(({ leaf, pos }) => (
        <group key={leaf}>
          <Line
            points={[cluster.position, pos]}
            color={color}
            transparent
            opacity={active ? 0.35 : 0.12}
            lineWidth={0.6}
          />
          <mesh position={pos}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={active ? 1.6 : 0.7}
              toneMapped={false}
            />
          </mesh>
          {active && (
            <Html
              center
              distanceFactor={8}
              position={[pos[0], pos[1] + 0.2, pos[2]]}
              style={{ pointerEvents: 'none' }}
            >
              <span className="font-mono text-[9px] whitespace-nowrap" style={{ color }}>
                {leaf}
              </span>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}

function Network() {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [autoIdx, setAutoIdx] = useState(0)

  // Spotlight cycles through clusters; hovering pins it
  useEffect(() => {
    if (hovered) return
    const id = setInterval(() => setAutoIdx((i) => (i + 1) % CLUSTERS.length), 2800)
    return () => clearInterval(id)
  }, [hovered])

  const activeId = hovered ?? CLUSTERS[autoIdx].id

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    // Slow autonomous rotation + subtle pointer parallax
    group.current.rotation.y = t * 0.07 + pointer.x * 0.12
    group.current.rotation.x = Math.sin(t * 0.07) * 0.06 + pointer.y * -0.08
  })

  return (
    <group ref={group}>
      <Hub />
      {CLUSTERS.map((cluster, i) => (
        <Cluster
          key={cluster.id}
          cluster={cluster}
          index={i}
          active={cluster.id === activeId}
          onHover={setHovered}
        />
      ))}
      {CLUSTERS.map((cluster, i) => (
        <SignalPulse
          key={cluster.id}
          to={cluster.position}
          color={ACCENT_HEX[cluster.accent]}
          offset={i / CLUSTERS.length}
        />
      ))}
    </group>
  )
}

export default function OrchestrationGraph() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} />
      <Network />
    </Canvas>
  )
}
