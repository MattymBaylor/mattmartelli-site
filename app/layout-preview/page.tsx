import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { SuhasStyleHero } from "@/components/sections/preview/SuhasStyleHero";
import { SystemFlowStrip } from "@/components/sections/preview/SystemFlowStrip";
import { TechMarquee } from "@/components/sections/preview/TechMarquee";
import { IndustryTags } from "@/components/sections/preview/IndustryTags";
import { FocusAreas } from "@/components/sections/preview/FocusAreas";
import { SelectedWork } from "@/components/sections/preview/SelectedWork";
import { WhatIBuild } from "@/components/sections/preview/WhatIBuild";
import { OperatingPrinciples } from "@/components/sections/preview/OperatingPrinciples";
import { AgenticSystems } from "@/components/sections/AgenticSystems";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

/**
 * Layout preview — Suhas Bhairav-inspired structure applied to current
 * mattmartelli.com content. Does NOT replace the live homepage.
 */
export default function LayoutPreviewPage() {
  return (
    <>
      <Header />
      <div className="border-b border-accent-cyan/20 bg-accent-cyan/5">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-cyan">
            Layout preview — not live
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/recruiter-preview" className="text-ink-muted transition-colors hover:text-ink">
              Recruiter-first preview
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft size={14} aria-hidden />
              Current homepage
            </Link>
          </div>
        </div>
      </div>
      <main id="main">
        <SuhasStyleHero />
        <SystemFlowStrip />
        <TechMarquee />
        <IndustryTags />
        <FocusAreas />
        <SelectedWork />
        <WhatIBuild />
        <OperatingPrinciples />
        {/* Sample of how existing deep sections slot in below */}
        <AgenticSystems />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}