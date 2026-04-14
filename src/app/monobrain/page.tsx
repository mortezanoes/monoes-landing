import { getProject } from "@/lib/projects";
import { ProjectPageLayout } from "@/components/projects/ProjectPageLayout";
import { notFound } from "next/navigation";

export default function MonobrainPage() {
  const project = getProject("monobrain");
  if (!project) notFound();
  return (
    <ProjectPageLayout project={project} demo={
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-ivory-linen bg-ivory-parchment text-gold-bronze">
        Swarm Simulation Demo — loading...
      </div>
    } />
  );
}
