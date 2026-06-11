export interface SkillGroup {
  id: string
  name: string
  accent: 'cyan' | 'indigo' | 'violet' | 'ok' | 'warn'
  skills: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    accent: 'cyan',
    skills: ['React', 'TypeScript', 'Next.js', 'React Native', 'Tailwind CSS', 'Vitest', 'Playwright'],
  },
  {
    id: 'backend',
    name: 'Backend',
    accent: 'indigo',
    skills: ['.NET / C#', 'Node.js / NestJS', 'Python (FastAPI)', 'gRPC', 'REST APIs', 'EF Core / Prisma', 'PostgreSQL', 'SQL Server'],
  },
  {
    id: 'ai',
    name: 'AI Engineering',
    accent: 'violet',
    skills: [
      'LLM Integration',
      'Agentic AI',
      'GitHub Copilot',
      'Claude Agent SDK',
      'MCP (Model Context Protocol)',
      'RAG / LangChain',
      'Knowledge Graphs',
      'Prompt Engineering',
      'AI Governance',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud / DevOps',
    accent: 'ok',
    skills: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Harness', 'CI/CD'],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    accent: 'warn',
    skills: ['C4 Modeling', 'ADR', 'DDD', 'Platform Engineering', 'System Design', 'Observability'],
  },
]
