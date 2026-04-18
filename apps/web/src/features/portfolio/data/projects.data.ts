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
    id: 10,
    title: 'Dubai Spotter V2 — AI Real Estate CRM',
    description:
      'Production-grade property intelligence platform for Dubai real estate agencies — monorepo with NestJS API, Next.js web, and two Expo mobile apps. AI calling via Retell AI, PostGIS property search, Stripe multi-tenant billing, and 49+ backend modules.',
    category: 'Enterprise AI Platform',
    technologies: ['NestJS', 'Next.js 16', 'React Native', 'Expo', 'PostgreSQL/PostGIS', 'Prisma', 'Stripe', 'Retell AI', 'BullMQ', 'AWS S3', 'Google Maps', 'Playwright'],
    features: [
      'AI calling with Retell AI — usage metering, top-up bundles, BullMQ job queues',
      'PostGIS geospatial property search with Google Maps visualization',
      'Multi-tenant Stripe billing with role-based module gating per subscription',
      'Monorepo: NestJS API + Next.js web + 2 Expo React Native apps (agency + developer)',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      problem:
        "Dubai's real estate agencies relied on fragmented tools: spreadsheets for leads, WhatsApp for client communication, manual PDF presentations for property pitches, and no AI assistance for outbound calling. Multi-tenant SaaS platforms for the region either didn't exist or were prohibitively expensive. Agencies needed a unified platform covering leads, properties, appointments, analytics, and mobile access — with AI calling baked in.",
      solution:
        'Built a full monorepo platform (pnpm workspaces) with four interconnected apps sharing types via @alfred-lucifer/dubai-spotter-shared-types. NestJS backend with 49+ modules, Prisma ORM, PostGIS for geospatial queries, JWT auth, and BullMQ background jobs. Next.js 16 frontend with MUI 7, TanStack Query, and Hey API type-safe client generation. Two Expo SDK 52 React Native apps (agency-facing and developer-facing) with expo-router and react-native-maps. Retell AI powers outbound/inbound AI calling with usage metering and top-up billing. Stripe handles multi-tenant subscription tiers with module-level feature gating. Puppeteer generates polished PDF property presentations for clients. Real-time notifications via SSE. Playwright E2E + Vitest for testing.',
      impact:
        'Production-ready platform serving Dubai real estate agencies with 49+ backend modules, 37+ frontend features, AI-assisted lead calling, geospatial property discovery, and cross-platform mobile apps. Supports multi-currency billing, privacy modes, and tenant-specific branding at scale.',
      metrics: [
        { label: 'Backend Modules', value: '49+' },
        { label: 'Frontend Features', value: '37+' },
        { label: 'Apps in Monorepo', value: '4' },
        { label: 'AI Calls Managed', value: 'Retell AI' },
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
    githubUrl: 'https://github.com/alfredpaul',
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
    githubUrl: 'https://github.com/alfredpaul',
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
    id: 9,
    title: 'Vantastix — GenZ Custom Print E-Commerce',
    description:
      'Full-stack print-on-demand e-commerce platform for Indian GenZ with 2-hour Pune delivery, a live custom design editor, Razorpay payments, B2B corporate orders, and 137+ unit tests across 24 test suites.',
    category: 'Full-Stack Development',
    technologies: ['Next.js 15', 'TypeScript', 'MongoDB', 'Razorpay', 'Cloudinary', 'Three.js', 'Framer Motion', 'Vitest', 'GitHub Actions'],
    features: [
      'Live 3D custom design editor with Cloudinary CDN for asset management',
      '2-hour hyperlocal delivery with Razorpay payment + webhook verification',
      'HMAC JWT auth — separate admin/customer flows with account lockout',
      'Telegram + Email (Resend) notification pipeline for all order events',
    ],
    liveUrl: 'https://vantastix.in',
    githubUrl: 'https://github.com/ALFRED-LUCIFER/vantastix',
    featured: true,
    caseStudy: {
      problem:
        "India's GenZ custom merchandise market lacked a platform built specifically for niche youth culture — anime, K-pop, gaming, Marathi pride, meme culture. Existing options had no real-time design preview, slow 3–5 day fulfilment, no B2B arm, and no serious engineering behind them. Payment failures were common due to poor server-side verification.",
      solution:
        'Built Vantastix from scratch as a Next.js 15 App Router monolith with a single catch-all API route dispatching to 12+ typed handler modules (products, orders, cart, wallet, referral, designs, etc.). Custom HMAC JWT auth handles separate admin and customer sessions with account lockout. Razorpay integration includes server-side price verification and webhook handling. Cloudinary manages all product and design imagery. Telegram + Resend email pipeline fires on every order event. Three.js and Framer Motion power a premium 3D design editor. 24 Vitest test suites with 137+ unit tests, CI/CD via GitHub Actions (lint → typecheck → tests → build), deployed on Vercel Mumbai.',
      impact:
        'Live platform with 8 product domains (Shop, Cart, Wishlist, Orders, Custom Design, Corporate/B2B, Referral, Wallet), 20+ niche collections, 2-hour Pune delivery, and production-grade engineering with full CI/CD and 137+ automated tests.',
      metrics: [
        { label: 'Unit Tests', value: '137+' },
        { label: 'API Modules', value: '12+' },
        { label: 'Delivery SLA', value: '2 hrs' },
        { label: 'Collections', value: '20+' },
      ],
    },
  },
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
    githubUrl: 'https://github.com/alfredpaul',
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
    githubUrl: 'https://github.com/alfredpaul',
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
    githubUrl: 'https://github.com/alfredpaul',
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
    id: 8,
    title: 'VelocityVote — Planning Poker for Distributed Teams',
    description:
      'Open-source planning poker app built for distributed agile teams. Real-time voting, anonymous reveal to eliminate anchor bias, multiple card decks, and team polls — no signup, free forever.',
    category: 'Developer Tools',
    technologies: ['React', 'TypeScript', 'Pusher Channels', 'Next.js', 'WebSockets', 'Apache 2.0'],
    features: [
      'Real-time sync via Pusher Channels — zero lag, no refresh',
      'Anonymous votes until host reveals — eliminates anchor bias',
      'Multiple card decks: Fibonacci, T-shirt sizes, Powers of 2',
      'Team Polls for sprint goals, retro topics, and office votes',
    ],
    liveUrl: 'https://velocityvote.app',
    githubUrl: 'https://github.com/alfredpaul',
    featured: true,
    caseStudy: {
      problem:
        'Distributed agile teams waste 30–60 minutes per planning session on misaligned estimates and anchor bias — senior engineers call a number first, everyone else follows. Existing tools require account creation, paid plans, or complex setup, creating friction that kills adoption.',
      solution:
        'Built VelocityVote as a free, open-source planning poker tool. No accounts, no setup — paste a link and start estimating in 30 seconds. Real-time vote sync via Pusher Channels keeps all participants in sync. Votes stay anonymous until the host reveals them, eliminating anchor bias. Supports Fibonacci, T-shirt sizes, and Powers of 2 decks. Team Polls handle quick team decisions beyond estimation. Published under Apache 2.0 — free for any team, forever.',
      impact:
        'Live public product, free for the global agile community. Eliminates anchor bias in estimation sessions, reduces planning overhead, and works for fully distributed teams across any timezone with zero setup friction.',
      metrics: [
        { label: 'Setup Time', value: '30 sec' },
        { label: 'Cost to Teams', value: 'Free' },
        { label: 'License', value: 'Apache 2.0' },
        { label: 'Signup Required', value: 'None' },
      ],
    },
  },
  {
    id: 11,
    title: 'Clicks2Compare — UAE Financial Advisory Platform',
    description:
      'End-to-end web platform for a UAE-based financial advisory firm — covering mortgage comparison across 20+ banks, Golden Visa facilitation, SME finance, business setup, and insurance services. Built for a friend\'s company serving Dubai\'s expat and SME market.',
    category: 'Full-Stack Development',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'CMS Integration', 'SEO Optimization'],
    features: [
      'Mortgage comparison engine across 20+ UAE banks',
      'Service intake flows: Golden Visa, SME Finance, Business Setup, Insurance',
      'Lead capture and consultation booking with automated follow-up',
      'SEO-optimised content architecture for UAE financial services market',
    ],
    liveUrl: 'https://www.clicks2compare.com',
    githubUrl: null,
    featured: false,
    caseStudy: {
      problem:
        "UAE expats and SMEs faced fragmented, opaque financial advisory services — no single platform to compare mortgage rates across multiple banks, understand Golden Visa eligibility, or explore SME funding. Clicks2compare needed a professional web presence that built trust, captured leads efficiently, and clearly communicated 7 distinct service verticals to a diverse international audience.",
      solution:
        'Designed and built a full web platform for the Clicks2compare advisory firm. Clear service architecture maps 7 verticals (Mortgage, Golden Visa, SME Finance, Business Setup, International Funding, Insurance, PRO Services) with dedicated landing pages, eligibility guidance, and lead capture flows. SEO-optimised structure targets UAE-specific search intent. Consultation booking integrates directly into the team\'s CRM workflow.',
      impact:
        '14,200+ successful mortgage plans facilitated through the platform. Serves UAE expats, SMEs, and property buyers across Dubai and the wider UAE market. Clean trust-first design reflects 10+ years of team expertise across 20+ banking partnerships.',
      metrics: [
        { label: 'Mortgage Plans', value: '14.2K+' },
        { label: 'Bank Partnerships', value: '20+' },
        { label: 'Service Verticals', value: '7' },
        { label: 'Market', value: 'UAE / Dubai' },
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
    githubUrl: 'https://github.com/alfredpaul',
    featured: false,
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
    githubUrl: 'https://github.com/alfredpaul',
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
