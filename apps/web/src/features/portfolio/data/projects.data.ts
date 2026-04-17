export type ProjectCategory =
  | 'AI Development'
  | 'Full-Stack Development'
  | 'Developer Tools'
  | 'Cloud & DevOps'
  | 'Team Management'

export interface CaseStudy {
  problem: string
  solution: string
  impact: string
  metrics: Array<{ label: string; value: string }>
}

export interface Project {
  id: number
  title: string
  description: string
  category: ProjectCategory
  technologies: string[]
  features: [string, string, string, string]
  liveUrl: string | null
  githubUrl: string | null
  featured: boolean
  caseStudy: CaseStudy
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Enterprise RAG Chatbot with Quin',
    description:
      'Built an AI-powered chatbot using Retrieval-Augmented Generation pipelines for internal documentation queries with semantic search capabilities.',
    category: 'AI Development',
    technologies: ['Python', 'LangChain', 'RAG', 'Quin', 'OpenAI'],
    features: [
      'Semantic search across technical manuals',
      'Context-aware responses',
      'Document-level indexing',
      'Multi-language support',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      problem:
        'Engineers spent 2–3 hours daily searching across 800+ technical manuals and PDFs in German and English, causing delays in customer support and project delivery.',
      solution:
        'Built a RAG pipeline using LangChain and the Quin internal LLM. Documents are chunked, embedded with OpenAI embeddings, and stored in a vector database. The chatbot retrieves semantically similar chunks and generates grounded answers with citations.',
      impact:
        'Documentation lookup time dropped from ~2 hours to under 2 minutes. Engineers now find accurate cross-lingual answers instantly, directly improving customer SLA adherence.',
      metrics: [
        { label: 'Search Time Reduction', value: '98%' },
        { label: 'Languages Supported', value: '2' },
        { label: 'Documents Indexed', value: '800+' },
        { label: 'Team Adoption Rate', value: '100%' },
      ],
    },
  },
  {
    id: 2,
    title: 'Industrial Automation Platform',
    description:
      'Modernized legacy monolithic industrial automation system into microservices architecture with React frontend and .NET Core APIs.',
    category: 'Full-Stack Development',
    technologies: ['.NET Core', 'React', 'Azure', 'SQL Server', 'Docker'],
    features: [
      'Real-time machine data processing',
      'Modular microservices architecture',
      'Azure cloud deployment',
      '30% faster deployment cycles',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      problem:
        'A 15-year-old monolithic .NET application had become unmaintainable. Deployments required 4-hour maintenance windows, and a single bug in one module could take down the entire platform.',
      solution:
        'Led a phased migration to microservices over 18 months. Strangler fig pattern isolated domains one at a time. React replaced legacy WebForms. Azure Service Bus decoupled inter-service communication. Docker + Kubernetes enabled independent deploys.',
      impact:
        'Deployment windows eliminated entirely. Teams can ship independently with zero-downtime rolling updates. System reliability improved from 97.2% to 99.7% uptime.',
      metrics: [
        { label: 'Deployment Time', value: '-30%' },
        { label: 'Uptime Improvement', value: '99.7%' },
        { label: 'Modules Extracted', value: '12' },
        { label: 'Downtime Eliminated', value: '100%' },
      ],
    },
  },
  {
    id: 3,
    title: 'AI-Assisted Development Toolkit',
    description:
      'Created internal tools integrating GitHub Copilot and Cursor.ai workflows to accelerate development with automated code generation and testing.',
    category: 'Developer Tools',
    technologies: ['GitHub Copilot', 'Cursor.ai', 'VS Code', 'Python', 'TypeScript'],
    features: [
      '40% improvement in code generation',
      'Automated documentation drafts',
      'Inline code suggestions',
      'Reduced testing cycles',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      problem:
        'A 15-engineer team was spending 40% of sprint capacity on boilerplate code, unit test scaffolding, and inline documentation — work that distracted from feature delivery.',
      solution:
        'Established AI-augmented development workflows. Standardised Copilot prompt patterns across the team. Built Cursor.ai rule sets aligned to our .NET/React coding standards. Created a shared prompt library for common tasks (DTO generation, test scaffolding, ADR writing).',
      impact:
        'Sprint velocity increased by 40%. Engineers report higher job satisfaction with focus shifted to architecture and business logic rather than boilerplate.',
      metrics: [
        { label: 'Code Generation Speed', value: '+40%' },
        { label: 'Boilerplate Time Saved', value: '60%' },
        { label: 'Engineers Onboarded', value: '15' },
        { label: 'Sprint Velocity Gain', value: '40%' },
      ],
    },
  },
  {
    id: 4,
    title: 'Cloud Migration & DevOps Pipeline',
    description:
      'Led migration of enterprise applications to Azure with comprehensive CI/CD pipelines, reducing deployment time and improving system reliability.',
    category: 'Cloud & DevOps',
    technologies: ['Azure', 'GitHub Actions', 'Docker', 'Kubernetes', 'Terraform'],
    features: [
      'Automated deployment pipelines',
      'Infrastructure as Code',
      'Zero-downtime deployments',
      'Comprehensive monitoring',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: false,
    caseStudy: {
      problem:
        'On-premises infrastructure required manual deployments via RDP and had no automated testing gates. A failed prod release required 6 hours of rollback effort and full team involvement.',
      solution:
        'Designed Azure-first infrastructure using Terraform for IaC. GitHub Actions pipelines run lint, unit tests, and integration tests before any deployment. Blue-green deployment strategy on AKS enables instant rollback. Azure Monitor + PagerDuty alert on anomalies.',
      impact:
        'Last 12 months: zero failed production releases. Mean time to recovery dropped from 6 hours to 8 minutes via automated rollback.',
      metrics: [
        { label: 'Failed Prod Releases', value: '0' },
        { label: 'MTTR', value: '8 min' },
        { label: 'Pipeline Stages', value: '6' },
        { label: 'Infra Cost Reduction', value: '25%' },
      ],
    },
  },
  {
    id: 5,
    title: 'Team Collaboration Platform',
    description:
      'Built internal platform for distributed team collaboration with real-time communication, project tracking, and code review workflows.',
    category: 'Team Management',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Docker'],
    features: [
      'Real-time team communication',
      'Integrated code review',
      'Project tracking dashboard',
      'Multi-timezone support',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: false,
    caseStudy: {
      problem:
        'A distributed team across Dubai, India, and Austria used 4 separate tools for communication, tracking, reviews, and documentation — causing context-switching overhead and missed updates across timezones.',
      solution:
        'Built a unified internal platform with React + Node.js. Socket.io powers real-time notifications and chat. A shared sprint board replaces Jira for internal use. Code review checklists are embedded directly alongside PR diffs.',
      impact:
        'Team tool context-switching dropped by 70%. Cross-timezone misalignment issues fell from weekly occurrences to near zero. Onboarding time for new engineers reduced by 2 days.',
      metrics: [
        { label: 'Tools Consolidated', value: '4 → 1' },
        { label: 'Timezone Coverage', value: '3 zones' },
        { label: 'Onboarding Time', value: '-2 days' },
        { label: 'Missed Updates', value: '~0' },
      ],
    },
  },
]

export const PROJECT_CATEGORIES = ['All', ...new Set(PROJECTS.map((p) => p.category))] as const
