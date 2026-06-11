export interface GraphNode {
  id: string
  label: string
  /** Position in R3F world units; z gives depth */
  position: [number, number, number]
  accent: 'cyan' | 'indigo' | 'violet' | 'ok'
}

export const GRAPH_NODES: GraphNode[] = [
  { id: 'mcp', label: 'MCP', position: [0, 0, 0], accent: 'cyan' },
  { id: 'developer', label: 'Developer', position: [-2.4, 1.4, 0.4], accent: 'indigo' },
  { id: 'copilot', label: 'Copilot', position: [2.3, 1.6, -0.3], accent: 'indigo' },
  { id: 'jira', label: 'Jira', position: [-2.8, -0.4, -0.5], accent: 'cyan' },
  { id: 'confluence', label: 'Confluence', position: [-1.6, -1.8, 0.3], accent: 'cyan' },
  { id: 'architecture', label: 'Architecture', position: [2.7, -0.2, 0.5], accent: 'violet' },
  { id: 'tests', label: 'Tests', position: [1.8, -1.7, -0.4], accent: 'violet' },
  { id: 'governance', label: 'Governance', position: [0.2, 2.3, 0.2], accent: 'ok' },
  { id: 'deployment', label: 'Deployment', position: [0, -2.5, -0.2], accent: 'ok' },
  { id: 'llm', label: 'LLM', position: [1.2, 0.8, 0.6], accent: 'indigo' },
]

/** Edges as [fromId, toId] — hub-and-spoke from MCP plus a few cross-links */
export const GRAPH_EDGES: Array<[string, string]> = [
  ['mcp', 'developer'],
  ['mcp', 'copilot'],
  ['mcp', 'jira'],
  ['mcp', 'confluence'],
  ['mcp', 'architecture'],
  ['mcp', 'tests'],
  ['mcp', 'governance'],
  ['mcp', 'deployment'],
  ['mcp', 'llm'],
  ['llm', 'copilot'],
  ['developer', 'copilot'],
  ['copilot', 'tests'],
  ['governance', 'deployment'],
  ['jira', 'confluence'],
]

export const ACCENT_HEX: Record<GraphNode['accent'], string> = {
  // Hex required here: three.js color inputs, not CSS. Values mirror the CSS tokens.
  cyan: '#22d3ee',
  indigo: '#818cf8',
  violet: '#a855f7',
  ok: '#34d399',
}
