import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative flex min-h-[60vh] items-center bg-espresso px-8 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,169,126,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-xs uppercase tracking-label text-gold/40 transition-colors hover:text-gold">
          ← Back to Monoes
        </Link>
        <div className="flex items-center gap-12">
          <div className="flex-1">
            <p className="mb-2 text-xs uppercase tracking-label" style={{ color: project.accent }}>
              {project.number} — {project.language}
            </p>
            <h1 className="mb-3 text-5xl font-extralight text-ivory md:text-6xl">{project.name}</h1>
            <p className="mb-8 max-w-lg text-lg text-gold/60">{project.tagline}</p>
            <div className="flex gap-3">
              <a href={`https://github.com/${project.repo}`} target="_blank" rel="noopener noreferrer" className="gold-gradient rounded-md px-5 py-2 text-sm font-medium text-white">
                GitHub →
              </a>
              <button className="rounded-md border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:border-gold">Install</button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex h-48 w-48 items-center justify-center rounded-full border" style={{ borderColor: `${project.accent}30`, background: `radial-gradient(circle, ${project.accent}10, transparent)` }}>
              <span className="text-7xl opacity-30">🐒</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
