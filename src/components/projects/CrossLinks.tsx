import Link from "next/link";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { projects } from "@/lib/projects";

export function CrossLinks({ current }: { current: string }) {
  const others = projects.filter((p) => p.id !== current);
  return (
    <section className="bg-ivory-warm px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs uppercase tracking-label text-gold">Explore More Tools</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((project) => (
            <Link key={project.id} href={`/${project.slug}`}>
              <MagneticCard className="rounded-xl border border-ivory-linen bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg">
                <p className="mb-1 text-xs uppercase tracking-label" style={{ color: project.accent }}>{project.number}</p>
                <h3 className="mb-1 text-lg font-medium text-espresso">{project.name}</h3>
                <p className="text-sm text-gold-bronze">{project.tagline}</p>
              </MagneticCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
