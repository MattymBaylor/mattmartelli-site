import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { HiringHero } from "@/components/sections/HiringHero";
import { ProofHighlights } from "@/components/sections/ProofHighlights";
import { Recommendations } from "@/components/sections/Recommendations";
import { WorkflowAutomations } from "@/components/sections/WorkflowAutomations";
import { ExperienceStrip } from "@/components/sections/ExperienceStrip";
import { TigerTeamSection } from "@/components/sections/TigerTeamSection";
import { SystemsDepthIntro } from "@/components/sections/SystemsDepthIntro";
import { AgenticSystems } from "@/components/sections/AgenticSystems";
import { Orchestration } from "@/components/sections/Orchestration";
import { VoiceAI } from "@/components/sections/VoiceAI";
import { MarketingOps } from "@/components/sections/MarketingOps";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Hiring signal — first two screens */}
        <HiringHero />
        <ProofHighlights />
        {/* Third-party vouching — verbatim LinkedIn recommendations */}
        <Recommendations />
        {/* Complete workflow automations — department-grouped living workflows */}
        <WorkflowAutomations />
        <ExperienceStrip />
        {/* Differentiator for technical evaluators */}
        <TigerTeamSection />
        {/* Technical depth — opt-in scroll */}
        <SystemsDepthIntro />
        <AgenticSystems />
        <Orchestration />
        <VoiceAI />
        <MarketingOps />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
