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
      <section className="flex min-h-[50vh] items-center justify-center bg-ivory-warm px-8 pt-16 text-center border-b border-ivory-linen">
        <div>
          <p className="mb-4 text-xs uppercase tracking-label text-gold-dark font-medium">Open Source</p>
          <h1 className="mb-4 text-4xl font-semibold text-espresso md:text-5xl tracking-tight">
            Built in the open.<br />Shaped by the troop.
          </h1>
          <p className="mb-8 text-espresso/55 text-lg font-light">Every line of monoes is open source. Every contribution matters.</p>
          <div className="flex justify-center gap-3">
            <a href="https://github.com/nokhodian" target="_blank" rel="noopener noreferrer" className="bg-espresso text-ivory rounded-md px-5 py-2 text-sm font-medium transition-opacity hover:opacity-80">
              View on GitHub ↗
            </a>
            <Link href="#contribute" className="rounded-md border border-espresso/30 px-5 py-2 text-sm text-espresso font-medium transition-colors hover:border-espresso">
              Contributing Guide
            </Link>
          </div>
        </div>
      </section>
      <StatsBar totalStars={totalStars} />
      <EcosystemGrid stats={stats} />
      <div id="contribute"><ContributeSteps /></div>
      <TechStack />
      <section className="bg-ivory-parchment px-8 py-20 text-center border-t border-ivory-linen">
        <h2 className="mb-3 text-3xl font-semibold text-espresso tracking-tight">Every tool started with a single commit.</h2>
        <p className="mb-8 text-espresso/55 text-lg font-light">What will yours be?</p>
        <a href="https://github.com/nokhodian" target="_blank" rel="noopener noreferrer" className="bg-espresso text-ivory inline-block rounded-md px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-80">
          Start Contributing →
        </a>
      </section>
    </main>
  );
}
