export interface Post {
  id: string
  topic: string
  hook: string
  date: string
  url: string
}

/**
 * Curated LinkedIn writing. Replace `url` with direct post links during
 * the content fact-check pass — the activity URL below is a working interim link.
 */
const ACTIVITY_URL = 'https://www.linkedin.com/in/alfred-paul-56438454/recent-activity/all/'

export const POSTS: Post[] = [
  {
    id: 'agentic-sdlc',
    topic: 'Agentic SDLC',
    hook: 'What actually changes when agents join your delivery pipeline — and what absolutely must not.',
    date: '2026',
    url: ACTIVITY_URL,
  },
  {
    id: 'mcp-enterprise',
    topic: 'MCP in the Enterprise',
    hook: 'Connecting on-prem Jira and Confluence to AI agents: the integration nobody talks about.',
    date: '2026',
    url: ACTIVITY_URL,
  },
  {
    id: 'ai-governance',
    topic: 'AI Governance',
    hook: 'Speed without governance is just expensive rework. How review gates keep AI-assisted teams honest.',
    date: '2026',
    url: ACTIVITY_URL,
  },
]
