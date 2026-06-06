import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { AgenticSystems } from "@/components/sections/AgenticSystems";
import { Orchestration } from "@/components/sections/Orchestration";
import { VoiceAI } from "@/components/sections/VoiceAI";
import { MarketingOps } from "@/components/sections/MarketingOps";
import { ProofOfWork } from "@/components/sections/ProofOfWork";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
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
        <MarketingOps />
        <ProofOfWork />
        <FeaturedProjects />
        <RecruiterSummary />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
