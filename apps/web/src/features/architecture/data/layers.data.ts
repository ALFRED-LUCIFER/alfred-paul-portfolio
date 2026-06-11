export interface ArchLayer {
  id: string
  name: string
  detail: string
  accent: 'cyan' | 'indigo' | 'none'
}

/** Rendered top-down with L6 (governance) first */
export const LAYERS: ArchLayer[] = [
  {
    id: 'l6',
    name: 'Governance / Security / Quality Gates',
    detail: 'Review gates · audit trails · standards enforcement',
    accent: 'cyan',
  },
  {
    id: 'l5',
    name: 'AI Agents / MCP / Knowledge Graph',
    detail: 'Agentic workflows · MCP servers · graph-first context',
    accent: 'indigo',
  },
  {
    id: 'l4',
    name: 'Data / Cloud / Integration',
    detail: 'Azure · PostgreSQL · messaging · third-party systems',
    accent: 'none',
  },
  {
    id: 'l3',
    name: 'API / .NET / gRPC',
    detail: 'Service contracts · EF Core · domain services',
    accent: 'none',
  },
  {
    id: 'l2',
    name: 'Frontend / React / TypeScript',
    detail: 'Component systems · state management · testing',
    accent: 'none',
  },
  {
    id: 'l1',
    name: 'User Experience',
    detail: 'Accessibility · performance · clarity',
    accent: 'none',
  },
]

export const PRACTICES = [
  'C4 Modeling',
  'ADR Decision Records',
  'Domain-Driven Design',
  'Platform Engineering',
  'Testing Strategy',
  'Observability',
  'Frontend/Backend Boundaries',
] as const
