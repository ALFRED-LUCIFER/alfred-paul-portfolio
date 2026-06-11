# Portfolio Redesign — AI Engineering Command Center

**Date:** 2026-06-11
**Status:** Approved design, pending implementation plan

## Goal

Redesign `apps/web` into a premium, futuristic single-page portfolio positioning Alfred Paul for AI Engineering Manager, AI Transformation Lead, Full-Stack Lead, and AI Architect roles. The site should read as an "AI engineering command center" — Vercel/Linear-level polish with a distinctive HUD/command-center identity, not a template.

## Decisions (locked)

| Decision | Choice |
|---|---|
| Stack | Keep Vite + React 19 + Tailwind 4 + Motion. No Next.js migration. |
| 3D hero | React Three Fiber (`three`, `@react-three/fiber`, `@react-three/drei`), lazy-loaded; static SVG fallback for mobile / reduced motion. |
| Visual direction | **B — AI Command Center**: background grid, terminal motifs, system-status chrome, glassmorphic panels, labeled 3D node graph. |
| Palette | **Cyan/violet primary; green is semantic-only** (online dots, passed gates, success). Drake palette retired. |
| Sections | Brief's 10-section structure + Testimonials kept + Resume timeline folded into Leadership + new LinkedIn "Signals" strip. Insights, AI Roadmap, Services dropped as standalone sections. |
| Strategy | Fresh rebuild inside existing app (Approach 2): new feature components against a new design-system layer; keep data files, infra, shared hooks; delete old section components at the end. Work on a feature branch. |
| Content | Existing `*.data.ts` content is the source of truth and must be kept. For the three systems without data (Knowledge Graph repo navigation, Memory Contract token optimization, AI Governance gates), Claude drafts qualitative copy (no invented numbers) and Alfred verifies. |

## Page structure (13 zones, single scroll)

