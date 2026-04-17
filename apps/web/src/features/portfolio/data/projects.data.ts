export type ProjectCategory =
  | 'AI Development'
  | 'Full-Stack Development'
  | 'Developer Tools'
  | 'Cloud & DevOps'
  | 'Team Management'
  | 'Enterprise AI Platform'

export interface AgentArchitecture {
  overviewDiagram: string
  detailedDiagram: string
  code: string
}

export interface CaseStudy {
  problem: string
  solution: string
  impact: string
  metrics: Array<{ label: string; value: string }>
  architecture?: AgentArchitecture
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
  {
    id: 6,
    title: 'Enterprise MCP: On-Prem Jira & Confluence AI',
    description:
      'Built a production Model Context Protocol (MCP) server connecting on-premise Jira and Confluence to Copilot Studio — enabling AI-powered IT service ticketing and knowledge-base Q&A with zero cloud data exposure.',
    category: 'Enterprise AI Platform',
    technologies: ['MCP (Anthropic)', 'Copilot Studio', 'Jira REST API', 'Confluence REST API', 'Python', 'On-Prem'],
    features: [
      'AI chatbot creates IT tickets with file attachments',
      'Natural language search across Confluence knowledge base',
      '100% on-prem — zero data leaves the organisation',
      'Copilot Studio integration for enterprise-grade UX',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      problem:
        'The IT helpdesk team was manually triaging service requests submitted via email and Teams chat. Engineers wasted 30–40 minutes per ticket finding the right Confluence docs to resolve issues. All data had to remain on-premises due to compliance requirements — no SaaS AI tools permitted.',
      solution:
        'Designed a custom MCP (Model Context Protocol) server that connects to on-premise Jira and Confluence REST APIs. Integrated with Microsoft Copilot Studio as the conversational UX layer. Users describe their issue in natural language; the AI creates a structured Jira ticket with priority, component, and attachment — or answers directly from indexed Confluence pages. All compute runs inside the corporate network.',
      impact:
        'IT ticket creation time dropped from 15 minutes to under 2 minutes. L1 support queries resolved at the chat layer without ticket creation increased by 60%. Full compliance maintained — zero data egress.',
      metrics: [
        { label: 'Ticket Creation Time', value: '-87%' },
        { label: 'L1 Deflection Rate', value: '60%' },
        { label: 'Data Compliance', value: '100% On-Prem' },
        { label: 'Confluence Pages Indexed', value: '500+' },
      ],
    },
  },
  {
    id: 7,
    title: 'AI Code Orchestration Agent (Jira → Production)',
    description:
      'Built an agentic orchestration platform that reads Jira requirements, plans full-stack implementation, and executes parallel sub-agents for code generation, unit testing, Cypress E2E, and code review — with human-in-the-loop approval and a satisfaction scoring gate.',
    category: 'Enterprise AI Platform',
    technologies: ['Claude Agent SDK', 'MCP', 'Jira API', 'TypeScript', 'Cypress', 'GitHub Actions'],
    features: [
      'Jira-to-code: reads tickets, drafts orchestration plan',
      'Human-in-the-loop approval before any execution',
      'Parallel agents: codegen + unit tests + Cypress + review',
      'Satisfaction scoring system enforces company standards',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      problem:
        'Developers spent 40–60% of feature work on repetitive scaffolding: reading Jira tickets, translating requirements to tasks, writing boilerplate code, creating unit tests, and setting up Cypress test suites — all before writing a single line of business logic. Quality gates were inconsistent and dependent on individual code reviewers.',
      solution:
        'Built an agentic pipeline using Claude Agent SDK and MCP. The orchestrator reads a Jira ticket, analyzes requirements, and produces a structured implementation plan (architecture → component breakdown → test strategy → Cypress scenarios). After human approval, it dispatches sub-agents in parallel: a code generation agent (TypeScript/React), a unit test agent (Jest), a Cypress E2E agent, and a code review agent. The review agent applies company-standard guardrails and scores each output on a 100-point rubric. Agents iterate until the satisfaction threshold is met.',
      impact:
        'End-to-end delivery from Jira ticket to reviewed, tested code reduced from 3 days to 4 hours for standard features. Guardrail enforcement eliminated 90% of standard code review comments. Developer focus shifted from scaffolding to architecture and business logic.',
      metrics: [
        { label: 'Feature Delivery Time', value: '-87%' },
        { label: 'Code Review Comments', value: '-90%' },
        { label: 'Agent Sub-Tasks Parallel', value: '4 agents' },
        { label: 'Standards Compliance', value: '100%' },
      ],
      architecture: {
        overviewDiagram: `flowchart TD
    U["Developer / Lead / PO"] --> DE["delivery-engine\\nSingle Entry Agent"]
    DE --> P1["Phase 1: Plan"]
    P1 --> P2["Codebase Research"]
    P1 --> P3["Jira Analysis"]
    P1 --> P4["Confluence Context"]
    P2 --> AP{"Approval Gate"}
    P3 --> AP
    P4 --> AP
    AP -->|Approved| EX["Phase 2: Execute"]
    AP -->|Refine| P1
    EX --> RT{"Workspace Routing"}
    RT -->|Backend Only| BE["Backend Orchestration"]
    RT -->|Frontend Only| FE["Frontend Orchestration"]
    RT -->|Full Stack| FS["Full-Stack Orchestration"]
    BE --> VR["Verification"]
    FE --> VR
    FS --> VR
    VR --> FR["Final Delivery Report"]`,
        detailedDiagram: `flowchart TB
    U["User / Developer"] --> DE["delivery-engine"]
    DE --> PLAN["Plan"]
    DE --> APPROVE["Approval"]
    DE --> EXEC["Execute"]
    DE --> VERIFY["Verify"]
    DE --> REPORT["Report"]
    PLAN --> EXP["Explore"]
    PLAN --> JIRA["jira-task-planner"]
    PLAN --> CONF["jira-confluence-planner"]
    APPROVE --> ROUTE{"Workspace Type"}
    ROUTE --> BO["Backend Only"]
    ROUTE --> FO["Frontend Only"]
    ROUTE --> FS["Full Stack"]
    subgraph BACKEND ["Backend Flow"]
        BO --> B1["backend-code-builder"]
        B1 --> B2["db-migration-generator"]
        B2 --> B3["test-writer"]
        B3 --> B4["code-reviewer"]
    end
    subgraph FRONTEND ["Frontend Flow"]
        FO --> F1["frontend-builder"]
        F1 --> F2["domain/controller validation"]
        F2 --> F3["test-generator"]
        F2 --> F4["cypress-generator"]
        F3 --> F5["code-reviewer"]
        F4 --> F5
    end
    subgraph FULLSTACK ["Full Stack Flow"]
        FS --> S1["backend-code-builder"]
        S1 --> S2["db-migration-generator"]
        S2 --> S3["frontend-builder"]
        S3 --> S4["domain/controller validation"]
        S4 --> S5["test-writer"]
        S4 --> S6["test-generator"]
        S4 --> S7["cypress-generator"]
        S5 --> S8["code-reviewer"]
        S6 --> S8
        S7 --> S8
        S8 --> S9["cross-contract verification"]
    end
    B4 --> VERIFY
    F5 --> VERIFY
    S9 --> VERIFY
    VERIFY --> REPORT`,
        code: `// delivery-engine.ts — Single entry orchestrator
export async function deliveryEngine(ticket: JiraTicket): Promise<DeliveryReport> {
  // Phase 1: Plan — parallel research
  const [codebaseCtx, jiraPlan, confluenceCtx] = await Promise.all([
    exploreAgent.analyze(ticket),
    jiraTaskPlanner.plan(ticket),
    jiraConfluencePlanner.fetch(ticket),
  ])

  // Approval gate — human-in-the-loop
  const plan = buildPlan(codebaseCtx, jiraPlan, confluenceCtx)
  const approved = await humanApprovalGate(plan)
  if (!approved) return deliveryEngine(ticket) // refine loop

  // Phase 2: Execute — route by workspace type
  const result = await route(plan)

  // Phase 3: Verify & Report
  const verified = await verifyAgent.run(result)
  return generateDeliveryReport(verified)
}

async function route(plan: Plan): Promise<AgentOutput> {
  switch (plan.workspaceType) {
    case 'backend':  return backendFlow(plan)
    case 'frontend': return frontendFlow(plan)
    case 'fullstack': return fullStackFlow(plan)
  }
}

// --- Backend Flow (sequential) ---
async function backendFlow(plan: Plan) {
  const code  = await backendCodeBuilder.run(plan)
  const migrated = plan.needsMigration
    ? await dbMigrationGenerator.run(code) : code
  const tested = await testWriter.run(migrated)
  return codeReviewer.run(tested)
}

// --- Frontend Flow (sequential then parallel) ---
async function frontendFlow(plan: Plan) {
  const code = await frontendBuilder.run(plan)
  await domainControllerValidator.validate(code)
  const [unitTests, e2eTests] = await Promise.all([
    testGenerator.run(code),
    cypressGenerator.run(code),
  ])
  return codeReviewer.run({ unitTests, e2eTests })
}

// --- Full-Stack Flow (sequential then parallel) ---
async function fullStackFlow(plan: Plan) {
  const be = await backendCodeBuilder.run(plan)
  const migrated = plan.needsMigration
    ? await dbMigrationGenerator.run(be) : be
  const fe = await frontendBuilder.run(migrated)
  await domainControllerValidator.validate(fe)
  const [beTests, feTests, e2e] = await Promise.all([
    testWriter.run(fe),
    testGenerator.run(fe),
    cypressGenerator.run(fe),
  ])
  const reviewed = await codeReviewer.run({ beTests, feTests, e2e })
  return crossContractVerifier.run(reviewed)
}`,
      },
    },
  },
]

export const PROJECT_CATEGORIES = ['All', ...new Set(PROJECTS.map((p) => p.category))] as const
