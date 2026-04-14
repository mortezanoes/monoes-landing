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
