import Link from "next/link";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { projects } from "@/lib/projects";

export function EcosystemGrid({ stats }: { stats: Record<string, { stars: number; language: string }> }) {
  return (
    <section className="bg-ivory-warm px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs uppercase tracking-label text-gold">The Ecosystem</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => {
            const repoStats = stats[project.repo];
            return (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <MagneticCard className="rounded-xl border border-ivory-linen bg-white p-5 shadow-soft">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}aa)` }}>
                      {project.number}
                    </div>
                    <div>
                      <h3 className="font-medium text-espresso">{project.name}</h3>
                      <p className="text-xs text-gold-bronze">{project.language} · {project.tagline}</p>
                    </div>
                    <span className="ml-auto text-sm text-gold">★ {repoStats?.stars ?? 0}</span>
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
