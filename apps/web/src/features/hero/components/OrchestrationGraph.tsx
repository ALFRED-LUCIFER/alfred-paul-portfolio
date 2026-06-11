import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import { GRAPH_NODES, GRAPH_EDGES, ACCENT_HEX, type GraphNode } from '../data/graph.data'

function Node({ node }: { node: GraphNode }) {
  const [hovered, setHovered] = useState(false)
  const isHub = node.id === 'mcp'
  const color = ACCENT_HEX[node.accent]
  return (
    <group position={node.position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.35 : 1}
      >
        <sphereGeometry args={[isHub ? 0.22 : 0.13, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.2 : isHub ? 1.4 : 0.8}
          toneMapped={false}
        />
      </mesh>
      <Html
        center
        distanceFactor={8}
        position={[0, isHub ? 0.42 : 0.32, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span
          className="font-mono text-[11px] whitespace-nowrap transition-colors"
          style={{
            color: hovered ? color : '#94a3b8',
            textShadow: hovered ? `0 0 12px ${color}` : 'none',
          }}
        >
          {node.label}
        </span>
      </Html>
    </group>
  )
}

function Network() {
  const group = useRef<Group>(null)
  const byId = new Map(GRAPH_NODES.map((n) => [n.id, n]))

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    // Slow autonomous drift + subtle pointer parallax
    group.current.rotation.y = t * 0.08 + pointer.x * 0.15
    group.current.rotation.x = Math.sin(t * 0.05) * 0.08 + pointer.y * -0.1
  })

  return (
    <group ref={group}>
      {GRAPH_EDGES.map(([from, to]) => (
        <Line
          key={`${from}-${to}`}
          points={[byId.get(from)!.position, byId.get(to)!.position]}
          color={ACCENT_HEX[byId.get(from)!.accent]}
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
      {GRAPH_NODES.map((n) => (
        <Node key={n.id} node={n} />
      ))}
    </group>
  )
}

export default function OrchestrationGraph() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} />
      <Network />
    </Canvas>
  )
}
