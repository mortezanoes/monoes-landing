# monoes.me Landing Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the monoes.me premium interactive website with cinematic scroll journey, 4 project pages with interactive demos, and a community page.

**Architecture:** Next.js 15 App Router with GSAP ScrollTrigger for scroll-driven animations and Framer Motion for page transitions and spring physics. Tailwind CSS 4 for styling with custom ivory-and-gold design tokens. GitHub API with ISR caching for live stats.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Framer Motion, @dnd-kit

**Spec:** `docs/superpowers/specs/2026-04-14-monoes-landing-design.md`

---

## Phase 1: Foundation & Design System

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/styles/globals.css`

- [ ] **Step 1: Initialize Next.js with TypeScript and Tailwind**

```bash
cd /Users/morteza/Desktop/monoes/monoes-landing
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Accept overwrite prompts. This creates the base project structure.

- [ ] **Step 2: Install animation and utility dependencies**

```bash
npm install framer-motion gsap @gsap/react @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — should show the default Next.js page.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with animation deps"
```

---

### Task 2: Design Tokens — Tailwind Config & Global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Configure Tailwind with monoes design tokens**

Replace `tailwind.config.ts` entirely:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FFFFF0",
          warm: "#FAF7F0",
          parchment: "#F5F0E8",
          linen: "#EDE5D8",
        },
        espresso: {
          DEFAULT: "#2A2318",
          deep: "#1a1208",
        },
        gold: {
          DEFAULT: "#C8A97E",
          dark: "#8B6914",
          bronze: "#8B7355",
          warm: "#B8956A",
          muted: "#A07840",
        },
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      letterSpacing: {
        label: "0.25em",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(42,35,24,0.04)",
        "soft-lg": "0 8px 32px rgba(42,35,24,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Set up global CSS with grain texture and custom properties**

Replace `src/styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-ivory: #FFFFF0;
  --color-ivory-warm: #FAF7F0;
  --color-ivory-parchment: #F5F0E8;
  --color-ivory-linen: #EDE5D8;
  --color-espresso: #2A2318;
  --color-espresso-deep: #1a1208;
  --color-gold: #C8A97E;
  --color-gold-dark: #8B6914;
  --color-gold-bronze: #8B7355;
  --color-gold-warm: #B8956A;
  --color-gold-muted: #A07840;

  --font-sans: var(--font-satoshi), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), monospace;

  --shadow-soft: 0 4px 24px rgba(42,35,24,0.04);
  --shadow-soft-lg: 0 8px 32px rgba(42,35,24,0.06);

  --tracking-label: 0.25em;
}

/* Film grain overlay */
.grain::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Gold gradient utility */
.gold-gradient {
  background: linear-gradient(135deg, #C8A97E, #8B6914);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background: rgba(200, 169, 126, 0.3);
  color: #2A2318;
}
```

- [ ] **Step 3: Verify Tailwind tokens work**

Run dev server, confirm no build errors:

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/styles/globals.css
git commit -m "feat: add monoes design tokens and grain overlay"
```

---

### Task 3: Font Loading — Satoshi + JetBrains Mono

**Files:**
- Create: `src/lib/fonts.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Download Satoshi font files**

Satoshi is not in Google Fonts, so we use `next/font/local`. Download Satoshi from fontsource or use the local loader:

```bash
mkdir -p public/fonts
```

We'll use `next/font/local` with Satoshi font files. For now, set up the font config to fall back gracefully. The actual `.woff2` files need to be downloaded from https://www.fontshare.com/fonts/satoshi — place them in `public/fonts/`.

Create `src/lib/fonts.ts`:

```typescript
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

export const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
```

- [ ] **Step 2: Download Satoshi font files from fontshare**

```bash
cd /Users/morteza/Desktop/monoes/monoes-landing
curl -L "https://api.fontshare.com/v2/fonts/download/satoshi" -o /tmp/satoshi.zip
unzip -o /tmp/satoshi.zip -d /tmp/satoshi
cp /tmp/satoshi/Fonts/WEB/fonts/Satoshi-Light.woff2 public/fonts/
cp /tmp/satoshi/Fonts/WEB/fonts/Satoshi-Regular.woff2 public/fonts/
cp /tmp/satoshi/Fonts/WEB/fonts/Satoshi-Medium.woff2 public/fonts/
cp /tmp/satoshi/Fonts/WEB/fonts/Satoshi-Bold.woff2 public/fonts/
```

If the download structure differs, find the `.woff2` files:

```bash
find /tmp/satoshi -name "*.woff2" | head -20
```

And copy the Light, Regular, Medium, Bold variants.

- [ ] **Step 3: Wire fonts into root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { satoshi, jetbrainsMono } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "monoes — Tools that think with you",
  description:
    "Four open-source instruments. One philosophy. Mono Agent, Monobrain, MonoClip, MonoTask.",
  metadataBase: new URL("https://monoes.me"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain bg-ivory font-sans text-gold-bronze antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create minimal landing placeholder**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="mb-4 text-xs uppercase tracking-label text-gold">
          Coming Soon
        </p>
        <h1 className="text-5xl font-extralight tracking-tight text-espresso">
          monoes
        </h1>
        <p className="mt-4 text-gold-bronze">
          Tools that think with you, not for you.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Verify fonts render in browser**

```bash
npm run dev
```

Open http://localhost:3000 — should show "monoes" in Satoshi Extralight on ivory background with gold accents. If Satoshi fonts didn't download, the fallback system-ui will show — fix the font paths if needed.

- [ ] **Step 6: Commit**

```bash
git add src/lib/fonts.ts src/app/layout.tsx src/app/page.tsx public/fonts/
git commit -m "feat: add Satoshi and JetBrains Mono fonts with root layout"
```

---

### Task 4: Reusable UI Components — MagneticCard

**Files:**
- Create: `src/components/ui/MagneticCard.tsx`

- [ ] **Step 1: Create the MagneticCard component**

This is the most-reused interaction component. Cards tilt toward cursor with spring physics and light reflection.

Create `src/components/ui/MagneticCard.tsx`:

```tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  maxTilt?: number;
}

export function MagneticCard({
  children,
  className = "",
  radius = 200,
  maxTilt = 8,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 150,
    damping: 15,
  });

  const reflectX = useTransform(mouseX, [0, 1], [0, 100]);
  const reflectY = useTransform(mouseY, [0, 1], [0, 100]);

  function handleMouse(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > radius) {
      mouseX.set(0.5);
      mouseY.set(0.5);
      return;
    }

    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: useTransform(
            [reflectX, reflectY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(200,169,126,0.08) 0%, transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Temporarily add to `page.tsx` to test:

```tsx
import { MagneticCard } from "@/components/ui/MagneticCard";
// Add inside the <main>:
// <MagneticCard className="rounded-xl border border-ivory-linen bg-white p-8 shadow-soft">
//   <h3>Test Card</h3>
// </MagneticCard>
```

Hover over the card — it should tilt toward your cursor with a gold light reflection. Remove the test usage after verifying.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/MagneticCard.tsx
git commit -m "feat: add MagneticCard component with spring tilt and light reflection"
```

---

### Task 5: Reusable UI Components — TextReveal, CountUp, ScrollProgress

**Files:**
- Create: `src/components/ui/TextReveal.tsx`
- Create: `src/components/ui/CountUp.tsx`
- Create: `src/components/ui/ScrollProgress.tsx`
- Create: `src/components/ui/GrainOverlay.tsx`
- Create: `src/components/ui/CursorGlow.tsx`

- [ ] **Step 1: Create TextReveal — word-by-word scroll animation**

Create `src/components/ui/TextReveal.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  tag: Tag = "p",
  stagger = 0.08,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");
    gsap.set(words, { opacity: 0, y: 12 });

    const tween = gsap.to(words, {
      opacity: 1,
      y: 0,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [stagger]);

  const words = text.split(" ");

  return (
    <Tag ref={containerRef as never} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block">
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Create CountUp — animated number counter**

Create `src/components/ui/CountUp.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 1500,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out deceleration: 1 - (1 - p)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 3: Create ScrollProgress — gold progress bar**

Create `src/components/ui/ScrollProgress.tsx`:

```tsx
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left gold-gradient"
      style={{ scaleX }}
    />
  );
}
```

- [ ] **Step 4: Create GrainOverlay component**

Create `src/components/ui/GrainOverlay.tsx`:

```tsx
export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
```

- [ ] **Step 5: Create CursorGlow component**

Create `src/components/ui/CursorGlow.tsx`:

```tsx
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] hidden h-[120px] w-[120px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(200,169,126,0.12) 0%, transparent 70%)",
      }}
    />
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add TextReveal, CountUp, ScrollProgress, GrainOverlay, CursorGlow"
```

---

### Task 6: Navigation + Footer + TerminalBlock

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/TerminalBlock.tsx`

- [ ] **Step 1: Create Navbar component**

Create `src/components/layout/Navbar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Community", href: "/community" },
  { label: "GitHub", href: "https://github.com/nokhodian", external: true },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-8 py-4"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(255,255,240,${v * 0.95})`
        ),
        backdropFilter: useTransform(bgOpacity, (v) =>
          v > 0.1 ? "blur(12px)" : "none"
        ),
        borderBottom: useTransform(
          bgOpacity,
          (v) => `1px solid rgba(200,169,126,${v * 0.12})`
        ),
      }}
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="gold-gradient h-7 w-7 rounded-full" />
        <span className="text-xs font-medium uppercase tracking-label text-espresso">
          Monoes
        </span>
      </Link>

      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group relative text-sm text-gold-bronze transition-colors hover:text-gold"
          >
            {link.label}
            {link.external && (
              <span className="ml-1 text-xs opacity-50">↗</span>
            )}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 2: Create Footer component**

