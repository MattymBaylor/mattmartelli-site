import type { Metadata } from "next";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { HeroAlt } from "@/components/sections/HeroAlt";
import { ProofBar } from "@/components/sections/ProofBar";
import { AgenticSystems } from "@/components/sections/AgenticSystems";
import { AuditFramework } from "@/components/sections/AuditFramework";
import { ArchitectureShowcase } from "@/components/sections/ArchitectureShowcase";
import { Projects } from "@/components/sections/Projects";
import { RecruiterSummary } from "@/components/sections/RecruiterSummary";
import { Contact } from "@/components/sections/Contact";

/**
 * /alt — ALTERNATE homepage, kept as a separate route so it can be compared
 * side by side with the current live homepage at `/`. Neither replaces the
 * other yet; this is a candidate under evaluation.
 *
 * Trimmed to a single, escalating narrative:
 *
 *   Hero → ProofBar → AgenticSystems → AuditFramework →
 *   ArchitectureShowcase → Projects → RecruiterSummary → Contact
 *
 * Orchestration, VoiceAI, MarketingOps, AiBriefSection, and PodcastSection
 * are intentionally absent (see alt-homepage/IMPLEMENTATION-NOTES.md). If this
 * version is chosen, it graduates into `/` and this route is retired.
 */
export const metadata: Metadata = {
  title: "Matt Martelli — Alternate Homepage (candidate)",
  robots: { index: false, follow: false },
};

export default function AltHomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroAlt />
        <ProofBar />
        <AgenticSystems />
        <AuditFramework />
        <ArchitectureShowcase />
        <Projects />
        <RecruiterSummary />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
