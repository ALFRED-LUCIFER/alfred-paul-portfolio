export interface PipelineStage {
  id: string
  name: string
  detail: string
  kind: 'human' | 'agent' | 'gate' | 'system'
}

export const PIPELINE: PipelineStage[] = [
  { id: 'idea', name: 'Idea', detail: 'Problem framing with stakeholders', kind: 'human' },
  {
    id: 'requirement',
    name: 'Requirement',
    detail: 'Acceptance criteria, constraints, success measures',
    kind: 'human',
  },
  {
    id: 'jira',
    name: 'Jira',
    detail: 'Tickets enriched via MCP — agents read the same source of truth',
    kind: 'system',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    detail: 'C4 views and ADRs set the guardrails before code',
    kind: 'human',
  },
  {
    id: 'code-agent',
    name: 'Code Agent',
    detail: 'Implementation drafted within documented boundaries',
    kind: 'agent',
  },
  {
    id: 'test-agent',
    name: 'Test Agent',
    detail: 'Unit and E2E coverage generated alongside the change',
    kind: 'agent',
  },
  {
    id: 'review-agent',
    name: 'Review Agent',
    detail: 'Standards scoring against company engineering rules',
    kind: 'agent',
  },
  {
    id: 'gate',
    name: 'Governance Gate',
    detail: 'Human sign-off — engineers stay the final authority',
    kind: 'gate',
  },
  { id: 'deploy', name: 'Deployment', detail: 'CI/CD with progressive rollout', kind: 'system' },
  {
    id: 'observe',
    name: 'Observability',
    detail: 'Telemetry feeds back into planning',
    kind: 'system',
  },
  {
    id: 'memory',
    name: 'Learning Memory',
    detail: 'Decisions persist — the next cycle starts smarter',
    kind: 'agent',
  },
]

export const SDLC_THESIS =
  'AI does not replace engineering discipline. It amplifies it — through orchestration, guardrails, and review.'
