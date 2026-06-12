import { HUB, CLUSTERS, leafPosition, ACCENT_HEX } from '../data/graph.data'

/** Projects 3D node positions onto a 2D viewBox */
function project([x, y]: [number, number, number]): [number, number] {
  return [200 + x * 58, 200 - y * 58]
}

export function GraphFallback() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label={`AI-native SDLC neural network connecting ${CLUSTERS.map((c) => c.label).join(', ')}`}
    >
      {CLUSTERS.map((cluster) => {
        const [cx, cy] = project(cluster.position)
        const color = ACCENT_HEX[cluster.accent]
        return (
          <g key={cluster.id}>
            <line x1={200} y1={200} x2={cx} y2={cy} stroke={color} strokeWidth="0.9" opacity="0.3" />
            {cluster.leaves.map((leaf, i) => {
              const [lx, ly] = project(leafPosition(cluster, i, cluster.leaves.length))
              return (
                <g key={leaf}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={lx}
                    y2={ly}
                    stroke={color}
                    strokeWidth="0.6"
                    opacity="0.18"
                  />
                  <circle cx={lx} cy={ly} r="2" fill={color} opacity="0.7" />
                </g>
              )
            })}
            <circle
              cx={cx}
              cy={cy}
              r="6.5"
              fill="#0c1220"
              stroke={color}
              strokeWidth="1.5"
              style={{ filter: `drop-shadow(0 0 5px ${color})` }}
            />
            <text
              x={cx}
              y={cy - 11}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="9"
              fontFamily="JetBrains Mono Variable, monospace"
            >
              {cluster.label}
            </text>
          </g>
        )
      })}

      {/* Hub */}
      <circle
        cx={200}
        cy={200}
        r="13"
        fill="#0c1220"
        stroke={ACCENT_HEX.cyan}
        strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 10px ${ACCENT_HEX.cyan})` }}
      />
      <text
        x={200}
        y={228}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize="11"
        fontWeight="700"
        fontFamily="JetBrains Mono Variable, monospace"
      >
        {HUB.title}
      </text>
      <text
        x={200}
        y={240}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="8"
        fontFamily="JetBrains Mono Variable, monospace"
      >
        {HUB.subtitle}
      </text>
    </svg>
  )
}
