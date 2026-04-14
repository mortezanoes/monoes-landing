"use client";

import { MagneticCard } from "@/components/ui/MagneticCard";
import type { Project } from "@/lib/projects";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeatureGrid({ project }: { project: Project }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".feature-card");
    gsap.from(cards, {
      y: 20, opacity: 0, stagger: 0.05, ease: "power2.out",
      scrollTrigger: { trigger: grid, start: "top 80%", once: true },
    });
  }, []);

  return (
    <section className="bg-ivory px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs uppercase tracking-label text-gold">Key Features</p>
        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((feat, i) => (
            <MagneticCard key={i} className="feature-card rounded-xl border border-ivory-linen bg-white p-6 shadow-soft">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-lg" style={{ background: `${project.accent}15` }}>
                {feat.icon}
              </div>
              <h3 className="mb-1 font-medium text-espresso">{feat.title}</h3>
              <p className="text-sm leading-relaxed text-gold-bronze">{feat.description}</p>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
}
