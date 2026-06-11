import { Workflow, Code2, DraftingCompass, Users, Bot, type LucideIcon } from 'lucide-react'

export interface Role {
  icon: LucideIcon
  title: string
  description: string
  accent: 'cyan' | 'indigo' | 'violet'
}

export const ROLES: Role[] = [
  {
    icon: Workflow,
    title: 'AI Transformation Lead',
    description:
      'Driving enterprise AI adoption end to end — strategy, enablement, governance, and measurable engineering outcomes.',
    accent: 'cyan',
  },
  {
    icon: Code2,
    title: 'Full-Stack Engineer',
    description:
      'Hands-on across React, TypeScript, .NET, Node.js, and Python — shipping production systems, not slideware.',
    accent: 'indigo',
  },
  {
    icon: DraftingCompass,
    title: 'AI Architect',
    description:
      'Designing agentic AI systems, LLM integrations, MCP servers, and knowledge graphs with C4 thinking and ADR discipline.',
    accent: 'violet',
  },
  {
    icon: Users,
    title: 'Engineering Manager',
    description:
      'Leading a distributed team of 20 engineers across Dubai and Austria — hiring, mentoring, and delivery ownership.',
    accent: 'cyan',
  },
  {
    icon: Bot,
    title: 'Agentic SDLC Orchestrator',
    description:
      'Composing code, test, and review agents into governed pipelines that amplify — never replace — engineering discipline.',
    accent: 'indigo',
  },
]
