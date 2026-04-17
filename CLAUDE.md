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
- `apps/web` — the live portfolio site (React 19, Vite, Tailwind CSS)
- `apps/api` — a scaffolded NestJS backend (not yet implemented or integrated)

### Web App Layout

`App.tsx` is a flat, section-based single-page layout. There is **no client-side router** — navigation uses anchor links (`#home`, `#about`, etc.) with CSS `scroll-behavior: smooth`. Each section is a standalone component rendered in order:

`Navigation → Hero → About → Resume → Services → Skills → Portfolio → Testimonials → Contact → Footer`

All portfolio content (projects, testimonials, experience) is hardcoded inside the components themselves. The markdown files at the repo root (`portfolio-data.md`, `testimonialdata.md`) are reference documents, not imported data sources.

### Styling System

Colors are defined as HSL CSS variables in `apps/web/src/index.css` at `@layer base` and consumed by Tailwind via `hsl(var(--name))` in `tailwind.config.js`. **Never use hardcoded hex/rgb values** — always reference the CSS variables or their Tailwind tokens.

Brand-specific colors are under the `drake.*` token namespace:
- `drake-gold`, `drake-orange`, `drake-blue`, `drake-dark-blue`, `drake-red`
- Primary green: `--primary` (Drake Signature Green `#28e98c`)
- Background: `--background` (Rich Dark Gray `#2a2f3a`)

Fonts: `font-sans` → Inter, `font-mono` → JetBrains Mono (loaded via CDN in `index.html`).

### Deployment

Deployed on Vercel. Build command: `pnpm build`. Output directory: `apps/web/dist`. Config is in `vercel.json` at the repo root.

### Pre-commit Hooks

Husky + lint-staged run ESLint and Prettier on staged files before each commit.
