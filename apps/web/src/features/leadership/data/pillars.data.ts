import {
  Gauge,
  Sparkles,
  ShieldCheck,
  DraftingCompass,
  BadgeCheck,
  Users,
  CalendarClock,
  Layers,
  type LucideIcon,
} from 'lucide-react'

export interface Pillar {
  icon: LucideIcon
  title: string
  description: string
}

export const LEADERSHIP_STATEMENT =
  'I help engineering teams adopt AI without losing architecture, quality, security, or ownership.'

export const PILLARS: Pillar[] = [
  {
    icon: Gauge,
    title: 'Developer Productivity',
    description:
      'Tooling, workflows, and AI assistance that remove friction — measured, not assumed.',
  },
  {
    icon: Sparkles,
    title: 'AI Enablement',
    description:
      'Hands-on Copilot and agent adoption programs that meet developers where they work.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance',
    description:
      'Review gates, audit trails, and standards that make AI-assisted delivery trustworthy.',
  },
  {
    icon: DraftingCompass,
    title: 'Architecture Alignment',
    description: 'C4 views and ADRs keep fast-moving teams building the same system.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Engineering',
    description:
      'Testing strategy as a first-class deliverable — unit, E2E, and agent-generated coverage.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Global teams across Dubai and Austria, aligned through rituals that earn their meeting slots.',
  },
  {
    icon: CalendarClock,
    title: 'Sprint & Delivery',
    description: 'Scrum leadership focused on throughput and predictability without burnout.',
  },
  {
    icon: Layers,
    title: 'Platform Thinking',
    description: 'Paved roads over tickets: reusable infrastructure that compounds across teams.',
  },
]