1. **Nav** — fixed glass command bar (`AP://` mark), anchor links, ⌘K command palette, scroll-progress beam along top edge, green "online" status dot.
2. **Hero** — full viewport. Left: status badge (`AI TRANSFORMATION LEAD · FULL STACK · AGENTIC SDLC`), headline "Engineering AI-Native Software Delivery", subheadline (agentic SDLC, governance, MCP, enterprise adoption), CTAs: *View AI Systems* (glow), *Architecture*, *Contact* (ghost). Right: interactive R3F orchestration graph — 9 labeled nodes (Developer, Copilot, MCP, Jira, Confluence, Architecture, Tests, Governance, Deployment), glowing connectors, slow drift, hover focuses node + label.
3. **Identity** — 5 role cards: AI Transformation Lead, Full-Stack Developer, AI Architect, Engineering Manager Track, Agentic SDLC Orchestrator. Icon, one-line description, hover lift + border glow, stagger reveal.
4. **Featured AI Systems** — 8 system modules from `projects.data.ts` (AI Code Orchestration Agent, Enterprise MCP Jira+Confluence, Knowledge Graph Repo Navigation, Memory Contract, AI Governance Gates, VelocityVote, Dubai Spotter V2, Enterprise RAG Chatbot). Each: problem/solution teaser, tech chips, architecture highlight, status badge (`● PROD` / `● INTERNAL`), click → case-study modal (existing modal, restyled).
5. **Architecture Thinking** — 6-layer animated stack building bottom-up on scroll: UX → Frontend/React/TS → API/.NET/gRPC → Data/Cloud/Integration → AI Agents/MCP/Knowledge Graph → Governance/Security/Quality Gates. AI and Governance layers glow (indigo/cyan). Practice chips beside: C4, ADR, DDD, platform engineering, testing strategy, observability.
6. **Agentic SDLC (prime highlight)** — animated pipeline: Idea → Requirement → Jira → Architecture → Code Agent → Test Agent → Review Agent → Governance Gate → Deployment → Observability → Learning Memory (loop arrow back). Pulse travels stage-to-stage on scroll (GSAP scrub); stage details on hover. Tagline: "AI doesn't replace engineering discipline. It amplifies it — through orchestration, guardrails, and review."
7. **Engineering Leadership** — executive statement: "I help engineering teams adopt AI without losing architecture, quality, security, or ownership." 8 pillar tiles (Developer Productivity, AI Enablement, Governance, Architecture Alignment, Quality Engineering, Team Collaboration, Sprint & Delivery, Platform Thinking) + compact career timeline (from existing Resume data) beside it.
8. **Skills** — orbit/constellation visual (5 color-coded groups) + readable grouped list beside it (a11y/scanability). Groups: Frontend (React, TypeScript, Next.js, MUI, Tailwind, Vitest, Playwright), Backend (.NET, C#, gRPC, APIs, EF Core, xUnit/NUnit), AI Engineering (GitHub Copilot, Claude, MCP, Agentic Workflows, Knowledge Graphs, RAG, Prompt Engineering, AI Governance), Cloud/DevOps (Azure, Docker, Kubernetes, GitHub Actions, Datadog, CI/CD), Architecture (C4, ADR, DDD, Platform Engineering, System Design, Observability).
9. **Case Studies** — 3 deep-dive cards with inline SVG diagrams: (a) reducing AI token waste with knowledge-graph navigation, (b) agentic review gates for delivery quality, (c) Jira+Confluence via MCP for AI-assisted planning. Challenge → Approach → Outcome. Qualitative outcomes only until verified.
10. **Certifications** — achievement badges from existing Resume data: Microsoft AI Transformation Leader, GitHub Copilot GH-300, Azure architecture learning path, PSM, PCEP. Real verify links.
11. **Signals (LinkedIn writing)** — 3–4 curated post cards (hook line, topic chip, date, `Read on LinkedIn ↗`) driven by `posts.data.ts`. Curated for quality, not recency. No LinkedIn embeds (slow, cookie-heavy).
12. **Testimonials** — existing data, restyled as compact glass quote cards.
13. **Contact / Footer** — "Let's build AI-native engineering systems." Email, LinkedIn, GitHub, resume download (existing PDF), contact form (existing form + client). Terminal-style footer status line.

## Design system

### Tokens (HSL CSS variables in `index.css`, per existing convention — no hardcoded hex in components)

- Backgrounds: `--background` #07090d (page), `--surface` #0a0e14 (sections), `--panel` #0c1220 (cards)
- Accents: `--accent-cyan` #22d3ee (brand), `--accent-indigo` #818cf8 (AI/agents), `--accent-violet` #a855f7 (SDLC/special)
- Status (semantic only): `--status-ok` #34d399, `--status-warn` #fbbf24
- Drake `drake-*` tokens removed.
- Fonts: Inter (sans) + JetBrains Mono (mono — used heavily for identity: section numbers `04 /`, labels, badges, chips). Self-hosted woff2, preloaded (replaces CDN `@import`).

### Primitives (`shared/ui`, each single-purpose)

- `SectionShell` — numbered mono label, heading, spacing, built-in scroll reveal
- `GlassPanel` — glass card, optional `glow` accent prop (cyan | indigo | violet)
- `StatusBadge` — `● PROD` / `● INTERNAL` / `● ONLINE`
- `MonoChip` — mono-font tech/practice chip
- `GlowButton` / `GhostButton` — CTA pair
- `GridBackdrop` — single fixed CSS-only animated grid
- `Reveal` — `whileInView` wrapper, respects `useReducedMotion`

### Kept from existing code

Command palette, scroll progress bar, back-to-top, custom cursor (restyled cyan), Konami dev-mode, `useReducedMotion`, `useActiveSection`, all `data/*.data.ts` files, contact form + `contact.client.ts`, loading screen (restyled as boot sequence).

## Component architecture

```
features/
  hero/           Hero.tsx, OrchestrationGraph.tsx (R3F, lazy), GraphFallback.tsx (static SVG)
  identity/       Identity.tsx, RoleCard.tsx, data/roles.data.ts
  systems/        Systems.tsx, SystemModule.tsx, CaseStudyModal.tsx (kept, restyled), data/projects.data.ts (moved)
  architecture/   ArchitectureLayers.tsx, LayerRow.tsx, data/layers.data.ts
  sdlc/           AgenticSdlc.tsx, PipelineStage.tsx, FlowConnector.tsx, data/pipeline.data.ts
  leadership/     Leadership.tsx, PillarGrid.tsx, CareerTimeline.tsx, data/ (pillars + career from Resume data)
  skills/         Skills.tsx, SkillConstellation.tsx, SkillGroupList.tsx, data/skills.data.ts
  case-studies/   CaseStudies.tsx, CaseStudyCard.tsx, data/case-studies.data.ts
  certifications/ Certifications.tsx, CertBadge.tsx, data/certifications.data.ts
  signals/        Signals.tsx, PostCard.tsx, data/posts.data.ts
  testimonials/   (kept, restyled)
  contact/        (kept, restyled)
  navigation/     (kept, restyled to command bar)
```

All copy lives in `data/*.data.ts` per feature — no content hardcoded in components.

Old feature folders removed at the end: `about`, `resume` (data extracted first), `services`, `insights`, `roadmap`, old `hero`, old `skills`, old `portfolio` (data moved).

### Dependencies

- **Add:** `three`, `@react-three/fiber`, `@react-three/drei` (lazy-loaded chunk)
- **Remove if unused after rebuild:** `@tsparticles/react`, `@tsparticles/slim`, `mermaid`, `react-syntax-highlighter`

## Motion plan

One signature animation per section; everything else is `Reveal` (fade + 12px rise, staggered):

- Hero: graph drift + node hover focus
- Architecture: layers build bottom-up on scroll
- SDLC: pulse travels pipeline (GSAP scroll scrub)
- Skills: constellation orbit
- All gated by `useReducedMotion` → opacity-only transitions + static SVG graph
- Cursor glow: desktop + fine-pointer media query only

## Performance

- R3F lazy via `React.lazy` after first paint; static fallback on small screens / reduced motion
- Self-hosted preloaded fonts (removes render-blocking CDN imports)
- CSS-only grid backdrop (tsparticles deleted)
- Targets: Lighthouse ≥ 90 performance, 100 accessibility, 100 SEO on production build

## SEO

- `index.html`: title "Alfred Paul — AI Transformation Lead & Full-Stack Architect", meta description, OG + Twitter cards, canonical, theme-color
- JSON-LD `Person` schema: name, jobTitle, sameAs (LinkedIn, GitHub), knowsAbout
- Semantic landmarks; one `h1`; ordered `h2`s

## Accessibility

- Text equivalents for all visuals (grouped skill list, DOM-ordered pipeline stages, labeled graph nodes)
- Contrast ≥ 4.5:1 body text; mono micro-labels ≥ 3:1 at large sizes or bumped
- Keyboard: ⌘K palette, Radix focus traps in modals, skip-to-content link, visible cyan focus rings

## Error handling

- R3F graph wrapped in an error boundary → falls back to static SVG on WebGL failure
- Contact form keeps existing zod validation + error states; graceful failure message if API unavailable

## Testing & verification

- `pnpm type-check`, `pnpm lint`, production `pnpm build` must pass
- Visual check at 375px / 768px / 1440px per section
- No unit-test infrastructure added (YAGNI for a portfolio)

## Out of scope

- `apps/api` (NestJS scaffold) — untouched
- Blog/CMS, analytics, i18n
- Numeric metrics for unverified case studies (qualitative until Alfred supplies real numbers)
