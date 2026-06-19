import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { Hero } from "@/components/sections/Hero";
import { AgenticSystems } from "@/components/sections/AgenticSystems";
import { Orchestration } from "@/components/sections/Orchestration";
import { ArchitectureShowcase } from "@/components/sections/ArchitectureShowcase";
import { VoiceAI } from "@/components/sections/VoiceAI";
import { MarketingOps } from "@/components/sections/MarketingOps";
import { Projects } from "@/components/sections/Projects";
import { PodcastSection } from "@/components/sections/PodcastSection";
import { RecruiterSummary } from "@/components/sections/RecruiterSummary";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <AgenticSystems />
        <Orchestration />
        <ArchitectureShowcase />
        <VoiceAI />
        <MarketingOps />
        <Projects />
        <PodcastSection />
        <RecruiterSummary />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
