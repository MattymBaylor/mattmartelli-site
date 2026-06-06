import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { AgenticSystems } from "@/components/sections/AgenticSystems";
import { Orchestration } from "@/components/sections/Orchestration";
import { VoiceAI } from "@/components/sections/VoiceAI";
import { InteractiveVoiceCapabilities } from "@/components/sections/InteractiveVoiceCapabilities";
import { MarketingOps } from "@/components/sections/MarketingOps";
import { ProofOfWork } from "@/components/sections/ProofOfWork";
import { Projects } from "@/components/sections/Projects";
import { RecruiterSummary } from "@/components/sections/RecruiterSummary";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WhatIDo />
        <AgenticSystems />
        <Orchestration />
        <VoiceAI />
        <InteractiveVoiceCapabilities />
        <MarketingOps />
        <ProofOfWork />
        <Projects />
        <RecruiterSummary />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
