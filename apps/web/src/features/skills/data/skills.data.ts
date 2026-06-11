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
    skills: ['React', 'TypeScript', 'Next.js', 'MUI', 'Tailwind CSS', 'Vitest', 'Playwright'],
  },
  {
    id: 'backend',
    name: 'Backend',
    accent: 'indigo',
    skills: ['.NET', 'C#', 'gRPC', 'REST APIs', 'EF Core', 'xUnit / NUnit'],
  },
  {
    id: 'ai',
    name: 'AI Engineering',
    accent: 'violet',
    skills: [
      'GitHub Copilot',
      'Claude',
      'MCP',
      'Agentic Workflows',
      'Knowledge Graphs',
      'RAG',
      'Prompt Engineering',
      'AI Governance',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud / DevOps',
    accent: 'ok',
    skills: ['Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Datadog', 'CI/CD'],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    accent: 'warn',
    skills: ['C4 Modeling', 'ADR', 'DDD', 'Platform Engineering', 'System Design', 'Observability'],
  },
]
