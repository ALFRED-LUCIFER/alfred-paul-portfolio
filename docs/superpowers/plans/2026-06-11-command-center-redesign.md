# AI Command Center Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `apps/web` as a premium "AI engineering command center" single-page portfolio per the approved spec at `docs/superpowers/specs/2026-06-11-portfolio-redesign-design.md`.

**Architecture:** Fresh feature components built against a new design-system layer (tokens + primitives) inside the existing Vite + React 19 + Tailwind 4 app. Existing data files, infra hooks, contact form, and command palette are kept; old section components are deleted at the end. R3F powers the hero graph, lazy-loaded with a static SVG fallback.

**Tech Stack:** React 19, Vite 7, Tailwind 4 (CSS-first config), Motion (`motion/react`), GSAP ScrollTrigger, three + @react-three/fiber + @react-three/drei, Radix, lucide-react.

**Conventions for every task:**
- Work on branch `redesign/command-center` (created in Task 1). Never commit to `main`.
- After each task: run `pnpm type-check` and `pnpm lint` from the repo root — both must pass before committing. Husky+lint-staged also runs on commit.
- The site is intentionally broken/mixed-style mid-plan; it only needs to be visually coherent from Task 14 onward.
- There is no unit-test infra (per spec, none is added). "Verify" steps are type-check/lint/build + visual checks in the dev server (`cd apps/web && pnpm dev` → http://localhost:5173).
- No hardcoded hex/rgb in components — Tailwind tokens only (defined in Task 2).
- All copy lives in `data/*.data.ts` files, never inline in components.

---

## File structure (target state)

```
apps/web/
  index.html                          (rewritten meta/SEO; CDN fonts removed)
  src/
    main.tsx                          (font imports added; ThemeProvider removed)
    App.tsx                           (rewritten: 13-zone assembly)
    index.css                         (rewritten tokens/utilities; Drake palette + light mode removed)
    shared/
      ui/SectionShell.tsx             (new)
      ui/GlassPanel.tsx               (new)
      ui/StatusBadge.tsx              (new)
      ui/MonoChip.tsx                 (new)
      ui/Buttons.tsx                  (new: GlowButton, GhostButton)
      ui/GridBackdrop.tsx             (new)
      ui/Reveal.tsx                   (new)
      ui/ScrollProgressBar.tsx        (kept; recolored)
      ui/BackToTop.tsx                (kept; recolored)
      ui/CustomCursor.tsx             (kept; recolored cyan)
      ui/CommandPalette.tsx           (kept; section list updated)
      ui/LoadingScreen.tsx            (kept; boot-sequence restyle)
      ui/DeveloperMode.tsx            (kept as-is)
      ui/ThemeToggle.tsx              (DELETED)
      context/ThemeContext.tsx        (DELETED)
      hooks/*                         (kept as-is)
    features/
      hero/        Hero.tsx, OrchestrationGraph.tsx, GraphFallback.tsx, data/graph.data.ts, index.ts
      identity/    Identity.tsx, RoleCard.tsx, data/roles.data.ts, index.ts
      systems/     Systems.tsx, SystemModule.tsx, components/CaseStudyModal.tsx (moved+restyled),
                   components/ArchitectureDiagram.tsx (moved), data/projects.data.ts (moved+extended),
                   hooks/useTilt.ts (moved), index.ts
      architecture/ ArchitectureLayers.tsx, data/layers.data.ts, index.ts
      sdlc/        AgenticSdlc.tsx, data/pipeline.data.ts, index.ts
      leadership/  Leadership.tsx, CareerTimeline.tsx, data/pillars.data.ts, data/career.data.ts, index.ts
      skills/      Skills.tsx, SkillConstellation.tsx, data/skills.data.ts, index.ts   (old contents replaced)
      case-studies/ CaseStudies.tsx, data/case-studies.data.ts, index.ts
      certifications/ Certifications.tsx, data/certifications.data.ts, index.ts
      signals/     Signals.tsx, data/posts.data.ts, index.ts
      testimonials/ (kept; Testimonials.tsx restyled)
      contact/     (kept; Contact.tsx restyled)
      navigation/  Navigation.tsx (rewritten), Footer.tsx (rewritten), hooks/useActiveSection.ts (ids updated)
      about/, resume/, services/, insights/, roadmap/, portfolio/   (DELETED at Task 15, after data extraction)
    infrastructure/api/contact.client.ts (kept as-is)
```

Section anchor ids (used by nav, palette, useActiveSection): `home`, `identity`, `systems`, `architecture`, `sdlc`, `leadership`, `skills`, `case-studies`, `certifications`, `signals`, `testimonials`, `contact`.

---

### Task 1: Branch + dependencies

**Files:** `apps/web/package.json` (modify via pnpm)

- [ ] **Step 1: Create branch**

```bash
git checkout -b redesign/command-center
```

- [ ] **Step 2: Add dependencies**

```bash
cd apps/web
pnpm add three @react-three/fiber @react-three/drei
pnpm add @fontsource-variable/inter @fontsource-variable/jetbrains-mono
pnpm add -D @types/three
```

- [ ] **Step 3: Verify install + types**

Run from repo root: `pnpm type-check`
Expected: PASS (no source changes yet).

- [ ] **Step 4: Commit**

```bash
git add apps/web/package.json pnpm-lock.yaml
git commit -m "chore(web): add R3F and self-hosted font dependencies"
```

---

### Task 2: Design tokens, fonts, base CSS

**Files:**
- Rewrite: `apps/web/src/index.css`
- Modify: `apps/web/index.html` (remove font CDN lines 59-63 only — full SEO rewrite happens in Task 16)
- Modify: `apps/web/src/main.tsx`
- Delete: `apps/web/src/App.css` (and its import in `App.tsx`)

- [ ] **Step 1: Replace `apps/web/src/index.css` entirely with:**

```css
@import '@fontsource-variable/inter';
@import '@fontsource-variable/jetbrains-mono';
@import 'tailwindcss';
@import 'tw-animate-css';

@source './**/*.{ts,tsx}';

@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
  @media (width >= --theme(--breakpoint-sm)) {
    max-width: none;
  }
  @media (width >= 1400px) {
    max-width: 1400px;
  }
}

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-surface: hsl(var(--surface));
  --color-panel: hsl(var(--panel));

  --color-card: hsl(var(--panel));
  --color-card-foreground: hsl(var(--foreground));
  --color-popover: hsl(var(--panel));
  --color-popover-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--accent-cyan));
  --color-primary-foreground: hsl(var(--background));
  --color-secondary: hsl(var(--panel));
  --color-secondary-foreground: hsl(var(--foreground));
  --color-muted: hsl(var(--surface));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent-cyan));
  --color-accent-foreground: hsl(var(--background));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--accent-cyan));

  --color-accent-cyan: hsl(var(--accent-cyan));
  --color-accent-indigo: hsl(var(--accent-indigo));
  --color-accent-violet: hsl(var(--accent-violet));
  --color-status-ok: hsl(var(--status-ok));
  --color-status-warn: hsl(var(--status-warn));

  --font-sans: 'Inter Variable', Inter, sans-serif;
  --font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', monospace;

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  --animate-fade-in: fade-in 0.6s ease-out;
  --animate-grid-pan: grid-pan 24s linear infinite;
  --animate-pulse-dot: pulse-dot 2.4s ease-in-out infinite;
  --animate-orbit: orbit 36s linear infinite;
  --animate-orbit-reverse: orbit-reverse 48s linear infinite;
  --animate-marquee: marquee 30s linear infinite;
  --animate-marquee-reverse: marquee-reverse 30s linear infinite;
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes grid-pan {
    from { background-position: 0 0; }
    to { background-position: 0 -64px; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px hsl(var(--status-ok) / 0.8); }
    50% { opacity: 0.55; box-shadow: 0 0 2px hsl(var(--status-ok) / 0.4); }
  }
  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes orbit-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes marquee-reverse {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }
  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }
  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  }
}

/* Tailwind v4 border-color compatibility */
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--color-border, currentcolor);
  }
}

@layer base {
  :root {
    /* Command Center palette — dark only */
    --background: 220 30% 4%;        /* #07090d page */
    --surface: 216 33% 6%;           /* #0a0e14 section panels */
    --panel: 222 45% 9%;             /* #0c1220 cards */
    --foreground: 210 40% 98%;       /* #f8fafc */
    --muted-foreground: 215 20% 65%; /* #94a3b8 */

    --accent-cyan: 187 86% 53%;      /* #22d3ee brand */
    --accent-indigo: 234 89% 74%;    /* #818cf8 AI/agents */
    --accent-violet: 271 91% 65%;    /* #a855f7 SDLC */
    --status-ok: 158 64% 52%;        /* #34d399 semantic only */
    --status-warn: 43 96% 56%;       /* #fbbf24 semantic only */

    --destructive: 0 84% 60%;
    --border: 217 33% 17%;           /* #1e293b */
    --input: 222 45% 9%;
    --radius: 0.5rem;
  }
}

@utility glass-panel {
  background: hsl(var(--panel) / 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border));
}

@utility glow-border-cyan {
  border-color: hsl(var(--accent-cyan) / 0.3);
  box-shadow: 0 0 24px hsl(var(--accent-cyan) / 0.08);
}

@utility glow-border-indigo {
  border-color: hsl(var(--accent-indigo) / 0.3);
  box-shadow: 0 0 24px hsl(var(--accent-indigo) / 0.08);
}

@utility glow-border-violet {
  border-color: hsl(var(--accent-violet) / 0.3);
  box-shadow: 0 0 24px hsl(var(--accent-violet) / 0.08);
}

@utility text-glow-cyan {
  text-shadow: 0 0 16px hsl(var(--accent-cyan) / 0.4);
}

@utility section-padding {
  @apply py-16 md:py-24 lg:py-28;
}

@utility container-grid {
  @apply container mx-auto px-4 sm:px-6 lg:px-8;
}

@utility text-balance {
  text-wrap: balance;
}

@utility line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

@utility line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

@utility line-clamp-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
}

/* Hide system cursor on pointer-capable devices (CustomCursor renders instead) */
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-bold tracking-tight;
  }

  html {
    scroll-behavior: smooth;
  }

  :focus-visible {
    outline: 2px solid hsl(var(--accent-cyan));
    outline-offset: 2px;
  }

  ::selection {
    background: hsl(var(--accent-cyan) / 0.3);
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-surface;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-accent-cyan/30 rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-accent-cyan/50;
  }
}
```

- [ ] **Step 2: Remove font CDN from `apps/web/index.html`**

Delete these lines (currently 59-63):

```html
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
```

- [ ] **Step 3: Delete `apps/web/src/App.css` and remove `import './App.css'` from `apps/web/src/App.tsx` (line 1).**

```bash
rm apps/web/src/App.css
```

- [ ] **Step 4: Remove ThemeProvider if wired in `main.tsx`**

Open `apps/web/src/main.tsx`. If it wraps `<App />` in a `ThemeProvider` from `shared/context/ThemeContext`, remove the wrapper and the import (dark-only site now). Do not delete the context files yet (Navigation still imports ThemeToggle until Task 13).

- [ ] **Step 5: Verify**

Run: `pnpm type-check && pnpm lint`
Expected: PASS. Then `cd apps/web && pnpm dev` — site renders with new (darker) palette; old components may look off-brand. That is expected until Task 15.

Known acceptable breakage: any component referencing `drake-*` Tailwind classes will fail to *style* (classes silently no-op) but must not fail type-check. If `pnpm build` errors on missing CSS vars, note it — those components are deleted in Task 15.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(web): command-center design tokens, self-hosted fonts, dark-only base"
```

---

### Task 3: Shared UI primitives

**Files:**
- Create: `apps/web/src/shared/ui/Reveal.tsx`
- Create: `apps/web/src/shared/ui/SectionShell.tsx`
- Create: `apps/web/src/shared/ui/GlassPanel.tsx`
- Create: `apps/web/src/shared/ui/StatusBadge.tsx`
- Create: `apps/web/src/shared/ui/MonoChip.tsx`
- Create: `apps/web/src/shared/ui/Buttons.tsx`
- Create: `apps/web/src/shared/ui/GridBackdrop.tsx`

- [ ] **Step 1: Create `apps/web/src/shared/ui/Reveal.tsx`**

```tsx
import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger children by this delay (seconds) when > 0 */
  stagger?: number
  delay?: number
}

