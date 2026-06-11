export interface CaseStudyStrip {
  id: string
  label: string
  title: string
  challenge: string
  approach: string
  outcome: string
  accent: 'cyan' | 'indigo' | 'violet'
  /** Three-node mini flow rendered as the diagram */
  diagram: [string, string, string]
}

export const CASE_STUDIES: CaseStudyStrip[] = [
  {
    id: 'token-waste',
    label: 'CASE STUDY 01',
    title: 'Reducing AI token waste with knowledge-graph navigation',
    challenge:
      'Agents in large repositories spent most of their context window discovering structure — listing folders, opening wrong files, re-learning architecture every session.',
    approach:
      'Modeled the codebase as a knowledge graph (modules, contracts, ownership, dependencies) exposed via MCP, so agents resolve where to look before reading anything.',
    outcome:
      'Sessions start with the right files in context. Token budgets go to implementation instead of exploration, and architectural knowledge persists between sessions.',
    accent: 'cyan',
    diagram: ['Agent query', 'Knowledge graph', 'Targeted file set'],
  },
  {
    id: 'review-gates',
    label: 'CASE STUDY 02',
    title: 'Improving software delivery with agentic review gates',
    challenge:
      'AI-generated code at team scale risked inconsistent quality, architecture drift, and review fatigue for senior engineers.',
    approach:
      'Inserted layered gates into the pipeline: review agents score changes against engineering standards and ADRs, then a human governance gate makes the final call — with a full audit trail.',
    outcome:
      'AI-assisted changes arrive pre-screened and standards-scored. Engineers review judgement calls, not boilerplate — keeping ownership while gaining speed.',
    accent: 'indigo',
    diagram: ['Code agent output', 'Score + conformance', 'Human gate'],
  },
  {
    id: 'mcp-planning',
    label: 'CASE STUDY 03',
    title: 'Connecting Jira and Confluence through MCP for AI-assisted planning',
    challenge:
      'Planning context lived in Jira tickets and Confluence pages that AI tooling could not reach — agents worked blind to requirements and past decisions.',
    approach:
      'Built an enterprise MCP integration for on-prem Jira and Confluence, giving agents governed, read-write access to tickets and documentation from inside the dev workflow.',
    outcome:
      'Agents plan against real requirements and update tickets as work progresses. The same source of truth now serves humans and agents.',
    accent: 'violet',
    diagram: ['Jira + Confluence', 'MCP server', 'Planning agent'],
  },
]