Create `src/components/layout/Footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-espresso-deep px-8 py-12 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-center gap-8 text-sm text-gold/50">
          <Link href="https://github.com/nokhodian" className="transition-colors hover:text-gold">
            GitHub
          </Link>
          <Link href="/community" className="transition-colors hover:text-gold">
            Community
          </Link>
        </div>
        <p className="text-xs text-gold/30">
          &copy; {new Date().getFullYear()} Nokhodian. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create TerminalBlock component**

Create `src/components/ui/TerminalBlock.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalLine {
  command?: string;
  output?: string;
}

interface TerminalBlockProps {
  lines: TerminalLine[];
  className?: string;
}

export function TerminalBlock({ lines, className = "" }: TerminalBlockProps) {
  const [visibleChars, setVisibleChars] = useState<number[]>(
    lines.map(() => 0)
  );
  const [currentLine, setCurrentLine] = useState(0);
  const [showOutput, setShowOutput] = useState<boolean[]>(
    lines.map(() => false)
  );
  const started = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          typeLine(0);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function typeLine(lineIdx: number) {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];
    const cmd = line.command || "";
    let charIdx = 0;

    const interval = setInterval(() => {
      charIdx++;
      setVisibleChars((prev) => {
        const next = [...prev];
        next[lineIdx] = charIdx;
        return next;
      });

      if (charIdx >= cmd.length) {
        clearInterval(interval);
        if (line.output) {
          setTimeout(() => {
            setShowOutput((prev) => {
              const next = [...prev];
              next[lineIdx] = true;
              return next;
            });
            setTimeout(() => {
              setCurrentLine(lineIdx + 1);
              typeLine(lineIdx + 1);
            }, 400);
          }, 300);
        } else {
          setTimeout(() => {
            setCurrentLine(lineIdx + 1);
            typeLine(lineIdx + 1);
          }, 200);
        }
      }
    }, 50 + Math.random() * 30);
  }

  return (
    <div
      ref={containerRef}
      className={`rounded-lg bg-espresso-deep p-6 font-mono text-sm ${className}`}
    >
      {lines.map((line, i) => (
        <div key={i} className={i > currentLine ? "hidden" : ""}>
          {line.command && (
            <div className="flex">
              <span className="text-gold">$ </span>
              <span className="text-gold/70">
                {line.command.slice(0, visibleChars[i])}
              </span>
              {i === currentLine && visibleChars[i] < line.command.length && (
                <span className="animate-pulse text-gold">▋</span>
              )}
            </div>
          )}
          {line.output && showOutput[i] && (
            <div className="text-gold/40 transition-opacity duration-300">
              {line.output}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Wire Navbar, Footer, CursorGlow, ScrollProgress into layout**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { satoshi, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "monoes — Tools that think with you",
  description:
    "Four open-source instruments. One philosophy. Mono Agent, Monobrain, MonoClip, MonoTask.",
  metadataBase: new URL("https://monoes.me"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ivory font-sans text-gold-bronze antialiased">
        <GrainOverlay />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify nav, footer, cursor glow all render**

```bash
npm run dev
```

Open http://localhost:3000 — should see the navbar with gold accent, cursor glow following mouse, scroll progress bar, and footer.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/ src/components/ui/TerminalBlock.tsx src/app/layout.tsx
git commit -m "feat: add Navbar, Footer, TerminalBlock and wire global layout"
```

---

### Task 7: GitHub API Utility + Project Data

**Files:**
- Create: `src/lib/github.ts`
- Create: `src/lib/projects.ts`

- [ ] **Step 1: Create GitHub API utility with ISR caching**

Create `src/lib/github.ts`:

```typescript
interface RepoStats {
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
}

const REPOS = [
  "nokhodian/mono-agent",
  "nokhodian/monobrain",
  "nokhodian/mono-clip",
  "nokhodian/monotask",
] as const;

export type RepoName = (typeof REPOS)[number];

export async function getRepoStats(repo: RepoName): Promise<RepoStats> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      return { stars: 0, forks: 0, language: "Unknown", updatedAt: "" };
    }

    const data = await res.json();
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      language: data.language ?? "Unknown",
      updatedAt: data.updated_at ?? "",
    };
  } catch {
    return { stars: 0, forks: 0, language: "Unknown", updatedAt: "" };
  }
}

export async function getAllRepoStats() {
  const results = await Promise.all(
    REPOS.map(async (repo) => ({
      repo,
      stats: await getRepoStats(repo),
    }))
  );
  return Object.fromEntries(results.map((r) => [r.repo, r.stats]));
}
```

- [ ] **Step 2: Create centralized project data**

Create `src/lib/projects.ts`:

```typescript
export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  repo: string;
  language: string;
  accent: string;
  number: string;
  features: { icon: string; title: string; description: string }[];
  install: { command: string; output?: string }[];
}

export const projects: Project[] = [
  {
    id: "mono-agent",
    name: "Mono Agent",
    slug: "mono-agent",
    tagline: "Automate anything with a browser",
    description:
      "70+ workflow nodes. Real Chrome automation. Zero cloud. A production-grade orchestration platform combining visual workflow engine, real browser automation, and AI-powered intelligence.",
    repo: "nokhodian/mono-agent",
    language: "Go",
    accent: "#C8A97E",
    number: "01",
    features: [
      {
        icon: "⚡",
        title: "70+ Workflow Nodes",
        description: "DAG-based execution across 10 categories — triggers, browser, AI, social, and more.",
      },
      {
        icon: "🌐",
        title: "Real Chrome Automation",
        description: "CDP-powered stealth browser with human-like interaction patterns.",
      },
      {
        icon: "🤖",
        title: "200+ AI Models",
        description: "OpenRouter, HuggingFace, and Gemini integrations built in.",
      },
      {
        icon: "📦",
        title: "Zero CGO",
        description: "Single binary, cross-platform. No dependencies to manage.",
      },
      {
        icon: "🔐",
        title: "Ed25519 Credentials",
        description: "Unified credential system with cryptographic signing.",
      },
      {
        icon: "🎨",
        title: "Visual Workflow Editor",
        description: "Wails 2 + React canvas for building workflows visually.",
      },
    ],
    install: [
      { command: "go install github.com/nokhodian/mono-agent@latest", output: "✓ Installed mono-agent" },
      { command: "mono-agent init", output: "✓ Workspace initialized" },
    ],
  },
  {
    id: "monobrain",
    name: "Monobrain",
    slug: "monobrain",
    tagline: "Orchestrate AI agent swarms",
    description:
      "60+ agent types. HNSW vector search. Neural learning. A comprehensive framework for spawning and coordinating AI agents with advanced memory and consensus mechanisms.",
    repo: "nokhodian/monobrain",
    language: "TypeScript",
    accent: "#8B6914",
    number: "02",
    features: [
      {
        icon: "🧠",
        title: "60+ Agent Types",
        description: "Coders, reviewers, testers, planners, security architects, and more.",
      },
      {
        icon: "🔍",
        title: "HNSW Vector Search",
        description: "150x–12,500x faster pattern retrieval with semantic routing.",
      },
      {
        icon: "⚡",
        title: "Neural Learning",
        description: "SONA adaptation with <0.05ms response time.",
      },
      {
        icon: "🏗️",
        title: "Swarm Topologies",
        description: "Hierarchical, mesh, hybrid — pick the right coordination pattern.",
      },
      {
        icon: "🗳️",
        title: "Byzantine Consensus",
        description: "Raft, BFT, and quorum strategies for fault-tolerant coordination.",
      },
      {
        icon: "🪝",
        title: "27 Hooks + 12 Workers",
        description: "Self-learning hook system with background worker intelligence.",
      },
    ],
    install: [
      { command: "npx monobrain init --wizard", output: "✓ Monobrain initialized" },
      { command: "npx monobrain swarm init --topology hierarchical", output: "✓ Swarm ready" },
    ],
  },
  {
    id: "mono-clip",
    name: "MonoClip",
    slug: "mono-clip",
    tagline: "Your clipboard, with a memory",
    description:
      "Native macOS. AI-ready. 8MB binary. A blazing-fast clipboard manager that lives in your menu bar with AI integration via MCP server.",
    repo: "nokhodian/mono-clip",
    language: "Rust",
    accent: "#B8956A",
    number: "03",
    features: [
      {
        icon: "📋",
        title: "Smart Folders",
        description: "Auto-categorize clips into custom folders with global shortcut routing.",
      },
      {
        icon: "🔍",
        title: "Instant Search",
        description: "Full-text search across your entire clip history in milliseconds.",
      },
      {
        icon: "🖼️",
        title: "Rich Capture",
        description: "Images, file paths, code snippets — all with thumbnails.",
      },
      {
        icon: "🤖",
        title: "AI-Ready CLI",
        description: "MCP server for Claude Desktop, Cursor, and Windsurf integration.",
      },
      {
        icon: "📌",
        title: "Pin & Persist",
        description: "Pin important clips that survive cleanup cycles.",
      },
      {
        icon: "🪶",
        title: "~8MB Binary",
        description: "Native Tauri + Rust. ~30MB RAM vs 150MB+ for Electron alternatives.",
      },
    ],
    install: [
      { command: "brew install monoclip", output: "✓ MonoClip installed" },
      { command: "mclip status", output: "✓ Clipboard watching · 0 clips" },
    ],
  },
  {
    id: "monotask",
    name: "MonoTask",
    slug: "monotask",
    tagline: "P2P kanban. No server. No nonsense.",
    description:
      "CRDT sync. Ed25519 crypto. Zero knowledge. Boards live locally, synced via CRDTs. Share with teammates using cryptographic invite tokens.",
    repo: "nokhodian/monotask",
    language: "Rust",
    accent: "#A07840",
    number: "04",
    features: [
      {
        icon: "🔗",
        title: "CRDT Sync",
        description: "Automerge-powered — concurrent edits never conflict.",
      },
      {
        icon: "🔐",
        title: "Ed25519 Identity",
        description: "Locally generated keypairs. Import from SSH. Cryptographically signed.",
      },
      {
        icon: "📱",
        title: "QR Invites",
        description: "Generate invite codes that work offline. Scan to join.",
      },
      {
        icon: "🖥️",
        title: "Desktop + CLI",
        description: "Tauri native app with full CLI for scripting and AI agents.",
      },
      {
        icon: "🌐",
        title: "P2P Networking",
        description: "libp2p with mDNS discovery. No server ever.",
      },
      {
        icon: "🤖",
        title: "AI Onboarding",
        description: "Built-in ai-help command with structured JSON schema output.",
      },
    ],
    install: [
      { command: "brew install monotask", output: "✓ MonoTask installed" },
      { command: "monotask board create \"My Project\"", output: "✓ Board created · ID: abc123" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/github.ts src/lib/projects.ts
git commit -m "feat: add GitHub API utility and centralized project data"
```

---

## Phase 2: Landing Page — The Scroll Journey

### Task 8: Hero Section — Particle Canvas + Emblem Reveal

**Files:**
- Create: `src/components/landing/HeroSection.tsx`
- Copy: MonoTask SVG as base monkey emblem to `src/assets/monkeys/original.svg`

- [ ] **Step 1: Copy the MonoTask monkey SVG as base emblem**

```bash
mkdir -p /Users/morteza/Desktop/monoes/monoes-landing/src/assets/monkeys
cp /Users/morteza/Desktop/monoes/monotask/assets/logo.svg /Users/morteza/Desktop/monoes/monoes-landing/src/assets/monkeys/original.svg
```

- [ ] **Step 2: Create the HeroSection with particle canvas**

Create `src/components/landing/HeroSection.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Target points for the monkey silhouette (simplified circle shape)
const EMBLEM_POINTS = Array.from({ length: 200 }, (_, i) => {
  const angle = (i / 200) * Math.PI * 2;
  const r = 80 + Math.sin(angle * 3) * 15 + Math.cos(angle * 5) * 10;
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
  };
});

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  alpha: number;
  speed: number;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    particlesRef.current = EMBLEM_POINTS.map((pt) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      targetX: cx + pt.x,
      targetY: cy + pt.y - 40,
      size: 1.5 + Math.random() * 1.5,
      alpha: 0.3 + Math.random() * 0.7,
      speed: 0.5 + Math.random() * 1.5,
    }));

    // ScrollTrigger for convergence
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    // Animation loop
    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const p = progressRef.current;
      const convergence = Math.min(p * 2.5, 1); // Full convergence at 40% scroll

      particlesRef.current.forEach((particle) => {
        // Drift when unconverged, move to target when converged
        const driftX = Math.sin(Date.now() * 0.001 * particle.speed) * 30;
        const driftY = Math.cos(Date.now() * 0.0008 * particle.speed) * 20;

        const x =
          particle.x * (1 - convergence) +
          particle.targetX * convergence +
          driftX * (1 - convergence);
        const y =
          particle.y * (1 - convergence) +
          particle.targetY * convergence +
          driftY * (1 - convergence);

        ctx.beginPath();
        ctx.arc(x, y, particle.size * (0.8 + convergence * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 126, ${particle.alpha * (0.3 + convergence * 0.7)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    // Title and subtitle animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "40% top",
        scrub: 1,
      },
    });

    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.6);
    tl.to(subtitleRef.current, { opacity: 1, duration: 0.3 }, 0.8);

    // Scroll cue fade
    gsap.to(scrollCueRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "5% top",
        end: "15% top",
        scrub: true,
      },
    });

    return () => {
      cancelAnimationFrame(animId);
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[200vh] flex-col items-center justify-start"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center bg-espresso">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,126,0.06)_0%,transparent_70%)]" />
        <canvas ref={canvasRef} className="absolute inset-0" />

        <div className="relative z-10 text-center">
          <div
            ref={titleRef}
            className="translate-y-6 opacity-0"
          >
            <h1 className="text-5xl font-extralight tracking-tight text-ivory md:text-7xl">
              Tools that think
              <br />
              <span className="text-gold">with you, not for you</span>
            </h1>
          </div>
          <div ref={subtitleRef} className="mt-6 opacity-0">
            <p className="text-sm text-gold/50">
              Four open-source instruments. One philosophy.
            </p>
          </div>
        </div>

        <div
          ref={scrollCueRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-center"
        >
          <p className="text-[10px] uppercase tracking-label text-gold/30">
            Scroll to discover
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/HeroSection.tsx src/assets/monkeys/original.svg
git commit -m "feat: add hero section with particle canvas and scroll-driven convergence"
```

---

### Task 9: Philosophy Section + Dark→Ivory Transition

**Files:**
- Create: `src/components/landing/PhilosophySection.tsx`

- [ ] **Step 1: Create PhilosophySection**

Create `src/components/landing/PhilosophySection.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["#2A2318", "#FFFFF0"]
  );

  const emblemY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex min-h-screen items-center px-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-16">
        <div className="flex-1">
          <p className="mb-4 text-xs uppercase tracking-label text-gold">
            The Philosophy
          </p>
          <TextReveal
            text="Mono — singular focus. Each tool does one thing with obsessive precision."
            tag="h2"
            className="text-3xl font-extralight leading-relaxed text-espresso md:text-4xl"
          />
          <TextReveal
            text="No cloud dependencies. No accounts. Just software that respects you."
            tag="p"
            className="mt-6 text-lg text-gold-bronze"
            stagger={0.05}
          />
        </div>

        <motion.div
          className="hidden w-48 flex-shrink-0 md:block"
          style={{ y: emblemY }}
        >
          <div className="aspect-square w-full rounded-full border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent p-8">
            <div className="gold-gradient h-full w-full rounded-full opacity-20" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/PhilosophySection.tsx
git commit -m "feat: add philosophy section with dark-to-ivory transition and text reveal"
```

---

### Task 10: Pinned Project Sections (Reusable Component)

**Files:**
- Create: `src/components/landing/ProjectSection.tsx`

- [ ] **Step 1: Create the reusable pinned ProjectSection**

Create `src/components/landing/ProjectSection.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

interface ProjectSectionProps {
  project: Project;
}

export function ProjectSection({ project }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const features = featuresRef.current;
    const progress = progressRef.current;
    if (!section || !features || !progress) return;

    const featureEls = features.querySelectorAll(".feature-item");

    // Pin the section
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300%",
      pin: true,
      onUpdate: (self) => {
        progress.style.width = `${self.progress * 100}%`;
      },
    });

    // Stagger features
    gsap.from(featureEls, {
      x: 40,
      opacity: 0,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        scrub: 1,
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center bg-ivory-warm"
      style={{ borderLeft: `3px solid ${project.accent}` }}
      id={`project-${project.id}`}
    >
      {/* Progress bar */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-ivory-linen">
        <div
          ref={progressRef}
          className="h-full w-0 transition-none"
          style={{ background: project.accent }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-start gap-12 px-8">
        {/* Left: Content */}
        <div ref={contentRef} className="flex-[3]">
          <p
            className="mb-2 text-xs uppercase tracking-label"
            style={{ color: project.accent }}
          >
            {project.number} — {project.name}
          </p>
          <h2 className="mb-2 text-4xl font-extralight text-espresso md:text-5xl">
            {project.tagline}
          </h2>
          <p className="mb-8 text-gold-bronze">{project.description}</p>

          <div ref={featuresRef} className="mb-8 space-y-4">
            {project.features.slice(0, 3).map((feat, i) => (
              <div
                key={i}
                className="feature-item flex items-start gap-3 rounded-lg border border-ivory-linen bg-white p-4 shadow-soft"
              >
                <span className="text-xl">{feat.icon}</span>
                <div>
                  <h4 className="font-medium text-espresso">{feat.title}</h4>
                  <p className="text-sm text-gold-bronze">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={`/${project.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-gold"
            style={{ color: project.accent }}
          >
            Explore {project.name}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Right: Monkey persona placeholder */}
        <div className="hidden flex-[2] items-center justify-center md:flex">
          <div
            className="flex aspect-square w-64 items-center justify-center rounded-full border"
            style={{
              borderColor: `${project.accent}20`,
              background: `radial-gradient(circle, ${project.accent}08, transparent)`,
            }}
          >
            <span className="text-6xl opacity-30">🐒</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/ProjectSection.tsx
git commit -m "feat: add pinned ProjectSection with GSAP scroll trigger and feature stagger"
```

---

### Task 11: Community Teaser (Act 7) + Assemble Landing Page

**Files:**
- Create: `src/components/landing/CommunityTeaser.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create CommunityTeaser for the landing footer**

Create `src/components/landing/CommunityTeaser.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function CommunityTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["#FFFFF0", "#2A2318"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["#2A2318", "#FFFFF0"]
  );

  return (
    <motion.section
      ref={sectionRef}
      className="flex min-h-screen flex-col items-center justify-center px-8"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div className="text-center" style={{ color: textColor }}>
        <p className="mb-4 text-xs uppercase tracking-label text-gold">
          Join the Troop
        </p>
        <h2 className="mb-4 text-4xl font-extralight md:text-5xl">
          Built in the open.
          <br />
          Shaped by the community.
        </h2>

        <div className="mt-10 flex items-center justify-center gap-6">
          <Link
            href="https://github.com/nokhodian"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gold/30 px-6 py-2 text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            GitHub ↗
          </Link>
          <Link
            href="/community"
            className="rounded-md border border-gold/30 px-6 py-2 text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Community
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Assemble the full landing page**

Replace `src/app/page.tsx`:

```tsx
import { HeroSection } from "@/components/landing/HeroSection";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { ProjectSection } from "@/components/landing/ProjectSection";
import { CommunityTeaser } from "@/components/landing/CommunityTeaser";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PhilosophySection />
      <div id="projects">
        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </div>
      <CommunityTeaser />
    </main>
  );
}
```

- [ ] **Step 3: Verify the full scroll journey in browser**

```bash
npm run dev
```

Open http://localhost:3000 — scroll through the full journey: dark hero with particles → philosophy with text reveal → 4 pinned project sections → community teaser with ivory→dark transition.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/CommunityTeaser.tsx src/app/page.tsx
git commit -m "feat: assemble landing page with all 7 acts of the scroll journey"
```

---

## Phase 3: Project Detail Pages

### Task 12: Shared Project Page Template

**Files:**
- Create: `src/components/projects/ProjectHero.tsx`
- Create: `src/components/projects/FeatureGrid.tsx`
- Create: `src/components/projects/CrossLinks.tsx`
- Create: `src/components/projects/ProjectPageLayout.tsx`

- [ ] **Step 1: Create ProjectHero**

Create `src/components/projects/ProjectHero.tsx`:

```tsx
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative flex min-h-[60vh] items-center bg-espresso px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,169,126,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-xs uppercase tracking-label text-gold/40 transition-colors hover:text-gold"
        >
          ← Back to Monoes
        </Link>

        <div className="flex items-center gap-12">
          <div className="flex-1">
            <p
              className="mb-2 text-xs uppercase tracking-label"
              style={{ color: project.accent }}
            >
              {project.number} — {project.language}
            </p>
            <h1 className="mb-3 text-5xl font-extralight text-ivory md:text-6xl">
              {project.name}
            </h1>
            <p className="mb-8 max-w-lg text-lg text-gold/60">
              {project.tagline}
            </p>

            <div className="flex gap-3">
              <a
                href={`https://github.com/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient rounded-md px-5 py-2 text-sm font-medium text-white"
              >
                GitHub →
              </a>
              <button className="rounded-md border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:border-gold">
                Install
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <div
              className="flex h-48 w-48 items-center justify-center rounded-full border"
              style={{
                borderColor: `${project.accent}30`,
                background: `radial-gradient(circle, ${project.accent}10, transparent)`,
              }}
            >
              <span className="text-7xl opacity-30">🐒</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create FeatureGrid**

Create `src/components/projects/FeatureGrid.tsx`:

```tsx
"use client";

import { MagneticCard } from "@/components/ui/MagneticCard";
import type { Project } from "@/lib/projects";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeatureGrid({ project }: { project: Project }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".feature-card");
    gsap.from(cards, {
      y: 20,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section className="bg-ivory px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs uppercase tracking-label text-gold">
          Key Features
        </p>
        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((feat, i) => (
            <MagneticCard
              key={i}
              className="feature-card rounded-xl border border-ivory-linen bg-white p-6 shadow-soft"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                style={{ background: `${project.accent}15` }}
              >
                {feat.icon}
              </div>
              <h3 className="mb-1 font-medium text-espresso">{feat.title}</h3>
              <p className="text-sm leading-relaxed text-gold-bronze">
                {feat.description}
              </p>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create CrossLinks**

Create `src/components/projects/CrossLinks.tsx`:

```tsx
import Link from "next/link";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { projects, type Project } from "@/lib/projects";

export function CrossLinks({ current }: { current: string }) {
  const others = projects.filter((p) => p.id !== current);

  return (
    <section className="bg-ivory-warm px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs uppercase tracking-label text-gold">
          Explore More Tools
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((project) => (
            <Link key={project.id} href={`/${project.slug}`}>
              <MagneticCard className="rounded-xl border border-ivory-linen bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg">
                <p
                  className="mb-1 text-xs uppercase tracking-label"
                  style={{ color: project.accent }}
                >
                  {project.number}
                </p>
                <h3 className="mb-1 text-lg font-medium text-espresso">
                  {project.name}
                </h3>
                <p className="text-sm text-gold-bronze">{project.tagline}</p>
              </MagneticCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create shared ProjectPageLayout**

Create `src/components/projects/ProjectPageLayout.tsx`:

```tsx
import type { Project } from "@/lib/projects";
import type { ReactNode } from "react";
import { ProjectHero } from "./ProjectHero";
import { FeatureGrid } from "./FeatureGrid";
import { CrossLinks } from "./CrossLinks";
import { TerminalBlock } from "@/components/ui/TerminalBlock";

interface ProjectPageLayoutProps {
  project: Project;
  demo: ReactNode;
}

export function ProjectPageLayout({ project, demo }: ProjectPageLayoutProps) {
  return (
    <main className="pt-0">
      <ProjectHero project={project} />

      {/* Interactive Demo */}
      <section className="bg-ivory px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs uppercase tracking-label text-gold">
            Interactive Demo
          </p>
          {demo}
        </div>
      </section>

      <FeatureGrid project={project} />

      {/* Get Started */}
      <section className="bg-ivory-warm px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-xs uppercase tracking-label text-gold">
            Get Started
          </p>
          <TerminalBlock lines={project.install} />
        </div>
      </section>

      <CrossLinks current={project.id} />
    </main>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/
git commit -m "feat: add shared project page template with hero, features, terminal, cross-links"
```

---

### Task 13: Create All 4 Project Pages (with demo placeholders)

**Files:**
- Create: `src/app/mono-agent/page.tsx`
- Create: `src/app/monobrain/page.tsx`
- Create: `src/app/mono-clip/page.tsx`
- Create: `src/app/monotask/page.tsx`

- [ ] **Step 1: Create MonoAgent page**

Create `src/app/mono-agent/page.tsx`:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { notFound } from "next/navigation";

export default function MonoAgentPage() {
  const project = getProject("mono-agent");
  if (!project) notFound();

  return (
    <ProjectPageLayout
      project={project}
      demo={
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-ivory-linen bg-ivory-parchment text-gold-bronze">
          Workflow Builder Demo — coming soon
        </div>
      }
    />
  );
}
```

- [ ] **Step 2: Create Monobrain page**

Create `src/app/monobrain/page.tsx`:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { notFound } from "next/navigation";

export default function MonobrainPage() {
  const project = getProject("monobrain");
  if (!project) notFound();

  return (
    <ProjectPageLayout
      project={project}
      demo={
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-ivory-linen bg-ivory-parchment text-gold-bronze">
          Swarm Simulation Demo — coming soon
        </div>
      }
    />
  );
}
```

- [ ] **Step 3: Create MonoClip page**

Create `src/app/mono-clip/page.tsx`:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { notFound } from "next/navigation";

export default function MonoClipPage() {
  const project = getProject("mono-clip");
  if (!project) notFound();

  return (
    <ProjectPageLayout
      project={project}
      demo={
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-ivory-linen bg-ivory-parchment text-gold-bronze">
          Clipboard Simulation Demo — coming soon
        </div>
      }
    />
  );
}
```

- [ ] **Step 4: Create MonoTask page**

Create `src/app/monotask/page.tsx`:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { notFound } from "next/navigation";

export default function MonoTaskPage() {
  const project = getProject("monotask");
  if (!project) notFound();

  return (
    <ProjectPageLayout
      project={project}
      demo={
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-ivory-linen bg-ivory-parchment text-gold-bronze">
          P2P Kanban Demo — coming soon
        </div>
      }
    />
  );
}
```

- [ ] **Step 5: Verify all project pages render**

```bash
npm run dev
```

Visit:
- http://localhost:3000/mono-agent
- http://localhost:3000/monobrain
- http://localhost:3000/mono-clip
- http://localhost:3000/monotask

Each should show: dark hero → demo placeholder → feature grid → terminal block → cross-links.

- [ ] **Step 6: Commit**

```bash
git add src/app/mono-agent/ src/app/monobrain/ src/app/mono-clip/ src/app/monotask/
git commit -m "feat: add all 4 project pages with shared template and demo placeholders"
```

---

## Phase 4: Interactive Demos

### Task 14: MonoAgent — Workflow Builder Demo

**Files:**
- Create: `src/components/demos/WorkflowBuilder.tsx`
- Modify: `src/app/mono-agent/page.tsx`

- [ ] **Step 1: Create the WorkflowBuilder component**

Create `src/components/demos/WorkflowBuilder.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface WorkflowNode {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
}

const NODES: WorkflowNode[] = [
  { id: "trigger", label: "Cron Trigger", icon: "⏰", x: 60, y: 140 },
  { id: "browser", label: "Open Chrome", icon: "🌐", x: 240, y: 80 },
  { id: "ai", label: "AI Generate", icon: "🤖", x: 420, y: 140 },
  { id: "post", label: "Post Content", icon: "📤", x: 600, y: 80 },
];

const EDGES: [string, string][] = [
  ["trigger", "browser"],
  ["browser", "ai"],
  ["ai", "post"],
];

export function WorkflowBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interacted = useRef(false);

  // Auto-play after 3s idle
  useEffect(() => {
    autoPlayTimer.current = setTimeout(() => {
      if (!interacted.current) {
        setAutoPlaying(true);
        runAutoPlay();
      }
    }, 3000);

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runAutoPlay() {
    const sequence = ["trigger", "browser", "ai", "post"];
    sequence.forEach((nodeId, i) => {
      setTimeout(() => setActiveNode(nodeId), i * 800);
    });
    setTimeout(() => {
      setActiveNode(null);
      setAutoPlaying(false);
    }, sequence.length * 800 + 500);
  }

  // Draw edges on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    EDGES.forEach(([fromId, toId]) => {
      const from = NODES.find((n) => n.id === fromId)!;
      const to = NODES.find((n) => n.id === toId)!;

      ctx.beginPath();
      ctx.moveTo(from.x + 60, from.y + 25);
      ctx.lineTo(to.x, to.y + 25);
      ctx.strokeStyle =
        activeNode === fromId || activeNode === toId
          ? "#C8A97E"
          : "rgba(200,169,126,0.2)";
      ctx.lineWidth = activeNode === fromId || activeNode === toId ? 2 : 1;
      ctx.stroke();

      // Arrow
      const angle = Math.atan2(to.y + 25 - (from.y + 25), to.x - (from.x + 60));
      const ax = to.x - 8 * Math.cos(angle);
      const ay = to.y + 25 - 8 * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(to.x, to.y + 25);
      ctx.lineTo(
        ax - 5 * Math.cos(angle - Math.PI / 6),
        ay - 5 * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(to.x, to.y + 25);
      ctx.lineTo(
        ax - 5 * Math.cos(angle + Math.PI / 6),
        ay - 5 * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    });
  }, [activeNode]);

  return (
    <div
      ref={containerRef}
      className="relative h-64 overflow-hidden rounded-xl border border-ivory-linen bg-ivory-parchment"
      onClick={() => {
        interacted.current = true;
        if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      {NODES.map((node) => (
        <button
          key={node.id}
          className={`absolute flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm shadow-soft transition-all ${
            activeNode === node.id
              ? "border-gold shadow-soft-lg scale-105"
              : "border-ivory-linen"
          }`}
          style={{ left: node.x, top: node.y }}
          onClick={() => {
            interacted.current = true;
            setActiveNode(node.id === activeNode ? null : node.id);
          }}
        >
          <span>{node.icon}</span>
          <span className="text-espresso">{node.label}</span>
          {activeNode === node.id && (
            <span className="ml-1 h-2 w-2 animate-pulse rounded-full bg-gold" />
          )}
        </button>
      ))}

      {autoPlaying && (
        <div className="absolute bottom-3 right-3 text-xs text-gold/40">
          Auto-playing...
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Wire into MonoAgent page**

Update `src/app/mono-agent/page.tsx` — replace the demo placeholder:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { WorkflowBuilder } from "@/components/demos/WorkflowBuilder";
import { notFound } from "next/navigation";

export default function MonoAgentPage() {
  const project = getProject("mono-agent");
  if (!project) notFound();

  return <ProjectPageLayout project={project} demo={<WorkflowBuilder />} />;
}
```

- [ ] **Step 3: Verify in browser**

http://localhost:3000/mono-agent — the workflow builder should show 4 nodes connected by edges. After 3 seconds of no interaction, nodes highlight sequentially (auto-play). Click a node to highlight it.

- [ ] **Step 4: Commit**

```bash
git add src/components/demos/WorkflowBuilder.tsx src/app/mono-agent/page.tsx
git commit -m "feat: add WorkflowBuilder interactive demo for MonoAgent"
```

---

### Task 15: Monobrain — Swarm Simulation Demo

**Files:**
- Create: `src/components/demos/SwarmSimulation.tsx`
- Modify: `src/app/monobrain/page.tsx`

- [ ] **Step 1: Create the SwarmSimulation component**

Create `src/components/demos/SwarmSimulation.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Agent {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  processing: boolean;
}

export function SwarmSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const agentsRef = useRef<Agent[]>(
    Array.from({ length: 10 }, (_, i) => ({
      angle: (i / 10) * Math.PI * 2,
      radius: 90 + (i % 3) * 25,
      speed: 0.003 + Math.random() * 0.004,
      size: 4 + Math.random() * 3,
      processing: false,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Coordinator node
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle =
        status === "processing"
          ? "#C8A97E"
          : "rgba(200,169,126,0.4)";
      ctx.fill();

      if (status === "processing") {
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(200,169,126,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Agent nodes
      agentsRef.current.forEach((agent) => {
        agent.angle += agent.speed;
        const ax = cx + Math.cos(agent.angle) * agent.radius;
        const ay = cy + Math.sin(agent.angle) * agent.radius;

        // Connection line to coordinator
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ax, ay);
        ctx.strokeStyle = agent.processing
          ? "rgba(200,169,126,0.4)"
          : "rgba(200,169,126,0.08)";
        ctx.lineWidth = agent.processing ? 1.5 : 0.5;
        ctx.stroke();

        // Agent circle
        ctx.beginPath();
        ctx.arc(ax, ay, agent.size, 0, Math.PI * 2);
        ctx.fillStyle = agent.processing
          ? "#C8A97E"
          : "rgba(200,169,126,0.3)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, [status]);

  function simulate() {
    setStatus("processing");

    // Activate agents one by one
    agentsRef.current.forEach((agent, i) => {
      setTimeout(() => {
        agent.processing = true;
      }, 200 + i * 150);
      setTimeout(() => {
        agent.processing = false;
      }, 800 + i * 150);
    });

    setTimeout(() => setStatus("done"), 2500);
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div ref={containerRef} className="relative h-72 overflow-hidden rounded-xl border border-ivory-linen bg-ivory-parchment">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        <button
          onClick={simulate}
          disabled={status === "processing"}
          className="rounded-md border border-gold/30 bg-white px-4 py-1.5 text-sm text-gold-bronze shadow-soft transition-colors hover:border-gold disabled:opacity-50"
        >
          {status === "idle"
            ? "Run Swarm →"
            : status === "processing"
              ? "Processing..."
              : "✓ Complete"}
        </button>
      </div>

      <div className="absolute right-4 top-4 text-xs text-gold/30">
        {agentsRef.current.length} agents · hierarchical-mesh
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into Monobrain page**

Update `src/app/monobrain/page.tsx`:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { SwarmSimulation } from "@/components/demos/SwarmSimulation";
import { notFound } from "next/navigation";

export default function MonobrainPage() {
  const project = getProject("monobrain");
  if (!project) notFound();

  return <ProjectPageLayout project={project} demo={<SwarmSimulation />} />;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/SwarmSimulation.tsx src/app/monobrain/page.tsx
git commit -m "feat: add SwarmSimulation interactive demo for Monobrain"
```

---

### Task 16: MonoClip — Clipboard Simulation Demo

**Files:**
- Create: `src/components/demos/ClipboardSim.tsx`
- Modify: `src/app/mono-clip/page.tsx`

- [ ] **Step 1: Create ClipboardSim**

Create `src/components/demos/ClipboardSim.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Clip {
  id: number;
  text: string;
  type: "code" | "text" | "path";
  pinned: boolean;
  time: string;
}

const INITIAL_CLIPS: Clip[] = [
  { id: 1, text: "const api = fetch('/v1/agents')", type: "code", pinned: false, time: "2s ago" },
  { id: 2, text: "Review the PR before merging", type: "text", pinned: true, time: "5m ago" },
  { id: 3, text: "~/projects/monoes/src/main.rs", type: "path", pinned: false, time: "12m ago" },
  { id: 4, text: "npm install @dnd-kit/core", type: "code", pinned: false, time: "1h ago" },
];

const TYPE_COLORS = {
  code: "text-gold",
  text: "text-gold-bronze",
  path: "text-gold-muted",
};

export function ClipboardSim() {
  const [clips, setClips] = useState<Clip[]>(INITIAL_CLIPS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "code" | "text" | "path">("all");

  const filtered = clips.filter((clip) => {
    const matchSearch = clip.text.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" || clip.type === activeTab;
    return matchSearch && matchTab;
  });

  function togglePin(id: number) {
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
  }

  function addClip() {
    const sampleTexts = [
      "git push origin main",
      "border-radius: 12px;",
      "SELECT * FROM agents WHERE status = 'active'",
    ];
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setClips((prev) => [
      {
        id: Date.now(),
        text,
        type: "code",
        pinned: false,
        time: "just now",
      },
      ...prev,
    ]);
  }

  return (
    <div className="mx-auto max-w-md">
      {/* Menu bar simulation */}
      <div className="overflow-hidden rounded-xl border border-ivory-linen bg-white/80 shadow-soft-lg backdrop-blur-xl">
        {/* Header */}
        <div className="border-b border-ivory-linen px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="gold-gradient h-5 w-5 rounded-full" />
            <span className="text-xs font-medium uppercase tracking-label text-espresso">
              MonoClip
            </span>
            <button
              onClick={addClip}
              className="ml-auto rounded border border-gold/20 px-2 py-0.5 text-xs text-gold transition-colors hover:border-gold"
            >
              + Simulate Copy
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clips..."
            className="mt-2 w-full rounded-md border border-ivory-linen bg-ivory px-3 py-1.5 text-sm text-espresso placeholder:text-gold/30 focus:border-gold/30 focus:outline-none"
          />

          {/* Tabs */}
          <div className="mt-2 flex gap-1">
            {(["all", "code", "text", "path"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded px-2 py-0.5 text-xs capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-gold/10 text-gold"
                    : "text-gold-bronze hover:text-gold"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Clips list */}
        <div className="max-h-64 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((clip) => (
              <motion.div
                key={clip.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-center gap-2 border-b border-ivory-linen/50 px-4 py-2.5 transition-colors hover:bg-ivory"
              >
                <span className={`flex-1 truncate font-mono text-xs ${TYPE_COLORS[clip.type]}`}>
                  {clip.text}
                </span>
                <span className="flex-shrink-0 text-[10px] text-gold/30">
                  {clip.time}
                </span>
                <button
                  onClick={() => togglePin(clip.id)}
                  className={`flex-shrink-0 text-xs transition-colors ${
                    clip.pinned ? "text-gold" : "text-gold/20 hover:text-gold/50"
                  }`}
                >
                  📌
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into MonoClip page**

Update `src/app/mono-clip/page.tsx`:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { ClipboardSim } from "@/components/demos/ClipboardSim";
import { notFound } from "next/navigation";

export default function MonoClipPage() {
  const project = getProject("mono-clip");
  if (!project) notFound();

  return <ProjectPageLayout project={project} demo={<ClipboardSim />} />;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/ClipboardSim.tsx src/app/mono-clip/page.tsx
git commit -m "feat: add ClipboardSim interactive demo for MonoClip"
```

---

### Task 17: MonoTask — P2P Kanban Sync Demo

**Files:**
- Create: `src/components/demos/KanbanSync.tsx`
- Modify: `src/app/monotask/page.tsx`

- [ ] **Step 1: Create KanbanSync**

Create `src/components/demos/KanbanSync.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: string;
  title: string;
  column: "todo" | "doing" | "done";
}

const INITIAL_CARDS: Card[] = [
  { id: "1", title: "Design landing page", column: "done" },
  { id: "2", title: "Implement CRDT sync", column: "doing" },
  { id: "3", title: "Add QR invites", column: "todo" },
  { id: "4", title: "Write CLI tests", column: "todo" },
];

const COLUMNS = ["todo", "doing", "done"] as const;

function KanbanBoard({
  label,
  cards,
  onMove,
  syncing,
}: {
  label: string;
  cards: Card[];
  onMove: (id: string, to: Card["column"]) => void;
  syncing: string | null;
}) {
  return (
    <div className="flex-1 rounded-xl border border-ivory-linen bg-white p-3 shadow-soft">
      <p className="mb-3 text-xs font-medium uppercase tracking-label text-gold">
        {label}
      </p>
      <div className="flex gap-2">
        {COLUMNS.map((col) => (
          <div
            key={col}
            className="flex-1 rounded-lg bg-ivory p-2"
          >
            <p className="mb-2 text-[10px] uppercase tracking-wider text-gold/40">
              {col}
            </p>
            <div className="flex min-h-[80px] flex-col gap-1.5">
              <AnimatePresence mode="popLayout">
                {cards
                  .filter((c) => c.column === col)
                  .map((card) => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`relative rounded border bg-white px-2 py-1.5 text-xs text-espresso shadow-sm ${
                        syncing === card.id
                          ? "border-gold"
                          : "border-ivory-linen"
                      }`}
                    >
                      {card.title}
                      {syncing === card.id && (
                        <motion.div
                          className="absolute inset-0 rounded border-2 border-gold"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
            {label === "Peer A" && (
              <div className="mt-2 flex gap-1">
                {COLUMNS.filter((c) => c !== col).map((target) => (
                  <button
                    key={target}
                    onClick={() => {
                      const card = cards.find((c) => c.column === col);
                      if (card) onMove(card.id, target);
                    }}
                    className="rounded bg-ivory-parchment px-1.5 py-0.5 text-[9px] text-gold-bronze transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    → {target}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function KanbanSync() {
  const [peerA, setPeerA] = useState<Card[]>(INITIAL_CARDS);
  const [peerB, setPeerB] = useState<Card[]>(INITIAL_CARDS);
  const [syncing, setSyncing] = useState<string | null>(null);

  function moveCard(id: string, to: Card["column"]) {
    // Update Peer A immediately
    setPeerA((prev) =>
      prev.map((c) => (c.id === id ? { ...c, column: to } : c))
    );

    // Sync to Peer B after delay (CRDT simulation)
    setSyncing(id);
    setTimeout(() => {
      setPeerB((prev) =>
        prev.map((c) => (c.id === id ? { ...c, column: to } : c))
      );
      setTimeout(() => setSyncing(null), 600);
    }, 500);
  }

  return (
    <div>
      <div className="flex gap-4">
        <KanbanBoard label="Peer A" cards={peerA} onMove={moveCard} syncing={null} />
        <KanbanBoard label="Peer B" cards={peerB} onMove={() => {}} syncing={syncing} />
      </div>
      <p className="mt-3 text-center text-xs text-gold/40">
        Move a card on Peer A — watch it sync to Peer B via CRDT after 500ms
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Wire into MonoTask page**

Update `src/app/monotask/page.tsx`:

```tsx
import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { KanbanSync } from "@/components/demos/KanbanSync";
import { notFound } from "next/navigation";

export default function MonoTaskPage() {
  const project = getProject("monotask");
  if (!project) notFound();

  return <ProjectPageLayout project={project} demo={<KanbanSync />} />;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/KanbanSync.tsx src/app/monotask/page.tsx
git commit -m "feat: add KanbanSync P2P demo for MonoTask"
```

---

## Phase 5: Community Page + Polish

### Task 18: Community Page

**Files:**
- Create: `src/app/community/page.tsx`
- Create: `src/components/community/StatsBar.tsx`
- Create: `src/components/community/EcosystemGrid.tsx`
- Create: `src/components/community/ContributeSteps.tsx`
- Create: `src/components/community/TechStack.tsx`

- [ ] **Step 1: Create StatsBar**

Create `src/components/community/StatsBar.tsx`:

```tsx
import { CountUp } from "@/components/ui/CountUp";

interface StatsBarProps {
  totalStars: number;
}

export function StatsBar({ totalStars }: StatsBarProps) {
  return (
    <section className="bg-ivory px-8 py-12">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="text-center">
          <CountUp end={4} className="block text-3xl font-extralight text-espresso" />
          <p className="mt-1 text-[10px] uppercase tracking-label text-gold">Projects</p>
        </div>
        <div className="h-8 w-px bg-ivory-linen" />
        <div className="text-center">
          <CountUp end={3} className="block text-3xl font-extralight text-espresso" />
          <p className="mt-1 text-[10px] uppercase tracking-label text-gold">Languages</p>
        </div>
        <div className="h-8 w-px bg-ivory-linen" />
        <div className="text-center">
          <CountUp end={totalStars} suffix="+" className="block text-3xl font-extralight text-espresso" />
          <p className="mt-1 text-[10px] uppercase tracking-label text-gold">GitHub Stars</p>
        </div>
        <div className="h-8 w-px bg-ivory-linen" />
        <div className="text-center">
          <span className="block text-3xl font-extralight text-espresso">MIT</span>
          <p className="mt-1 text-[10px] uppercase tracking-label text-gold">License</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create EcosystemGrid**

Create `src/components/community/EcosystemGrid.tsx`:

```tsx
import Link from "next/link";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { projects } from "@/lib/projects";
import type { RepoName } from "@/lib/github";

interface EcosystemGridProps {
  stats: Record<string, { stars: number; language: string }>;
}

export function EcosystemGrid({ stats }: EcosystemGridProps) {
  return (
    <section className="bg-ivory-warm px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs uppercase tracking-label text-gold">The Ecosystem</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => {
            const repoStats = stats[project.repo as RepoName];
            return (
              <Link key={project.id} href={`/${project.slug}`}>
                <MagneticCard className="rounded-xl border border-ivory-linen bg-white p-5 shadow-soft">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white"
                      style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}aa)` }}
                    >
                      {project.number}
                    </div>
                    <div>
                      <h3 className="font-medium text-espresso">{project.name}</h3>
                      <p className="text-xs text-gold-bronze">
                        {project.language} · {project.tagline}
                      </p>
                    </div>
                    <span className="ml-auto text-sm text-gold">
                      ★ {repoStats?.stars ?? 0}
                    </span>
                  </div>
                </MagneticCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create ContributeSteps**

Create `src/components/community/ContributeSteps.tsx`:

```tsx
import { CountUp } from "@/components/ui/CountUp";

const steps = [
  {
    title: "Pick a project",
    description: "Find one that matches your skills — Go, Rust, or TypeScript",
  },
  {
    title: "Find an issue",
    description: 'Look for "good first issue" labels or open a discussion',
  },
  {
    title: "Ship it",
    description: "Fork, branch, PR — we review fast and merge faster",
  },
];

export function ContributeSteps() {
  return (
    <section className="bg-ivory px-8 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-8 text-xs uppercase tracking-label text-gold">
          How to Contribute
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-ivory-linen bg-ivory-parchment p-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <CountUp
                  end={i + 1}
                  className="text-lg font-medium text-gold"
                  duration={800}
                />
              </div>
              <h3 className="mb-1 font-medium text-espresso">{step.title}</h3>
              <p className="text-sm text-gold-bronze">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create TechStack**

Create `src/components/community/TechStack.tsx`:

```tsx
const techs = [
  { name: "Go", color: "#00ADD8", projects: "Agent" },
  { name: "Rust", color: "#DEA584", projects: "Clip · Task" },
  { name: "TS", color: "#3178C6", projects: "Brain" },
  { name: "Svelte", color: "#FF3E00", projects: "Clip UI" },
  { name: "React", color: "#61DAFB", projects: "Agent UI" },
  { name: "SQLite", color: "#8B7355", projects: "All" },
];

export function TechStack() {
  return (
    <section className="bg-ivory-warm px-8 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-8 text-center text-xs uppercase tracking-label text-gold">
          The Stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {techs.map((tech) => (
            <div key={tech.name} className="group text-center">
              <div
                className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-ivory-linen bg-white text-sm font-semibold shadow-soft transition-shadow group-hover:shadow-soft-lg"
                style={{ color: tech.color }}
              >
                {tech.name}
              </div>
              <p className="text-[10px] text-gold-bronze">{tech.projects}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Assemble the community page**

Create `src/app/community/page.tsx`:

```tsx
import Link from "next/link";
import { getAllRepoStats } from "@/lib/github";
import { StatsBar } from "@/components/community/StatsBar";
import { EcosystemGrid } from "@/components/community/EcosystemGrid";
import { ContributeSteps } from "@/components/community/ContributeSteps";
import { TechStack } from "@/components/community/TechStack";

export default async function CommunityPage() {
  const stats = await getAllRepoStats();
  const totalStars = Object.values(stats).reduce((sum, s) => sum + s.stars, 0);

  return (
    <main>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center justify-center bg-espresso px-8 text-center">
        <div>
          <p className="mb-4 text-xs uppercase tracking-label text-gold">
            Open Source
          </p>
          <h1 className="mb-4 text-4xl font-extralight text-ivory md:text-5xl">
            Built in the open.
            <br />
            Shaped by the troop.
          </h1>
          <p className="mb-8 text-gold/50">
            Every line of monoes is open source. Every contribution matters.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="https://github.com/nokhodian"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient rounded-md px-5 py-2 text-sm font-medium text-white"
            >
              View on GitHub ↗
            </a>
            <Link
              href="#contribute"
              className="rounded-md border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:border-gold"
            >
              Contributing Guide
            </Link>
          </div>
        </div>
      </section>

      <StatsBar totalStars={totalStars} />
      <EcosystemGrid stats={stats} />
      <div id="contribute">
        <ContributeSteps />
      </div>
      <TechStack />

      {/* Footer CTA */}
      <section className="bg-espresso-deep px-8 py-20 text-center">
        <h2 className="mb-3 text-3xl font-extralight text-ivory">
          Every tool started with a single commit.
        </h2>
        <p className="mb-8 text-gold/50">What will yours be?</p>
        <a
          href="https://github.com/nokhodian"
          target="_blank"
          rel="noopener noreferrer"
          className="gold-gradient inline-block rounded-md px-6 py-2.5 text-sm font-medium text-white"
        >
          Start Contributing →
        </a>
      </section>
    </main>
  );
}
```

- [ ] **Step 6: Verify community page**

```bash
npm run dev
```

Visit http://localhost:3000/community — should show: dark hero → stats bar with count-up → ecosystem grid → contribute steps → tech stack → footer CTA.

- [ ] **Step 7: Commit**

```bash
git add src/components/community/ src/app/community/
git commit -m "feat: add community page with stats, ecosystem grid, and contribute steps"
```

---

### Task 19: Responsive Refinements

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/landing/ProjectSection.tsx`
- Modify: `src/components/demos/KanbanSync.tsx`

- [ ] **Step 1: Add mobile hamburger to Navbar**

In `src/components/layout/Navbar.tsx`, add a mobile menu toggle. Add inside the nav, after the desktop links div:

Add a `useState` for mobile menu and a hamburger button visible on small screens:

```tsx
// Add at top of component:
const [mobileOpen, setMobileOpen] = useState(false);

// Replace the nav links div with:
{/* Desktop links */}
<div className="hidden items-center gap-8 md:flex">
  {navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="group relative text-sm text-gold-bronze transition-colors hover:text-gold"
    >
      {link.label}
      {link.external && <span className="ml-1 text-xs opacity-50">↗</span>}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  ))}
</div>

{/* Mobile hamburger */}
<button
  className="md:hidden text-gold-bronze"
  onClick={() => setMobileOpen(!mobileOpen)}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {mobileOpen ? (
      <path d="M6 6l12 12M6 18L18 6" />
    ) : (
      <path d="M4 8h16M4 16h16" />
    )}
  </svg>
</button>
```

Add mobile dropdown after the `</motion.nav>` closing tag or inside the nav:

```tsx
{mobileOpen && (
  <div className="fixed inset-x-0 top-14 z-30 border-b border-ivory-linen bg-ivory/95 backdrop-blur-lg md:hidden">
    <div className="flex flex-col gap-4 px-8 py-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setMobileOpen(false)}
          className="text-sm text-gold-bronze"
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>
)}
```

Add `import { useState } from "react";` to the imports.

- [ ] **Step 2: Make KanbanSync stack on mobile**

In `src/components/demos/KanbanSync.tsx`, update the boards container:

Change:
```tsx
<div className="flex gap-4">
```
To:
```tsx
<div className="flex flex-col gap-4 md:flex-row">
```

- [ ] **Step 3: Verify responsive behavior**

Open dev tools, toggle mobile viewport at 375px width. Check:
- Nav shows hamburger
- Landing page sections stack single-column
- Project pages are readable
- Demos work (kanban stacks vertically)

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/components/demos/KanbanSync.tsx
git commit -m "feat: add responsive mobile nav and stacked layouts"
```

---

### Task 20: Build Verification + Final Commit

**Files:**
- Modify: `next.config.ts` (if needed for build fixes)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Fix any TypeScript or build errors that appear. Common issues:
- Missing `"use client"` directives on components using hooks
- Unused imports
- Type errors in GSAP/Framer Motion usage

- [ ] **Step 2: Run production server to verify**

```bash
npm run start
```

Open http://localhost:3000 and test:
- Landing page scroll journey (all 7 acts)
- Navigate to each project page
- Interactive demos work (workflow builder, swarm sim, clipboard, kanban)
- Community page loads with GitHub stats
- Navigation links work
- Mobile responsive

- [ ] **Step 3: Commit any build fixes**

```bash
git add -A
git commit -m "fix: resolve build errors and finalize production build"
```

- [ ] **Step 4: Tag the release**

```bash
git tag v0.1.0
```

---

## Summary

| Phase | Tasks | What Ships |
|-------|-------|-----------|
| 1: Foundation | Tasks 1-7 | Next.js project, design system, fonts, reusable UI components, nav/footer, GitHub API |
| 2: Landing | Tasks 8-11 | Full 7-act scroll journey with particles, pinned sections, transitions |
| 3: Project Pages | Tasks 12-13 | 4 project pages with shared template (demo placeholders) |
| 4: Demos | Tasks 14-17 | WorkflowBuilder, SwarmSimulation, ClipboardSim, KanbanSync |
| 5: Community + Polish | Tasks 18-20 | Community page, responsive fixes, production build |

Each phase produces a working, visitable website. Phase 1 gives you the skeleton. Phase 2 makes the landing page impressive. Phase 3 gives all routes. Phase 4 adds the wow-factor demos. Phase 5 completes and polishes.