export function Reveal({ children, className, stagger = 0, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay,
        when: 'beforeChildren',
        staggerChildren: stagger,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

/** Use inside a <Reveal stagger={...}> for per-item animation */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `apps/web/src/shared/ui/SectionShell.tsx`**

```tsx
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

interface SectionShellProps {
  /** Mono index label, e.g. "04" */
  index: string
  /** Mono label after the index, e.g. "AGENTIC SDLC" */
  label: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  accent?: 'cyan' | 'indigo' | 'violet'
}

const accentText = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
} as const

export function SectionShell({
  index,
  label,
  title,
  subtitle,
  children,
  className,
  accent = 'cyan',
}: SectionShellProps) {
  return (
    <div className={cn('container-grid', className)}>
      <Reveal>
        <p className={cn('font-mono text-xs tracking-[0.2em]', accentText[accent])}>
          {index} / {label}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        )}
      </Reveal>
      <div className="mt-12">{children}</div>
    </div>
  )
}
```

- [ ] **Step 3: Create `apps/web/src/shared/ui/GlassPanel.tsx`**

```tsx
import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'indigo' | 'violet'
  hoverable?: boolean
}

const glowClass = {
  cyan: 'glow-border-cyan',
  indigo: 'glow-border-indigo',
  violet: 'glow-border-violet',
} as const

export function GlassPanel({ glow, hoverable = false, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-lg',
        glow && glowClass[glow],
        hoverable &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-[0_0_32px_hsl(var(--accent-cyan)/0.12)]',
        className
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 4: Create `apps/web/src/shared/ui/StatusBadge.tsx`**

```tsx
import { cn } from '../lib/cn'

type Status = 'prod' | 'internal' | 'online' | 'learning'

const config: Record<Status, { label: string; dot: string; text: string }> = {
  prod: { label: 'PROD', dot: 'bg-status-ok shadow-[0_0_8px_hsl(var(--status-ok)/0.8)]', text: 'text-status-ok' },
  internal: { label: 'INTERNAL', dot: 'bg-status-warn shadow-[0_0_8px_hsl(var(--status-warn)/0.8)]', text: 'text-status-warn' },
  online: { label: 'ONLINE', dot: 'bg-status-ok animate-pulse-dot', text: 'text-status-ok' },
  learning: { label: 'IN PROGRESS', dot: 'bg-accent-indigo shadow-[0_0_8px_hsl(var(--accent-indigo)/0.8)]', text: 'text-accent-indigo' },
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const c = config[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest', c.text, className)}>
      <span aria-hidden className={cn('size-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  )
}
```

- [ ] **Step 5: Create `apps/web/src/shared/ui/MonoChip.tsx`**

```tsx
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function MonoChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border border-border bg-panel/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 6: Create `apps/web/src/shared/ui/Buttons.tsx`**

```tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

const glowClasses =
  'inline-flex items-center justify-center gap-2 rounded-md bg-accent-cyan px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_24px_hsl(var(--accent-cyan)/0.45)] hover:brightness-110'

const ghostClasses =
  'inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-accent-cyan/50 hover:text-foreground'

export function GlowLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(glowClasses, className)} {...props} />
}

export function GhostLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(ghostClasses, className)} {...props} />
}

export function GlowButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(glowClasses, className)} {...props} />
}

export function GhostButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(ghostClasses, className)} {...props} />
}
```

- [ ] **Step 7: Create `apps/web/src/shared/ui/GridBackdrop.tsx`**

One fixed, CSS-only animated grid for the whole page (rendered once in `App.tsx`). The radial mask keeps it visible near the top and faded elsewhere.

```tsx
export function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 animate-grid-pan motion-reduce:animate-none"
      style={{
        backgroundImage:
          'linear-gradient(hsl(var(--accent-cyan) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent-cyan) / 0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
      }}
    />
  )
}
```

- [ ] **Step 8: Verify**

Run: `pnpm type-check && pnpm lint`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/shared/ui
git commit -m "feat(web): add command-center UI primitives"
```

---

### Task 4: Hero — data, static fallback, R3F orchestration graph

**Files:**
- Create: `apps/web/src/features/hero/data/graph.data.ts`
- Create: `apps/web/src/features/hero/components/GraphFallback.tsx`
- Create: `apps/web/src/features/hero/components/OrchestrationGraph.tsx`
- Rewrite: `apps/web/src/features/hero/components/Hero.tsx`
- Rewrite: `apps/web/src/features/hero/index.ts`
- Delete: `apps/web/src/features/hero/components/HeroParticles.tsx`, `apps/web/src/features/hero/components/ScrambleText.tsx`

- [ ] **Step 1: Create `apps/web/src/features/hero/data/graph.data.ts`**

```ts
export interface GraphNode {
  id: string
  label: string
  /** Position in R3F world units; z gives depth */
  position: [number, number, number]
  accent: 'cyan' | 'indigo' | 'violet' | 'ok'
}

export const GRAPH_NODES: GraphNode[] = [
  { id: 'mcp', label: 'MCP', position: [0, 0, 0], accent: 'cyan' },
  { id: 'developer', label: 'Developer', position: [-2.4, 1.4, 0.4], accent: 'indigo' },
  { id: 'copilot', label: 'Copilot', position: [2.3, 1.6, -0.3], accent: 'indigo' },
  { id: 'jira', label: 'Jira', position: [-2.8, -0.4, -0.5], accent: 'cyan' },
  { id: 'confluence', label: 'Confluence', position: [-1.6, -1.8, 0.3], accent: 'cyan' },
  { id: 'architecture', label: 'Architecture', position: [2.7, -0.2, 0.5], accent: 'violet' },
  { id: 'tests', label: 'Tests', position: [1.8, -1.7, -0.4], accent: 'violet' },
  { id: 'governance', label: 'Governance', position: [0.2, 2.3, 0.2], accent: 'ok' },
  { id: 'deployment', label: 'Deployment', position: [0, -2.5, -0.2], accent: 'ok' },
]

/** Edges as [fromId, toId] — hub-and-spoke from MCP plus a few cross-links */
export const GRAPH_EDGES: Array<[string, string]> = [
  ['mcp', 'developer'],
  ['mcp', 'copilot'],
  ['mcp', 'jira'],
  ['mcp', 'confluence'],
  ['mcp', 'architecture'],
  ['mcp', 'tests'],
  ['mcp', 'governance'],
  ['mcp', 'deployment'],
  ['developer', 'copilot'],
  ['copilot', 'tests'],
  ['governance', 'deployment'],
  ['jira', 'confluence'],
]

export const ACCENT_HEX: Record<GraphNode['accent'], string> = {
  // Hex required here: three.js color inputs, not CSS. Values mirror the CSS tokens.
  cyan: '#22d3ee',
  indigo: '#818cf8',
  violet: '#a855f7',
  ok: '#34d399',
}
```

- [ ] **Step 2: Create `apps/web/src/features/hero/components/GraphFallback.tsx`** (static SVG, used for mobile / reduced-motion / WebGL failure / lazy-loading placeholder)

```tsx
import { GRAPH_NODES, GRAPH_EDGES, ACCENT_HEX } from '../data/graph.data'

/** Projects 3D node positions onto a 2D viewBox */
function project([x, y]: [number, number, number]): [number, number] {
  return [200 + x * 60, 200 - y * 60]
}

export function GraphFallback() {
  const byId = new Map(GRAPH_NODES.map((n) => [n.id, n]))
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label="AI orchestration network connecting Developer, Copilot, MCP, Jira, Confluence, Architecture, Tests, Governance and Deployment"
    >
      {GRAPH_EDGES.map(([from, to]) => {
        const a = project(byId.get(from)!.position)
        const b = project(byId.get(to)!.position)
        return (
          <line
            key={`${from}-${to}`}
            x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
            stroke={ACCENT_HEX[byId.get(from)!.accent]}
            strokeWidth="0.75"
            opacity="0.35"
          />
        )
      })}
      {GRAPH_NODES.map((n) => {
        const [cx, cy] = project(n.position)
        const isHub = n.id === 'mcp'
        return (
          <g key={n.id}>
            <circle
              cx={cx} cy={cy} r={isHub ? 10 : 6}
              fill="#0c1220"
              stroke={ACCENT_HEX[n.accent]}
              strokeWidth={isHub ? 2 : 1.25}
              style={{ filter: `drop-shadow(0 0 ${isHub ? 8 : 4}px ${ACCENT_HEX[n.accent]})` }}
            />
            <text
              x={cx} y={cy - (isHub ? 16 : 12)}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
              fontFamily="JetBrains Mono Variable, monospace"
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
```

(Hex literals are acceptable in this file only — it mirrors `ACCENT_HEX` for SVG attributes, same exemption as the three.js colors.)

- [ ] **Step 3: Create `apps/web/src/features/hero/components/OrchestrationGraph.tsx`** (default export — required for `React.lazy`)

```tsx
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { useRef, useState } from 'react'
import type { Group } from 'three'
import { GRAPH_NODES, GRAPH_EDGES, ACCENT_HEX, type GraphNode } from '../data/graph.data'

function Node({ node }: { node: GraphNode }) {
  const [hovered, setHovered] = useState(false)
  const isHub = node.id === 'mcp'
  const color = ACCENT_HEX[node.accent]
  return (
    <group position={node.position}>
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.35 : 1}
      >
        <sphereGeometry args={[isHub ? 0.22 : 0.13, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.2 : isHub ? 1.4 : 0.8}
          toneMapped={false}
        />
      </mesh>
      <Html center distanceFactor={8} position={[0, isHub ? 0.42 : 0.32, 0]} style={{ pointerEvents: 'none' }}>
        <span
          className="font-mono text-[11px] whitespace-nowrap transition-colors"
          style={{ color: hovered ? color : '#94a3b8', textShadow: hovered ? `0 0 12px ${color}` : 'none' }}
        >
          {node.label}
        </span>
      </Html>
    </group>
  )
}

function Network() {
  const group = useRef<Group>(null)
  const byId = new Map(GRAPH_NODES.map((n) => [n.id, n]))

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    // Slow autonomous drift + subtle pointer parallax
    group.current.rotation.y = t * 0.08 + pointer.x * 0.15
    group.current.rotation.x = Math.sin(t * 0.05) * 0.08 + pointer.y * -0.1
  })

  return (
    <group ref={group}>
      {GRAPH_EDGES.map(([from, to]) => (
        <Line
          key={`${from}-${to}`}
          points={[byId.get(from)!.position, byId.get(to)!.position]}
          color={ACCENT_HEX[byId.get(from)!.accent]}
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
      {GRAPH_NODES.map((n) => (
        <Node key={n.id} node={n} />
      ))}
    </group>
  )
}

export default function OrchestrationGraph() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} />
      <Network />
    </Canvas>
  )
}
```

- [ ] **Step 4: Rewrite `apps/web/src/features/hero/components/Hero.tsx`**

```tsx
import { lazy, Suspense, Component, type ReactNode } from 'react'
import { ArrowRight, FileDown } from 'lucide-react'
import { GlowLink, GhostLink } from '../../../shared/ui/Buttons'
import { StatusBadge } from '../../../shared/ui/StatusBadge'
import { Reveal } from '../../../shared/ui/Reveal'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'
import { GraphFallback } from './GraphFallback'
import resumePdf from '../../../assets/Alfred_Paul_Engineering_Manager.pdf'

const OrchestrationGraph = lazy(() => import('./OrchestrationGraph'))

/** WebGL failure → static SVG */
class GraphErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <GraphFallback /> : this.props.children
  }
}

function useIsDesktop(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(min-width: 1024px)').matches
}

export function Hero() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const interactive = isDesktop && !reduced

  return (
    <div className="container-grid relative flex min-h-[calc(100svh-4rem)] items-center">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal stagger={0.08}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-panel/60 px-4 py-1.5 backdrop-blur">
            <StatusBadge status="online" />
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
              AI TRANSFORMATION LEAD · FULL STACK · AGENTIC SDLC
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Engineering AI-native software delivery
            <span className="text-accent-cyan text-glow-cyan">.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Full-stack developer and AI architecture leader focused on agentic SDLC, developer
            productivity, governance, MCP integrations, and enterprise AI adoption.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <GlowLink href="#systems">
              View AI Systems <ArrowRight aria-hidden className="size-4" />
            </GlowLink>
            <GhostLink href="#architecture">Architecture Thinking</GhostLink>
            <GhostLink href={resumePdf} download="Alfred_Paul_Resume.pdf">
              <FileDown aria-hidden className="size-4" /> Resume
            </GhostLink>
          </div>
        </Reveal>

        <div className="relative h-[360px] sm:h-[420px] lg:h-[540px]" aria-hidden={interactive}>
          {interactive ? (
            <GraphErrorBoundary>
              <Suspense fallback={<GraphFallback />}>
                <OrchestrationGraph />
              </Suspense>
            </GraphErrorBoundary>
          ) : (
            <GraphFallback />
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Rewrite `apps/web/src/features/hero/index.ts`**

```ts
export { Hero } from './components/Hero'
```

- [ ] **Step 6: Delete dead hero components**

```bash
rm apps/web/src/features/hero/components/HeroParticles.tsx apps/web/src/features/hero/components/ScrambleText.tsx
```

If `pnpm type-check` then fails because old `Hero.tsx` consumers import removed exports, fix only imports — `App.tsx` still imports `{ Hero }`, which remains valid.

- [ ] **Step 7: Verify visually**

Run: `pnpm type-check && pnpm lint`, then `cd apps/web && pnpm dev`.
Expected: hero shows badge/headline/CTAs left, 3D graph right (desktop); nodes glow, labels readable, hover enlarges node; static SVG at <1024px width and with OS reduced-motion enabled.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(web): hero with R3F orchestration graph and static fallback"
```

---

### Task 5: Identity section (5 role cards)

**Files:**
- Create: `apps/web/src/features/identity/data/roles.data.ts`
- Create: `apps/web/src/features/identity/components/Identity.tsx`
- Create: `apps/web/src/features/identity/index.ts`

- [ ] **Step 1: Create `apps/web/src/features/identity/data/roles.data.ts`**

```ts
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
    title: 'Full-Stack Developer',
    description:
      'Hands-on across React, TypeScript, .NET, and cloud — shipping production systems, not slideware.',
    accent: 'indigo',
  },
  {
    icon: DraftingCompass,
    title: 'AI Architect',
    description:
      'Designing agentic systems, MCP integrations, and knowledge graphs with C4 thinking and ADR discipline.',
    accent: 'violet',
  },
  {
    icon: Users,
    title: 'Engineering Manager Track',
    description:
      'A decade of leading global teams — mentoring, delivery ownership, and engineering culture that scales.',
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
```

- [ ] **Step 2: Create `apps/web/src/features/identity/components/Identity.tsx`**

```tsx
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { ROLES } from '../data/roles.data'

const iconColor = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
} as const

export function Identity() {
  return (
    <SectionShell
      index="01"
      label="IDENTITY"
      title="Not just writing code. Building the system that builds the software."
      subtitle="Systems, governance, enablement, and AI adoption strategy for engineering teams — backed by hands-on full-stack delivery."
    >
      <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {ROLES.map((role) => (
          <RevealItem key={role.title}>
            <GlassPanel hoverable className="h-full p-6">
              <role.icon aria-hidden className={`size-7 ${iconColor[role.accent]}`} />
              <h3 className="mt-4 text-base font-bold">{role.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{role.description}</p>
            </GlassPanel>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
```

- [ ] **Step 3: Create `apps/web/src/features/identity/index.ts`**

```ts
export { Identity } from './components/Identity'
```

- [ ] **Step 4: Verify**

Run: `pnpm type-check && pnpm lint`
Expected: PASS. (Section is wired into the page in Task 14; optionally preview by temporarily rendering it — do not commit temporary wiring.)

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/features/identity
git commit -m "feat(web): identity section with five role cards"
```

---

### Task 6: Featured AI Systems section

**Files:**
- Move: `apps/web/src/features/portfolio/data/projects.data.ts` → `apps/web/src/features/systems/data/projects.data.ts` (then extend)
- Move: `apps/web/src/features/portfolio/components/CaseStudyModal.tsx` → `apps/web/src/features/systems/components/CaseStudyModal.tsx` (then restyle)
- Move: `apps/web/src/features/portfolio/components/ArchitectureDiagram.tsx` → `apps/web/src/features/systems/components/ArchitectureDiagram.tsx`
- Move: `apps/web/src/features/portfolio/hooks/useTilt.ts` → `apps/web/src/features/systems/hooks/useTilt.ts`
- Create: `apps/web/src/features/systems/components/SystemModule.tsx`
- Create: `apps/web/src/features/systems/components/Systems.tsx`
- Create: `apps/web/src/features/systems/index.ts`

Old `features/portfolio/` keeps its remaining files until Task 15 (old `Portfolio.tsx` still references the data via old paths — fix its imports if type-check breaks, or delete `Portfolio.tsx` now if nothing else imports it besides `App.tsx`; `App.tsx` is rewritten in Task 14, so prefer: leave old Portfolio broken-imports-fixed via re-export shim below).

- [ ] **Step 1: Move files with git mv**

```bash
mkdir -p apps/web/src/features/systems/{components,data,hooks}
git mv apps/web/src/features/portfolio/data/projects.data.ts apps/web/src/features/systems/data/projects.data.ts
git mv apps/web/src/features/portfolio/components/CaseStudyModal.tsx apps/web/src/features/systems/components/CaseStudyModal.tsx
git mv apps/web/src/features/portfolio/components/ArchitectureDiagram.tsx apps/web/src/features/systems/components/ArchitectureDiagram.tsx
git mv apps/web/src/features/portfolio/hooks/useTilt.ts apps/web/src/features/systems/hooks/useTilt.ts
```

Create a shim so the old portfolio feature still compiles until Task 15 — `apps/web/src/features/portfolio/data/projects.data.ts`:

```ts
export * from '../../systems/data/projects.data'
```

Fix relative imports inside the moved `CaseStudyModal.tsx` and `ArchitectureDiagram.tsx` (their `../data/...` / `../../../shared/...` paths still resolve identically since folder depth is unchanged — verify with type-check). Old `Portfolio.tsx` imports `./CaseStudyModal` etc.; add equivalent shims only if `pnpm type-check` demands them:

```ts
// apps/web/src/features/portfolio/components/CaseStudyModal.tsx (shim)
export * from '../../systems/components/CaseStudyModal'
// and the same pattern for ArchitectureDiagram.tsx and ../hooks/useTilt.ts if imported
```

- [ ] **Step 2: Extend `apps/web/src/features/systems/data/projects.data.ts`**

(a) Add to the `Project` interface (after `featured: boolean`):

```ts
  /** Command-center module status */
  status: 'prod' | 'internal'
  /** One-line architecture highlight shown on the module card */
  architectureHighlight: string
  /** One-line AI impact statement shown on the module card */
  aiImpact: string
```

(b) Add `status`, `architectureHighlight`, and `aiImpact` to every existing project. For existing entries derive one-liners from each project's own `caseStudy.solution`/`impact` text (no new claims). Status mapping: `Dubai Spotter V2` → `prod`, `AI Code Orchestration Agent` → `internal`, `Enterprise MCP` → `internal`, `Vantastix` → `prod`, `Enterprise RAG Chatbot` → `internal`, `Industrial Automation Platform` → `prod`, `Cloud Migration & DevOps Pipeline` → `prod`, `VelocityVote` → `prod`, `Clicks2Compare` → `prod`, `AI-Assisted Development Toolkit` → `internal`, `Team Collaboration Platform` → `internal`.

Example for Dubai Spotter V2:

```ts
    status: 'prod',
    architectureHighlight: 'pnpm monorepo — NestJS API + Next.js web + 2 Expo apps sharing one type contract',
    aiImpact: 'Retell AI outbound calling with usage metering turns lead lists into qualified conversations',
```

(c) Append three new entries (ids 12-14, `featured: true`, qualitative copy only — **flagged for Alfred's fact-verification pass**, see Task 17):

```ts
  {
    id: 12,
    title: 'Knowledge Graph for Repository Navigation',
    description:
      'A code-aware knowledge graph that lets AI agents navigate large repositories by structure and meaning instead of brute-force file reads — entities for modules, contracts, owners, and dependencies.',
    category: 'AI Development',
    technologies: ['TypeScript', 'Knowledge Graphs', 'MCP', 'Claude', 'AST Parsing', 'Graph Modeling'],
    features: [
      'Graph entities for modules, APIs, domain contracts, and ownership',
      'Agents query the graph before touching files — targeted context loading',
      'MCP server exposes graph queries to any compatible AI client',
      'Incremental re-indexing keeps the graph in sync with the codebase',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    status: 'internal',
    architectureHighlight: 'Graph-first context: agents resolve where to look before deciding what to read',
    aiImpact: 'Cuts token waste from blind file exploration; agents land on the right module first',
    caseStudy: {
      problem:
        'AI coding agents working in large enterprise repositories burn most of their context window discovering structure — listing directories, opening the wrong files, re-deriving the same architectural facts every session.',
      solution:
        'Modeled the repository as a knowledge graph: modules, public contracts, dependency edges, domain terms, and ownership metadata. Exposed it through an MCP server so agents query "which module owns trailer scheduling?" and receive a precise file set instead of exploring.',
      impact:
        'Agents start work with the right files in context, sessions stay within budget, and architectural knowledge stops being re-discovered from scratch every conversation.',
      metrics: [
        { label: 'Context Strategy', value: 'Graph-first' },
        { label: 'Exposure', value: 'MCP server' },
        { label: 'Index Mode', value: 'Incremental' },
        { label: 'Status', value: 'Internal' },
      ],
    },
  },
  {
    id: 13,
    title: 'Memory Contract for Token Optimization',
    description:
      'A structured memory contract that lets AI agents persist and recall decisions, conventions, and session state across conversations — replacing repeated re-explanation with cheap lookups.',
    category: 'AI Development',
    technologies: ['Claude', 'MCP', 'Prompt Engineering', 'TypeScript', 'JSON Schema'],
    features: [
      'Typed memory schema: decisions, conventions, open threads, glossary',
      'Write-on-change policy — memory updates only when facts change',
      'Recall ranked by task relevance, not recency alone',
      'Shared across agents so the team’s AI tooling has one source of truth',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    status: 'internal',
    architectureHighlight: 'Contract-governed memory: schema-validated entries instead of free-text notes',
    aiImpact: 'Sessions stop re-paying for context the team already established',
    caseStudy: {
      problem:
        'Every new AI session started cold: project conventions, prior decisions, and domain vocabulary had to be re-explained — costing tokens, time, and consistency across the team.',
      solution:
        'Defined a memory contract — a typed schema for what agents may persist (decisions, conventions, glossary, open threads), with validation, dedup rules, and relevance-ranked recall. Wired into agent workflows via MCP.',
      impact:
        'Agents resume with established context instead of rebuilding it, answers stay consistent with past decisions, and token spend shifts from re-explanation to actual work.',
      metrics: [
        { label: 'Memory Schema', value: 'Typed' },
        { label: 'Recall', value: 'Relevance-ranked' },
        { label: 'Scope', value: 'Team-shared' },
        { label: 'Status', value: 'Internal' },
      ],
    },
  },
  {
    id: 14,
    title: 'AI Governance & Review Gates',
    description:
      'Quality and governance gates for AI-generated code: satisfaction scoring, architecture-conformance checks, and human-in-the-loop approval before anything ships.',
    category: 'AI Development',
    technologies: ['GitHub Actions', 'Claude', 'TypeScript', 'ADR', 'Code Review Automation'],
    features: [
      'Review agents score changes against company engineering standards',
      'Architecture conformance checked against documented ADRs',
      'Human approval gate — AI proposes, engineers decide',
      'Audit trail of agent actions for traceability and trust',
    ],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    status: 'internal',
    architectureHighlight: 'Layered gates: automated scoring → conformance checks → human sign-off',
    aiImpact: 'Makes AI-assisted delivery auditable — speed without losing ownership or quality',
    caseStudy: {
      problem:
        'AI-generated code without guardrails erodes trust: inconsistent quality, silent architecture drift, and no audit trail of what an agent changed or why.',
      solution:
        'Built governance gates into the delivery pipeline: review agents score changes against engineering standards, conformance checks validate against ADRs, and a human approval gate keeps engineers as the final authority. Every agent action is logged.',
      impact:
        'Teams adopt AI assistance with confidence — quality stays enforced, architecture stays intact, and every AI contribution is reviewable and attributable.',
      metrics: [
        { label: 'Gate Layers', value: '3' },
        { label: 'Final Authority', value: 'Human' },
        { label: 'Traceability', value: 'Full audit log' },
        { label: 'Status', value: 'Internal' },
      ],
    },
  },
```

(d) Export the 8 featured systems in display order (add at the bottom of the file):

```ts
const FEATURED_ORDER = [7, 232 /* replace with actual Enterprise MCP id */, 12, 13, 14, 387 /* VelocityVote id */, 10, 294 /* RAG chatbot id */]
```

**Correction:** ids in this file are small integers (e.g. 7, 10) — read the file and use the *actual* `id` values for: AI Code Orchestration Agent, Enterprise MCP, Knowledge Graph (12), Memory Contract (13), Governance Gates (14), VelocityVote, Dubai Spotter V2, Enterprise RAG Chatbot. Then:

```ts
export const FEATURED_SYSTEMS: Project[] = FEATURED_ORDER.map(
  (id) => PROJECTS.find((p) => p.id === id)!
)
```

- [ ] **Step 3: Create `apps/web/src/features/systems/components/SystemModule.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { StatusBadge } from '../../../shared/ui/StatusBadge'
import { MonoChip } from '../../../shared/ui/MonoChip'
import type { Project } from '../data/projects.data'

interface SystemModuleProps {
  project: Project
  onOpen: (project: Project) => void
}

export function SystemModule({ project, onOpen }: SystemModuleProps) {
  return (
    <GlassPanel hoverable className="group flex h-full flex-col p-6 text-left">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="flex h-full flex-col text-left"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
          <StatusBadge status={project.status} className="mt-1 shrink-0" />
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <dl className="mt-4 space-y-2 border-t border-border pt-4">
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-accent-indigo">ARCHITECTURE</dt>
            <dd className="mt-0.5 text-xs text-muted-foreground">{project.architectureHighlight}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-accent-violet">AI IMPACT</dt>
            <dd className="mt-0.5 text-xs text-muted-foreground">{project.aiImpact}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <MonoChip key={tech}>{tech}</MonoChip>
          ))}
          {project.technologies.length > 5 && <MonoChip>+{project.technologies.length - 5}</MonoChip>}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
          OPEN CASE STUDY <ArrowUpRight aria-hidden className="size-3.5" />
        </span>
      </button>
    </GlassPanel>
  )
}
```

- [ ] **Step 4: Create `apps/web/src/features/systems/components/Systems.tsx`**

```tsx
import { useState } from 'react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { SystemModule } from './SystemModule'
import { CaseStudyModal } from './CaseStudyModal'
import { FEATURED_SYSTEMS, type Project } from '../data/projects.data'

export function Systems() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <SectionShell
      index="02"
      label="FEATURED AI SYSTEMS"
      title="Production systems, not prototypes."
      subtitle="Agentic platforms, MCP integrations, and full-stack products — each one a module in a larger engineering operating system."
      accent="indigo"
    >
      <Reveal stagger={0.06} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {FEATURED_SYSTEMS.map((project) => (
          <RevealItem key={project.id} className="h-full">
            <SystemModule project={project} onOpen={setActive} />
          </RevealItem>
        ))}
      </Reveal>

      {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
    </SectionShell>
  )
}
```

**Note:** `CaseStudyModal`'s existing prop signature may differ (read the moved file). If it is e.g. `{ project, isOpen, onClose }`, adapt the call site here to match — do not change the modal's public API in this task.

- [ ] **Step 5: Restyle `CaseStudyModal.tsx` chrome (functional behavior unchanged)**

In the moved `apps/web/src/features/systems/components/CaseStudyModal.tsx`, apply this exact class mapping wherever the old classes appear (keep mermaid `ArchitectureDiagram` and code-snippet rendering as-is):

| Old | New |
|---|---|
| `bg-card` | `glass-panel` |
| `text-primary` (decorative headings) | `text-accent-cyan` |
| `border-primary/*` | `border-accent-cyan/30` |
| any `drake-*` class | nearest accent token (`text-accent-indigo` for info, `text-status-warn` for warnings) |
| `bg-primary` on buttons | keep (`primary` now maps to cyan) |

Add `font-mono text-[10px] tracking-widest text-accent-indigo` styling to the PROBLEM / SOLUTION / IMPACT section labels if the modal renders them as headings.

- [ ] **Step 6: Create `apps/web/src/features/systems/index.ts`**

```ts
export { Systems } from './components/Systems'
```

- [ ] **Step 7: Verify**

Run: `pnpm type-check && pnpm lint`
Expected: PASS (with shims in place for the old portfolio feature).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(web): featured AI systems section with module cards and extended project data"
```

---

### Task 7: Architecture Thinking section

**Files:**
- Create: `apps/web/src/features/architecture/data/layers.data.ts`
- Create: `apps/web/src/features/architecture/components/ArchitectureLayers.tsx`
- Create: `apps/web/src/features/architecture/index.ts`

- [ ] **Step 1: Create `apps/web/src/features/architecture/data/layers.data.ts`**

```ts
export interface ArchLayer {
  id: string
  name: string
  detail: string
  accent: 'cyan' | 'indigo' | 'none'
}

/** Ordered bottom (foundation) → top; rendered top-down with L6 first */
export const LAYERS: ArchLayer[] = [
  { id: 'l6', name: 'Governance / Security / Quality Gates', detail: 'Review gates · audit trails · standards enforcement', accent: 'cyan' },
  { id: 'l5', name: 'AI Agents / MCP / Knowledge Graph', detail: 'Agentic workflows · MCP servers · graph-first context', accent: 'indigo' },
  { id: 'l4', name: 'Data / Cloud / Integration', detail: 'Azure · PostgreSQL · messaging · third-party systems', accent: 'none' },
  { id: 'l3', name: 'API / .NET / gRPC', detail: 'Service contracts · EF Core · domain services', accent: 'none' },
  { id: 'l2', name: 'Frontend / React / TypeScript', detail: 'Component systems · state management · testing', accent: 'none' },
  { id: 'l1', name: 'User Experience', detail: 'Accessibility · performance · clarity', accent: 'none' },
]

export const PRACTICES = [
  'C4 Modeling',
  'ADR Decision Records',
  'Domain-Driven Design',
  'Platform Engineering',
  'Testing Strategy',
  'Observability',
  'Frontend/Backend Boundaries',
] as const
```

- [ ] **Step 2: Create `apps/web/src/features/architecture/components/ArchitectureLayers.tsx`**

```tsx
import { motion } from 'motion/react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { Reveal } from '../../../shared/ui/Reveal'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'
import { LAYERS, PRACTICES } from '../data/layers.data'
import { cn } from '../../../shared/lib/cn'

const layerAccent = {
  cyan: 'glow-border-cyan text-accent-cyan',
  indigo: 'glow-border-indigo text-accent-indigo',
  none: 'border-border text-foreground',
} as const

export function ArchitectureLayers() {
  const reduced = useReducedMotion()

  return (
    <SectionShell
      index="03"
      label="ARCHITECTURE THINKING"
      title="System-level thinking, layer by layer."
      subtitle="From user experience down to governance — every layer is a deliberate decision, recorded and reviewable."
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-3" role="list" aria-label="Architecture layers, top layer is governance">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.id}
              role="listitem"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (LAYERS.length - 1 - i) * 0.12, ease: 'easeOut' }}
              className={cn('glass-panel rounded-lg border px-5 py-4', layerAccent[layer.accent])}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-bold sm:text-base">{layer.name}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">
                  L{LAYERS.length - i}
                </span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{layer.detail}</p>
            </motion.div>
          ))}
        </div>

        <Reveal>
          <div className="glass-panel rounded-lg p-6">
            <h3 className="font-mono text-xs tracking-[0.2em] text-accent-cyan">PRACTICE</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Architecture is a decision log, not a diagram archive. Every significant choice gets an
              ADR; every system gets a C4 view; boundaries follow the domain, not the org chart.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PRACTICES.map((p) => (
                <MonoChip key={p}>{p}</MonoChip>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 3: Create `apps/web/src/features/architecture/index.ts`**

```ts
export { ArchitectureLayers } from './components/ArchitectureLayers'
```

- [ ] **Step 4: Verify + commit**

Run: `pnpm type-check && pnpm lint` → PASS.

```bash
git add apps/web/src/features/architecture
git commit -m "feat(web): architecture thinking section with animated layer stack"
```

---

### Task 8: Agentic SDLC section (prime highlight)

**Files:**
- Create: `apps/web/src/features/sdlc/data/pipeline.data.ts`
- Create: `apps/web/src/features/sdlc/components/AgenticSdlc.tsx`
- Create: `apps/web/src/features/sdlc/index.ts`

- [ ] **Step 1: Create `apps/web/src/features/sdlc/data/pipeline.data.ts`**

```ts
export interface PipelineStage {
  id: string
  name: string
  detail: string
  kind: 'human' | 'agent' | 'gate' | 'system'
}

export const PIPELINE: PipelineStage[] = [
  { id: 'idea', name: 'Idea', detail: 'Problem framing with stakeholders', kind: 'human' },
  { id: 'requirement', name: 'Requirement', detail: 'Acceptance criteria, constraints, success measures', kind: 'human' },
  { id: 'jira', name: 'Jira', detail: 'Tickets enriched via MCP — agents read the same source of truth', kind: 'system' },
  { id: 'architecture', name: 'Architecture', detail: 'C4 views and ADRs set the guardrails before code', kind: 'human' },
  { id: 'code-agent', name: 'Code Agent', detail: 'Implementation drafted within documented boundaries', kind: 'agent' },
  { id: 'test-agent', name: 'Test Agent', detail: 'Unit and E2E coverage generated alongside the change', kind: 'agent' },
  { id: 'review-agent', name: 'Review Agent', detail: 'Standards scoring against company engineering rules', kind: 'agent' },
  { id: 'gate', name: 'Governance Gate', detail: 'Human sign-off — engineers stay the final authority', kind: 'gate' },
  { id: 'deploy', name: 'Deployment', detail: 'CI/CD with progressive rollout', kind: 'system' },
  { id: 'observe', name: 'Observability', detail: 'Telemetry feeds back into planning', kind: 'system' },
  { id: 'memory', name: 'Learning Memory', detail: 'Decisions persist — the next cycle starts smarter', kind: 'agent' },
]

export const SDLC_THESIS =
  'AI does not replace engineering discipline. It amplifies it — through orchestration, guardrails, and review.'
```

- [ ] **Step 2: Create `apps/web/src/features/sdlc/components/AgenticSdlc.tsx`**

GSAP ScrollTrigger scrubs a progress line; stages light up as the pulse passes. Reduced motion → all stages rendered active, no animation.

```tsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bot, ShieldCheck, User, Workflow } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { useReducedMotion } from '../../../shared/hooks/useReducedMotion'
import { PIPELINE, SDLC_THESIS, type PipelineStage } from '../data/pipeline.data'
import { cn } from '../../../shared/lib/cn'

gsap.registerPlugin(ScrollTrigger)

const kindStyle: Record<PipelineStage['kind'], { icon: typeof Bot; chip: string; label: string }> = {
  human: { icon: User, chip: 'border-border text-foreground', label: 'HUMAN' },
  agent: { icon: Bot, chip: 'border-accent-cyan/40 text-accent-cyan', label: 'AGENT' },
  gate: { icon: ShieldCheck, chip: 'border-status-ok/40 text-status-ok', label: 'GATE' },
  system: { icon: Workflow, chip: 'border-accent-indigo/40 text-accent-indigo', label: 'SYSTEM' },
}

export function AgenticSdlc() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !containerRef.current) return
      const stages = gsap.utils.toArray<HTMLElement>('[data-stage]')
      const beam = containerRef.current.querySelector<HTMLElement>('[data-beam]')
      if (!beam || stages.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      })
      tl.fromTo(beam, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top' }, 0)
      stages.forEach((stage, i) => {
        tl.to(stage, { opacity: 1, x: 0, duration: 1 / PIPELINE.length }, i / PIPELINE.length)
      })
    },
    { scope: containerRef, dependencies: [reduced] }
  )

  return (
    <SectionShell
      index="04"
      label="AGENTIC SDLC"
      title="From idea to production — orchestrated, guarded, reviewed."
      subtitle={SDLC_THESIS}
      accent="violet"
    >
      <div ref={containerRef} className="relative mx-auto max-w-3xl">
        {/* Track + animated beam */}
        <div aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]">
          <div
            data-beam
            className={cn(
              'h-full w-full bg-gradient-to-b from-accent-cyan via-accent-indigo to-accent-violet',
              'shadow-[0_0_12px_hsl(var(--accent-cyan)/0.5)]',
              reduced ? '' : 'scale-y-0'
            )}
          />
        </div>

        <ol className="space-y-4">
          {PIPELINE.map((stage) => {
            const k = kindStyle[stage.kind]
            return (
              <li
                key={stage.id}
                data-stage
                className={cn('relative flex gap-4 pl-12 sm:pl-14', reduced ? '' : 'opacity-30 -translate-x-2')}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-0 top-1 flex size-8 items-center justify-center rounded-full border bg-panel sm:size-10',
                    k.chip
                  )}
                >
                  <k.icon className="size-4" />
                </span>
                <div className="glass-panel flex-1 rounded-lg px-5 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold sm:text-base">{stage.name}</h3>
                    <span className={cn('rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-widest', k.chip)}>
                      {k.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stage.detail}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <p aria-hidden className="mt-6 pl-12 font-mono text-[11px] text-accent-violet sm:pl-14">
          ⟲ learning memory feeds the next cycle
        </p>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 3: Create `apps/web/src/features/sdlc/index.ts`**

```ts
export { AgenticSdlc } from './components/AgenticSdlc'
```

- [ ] **Step 4: Verify + commit**

`pnpm type-check && pnpm lint` → PASS. Visual check happens after Task 14 wiring.

```bash
git add apps/web/src/features/sdlc
git commit -m "feat(web): agentic SDLC pipeline with scroll-scrubbed beam"
```

---

### Task 9: Engineering Leadership section (pillars + career timeline)

**Files:**
- Create: `apps/web/src/features/leadership/data/pillars.data.ts`
- Create: `apps/web/src/features/leadership/data/career.data.ts`
- Create: `apps/web/src/features/leadership/components/CareerTimeline.tsx`
- Rewrite: `apps/web/src/features/leadership/components/LeadershipPhilosophy.tsx` → replace with new `Leadership.tsx`
- Rewrite: `apps/web/src/features/leadership/index.ts`

- [ ] **Step 1: Create `apps/web/src/features/leadership/data/pillars.data.ts`**

```ts
import {
  Gauge, Sparkles, ShieldCheck, DraftingCompass, BadgeCheck, Users, CalendarClock, Layers,
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
  { icon: Gauge, title: 'Developer Productivity', description: 'Tooling, workflows, and AI assistance that remove friction — measured, not assumed.' },
  { icon: Sparkles, title: 'AI Enablement', description: 'Hands-on Copilot and agent adoption programs that meet developers where they work.' },
  { icon: ShieldCheck, title: 'Governance', description: 'Review gates, audit trails, and standards that make AI-assisted delivery trustworthy.' },
  { icon: DraftingCompass, title: 'Architecture Alignment', description: 'C4 views and ADRs keep fast-moving teams building the same system.' },
  { icon: BadgeCheck, title: 'Quality Engineering', description: 'Testing strategy as a first-class deliverable — unit, E2E, and agent-generated coverage.' },
  { icon: Users, title: 'Team Collaboration', description: 'Global teams across Dubai and Austria, aligned through rituals that earn their meeting slots.' },
  { icon: CalendarClock, title: 'Sprint & Delivery', description: 'Scrum leadership focused on throughput and predictability without burnout.' },
  { icon: Layers, title: 'Platform Thinking', description: 'Paved roads over tickets: reusable infrastructure that compounds across teams.' },
]
```

- [ ] **Step 2: Create `apps/web/src/features/leadership/data/career.data.ts`**

Extract the `experiences` array **verbatim** from `apps/web/src/features/resume/components/Resume.tsx` (it starts at the `const experiences = [` declaration, three LiSEC roles: Team Leader Oct 2021–Present, Senior Software Developer Oct 2020–Oct 2021, Software Engineer Sep 2013–Oct 2020). Type it:

```ts
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
  /* paste the three experience objects from Resume.tsx here, unchanged */
]
```

Also extract the `education` array into the same file:

```ts
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
```

- [ ] **Step 3: Create `apps/web/src/features/leadership/components/CareerTimeline.tsx`**

```tsx
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { CAREER, EDUCATION } from '../data/career.data'

export function CareerTimeline() {
  return (
    <Reveal stagger={0.1}>
      <h3 className="font-mono text-xs tracking-[0.2em] text-accent-cyan">CAREER TIMELINE</h3>
      <div className="mt-6 space-y-8 border-l border-accent-cyan/30 pl-6">
        {CAREER.map((role) => (
          <RevealItem key={role.period} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-accent-cyan shadow-[0_0_8px_hsl(var(--accent-cyan)/0.8)]"
            />
            <p className="font-mono text-[11px] text-muted-foreground">{role.period} · {role.type}</p>
            <h4 className="mt-1 text-sm font-bold sm:text-base">{role.title}</h4>
            <p className="text-xs text-muted-foreground">{role.company} · {role.location}</p>
            <ul className="mt-2 space-y-1">
              {role.highlights.slice(0, 3).map((h) => (
                <li key={h} className="text-xs leading-relaxed text-muted-foreground">— {h}</li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {role.skills.slice(0, 6).map((s) => (
                <MonoChip key={s}>{s}</MonoChip>
              ))}
            </div>
          </RevealItem>
        ))}
        {EDUCATION.map((edu) => (
          <RevealItem key={edu.period} className="relative">
            <span aria-hidden className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-accent-indigo" />
            <p className="font-mono text-[11px] text-muted-foreground">{edu.period}</p>
            <h4 className="mt-1 text-sm font-bold">{edu.degree}</h4>
            <p className="text-xs text-muted-foreground">{edu.institution} · {edu.location}</p>
          </RevealItem>
        ))}
      </div>
    </Reveal>
  )
}
```

- [ ] **Step 4: Create `apps/web/src/features/leadership/components/Leadership.tsx`** (delete `LeadershipPhilosophy.tsx` in the same commit)

```tsx
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { PILLARS, LEADERSHIP_STATEMENT } from '../data/pillars.data'
import { CareerTimeline } from './CareerTimeline'

export function Leadership() {
  return (
    <SectionShell
      index="05"
      label="ENGINEERING LEADERSHIP"
      title={LEADERSHIP_STATEMENT}
      subtitle="Leadership pillars proven over a decade of building and leading software teams at LiSEC — Dubai and Austria."
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal stagger={0.05} className="grid gap-3 sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <RevealItem key={pillar.title}>
              <GlassPanel hoverable className="h-full p-5">
                <pillar.icon aria-hidden className="size-5 text-accent-cyan" />
                <h3 className="mt-3 text-sm font-bold">{pillar.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{pillar.description}</p>
              </GlassPanel>
            </RevealItem>
          ))}
        </Reveal>
        <CareerTimeline />
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 5: Rewrite `apps/web/src/features/leadership/index.ts`**

```ts
export { Leadership } from './components/Leadership'
```

If `App.tsx` still imports `LeadershipPhilosophy`, temporarily re-export it: `export { Leadership as LeadershipPhilosophy } from './components/Leadership'` (removed in Task 14).

- [ ] **Step 6: Verify + commit**

`pnpm type-check && pnpm lint` → PASS.

```bash
git add -A
git commit -m "feat(web): leadership section with pillars and career timeline"
```

---

### Task 10: Skills section (constellation + grouped list)

**Files:**
- Create: `apps/web/src/features/skills/data/skills.data.ts`
- Create: `apps/web/src/features/skills/components/SkillConstellation.tsx`
- Rewrite: `apps/web/src/features/skills/components/Skills.tsx`
- Rewrite: `apps/web/src/features/skills/index.ts` (export name unchanged: `Skills`)

- [ ] **Step 1: Create `apps/web/src/features/skills/data/skills.data.ts`**

```ts
export interface SkillGroup {
  id: string
  name: string
  accent: 'cyan' | 'indigo' | 'violet' | 'ok' | 'warn'
  skills: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    accent: 'cyan',
    skills: ['React', 'TypeScript', 'Next.js', 'MUI', 'Tailwind CSS', 'Vitest', 'Playwright'],
  },
  {
    id: 'backend',
    name: 'Backend',
    accent: 'indigo',
    skills: ['.NET', 'C#', 'gRPC', 'REST APIs', 'EF Core', 'xUnit / NUnit'],
  },
  {
    id: 'ai',
    name: 'AI Engineering',
    accent: 'violet',
    skills: ['GitHub Copilot', 'Claude', 'MCP', 'Agentic Workflows', 'Knowledge Graphs', 'RAG', 'Prompt Engineering', 'AI Governance'],
  },
  {
    id: 'cloud',
    name: 'Cloud / DevOps',
    accent: 'ok',
    skills: ['Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Datadog', 'CI/CD'],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    accent: 'warn',
    skills: ['C4 Modeling', 'ADR', 'DDD', 'Platform Engineering', 'System Design', 'Observability'],
  },
]
```

- [ ] **Step 2: Create `apps/web/src/features/skills/components/SkillConstellation.tsx`**

CSS-only orbit: rings rotate via the `animate-orbit` keyframes from Task 2; each group dot counter-rotates so labels stay upright. Decorative (`aria-hidden`) — the grouped list is the accessible representation.

```tsx
import { SKILL_GROUPS } from '../data/skills.data'
import { cn } from '../../../shared/lib/cn'

const dotAccent = {
  cyan: 'border-accent-cyan/50 text-accent-cyan',
  indigo: 'border-accent-indigo/50 text-accent-indigo',
  violet: 'border-accent-violet/50 text-accent-violet',
  ok: 'border-status-ok/50 text-status-ok',
  warn: 'border-status-warn/50 text-status-warn',
} as const

interface SkillConstellationProps {
  activeGroup: string | null
  onGroupHover: (id: string | null) => void
}

export function SkillConstellation({ activeGroup, onGroupHover }: SkillConstellationProps) {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Static orbit rings */}
      {[100, 72, 44].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-border/60"
          style={{ inset: `${(100 - size) / 2}%` }}
        />
      ))}

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/40 bg-panel px-4 py-2 font-mono text-[11px] text-accent-cyan shadow-[0_0_24px_hsl(var(--accent-cyan)/0.25)]">
        AP
      </div>

      {/* Rotating layer with group nodes */}
      <div className="absolute inset-0 animate-orbit motion-reduce:animate-none">
        {SKILL_GROUPS.map((group, i) => {
          const angle = (i / SKILL_GROUPS.length) * 2 * Math.PI - Math.PI / 2
          const radius = 50 // % of container
          const x = 50 + radius * Math.cos(angle)
          const y = 50 + radius * Math.sin(angle)
          return (
            <div
              key={group.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-orbit-reverse motion-reduce:animate-none"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => onGroupHover(group.id)}
              onMouseLeave={() => onGroupHover(null)}
            >
              <span
                className={cn(
                  'block whitespace-nowrap rounded-full border bg-panel px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all duration-300',
                  dotAccent[group.accent],
                  activeGroup === group.id && 'scale-110 shadow-[0_0_16px_currentColor]'
                )}
              >
                {group.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

**Note on `animate-orbit-reverse` duration mismatch:** counter-rotation only cancels if both run at the same speed. In Task 2 the durations differ (36s vs 48s) for visual interest; if labels look tilted in practice, set both keyframe durations to 36s by changing `--animate-orbit-reverse: orbit-reverse 36s linear infinite;` in `index.css`.

- [ ] **Step 3: Rewrite `apps/web/src/features/skills/components/Skills.tsx`**

```tsx
import { useState } from 'react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { Reveal } from '../../../shared/ui/Reveal'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { SkillConstellation } from './SkillConstellation'
import { SKILL_GROUPS } from '../data/skills.data'
import { cn } from '../../../shared/lib/cn'

const groupHeading = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
  ok: 'text-status-ok',
  warn: 'text-status-warn',
} as const

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  return (
    <SectionShell
      index="06"
      label="SKILLS"
      title="A full-spectrum toolkit."
      subtitle="Frontend to governance — every layer of the stack I architect, I can also build."
      accent="indigo"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <SkillConstellation activeGroup={activeGroup} onGroupHover={setActiveGroup} />
        </div>

        <Reveal className="space-y-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              onMouseEnter={() => setActiveGroup(group.id)}
              onMouseLeave={() => setActiveGroup(null)}
              className={cn(
                'rounded-lg border border-transparent p-3 transition-colors duration-300',
                activeGroup === group.id && 'glass-panel'
              )}
            >
              <h3 className={cn('font-mono text-xs tracking-[0.2em]', groupHeading[group.accent])}>
                {group.name.toUpperCase()}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <MonoChip key={skill}>{skill}</MonoChip>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 4: Rewrite `apps/web/src/features/skills/index.ts`**

```ts
export { Skills } from './components/Skills'
```

- [ ] **Step 5: Verify + commit**

`pnpm type-check && pnpm lint` → PASS.

```bash
git add -A
git commit -m "feat(web): skills constellation with grouped accessible list"
```

---

### Task 11: Case Studies section

**Files:**
- Create: `apps/web/src/features/case-studies/data/case-studies.data.ts`
- Create: `apps/web/src/features/case-studies/components/CaseStudies.tsx`
- Create: `apps/web/src/features/case-studies/index.ts`

- [ ] **Step 1: Create `apps/web/src/features/case-studies/data/case-studies.data.ts`**

Copy is drafted (qualitative only) and **must be fact-checked by Alfred in Task 17**.

```ts
export interface CaseStudyStrip {
  id: string
  label: string
  title: string
  challenge: string
  approach: string
  outcome: string
  accent: 'cyan' | 'indigo' | 'violet'
  /** Three-node mini flow rendered as the diagram */
  diagram: [string, string, string]
}

export const CASE_STUDIES: CaseStudyStrip[] = [
  {
    id: 'token-waste',
    label: 'CASE STUDY 01',
    title: 'Reducing AI token waste with knowledge-graph navigation',
    challenge:
      'Agents in large repositories spent most of their context window discovering structure — listing folders, opening wrong files, re-learning architecture every session.',
    approach:
      'Modeled the codebase as a knowledge graph (modules, contracts, ownership, dependencies) exposed via MCP, so agents resolve where to look before reading anything.',
    outcome:
      'Sessions start with the right files in context. Token budgets go to implementation instead of exploration, and architectural knowledge persists between sessions.',
    accent: 'cyan',
    diagram: ['Agent query', 'Knowledge graph', 'Targeted file set'],
  },
  {
    id: 'review-gates',
    label: 'CASE STUDY 02',
    title: 'Improving software delivery with agentic review gates',
    challenge:
      'AI-generated code at team scale risked inconsistent quality, architecture drift, and review fatigue for senior engineers.',
    approach:
      'Inserted layered gates into the pipeline: review agents score changes against engineering standards and ADRs, then a human governance gate makes the final call — with a full audit trail.',
    outcome:
      'AI-assisted changes arrive pre-screened and standards-scored. Engineers review judgement calls, not boilerplate — keeping ownership while gaining speed.',
    accent: 'indigo',
    diagram: ['Code agent output', 'Score + conformance', 'Human gate'],
  },
  {
    id: 'mcp-planning',
    label: 'CASE STUDY 03',
    title: 'Connecting Jira and Confluence through MCP for AI-assisted planning',
    challenge:
      'Planning context lived in Jira tickets and Confluence pages that AI tooling could not reach — agents worked blind to requirements and past decisions.',
    approach:
      'Built an enterprise MCP integration for on-prem Jira and Confluence, giving agents governed, read-write access to tickets and documentation from inside the dev workflow.',
    outcome:
      'Agents plan against real requirements and update tickets as work progresses. The same source of truth now serves humans and agents.',
    accent: 'violet',
    diagram: ['Jira + Confluence', 'MCP server', 'Planning agent'],
  },
]
```

- [ ] **Step 2: Create `apps/web/src/features/case-studies/components/CaseStudies.tsx`**

```tsx
import { MoveRight } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { CASE_STUDIES } from '../data/case-studies.data'

const accentText = {
  cyan: 'text-accent-cyan',
  indigo: 'text-accent-indigo',
  violet: 'text-accent-violet',
} as const

export function CaseStudies() {
  return (
    <SectionShell
      index="07"
      label="CASE STUDIES"
      title="Three problems. Three systems. Three outcomes."
      accent="violet"
    >
      <Reveal stagger={0.1} className="grid gap-4 lg:grid-cols-3">
        {CASE_STUDIES.map((cs) => (
          <RevealItem key={cs.id} className="h-full">
            <GlassPanel glow={cs.accent} hoverable className="flex h-full flex-col p-6">
              <p className={`font-mono text-[10px] tracking-[0.2em] ${accentText[cs.accent]}`}>{cs.label}</p>
              <h3 className="mt-2 text-base font-bold leading-snug">{cs.title}</h3>

              {/* Mini flow diagram */}
              <div aria-hidden className="mt-4 flex items-center gap-1.5 rounded-md border border-border bg-background/60 p-3">
                {cs.diagram.map((node, i) => (
                  <span key={node} className="flex min-w-0 items-center gap-1.5">
                    {i > 0 && <MoveRight className={`size-3 shrink-0 ${accentText[cs.accent]}`} />}
                    <span className="truncate rounded border border-border px-1.5 py-1 font-mono text-[9px] text-muted-foreground">
                      {node}
                    </span>
                  </span>
                ))}
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">CHALLENGE</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{cs.challenge}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">APPROACH</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{cs.approach}</dd>
                </div>
                <div>
                  <dt className={`font-mono text-[10px] tracking-widest ${accentText[cs.accent]}`}>OUTCOME</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-foreground">{cs.outcome}</dd>
                </div>
              </dl>
            </GlassPanel>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
```

- [ ] **Step 3: Create `apps/web/src/features/case-studies/index.ts`**

```ts
export { CaseStudies } from './components/CaseStudies'
```

- [ ] **Step 4: Verify + commit**

`pnpm type-check && pnpm lint` → PASS.

```bash
git add apps/web/src/features/case-studies
git commit -m "feat(web): case study strip with mini flow diagrams"
```

---

### Task 12: Certifications + Signals (LinkedIn) sections

**Files:**
- Create: `apps/web/src/features/certifications/data/certifications.data.ts`
- Create: `apps/web/src/features/certifications/components/Certifications.tsx`
- Create: `apps/web/src/features/certifications/index.ts`
- Create: `apps/web/src/features/signals/data/posts.data.ts`
- Create: `apps/web/src/features/signals/components/Signals.tsx`
- Create: `apps/web/src/features/signals/index.ts`

- [ ] **Step 1: Create `apps/web/src/features/certifications/data/certifications.data.ts`**

Extract the `certifications` array **verbatim** from `apps/web/src/features/resume/components/Resume.tsx` (starts near line 88; entries include GitHub Copilot GH-300, Microsoft AI Transformation Leader, PSM, Google People Management, PCEP — keep every field including `verifyUrl`, real URLs only). Type it:

```ts
export interface Certification {
  title: string
  issuer?: string
  year?: string
  description: string
  verifyUrl: string
}

export const CERTIFICATIONS: Certification[] = [
  /* paste the certification objects from Resume.tsx here, unchanged; adjust the
     interface above to match the actual fields found in Resume.tsx (it may have
     `icon`, `image`, or `date` fields — keep what the new card uses: title,
     issuer/org, year/date, description, verifyUrl) */
]
```

- [ ] **Step 2: Create `apps/web/src/features/certifications/components/Certifications.tsx`**

```tsx
import { Award, ExternalLink } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { CERTIFICATIONS } from '../data/certifications.data'

export function Certifications() {
  return (
    <SectionShell
      index="08"
      label="CERTIFICATIONS"
      title="Credentialed, not just claimed."
      subtitle="Every badge links to its verification source."
    >
      <Reveal stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <RevealItem key={cert.title} className="h-full">
            <GlassPanel hoverable className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between">
                <Award aria-hidden className="size-6 text-accent-cyan" />
                {cert.year && <span className="font-mono text-[10px] text-muted-foreground">{cert.year}</span>}
              </div>
              <h3 className="mt-3 text-sm font-bold">{cert.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{cert.description}</p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-accent-cyan hover:underline"
              >
                VERIFY <ExternalLink aria-hidden className="size-3" />
              </a>
            </GlassPanel>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
```

- [ ] **Step 3: Create `apps/web/src/features/signals/data/posts.data.ts`**

Drafted entries — **Alfred replaces `url` with direct post links and adjusts hooks during the Task 17 fact-check** (placeholder-free: the profile activity URL below is real and functional in the meantime).

```ts
export interface Post {
  id: string
  topic: string
  hook: string
  date: string
  url: string
}

const ACTIVITY_URL = 'https://www.linkedin.com/in/alfred-paul-56438454/recent-activity/all/'

export const POSTS: Post[] = [
  {
    id: 'agentic-sdlc',
    topic: 'Agentic SDLC',
    hook: 'What actually changes when agents join your delivery pipeline — and what absolutely must not.',
    date: '2026',
    url: ACTIVITY_URL,
  },
  {
    id: 'mcp-enterprise',
    topic: 'MCP in the Enterprise',
    hook: 'Connecting on-prem Jira and Confluence to AI agents: the integration nobody talks about.',
    date: '2026',
    url: ACTIVITY_URL,
  },
  {
    id: 'ai-governance',
    topic: 'AI Governance',
    hook: 'Speed without governance is just expensive rework. How review gates keep AI-assisted teams honest.',
    date: '2026',
    url: ACTIVITY_URL,
  },
]
```

- [ ] **Step 4: Create `apps/web/src/features/signals/components/Signals.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react'
import { SectionShell } from '../../../shared/ui/SectionShell'
import { GlassPanel } from '../../../shared/ui/GlassPanel'
import { MonoChip } from '../../../shared/ui/MonoChip'
import { Reveal, RevealItem } from '../../../shared/ui/Reveal'
import { POSTS } from '../data/posts.data'

export function Signals() {
  return (
    <SectionShell
      index="09"
      label="SIGNALS"
      title="Thinking out loud."
      subtitle="Selected writing on agentic engineering, AI governance, and enterprise adoption — from my LinkedIn."
      accent="indigo"
    >
      <Reveal stagger={0.08} className="grid gap-4 md:grid-cols-3">
        {POSTS.map((post) => (
          <RevealItem key={post.id} className="h-full">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="block h-full">
              <GlassPanel hoverable className="group flex h-full flex-col p-5">
                <div className="flex items-center justify-between">
                  <MonoChip className="text-accent-indigo border-accent-indigo/30">{post.topic}</MonoChip>
                  <span className="font-mono text-[10px] text-muted-foreground">{post.date}</span>
                </div>
                <p className="mt-3 flex-1 text-sm font-medium leading-relaxed">{post.hook}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] tracking-wider text-accent-cyan">
                  READ ON LINKEDIN <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </GlassPanel>
            </a>
          </RevealItem>
        ))}
      </Reveal>
    </SectionShell>
  )
}
```

- [ ] **Step 5: Create both index files**

```ts
// apps/web/src/features/certifications/index.ts
export { Certifications } from './components/Certifications'
```

```ts
// apps/web/src/features/signals/index.ts
export { Signals } from './components/Signals'
```

- [ ] **Step 6: Verify + commit**

`pnpm type-check && pnpm lint` → PASS.

```bash
git add apps/web/src/features/certifications apps/web/src/features/signals
git commit -m "feat(web): certifications badges and LinkedIn signals strip"
```

---

### Task 13: Restyle kept components (Navigation, Footer, Testimonials, Contact, shell UI)

**Files:**
- Rewrite: `apps/web/src/features/navigation/components/Navigation.tsx`
- Rewrite: `apps/web/src/features/navigation/components/Footer.tsx`
- Modify: `apps/web/src/features/navigation/hooks/useActiveSection.ts` (section ids)
- Modify: `apps/web/src/features/testimonials/components/Testimonials.tsx` (class swaps)
- Modify: `apps/web/src/features/contact/components/Contact.tsx` (class swaps)
- Modify: `apps/web/src/shared/ui/CommandPalette.tsx` (section list)
- Modify: `apps/web/src/shared/ui/CustomCursor.tsx`, `ScrollProgressBar.tsx`, `BackToTop.tsx`, `LoadingScreen.tsx` (recolor)
- Delete: `apps/web/src/shared/ui/ThemeToggle.tsx`, `apps/web/src/shared/context/ThemeContext.tsx`

- [ ] **Step 1: Rewrite `Navigation.tsx`** as a fixed glass command bar. Keep the existing mobile-menu state pattern from the current file (read it first), but with this structure and nav model:

```tsx
const NAV_LINKS = [
  { href: '#systems', label: 'Systems' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#sdlc', label: 'SDLC' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
```

Desktop bar (replace the old header JSX; keep `useActiveSection` highlighting):

```tsx
<header className="fixed inset-x-0 top-0 z-50">
  <nav
    aria-label="Main"
    className="glass-panel mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-lg px-4 py-2.5 sm:px-6"
  >
    <a href="#home" className="font-mono text-sm font-bold tracking-tight">
      AP<span className="text-accent-cyan">://</span>
    </a>

    <ul className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              activeSection === link.href.slice(1)
                ? 'text-accent-cyan'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={openCommandPalette}
        className="hidden items-center gap-1.5 rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent-cyan/50 hover:text-foreground sm:inline-flex"
        aria-label="Open command palette"
      >
        ⌘K
      </button>
      <StatusBadge status="online" />
      {/* keep existing mobile hamburger button + panel, restyled with glass-panel */}
    </div>
  </nav>
</header>
```

Wire `openCommandPalette` from the existing `useCommandPalette` hook (check its API — it exposes `isOpen/close` in `App.tsx`; if it has no imperative `open`, dispatch the same keyboard event the hook listens for, or extend the hook with an `open()` setter — prefer extending the hook). **ThemeToggle is removed from the nav.**

- [ ] **Step 2: Update `useActiveSection.ts`** — replace its section id list with: `['home', 'identity', 'systems', 'architecture', 'sdlc', 'leadership', 'skills', 'case-studies', 'certifications', 'signals', 'testimonials', 'contact']`.

- [ ] **Step 3: Update `CommandPalette.tsx`** — replace its navigation entries with the same 12 sections (label + `#id`); apply class mapping from Step 5. Keep keyboard behavior unchanged.

- [ ] **Step 4: Rewrite `Footer.tsx`**

```tsx
import { Github, Linkedin, Mail } from 'lucide-react'
import { StatusBadge } from '../../../shared/ui/StatusBadge'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-grid flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-[11px] text-muted-foreground">
          alfred@paul:~$ <span className="text-accent-cyan">uptime</span> — building since 2013
        </p>
        <div className="flex items-center gap-4">
          <a href="mailto:alfred.v.paul@gmail.com" aria-label="Email" className="text-muted-foreground transition-colors hover:text-accent-cyan"><Mail className="size-4" /></a>
          <a href="https://www.linkedin.com/in/alfred-paul-56438454" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-accent-cyan"><Linkedin className="size-4" /></a>
          <a href="https://github.com/alfredpaul" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-accent-cyan"><Github className="size-4" /></a>
          <StatusBadge status="online" />
        </div>
      </div>
    </footer>
  )
}
```

(Check the existing Footer first — if it exports `default` or different GitHub URL, keep the real URLs from the current file.)

- [ ] **Step 5: Class-swap restyle for `Testimonials.tsx` and `Contact.tsx`** (and `CommandPalette.tsx`)

Apply this exact mapping (project-wide find/replace within these files only):

| Old class | New class |
|---|---|
| `bg-card` | `glass-panel` |
| `card-drake` | `glass-panel rounded-lg` |
| `btn-drake` | (use `GlowButton`/`GlowLink` from `shared/ui/Buttons`) |
| `text-gradient` | `text-accent-cyan` |
| `text-glow` | `text-glow-cyan` |
| `gradient-border` | `glass-panel glow-border-cyan` |
| `glass-effect` | `glass-panel` |
| `bg-muted/20` | `bg-surface` |
| `text-drake-*`, `bg-drake-*`, `border-drake-*` | nearest accent token (`accent-cyan` default, `accent-indigo` for informational, `status-warn` for ratings/stars) |
| `container-drake` | `container-grid` |

Also update each section heading in these two components to the `SectionShell` pattern if trivially possible; otherwise keep their internal headings but set the mono kicker style: `font-mono text-xs tracking-[0.2em] text-accent-cyan` (Testimonials = `10 / TESTIMONIALS`, Contact = `11 / CONTACT`). Contact keeps react-hook-form + zod + `contact.client.ts` logic untouched.

- [ ] **Step 6: Recolor shell UI**

- `CustomCursor.tsx`: change cursor dot/ring colors from green/primary literals to `bg-accent-cyan` / `border-accent-cyan` (it already follows `pointer: fine`; keep that).
- `ScrollProgressBar.tsx`: bar color → `bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet`.
- `BackToTop.tsx`: classes per Step 5 mapping.
- `LoadingScreen.tsx`: keep its timing/fade logic; restyle content to a mono boot line on `bg-background`:

```tsx
<div className="flex flex-col items-center gap-3">
  <p className="font-mono text-sm text-accent-cyan">AP://command-center</p>
  <p className="font-mono text-xs text-muted-foreground">initializing systems…</p>
</div>
```

- [ ] **Step 7: Delete theme machinery**

```bash
rm apps/web/src/shared/ui/ThemeToggle.tsx apps/web/src/shared/context/ThemeContext.tsx
```

Remove any remaining imports of these (grep: `rg -l "ThemeToggle|ThemeContext" apps/web/src`).

- [ ] **Step 8: Verify + commit**

`pnpm type-check && pnpm lint` → PASS.

```bash
git add -A
git commit -m "feat(web): command-bar navigation and restyled shell components"
```

---

### Task 14: Assemble the page (`App.tsx`)

**Files:**
- Rewrite: `apps/web/src/App.tsx`

- [ ] **Step 1: Rewrite `apps/web/src/App.tsx`**

```tsx
import { Navigation, Footer } from './features/navigation'
import { Hero } from './features/hero'
import { Identity } from './features/identity'
import { Systems } from './features/systems'
import { ArchitectureLayers } from './features/architecture'
import { AgenticSdlc } from './features/sdlc'
import { Leadership } from './features/leadership'
import { Skills } from './features/skills'
import { CaseStudies } from './features/case-studies'
import { Certifications } from './features/certifications'
import { Signals } from './features/signals'
import { Testimonials } from './features/testimonials'
import { Contact } from './features/contact'
import { GridBackdrop } from './shared/ui/GridBackdrop'
import { ScrollProgressBar } from './shared/ui/ScrollProgressBar'
import { BackToTop } from './shared/ui/BackToTop'
import { LoadingScreen } from './shared/ui/LoadingScreen'
import { CustomCursor } from './shared/ui/CustomCursor'
import { CommandPalette } from './shared/ui/CommandPalette'
import { DeveloperMode } from './shared/ui/DeveloperMode'
import { useCommandPalette } from './shared/hooks/useCommandPalette'
import { useKonamiCode } from './shared/hooks/useKonamiCode'

function App() {
  const { isOpen, close } = useCommandPalette()
  const { activated: devMode, dismiss: closeDev } = useKonamiCode()

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <ScrollProgressBar />
      <BackToTop />
      <CommandPalette isOpen={isOpen} onClose={close} />
      <DeveloperMode isOpen={devMode} onClose={closeDev} />

      <div className="relative min-h-screen bg-background text-foreground">
        <GridBackdrop />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent-cyan focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Navigation />

        <main className="relative z-10">
          <section id="home" aria-label="Introduction">
            <Hero />
          </section>
          <section id="identity" className="section-padding" aria-label="Identity">
            <Identity />
          </section>
          <section id="systems" className="section-padding bg-surface/60" aria-label="Featured AI systems">
            <Systems />
          </section>
          <section id="architecture" className="section-padding" aria-label="Architecture thinking">
            <ArchitectureLayers />
          </section>
          <section id="sdlc" className="section-padding bg-surface/60" aria-label="Agentic SDLC">
            <AgenticSdlc />
          </section>
          <section id="leadership" className="section-padding" aria-label="Engineering leadership">
            <Leadership />
          </section>
          <section id="skills" className="section-padding bg-surface/60" aria-label="Skills">
            <Skills />
          </section>
          <section id="case-studies" className="section-padding" aria-label="Case studies">
            <CaseStudies />
          </section>
          <section id="certifications" className="section-padding bg-surface/60" aria-label="Certifications">
            <Certifications />
          </section>
          <section id="signals" className="section-padding" aria-label="Writing and posts">
            <Signals />
          </section>
          <section id="testimonials" className="section-padding bg-surface/60" aria-label="Testimonials">
            <Testimonials />
          </section>
          <section id="contact" className="section-padding" aria-label="Contact">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
```

- [ ] **Step 2: Full visual pass**

Run `cd apps/web && pnpm dev`. Walk the page top to bottom at 1440px: every section renders, anchors work from nav + ⌘K, no Drake-green remnants anywhere (grep the rendered page visually; also `rg "drake" apps/web/src` should only match soon-to-be-deleted old features).

- [ ] **Step 3: Verify + commit**

`pnpm type-check && pnpm lint` → PASS.

```bash
git add apps/web/src/App.tsx
git commit -m "feat(web): assemble 13-zone command-center page"
```

---

### Task 15: Delete old features + prune dependencies

**Files:**
- Delete: `apps/web/src/features/about/`, `features/resume/`, `features/services/`, `features/insights/`, `features/roadmap/`, `features/portfolio/`
- Modify: `apps/web/package.json` (remove unused deps)

- [ ] **Step 1: Confirm nothing imports the old features**

```bash
rg -l "features/(about|resume|services|insights|roadmap|portfolio)" apps/web/src
```

Expected: no matches outside the folders themselves. Fix any stragglers first (the Task 6 shims live in `features/portfolio` and die with it).

- [ ] **Step 2: Delete**

```bash
git rm -r apps/web/src/features/about apps/web/src/features/resume apps/web/src/features/services apps/web/src/features/insights apps/web/src/features/roadmap apps/web/src/features/portfolio
```

**Before deleting `features/resume`**: confirm Task 9 (career data) and Task 12 (certifications data) extractions are complete — `rg "experiences|certifications" apps/web/src/features/leadership apps/web/src/features/certifications` shows the data landed.

- [ ] **Step 3: Prune dependencies**

For each candidate, verify zero usage then remove:

```bash
rg -l "tsparticles" apps/web/src || (cd apps/web && pnpm remove @tsparticles/react @tsparticles/slim)
rg -l "react-syntax-highlighter" apps/web/src || (cd apps/web && pnpm remove react-syntax-highlighter @types/react-syntax-highlighter)
rg -l "mermaid" apps/web/src || (cd apps/web && pnpm remove mermaid)
rg -l "zustand" apps/web/src || (cd apps/web && pnpm remove zustand)
rg -l "@tanstack/react-query" apps/web/src || (cd apps/web && pnpm remove @tanstack/react-query)
```

**Important:** `mermaid` and `react-syntax-highlighter` are likely still used by the moved `ArchitectureDiagram.tsx`/`CaseStudyModal.tsx` — if `rg` finds usages, keep them. Never remove a dep that still matches.

- [ ] **Step 4: Verify production build**

```bash
pnpm type-check && pnpm lint && pnpm build
```

Expected: all PASS; `apps/web/dist/` produced. Note the bundle report — the three.js chunk must be a separate lazy chunk (look for a `OrchestrationGraph`-ish chunk in the Vite output).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(web): remove legacy sections and unused dependencies"
```

---

### Task 16: SEO metadata + JSON-LD

**Files:**
- Modify: `apps/web/index.html`

- [ ] **Step 1: Replace `<head>` content (keeping charset/viewport/favicon lines)**

Title + description + keywords:

```html
<title>Alfred Paul — AI Transformation Lead & Full-Stack Architect | Agentic SDLC | Dubai</title>
<meta name="description" content="AI Transformation Lead and full-stack architect building agentic engineering systems — MCP integrations, AI governance, knowledge graphs, and enterprise AI adoption. 12+ years leading software teams at LiSEC." />
<meta name="keywords" content="Alfred Paul, AI Transformation Lead, AI Architect, Agentic SDLC, MCP, Engineering Manager, GitHub Copilot, Claude, Full Stack, React, .NET, Azure, Dubai" />
<meta name="author" content="Alfred Paul" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#07090d" />
<link rel="canonical" href="https://alfred-paul.vercel.app/" />
```

Open Graph + Twitter (keep existing og:image paths — they exist in `public/images/`):

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://alfred-paul.vercel.app/" />
<meta property="og:title" content="Alfred Paul — AI Transformation Lead & Full-Stack Architect" />
<meta property="og:description" content="Building agentic engineering systems: MCP integrations, AI governance, knowledge graphs, and enterprise AI adoption." />
<meta property="og:image" content="/images/alfred-paul-profile.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content="Alfred Paul Portfolio" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Alfred Paul — AI Transformation Lead & Full-Stack Architect" />
<meta name="twitter:description" content="Agentic SDLC, MCP integrations, AI governance, and enterprise AI adoption — backed by hands-on full-stack delivery." />
<meta name="twitter:image" content="/images/alfred-paul-profile.jpg" />
```

JSON-LD — keep the existing block but update `jobTitle` and `knowsAbout`:

```json
"jobTitle": "AI Transformation Lead & Full-Stack Architect",
"knowsAbout": ["Agentic SDLC", "MCP", "AI Governance", "Knowledge Graphs", "GitHub Copilot", "Claude", "React", "TypeScript", ".NET", "Azure", "Engineering Leadership", "RAG"]
```

Keep `hasCredential` as-is (URLs are real), keep email/phone/address/sameAs.

- [ ] **Step 2: Verify + commit**

`pnpm build` → PASS. Open `apps/web/dist/index.html` and confirm meta present.

```bash
git add apps/web/index.html
git commit -m "feat(web): refresh SEO metadata and JSON-LD for command-center positioning"
```

---

### Task 17: Fact-check pass with Alfred (REQUIRED HUMAN CHECKPOINT)

**Files:** content-only edits in `apps/web/src/features/*/data/*.data.ts`

- [ ] **Step 1: Present drafted content for verification.** Stop and ask Alfred to review these specific items (list them in chat with their current values):

1. The three new project entries (Knowledge Graph, Memory Contract, Governance Gates) in `systems/data/projects.data.ts` — descriptions, features, case studies.
2. All `architectureHighlight` / `aiImpact` one-liners added to existing projects.
3. The three case studies in `case-studies/data/case-studies.data.ts`.
4. The five role descriptions in `identity/data/roles.data.ts` and eight pillar descriptions in `leadership/data/pillars.data.ts`.
5. The three Signals posts in `signals/data/posts.data.ts` — Alfred supplies real post URLs, topics, hooks, and dates.

- [ ] **Step 2: Apply corrections** Alfred provides; commit:

```bash
git add -A
git commit -m "content(web): apply fact-check corrections to drafted copy"
```

---

### Task 18: Final verification + responsive/a11y polish

- [ ] **Step 1: Build + preview**

```bash
pnpm build && cd apps/web && pnpm preview
```

Open http://localhost:4173.

- [ ] **Step 2: Responsive walk** at 375px, 768px, 1440px (browser devtools):
- Hero: static SVG below 1024px; copy readable; CTAs wrap cleanly
- Systems grid: 1 col → 2 col → 4 col
- SDLC beam aligns with stage icons at all widths
- Constellation hidden on mobile (list remains)
- Nav collapses to hamburger; ⌘K hidden on touch

- [ ] **Step 3: Reduced-motion walk** — enable "reduce motion" in OS settings: no orbit, no beam scrub (all stages visible), no grid pan, fallback SVG in hero, reveals are opacity-only.

- [ ] **Step 4: Keyboard walk** — Tab from top: skip link appears first, nav links, ⌘K button, hero CTAs, system modules (Enter opens modal, Esc closes, focus returns), form fields. All focus rings visible cyan.

- [ ] **Step 5: Lighthouse** (Chrome devtools, production preview, mobile + desktop): Performance ≥ 90, Accessibility = 100, SEO = 100. Fix regressions (most common: image sizes, contrast on `text-muted-foreground` over `bg-surface` — bump lightness in `index.css` if flagged).

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix(web): responsive, reduced-motion, and a11y polish"
```

---

### Task 19: Finish the branch

- [ ] **Step 1: Update `CLAUDE.md`** — refresh the "Web App Layout" section: new section order (`Navigation → Hero → Identity → Systems → Architecture → SDLC → Leadership → Skills → CaseStudies → Certifications → Signals → Testimonials → Contact → Footer`), note that content lives in `features/*/data/*.data.ts`, palette is cyan/indigo/violet with green as status-only, dark-only (no theme toggle).

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for command-center architecture"
```

- [ ] **Step 2: Use superpowers:finishing-a-development-branch** to merge/PR `redesign/command-center` (user decides: PR to `main` → Vercel preview deploy is the natural review surface).

---

## Self-review notes (already applied)

- **Spec coverage:** all 13 zones have tasks (1-14); SEO (16), a11y/perf (18), fact-check gate (17), cleanup (15), CLAUDE.md (19). Command palette, cursor, loading screen, dev mode all addressed in Task 13.
- **Type consistency:** `Project.status: 'prod' | 'internal'` (Task 6) matches `StatusBadge` statuses (Task 3). `Reveal`/`RevealItem` API used identically in Tasks 5-12. `accent` unions match between data files and component maps.
- **Known judgment calls for the implementer:** `CaseStudyModal` prop API (Task 6 Step 4 note), `useCommandPalette` open() (Task 13 Step 1), certification field names (Task 12 Step 1) — each has explicit fallback instructions.







