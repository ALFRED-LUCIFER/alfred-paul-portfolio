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
    company: 'LiSEC Austria GmbH',
    location: 'Dubai, UAE',
    type: 'Full-time · 4 yrs 7 mos',
    highlights: [
      'Delivered AI-powered chatbot using Qwen + RAG for dynamic Q&A over internal docs',
      'Introduced Copilot + Cursor.ai workflows — boosted dev productivity by 40%',
      'Spearheaded DevOps pipelines; reduced release cycle by 60%',
      'Led Agile delivery with global teams across Dubai and Austria',
      'Mentored developers in AI-assisted development & modern full-stack design patterns',
    ],
    skills: ['Python', 'Qwen', 'RAG', '.NET Core', 'React', 'Azure', 'Docker', 'Copilot', 'Cursor.ai'],
  },
  {
    period: 'Oct 2020 - Oct 2021',
    title: 'Senior Software Developer – .NET & Agile Product Delivery',
    company: 'LiSEC Austria GmbH',
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
    title: 'Software Engineer',
    company: 'LiSEC Austria GmbH',
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
    period: '2008 - 2012',
    degree: 'Bachelor of Engineering – Computer Science',
    institution: 'Oriental Engineering College',
    location: 'India',
  },
]
