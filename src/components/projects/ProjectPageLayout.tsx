import type { Project } from "@/lib/projects";
import type { ReactNode } from "react";
import { ProjectHero } from "./ProjectHero";
import { FeatureGrid } from "./FeatureGrid";
import { CrossLinks } from "./CrossLinks";
import { TerminalBlock } from "@/components/ui/TerminalBlock";

export function ProjectPageLayout({ project, demo }: { project: Project; demo: ReactNode }) {
  return (
    <main className="pt-0">
      <ProjectHero project={project} />
      <section className="bg-ivory px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs uppercase tracking-label text-gold">Interactive Demo</p>
          {demo}
        </div>
      </section>
      <FeatureGrid project={project} />
      <section className="bg-ivory-warm px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-xs uppercase tracking-label text-gold">Get Started</p>
          <TerminalBlock lines={project.install} />
        </div>
      </section>
      <CrossLinks current={project.id} />
    </main>
  );
}
