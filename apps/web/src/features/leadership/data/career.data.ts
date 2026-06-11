export interface CareerEntry {
  period: string
  title: string
  company: string
  location: string
  type: string
  highlights: string[]
  skills: string[]
}

export const CAREER: CareerEntry[] = [
  {
    period: 'Oct 2021 - Present',
    title: 'Team Leader – Software Development & AI Initiatives',
    company: 'LiSEC Automation Middle East FZ-LLC',
    location: 'Dubai, UAE',
    type: 'Full-time · 4 yrs 7 mos',
    highlights: [
      'Led and mentored a distributed team of 20 engineers across Dubai and Austria',
      'Delivered AI-powered RAG chatbot (LangChain + OpenAI) for Q&A over 800+ internal docs',
      'Introduced and governed AI-assisted development (Copilot, Cursor.ai, Claude Agent SDK) — boosted dev productivity by 40%',
      'Spearheaded CI/CD pipelines with GitHub Actions and Harness; reduced release cycle by 60%',
      'Designed scalable backends in .NET Core, Python, and NestJS on Azure and AWS',
    ],
    skills: ['Python', 'LangChain', 'RAG', '.NET Core', 'NestJS', 'React', 'Azure', 'AWS', 'Kubernetes', 'Copilot', 'Claude Agent SDK'],
  },
  {
    period: 'Oct 2020 - Oct 2021',
    title: 'Senior Software Developer – Full-Stack (.NET & Cloud)',
    company: 'LiSEC Automation Middle East FZ-LLC',
    location: 'Dubai, UAE',
    type: 'Full-time · 1 yr 1 mo',
    highlights: [
      'Delivered mission-critical features for industrial applications in React + .NET',
      'Refactored monoliths into modular services with CI/CD pipelines',
      'Acted as Scrum lead, ensuring high sprint throughput and minimal blockers',
      'High-availability architecture design for glass automation systems',
    ],
    skills: ['.NET Core', 'React', 'Azure', 'SQL Server', 'Agile', 'Microservices'],
  },
  {
    period: 'Sep 2013 - Oct 2020',
    title: 'Full-Stack Software Developer',
    company: 'LiSEC Automation Middle East FZ-LLC',
    location: 'Dubai, UAE',
    type: 'Full-time · 7 yrs 2 mos',
    highlights: [
      'Developed software for industrial glass automation systems using C# and .NET',
      'Built internal development tools and reusable component libraries',
      'Migrated legacy components to Python and mentored junior developers',
      'Established technical documentation and code review standards',
    ],
    skills: ['C#', '.NET Framework', 'Python', 'Industrial Automation', 'SQL Server'],
  },
]

export interface EducationEntry {
  period: string
  degree: string
  institution: string
  location: string
}

export const EDUCATION: EducationEntry[] = [
  {
    period: '2004 - 2008',
    degree: 'Bachelor of Engineering – Computer Science',
    institution: 'RGPV Technical University',
    location: 'Bhopal, India',
  },
]
