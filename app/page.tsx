import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { Hero } from "@/components/sections/Hero";
import { AgenticSystems } from "@/components/sections/AgenticSystems";
import { Orchestration } from "@/components/sections/Orchestration";
import { VoiceAI } from "@/components/sections/VoiceAI";
import { MarketingOps } from "@/components/sections/MarketingOps";
import { Projects } from "@/components/sections/Projects";
import { AiBrief } from "@/components/sections/AiBrief";
import { Podcast } from "@/components/sections/Podcast";
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
        <VoiceAI />
        <MarketingOps />
        <Projects />
        <AiBrief />
        <Podcast />
        <RecruiterSummary />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
