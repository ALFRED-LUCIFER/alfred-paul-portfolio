export type Accent = 'cyan' | 'indigo' | 'violet' | 'ok'

export interface ClusterNode {
  id: string
  label: string
  accent: Accent
  /** Position in R3F world units; z gives depth */
  position: [number, number, number]
  /** Resume-derived capabilities rendered as leaf neurons */
  leaves: string[]
}

/** Central core of the neural network */
export const HUB = {
  title: 'AI-Native SDLC',
  subtitle: 'agentic engineering os',
} as const

const RADIUS = 2.1

const polar = (deg: number, z: number): [number, number, number] => {
  const a = (deg * Math.PI) / 180
  return [Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, z]
}

/** Eight capability clusters, content mirrors the resume */
export const CLUSTERS: ClusterNode[] = [
  {
    id: 'leadership',
    label: 'Leadership & Governance',
    accent: 'ok',
    position: polar(90, 0.3),
    leaves: ['20 Engineers Led', 'AI Adoption', 'AI Governance', 'Agile at Scale', 'Mentoring'],
  },
  {
    id: 'intelligence',
    label: 'AI & Intelligence',
    accent: 'violet',
    position: polar(45, -0.25),
    leaves: ['LLM Systems', 'RAG Pipelines', 'LangChain', 'Knowledge Graph', 'Prompt Engineering'],
  },
  {
    id: 'engineering',
    label: 'Engineering Excellence',
    accent: 'cyan',
    position: polar(0, 0.3),
    leaves: ['.NET Core', 'React / Next.js', 'NestJS / Node.js', 'Python', 'TypeScript'],
  },
  {
    id: 'quality',
    label: 'Quality & Reliability',
    accent: 'ok',
    position: polar(-45, -0.25),
    leaves: ['Test Automation', 'Quality Gates', 'Playwright', 'Observability'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    accent: 'indigo',
    position: polar(-90, 0.3),
    leaves: ['Azure', 'AWS', 'Kubernetes', 'Docker', 'Harness CI/CD'],
  },
  {
    id: 'architecture',
    label: 'Architecture Thinking',
    accent: 'violet',
    position: polar(-135, -0.25),
    leaves: ['Microservices', 'C4 / ADR', 'System Design', 'Legacy Modernization'],
  },
  {
    id: 'enterprise',
    label: 'Enterprise Integration',
    accent: 'cyan',
    position: polar(180, 0.3),
    leaves: ['MCP Servers', 'Jira', 'Confluence', 'Copilot Studio', 'GitHub'],
  },
  {
    id: 'agentic',
    label: 'Agentic Orchestration',
    accent: 'indigo',
    position: polar(135, -0.25),
    leaves: ['Multi-Agent Systems', 'Claude Agent SDK', 'Planner Agents', 'Approval Gates', 'AI Review Loop'],
  },
]

/** Leaf neurons fan outward from their cluster, away from the hub */
export function leafPosition(
  cluster: ClusterNode,
  index: number,
  total: number
): [number, number, number] {
  const [cx, cy, cz] = cluster.position
  const outward = Math.atan2(cy, cx)
  const fan = Math.PI * 0.8
  const angle = outward - fan / 2 + (fan * (index + 0.5)) / total
  const radius = 0.95
  const z = cz + ((index % 3) - 1) * 0.22
  return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, z]
}

export const ACCENT_HEX: Record<Accent, string> = {
  // Hex required here: three.js color inputs, not CSS. Values mirror the CSS tokens.
  cyan: '#22d3ee',
  indigo: '#818cf8',
  violet: '#a855f7',
  ok: '#34d399',
}
