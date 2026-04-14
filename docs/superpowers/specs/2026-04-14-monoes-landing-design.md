# monoes.me — Landing Website Design Spec

## Overview

A premium, interactive website for **monoes.me** representing the monoes brand — a monkey character ("mono") that embodies four open-source developer tools. The site is a cinematic scroll journey through the ecosystem with luxurious interactions, ivory-and-gold aesthetics, and per-project interactive demos.

**Tone:** Premium & minimal. The monkey is a refined emblem, not a cartoon mascot. Interactions feel luxurious and smooth. The site itself is the product — visitors should leave thinking "these people make beautiful, serious tools."

**Goal:** Brand awareness. GitHub links and install options present but never pushy. Exploratory feel.

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSR/SSG)
- **Animation:** GSAP (ScrollTrigger, MorphSVG) + Framer Motion
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Font loading:** next/font (Satoshi for display/body + JetBrains Mono for code)
- **Deployment:** Vercel (monoes.me)
- **Data:** GitHub API for live star counts and activity

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| Landing | `/` | Cinematic scroll journey through all 4 projects |
| MonoAgent | `/mono-agent` | Feature showcase + workflow builder demo |
| Monobrain | `/monobrain` | Feature showcase + swarm simulation demo |
| MonoClip | `/mono-clip` | Feature showcase + clipboard simulation demo |
| MonoTask | `/monotask` | Feature showcase + P2P kanban demo |
| Community | `/community` | Open source ecosystem hub |

---

## Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Ivory White | `#FFFFF0` | Primary background |
| Warm Ivory | `#FAF7F0` | Section alternate background |
| Parchment | `#F5F0E8` | Card backgrounds |
| Linen | `#EDE5D8` | Borders, dividers |
| Espresso | `#2A2318` | Dark hero/footer sections |
| Antique Gold | `#C8A97E` | Primary accent |
| Dark Gold | `#8B6914` | Headings, icons |
| Warm Bronze | `#8B7355` | Body text |
| Gold Gradient | `#C8A97E → #8B6914` | Buttons, progress bars |

### Typography

| Role | Font | Weight | Size | Tracking | Color |
|------|------|--------|------|----------|-------|
| Display headlines | Satoshi | 200 (Extralight) | 48-72px | -0.5px | `#2A2318` |
| Section labels | Satoshi | 500 | 12px | 4px, uppercase | `#C8A97E` |
| Body | Satoshi | 400 | 16-18px | normal, 1.7 line-height | `#8B7355` |
| Code blocks | JetBrains Mono | 400 | 14px | normal | `#C8A97E` on `#1a1208` |

### Effects & Textures

- **Film grain:** SVG noise texture at 3% opacity over ivory backgrounds for tactile warmth
- **Cursor glow:** Soft gold radial gradient (60px radius) follows cursor. Warm amber variant on dark sections.
- **Magnetic tilt:** Cards tilt toward cursor within 200px radius. Light reflection gradient follows mouse. Spring physics for return.
- **Shadows:** Ultra-soft, warm-toned: `0 4px 24px rgba(42,35,24,0.04)`

### Components

- **Navigation:** Sticky, minimal. Logo (monkey emblem + "MONOES" in spaced caps) on left, text links on right. Scroll progress as thin gold line below nav.
- **Primary button:** Gold gradient background, white text, 6px border-radius
- **Secondary button:** Transparent with 1px gold border, gold text
- **Text link:** Warm Bronze with underline that draws left-to-right on hover, arrow translates right 4px
- **Feature card:** White background, Linen border, soft warm shadow. Icon + title + description. Magnetic tilt on hover.
- **Terminal block:** Espresso background with gold monospace text. Typing animation with blinking cursor.

---

## Landing Page — The Scroll Journey

Seven sequential acts viewed as one continuous vertical scroll.

### Act 1: Hero (Dark)

