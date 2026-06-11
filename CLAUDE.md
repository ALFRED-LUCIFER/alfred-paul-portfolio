# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands should be run from the monorepo root unless noted.

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start all dev servers via Turborepo
pnpm build            # Build all apps
pnpm lint             # Run ESLint across monorepo
pnpm type-check       # TypeScript checking across monorepo
pnpm format           # Prettier formatting
```

To work on only the web app (`apps/web`):
```bash
cd apps/web
pnpm dev              # Vite dev server at http://localhost:5173
pnpm build            # tsc + vite build → dist/
pnpm preview          # Preview production build
```

There are currently no unit or E2E tests implemented despite test tooling being configured.

## Architecture

This is a **pnpm + Turborepo monorepo** with two apps:
- `apps/web` — the live portfolio site (React 19, Vite, Tailwind CSS 4, Motion, GSAP, React Three Fiber)
- `apps/api` — a scaffolded NestJS backend (not yet implemented or integrated)

### Web App Layout — "AI Command Center"

`App.tsx` is a flat, section-based single-page layout. There is **no client-side router** — navigation uses anchor links with CSS `scroll-behavior: smooth`. Sections render in order:

`Navigation → Hero → Identity → Systems → Architecture → SDLC → Leadership → Skills → CaseStudies → Certifications → Signals → Testimonials → Contact → Footer`

Section anchor ids: `home`, `identity`, `systems`, `architecture`, `sdlc`, `leadership`, `skills`, `case-studies`, `certifications`, `signals`, `testimonials`, `contact`. The nav, command palette (⌘K), and `useActiveSection` all share this id list — keep them in sync.

**All copy/content lives in `features/*/data/*.data.ts` files** — never hardcode content inside components. The markdown files at the repo root (`portfolio-data.md`, `testimonialdata.md`) are reference documents, not imported data sources.

Heavy visuals are lazy-loaded: the hero's R3F `OrchestrationGraph` (with a static SVG `GraphFallback` for mobile/reduced-motion/WebGL failure) and the `CaseStudyModal` (mermaid + syntax highlighting, loads on first open).

### Design System

Shared primitives live in `src/shared/ui/`: `SectionShell` (numbered mono section header + scroll reveal), `GlassPanel`, `StatusBadge`, `MonoChip`, `GlowLink/GhostLink/GlowButton/GhostButton`, `GridBackdrop` (single fixed CSS grid), `Reveal/RevealItem` (Motion `whileInView` wrappers honoring `useReducedMotion`).

### Styling System

The site is **dark-only** (no theme toggle). Colors are defined as HSL CSS variables in `apps/web/src/index.css` (`@layer base`) and exposed to Tailwind via the `@theme` block in the same file (Tailwind 4 CSS-first config — there is no `tailwind.config.js`). **Never use hardcoded hex/rgb values in components** — always reference the tokens. Exception: three.js/SVG/mermaid color inputs mirror the tokens as hex (`ACCENT_HEX` in `features/hero/data/graph.data.ts`).

Token palette:
- Backgrounds: `background` #07090d (page), `surface` #0a0e14 (alternating sections), `panel` #0c1220 (cards)
- Accents: `accent-cyan` #22d3ee (brand/primary), `accent-indigo` #818cf8 (AI/agents), `accent-violet` #a855f7 (SDLC)
- Status (semantic only — never decorative): `status-ok` #34d399, `status-warn` #fbbf24
- `primary` is aliased to `accent-cyan`

Fonts: `font-sans` → Inter Variable, `font-mono` → JetBrains Mono Variable — self-hosted via `@fontsource-variable/*` imports in `index.css` (no CDN). Mono is a core identity element: section numbers (`04 /`), labels, badges, chips.

### Deployment

Deployed on Vercel. Build command: `pnpm build`. Output directory: `apps/web/dist`. Config is in `vercel.json` at the repo root.

### Pre-commit Hooks

Husky + lint-staged run ESLint and Prettier on staged files before each commit.
