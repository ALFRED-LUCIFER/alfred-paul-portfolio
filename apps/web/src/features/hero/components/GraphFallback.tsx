import { GRAPH_NODES, GRAPH_EDGES, ACCENT_HEX } from '../data/graph.data'

/** Projects 3D node positions onto a 2D viewBox */
function project([x, y]: [number, number, number]): [number, number] {
  return [200 + x * 60, 200 - y * 60]
}

export function GraphFallback() {
  const byId = new Map(GRAPH_NODES.map((n) => [n.id, n]))
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label="AI orchestration network connecting Developer, Copilot, MCP, Jira, Confluence, Architecture, Tests, Governance and Deployment"
    >
      {GRAPH_EDGES.map(([from, to]) => {
        const a = project(byId.get(from)!.position)
        const b = project(byId.get(to)!.position)
        return (
          <line
            key={`${from}-${to}`}
            x1={a[0]}
            y1={a[1]}
            x2={b[0]}
            y2={b[1]}
            stroke={ACCENT_HEX[byId.get(from)!.accent]}
            strokeWidth="0.75"
            opacity="0.35"
          />
        )
      })}
      {GRAPH_NODES.map((n) => {
        const [cx, cy] = project(n.position)
        const isHub = n.id === 'mcp'
        return (
          <g key={n.id}>
            <circle
              cx={cx}
              cy={cy}
              r={isHub ? 10 : 6}
              fill="#0c1220"
              stroke={ACCENT_HEX[n.accent]}
              strokeWidth={isHub ? 2 : 1.25}
              style={{ filter: `drop-shadow(0 0 ${isHub ? 8 : 4}px ${ACCENT_HEX[n.accent]})` }}
            />
            <text
              x={cx}
              y={cy - (isHub ? 16 : 12)}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
              fontFamily="JetBrains Mono Variable, monospace"
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