- **Background:** Espresso (#2A2318) with radial gold glow at center
- **On load:** ~200 golden particles drift randomly on a canvas overlay
- **On scroll (0-20vh):** Particles converge into the monkey emblem silhouette using GSAP timeline
- **On scroll (20-40vh):** Emblem resolves to full detail. Tagline "Tools that think with you, not for you" types letter-by-letter below. Subtitle "Four open-source instruments. One philosophy." fades in.
- **Navigation:** Fades in at top after emblem resolves. Semi-transparent on dark, transitions to solid on ivory.
- **Scroll cue:** "SCROLL TO DISCOVER" label with subtle bounce animation

### Act 2: Philosophy (Dark → Ivory transition)

- **Transition:** Background blends from Espresso to Ivory White over 100vh of scroll using CSS mix-blend-mode
- **Content:** "Mono — singular focus. Each tool does one thing with obsessive precision."
- **Text reveal:** Words appear one-by-one with opacity + translateY(12px) animation, staggered at 0.08s
- **Monkey emblem:** Floats on the right with parallax offset (moves at 0.7x scroll speed)
- **Additional copy:** "No cloud dependencies. No accounts. Just software that respects you."

### Act 3: MonoAgent Section (Pinned)

- **Trigger:** Section pins to viewport when top reaches top of screen
- **Duration:** ~3 scroll-lengths of internal content
- **Left column (60%):** Content scrolls within pinned frame
  - Project number "01" with "MONO AGENT" label
  - Headline: "Automate anything with a browser"
  - Tagline: "70+ workflow nodes. Real Chrome automation. Zero cloud."
  - 3 key features that slide in from the right, staggered
  - Mini workflow DAG that draws its connections as you scroll
  - "Explore MonoAgent →" link
- **Right column (40%):** Monkey persona illustration (hacker monkey with terminal). Parallax at 0.8x.
- **Progress:** Thin horizontal gold bar at top fills left-to-right as you scroll through this section
- **Accent color:** Antique Gold (#C8A97E) for left border

### Act 4: Monobrain Section (Pinned)

- **Monkey morph:** Between Act 3 and 4, the monkey illustration cross-dissolves from hacker to scientist persona (SVG morph + opacity)
- **Same pinned structure as Act 3**
- **Headline:** "Orchestrate AI agent swarms"
- **Tagline:** "60+ agent types. HNSW vector search. Neural learning."
- **Unique element:** Particle network visualization — nodes orbit and connect with animated lines, representing the swarm topology
- **Accent color:** Dark Gold (#8B6914) for left border

### Act 5: MonoClip Section (Pinned)

- **Monkey morph:** Scientist → DJ persona
- **Headline:** "Your clipboard, with a memory"
- **Tagline:** "Native macOS. AI-ready. 8MB binary."
- **Unique element:** Glassmorphism clipboard cards cascading down, showing different clip types (code, text, image paths). Cards have frosted blur effect.
- **Accent color:** `#B8956A` for left border

### Act 6: MonoTask Section (Pinned)

- **Monkey morph:** DJ → Original monkey (the MonoTask mascot SVG)
- **Headline:** "P2P kanban. No server. No nonsense."
- **Tagline:** "CRDT sync. Ed25519 crypto. Zero knowledge."
- **Unique element:** Miniature kanban board with 3 columns. Cards subtly drift between columns to demonstrate P2P sync.
- **Accent color:** `#A07840` for left border

### Act 7: Community CTA + Footer (Ivory → Dark transition)

- **Transition:** Ivory fades to Espresso over 80vh
- **Content:** "Built in the open. Shaped by the community."
- **Constellation:** All four project icons/logos orbit into a diamond constellation formation
- **Links:** GitHub, Community page, Contributing Guide — as gold-bordered pills
- **Footer:** Nokhodian signature logo, copyright, social links. Minimal.

---

## Project Detail Pages

All four project pages share a common template with unique interactive demos.

### Shared Template Structure

1. **Hero banner (dark)**
   - Back link: "← BACK TO MONOES"
   - Project name (large, extralight)
   - One-line tagline
   - GitHub button (primary) + Install button (secondary)
   - Monkey persona illustration on right side
   - FLIP animation: The project card from the landing page expands into this hero (Framer Motion `layoutId`)

2. **Interactive demo section**
   - Full-width, ivory background
   - Unique per project (see below)
   - Scroll-triggered activation

3. **Feature grid**
   - 3x2 grid of feature cards
   - Each card: icon + title + 1-2 line description
   - Stagger reveal on scroll (0.05s delay between cards, fade + translateY 20px)
   - Magnetic tilt + light reflection on hover

4. **Get Started (terminal block)**
   - Espresso background with gold monospace text
   - Install command types character-by-character with blinking gold cursor
   - Output lines fade in after command "completes"
   - Realistic timing variations between keystrokes

5. **Architecture diagram**
   - Animated SVG diagram
   - Components appear on scroll, connection lines draw between them
   - Hover a component to highlight its connections

6. **Cross-links footer**
   - "Explore more tools" with the other 3 project cards
   - Same magnetic tilt behavior
   - Clicking triggers FLIP transition to the other project page

### Unique Interactive Demos

#### MonoAgent — Live Workflow Builder

- Visual canvas with pre-placed nodes representing a sample workflow (e.g., Instagram Daily Post)
- Nodes: Trigger → Browser Open → AI Generate → Post
- Data flow particles animate along connection lines
- Visitors can drag nodes to rearrange (snap-to-grid)
- If untouched for 3 seconds, the workflow auto-plays: nodes highlight sequentially, data flows animate, completion checkmark appears
- Built with HTML Canvas or SVG + GSAP Draggable

#### Monobrain — Swarm Simulation

- Central coordinator node (larger, gold) surrounded by 8-12 orbiting agent nodes (smaller)
- Idle state: agents orbit slowly in hierarchical-mesh pattern
- Visitor types a prompt into an input field → animation triggers:
  - Coordinator pulses
  - Task splits into sub-particles sent to relevant agents
  - Agents "process" (glow animation)
  - Results flow back as converging lines
  - Final result appears as text below
- Shows message passing, consensus, and convergence visually
- Built with Canvas 2D + GSAP

#### MonoClip — Clipboard Simulation

- Renders a macOS-style menu bar dropdown with glassmorphism (frosted blur, spring animations)
- Pre-populated with sample clips: code snippets, text, file paths
- Visitor can ⌘C / Ctrl+C any text on the page → it appears as a new clip card in the simulation with a slide-in animation
- Smart folder tabs at the top categorize clips automatically
- Search field filters clips in real-time with spring-damped repositioning
- Pin button on each clip (toggles with subtle bounce)
- Built with Framer Motion for animations + Tailwind for glassmorphism

#### MonoTask — P2P Kanban Demo

- Two side-by-side kanban boards labeled "Peer A" and "Peer B"
- 3 columns each: Todo, Doing, Done
- Pre-populated with sample cards
- Drag a card on Peer A → after 0.5s delay, it appears on Peer B with a "sync" ripple animation (CRDT merge visualization)
- Simultaneous edits: both boards can be manipulated at once, conflicts resolve visually
- QR code generation demo: click "Invite" → animated QR code renders with the MonoTask monkey in the center
- Built with dnd-kit for drag-and-drop + Framer Motion for sync animations

---

## Community Page

### Sections

1. **Hero (dark)**
   - Headline: "Built in the open. Shaped by the troop."
   - Subtitle: "Every line of monoes is open source. Every contribution matters."
   - CTAs: "View on GitHub ↗" (primary) + "Contributing Guide" (secondary)

2. **Live Stats Bar (ivory)**
   - 4 columns: Projects (4), Languages (3), GitHub Stars (live from API), License (MIT)
   - Numbers animate with count-up on scroll
   - Dividers between columns

3. **Ecosystem Grid**
   - 2x2 grid of project cards
   - Each card shows: project icon, name, language, star count (live), monthly activity bar
   - Activity bars animate to their percentage on scroll
   - Magnetic tilt on hover
   - Click navigates to project page (FLIP transition)

4. **How to Contribute**
   - 3-step horizontal flow: Pick a project → Find an issue → Ship it
   - Steps stagger-reveal with number count-up
   - Each step has icon, title, description

5. **The Stack**
   - Tech logos in a horizontal row: Go, Rust, TypeScript, Svelte, React, SQLite
   - Icons float up on scroll with stagger
   - Hover shows tooltip with which project uses it

6. **Footer CTA (dark)**
   - "Every tool started with a single commit. What will yours be?"
   - "Start Contributing →" button

---

## Animation & Interaction Catalog

### Scroll-Driven (GSAP ScrollTrigger)

| Animation | Trigger | Duration | Details |
|-----------|---------|----------|---------|
| Hero particles → emblem | 0-40vh scroll | ~2s | Canvas particles converge to SVG monkey shape |
| Dark → ivory transition | Act 1→2 boundary | 100vh | Background gradient blend with mix-blend-mode |
| Text word-by-word reveal | Element enters viewport | 0.08s × word count | opacity 0→1 + translateY 12→0px per word |
| Project section pin | Section top hits viewport top | ~3 scroll-lengths | GSAP ScrollTrigger pin with internal scroll |
| Monkey persona morph | Between pinned sections | 0.6s | SVG path morph + cross-dissolve opacity |
| Feature card stagger | Grid enters viewport (20%) | 0.05s × card count | opacity 0→1 + translateY 20→0px |
| Number count-up | Stat enters viewport | 1.5s | Eased deceleration, gold flash on complete |
| Architecture diagram draw | Diagram enters viewport | 0.8s per connection | SVG stroke-dashoffset animation |
| Ivory → dark transition | Act 6→7 boundary | 80vh | Reverse of Act 1→2 |

### Hover & Cursor (Framer Motion + CSS)

| Interaction | Target | Behavior |
|-------------|--------|----------|
| Magnetic tilt | Feature cards, project cards | Perspective 3D tilt toward cursor within 200px. Spring physics (stiffness: 150, damping: 15). Light reflection gradient follows mouse. |
| Cursor glow | Ivory sections | 60px radial gold gradient at 12% opacity follows cursor. Amber variant on dark sections. |
| Link underline draw | Text links | 1px gold underline draws left→right over 0.3s ease-out. Arrow icon translateX 4px. |
| Button hover | CTAs | Scale 1.02, shadow deepens. Gold gradient shifts slightly. |
| Nav link highlight | Navigation | Active link gets gold color + 1px bottom border fade-in |

### Page Transitions (Framer Motion)

| Transition | Trigger | Animation |
|------------|---------|-----------|
| Landing → Project | Click "Explore" or project card | FLIP: card expands to fill viewport using Framer Motion `layoutId`. Content fades in after expand completes (~0.4s). |
| Project → Landing | Click back or swipe right | Reverse FLIP: page collapses to card position. Scroll position restored. |
| Any → Community | Click nav link | Opacity crossfade (0.3s) with subtle translateY |

### Micro-interactions

| Interaction | Details |
|-------------|---------|
| Scroll progress | 2px gold line fixed at top of viewport. Fills left→right proportional to scroll. On project pages, shows section markers. |
| Terminal typing | Characters appear at 50-80ms intervals (randomized). Blinking gold cursor (0.8s interval). Output lines fade in 0.3s after "command completes". |
| Clipboard capture | On ⌘C anywhere on MonoClip page, the copied text slides into the clipboard simulation as a new card with spring animation. |
| Kanban sync | 0.5s delay between Peer A action and Peer B mirror. Ripple animation at the receiving card's position. |
| Workflow autoplay | If visitor doesn't interact for 3s, the workflow demo plays automatically. Nodes highlight with gold pulse, data particles flow along edges. |

---

## Monkey Character Personas

All four illustrations share a unified art style: refined line-art with gold accent tones on ivory/dark backgrounds. Elegant, not cartoonish. Each persona has distinct accessories/context but the same monkey face structure (derived from the MonoTask SVG).

| Project | Persona | Visual Description |
|---------|---------|-------------------|
| MonoAgent | Hacker | Monkey at a terminal, hoodie, multiple screens showing workflows. Green/gold code on screens. |
| Monobrain | Scientist | Monkey with lab coat, neural network diagram floating around head, contemplative pose. |
| MonoClip | DJ | Monkey with headphones at a mixing deck, but the "turntables" are clipboard stacks. Playful but elegant. |
| MonoTask | Original | The MonoTask SVG monkey with amber eyes and floating kanban cards. The "base" character. |

Illustrations should be SVG for crisp rendering at all sizes and to enable GSAP MorphSVG transitions between personas during the landing page scroll.

**Asset creation:** The four monkey persona SVGs need to be created. The MonoTask `original.svg` already exists and serves as the base face structure. The other three (hacker, scientist, DJ) should be derived from it, sharing the same head/face proportions with different accessories and context elements. These can be created as part of implementation using the existing SVG as a starting template, or commissioned from an illustrator.

---

## Responsive Behavior

| Breakpoint | Adaptation |
|------------|------------|
| Desktop (1200px+) | Full experience. All animations, cursor effects, side-by-side layouts. |
| Tablet (768-1199px) | Pinned sections become standard scroll. Feature grids go 2-column. Cursor effects disabled (no hover on touch). Magnetic tilt disabled. |
| Mobile (< 768px) | Single column throughout. Interactive demos simplified (autoplay only, no drag). Monkey personas show as static illustrations between sections. Terminal blocks are static with copy button. Page transitions are simple opacity fades. |

### Performance

- **Lazy load:** Interactive demos load only when their section enters viewport (Intersection Observer + dynamic import)
- **Canvas optimization:** Hero particles use requestAnimationFrame with reduced count on mobile (50 vs 200)
- **Image optimization:** next/image for all illustrations with WebP/AVIF formats
- **Animation budget:** Target 60fps. GSAP will: transform and opacity only. No layout-triggering properties.
- **GitHub API:** Stars and activity cached with ISR (revalidate: 3600) to avoid rate limits

---

## File Structure

```
monoes-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, nav, footer
│   │   ├── page.tsx                # Landing page (scroll journey)
│   │   ├── mono-agent/page.tsx     # MonoAgent detail page
│   │   ├── monobrain/page.tsx      # Monobrain detail page
│   │   ├── mono-clip/page.tsx      # MonoClip detail page
│   │   ├── monotask/page.tsx       # MonoTask detail page
│   │   └── community/page.tsx      # Community page
│   ├── components/
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx     # Particle canvas + emblem reveal
│   │   │   ├── PhilosophySection.tsx
│   │   │   ├── ProjectSection.tsx  # Reusable pinned section
│   │   │   ├── MonkeyMorph.tsx     # SVG morph between personas
│   │   │   └── CommunityTeaser.tsx # Act 7 constellation
│   │   ├── projects/
│   │   │   ├── ProjectHero.tsx     # Shared dark hero with FLIP
│   │   │   ├── FeatureGrid.tsx     # 3x2 stagger-reveal cards
│   │   │   ├── TerminalBlock.tsx   # Typing animation terminal
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   └── CrossLinks.tsx      # Other projects footer
│   │   ├── demos/
│   │   │   ├── WorkflowBuilder.tsx # MonoAgent interactive demo
│   │   │   ├── SwarmSimulation.tsx # Monobrain interactive demo
│   │   │   ├── ClipboardSim.tsx    # MonoClip interactive demo
│   │   │   └── KanbanSync.tsx      # MonoTask interactive demo
│   │   ├── community/
│   │   │   ├── StatsBar.tsx
│   │   │   ├── EcosystemGrid.tsx
│   │   │   ├── ContributeSteps.tsx
│   │   │   └── TechStack.tsx
│   │   └── ui/
│   │       ├── MagneticCard.tsx    # Reusable magnetic tilt card
│   │       ├── CursorGlow.tsx      # Global cursor spotlight
│   │       ├── ScrollProgress.tsx  # Top progress bar
│   │       ├── TextReveal.tsx      # Word-by-word scroll reveal
│   │       ├── CountUp.tsx         # Number animation
│   │       └── GrainOverlay.tsx    # Film grain texture
│   ├── lib/
│   │   ├── github.ts              # GitHub API + ISR caching
│   │   └── animations.ts          # Shared GSAP timeline configs
│   ├── assets/
│   │   └── monkeys/
│   │       ├── hacker.svg
│   │       ├── scientist.svg
│   │       ├── dj.svg
│   │       └── original.svg        # Adapted from MonoTask logo
│   └── styles/
│       └── globals.css             # Tailwind base + grain texture + custom props
├── public/
│   ├── fonts/
│   └── og-image.png
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Dependencies

| Package | Purpose |
|---------|---------|
| next | Framework (App Router) |
| react, react-dom | UI |
| framer-motion | Page transitions, layout animations, spring physics |
| gsap (with ScrollTrigger) | Scroll-driven animations, pinning, timelines |
| gsap (MorphSVG — Club plugin) | SVG monkey morphing. Fallback: cross-fade opacity if license not acquired. |
| @dnd-kit/core, @dnd-kit/sortable | MonoTask kanban drag-and-drop |
| tailwindcss | Styling |
| @next/font | Font optimization |
| sharp | Image optimization |

---

## Data Sources

| Data | Source | Caching |
|------|--------|---------|
| GitHub stars per repo | GitHub REST API (`/repos/{owner}/{repo}`) | ISR revalidate: 3600 (1 hour) |
| Repo activity/commits | GitHub REST API | ISR revalidate: 3600 |
| Project descriptions | Hardcoded in source (curated copy, not raw README) | Static |
| Monkey illustrations | SVG in `src/assets/monkeys/` | Static |
