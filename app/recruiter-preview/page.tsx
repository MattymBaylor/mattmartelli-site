import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { RecruiterHero } from "@/components/sections/preview/RecruiterHero";
import { RecruiterProof } from "@/components/sections/preview/RecruiterProof";
import { RecruiterExperience } from "@/components/sections/preview/RecruiterExperience";
import { RecruiterDepthGateway } from "@/components/sections/preview/RecruiterDepthGateway";
import { RecruiterContact } from "@/components/sections/preview/RecruiterContact";
import { recruiterFirst } from "@/content/recruiter-first";

/**
 * Recruiter-first homepage sketch — hiring signal in the first two screens.
 * Does NOT replace the live homepage or /recruiter page.
 */
export default function RecruiterPreviewPage() {
  return (
    <>
      <Header />
      <div className="border-b border-warm/20 bg-warm/5">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm">
            {recruiterFirst.eyebrow}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/layout-preview"
              className="text-ink-muted transition-colors hover:text-ink"
            >
              Suhas-style layout preview
            </Link>
            <Link href="/" className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink">
              <ArrowLeft size={14} aria-hidden />
              Current homepage
            </Link>
          </div>
        </div>
      </div>
      <main id="main">
        <RecruiterHero />
        <RecruiterProof />
        <RecruiterExperience />
        <RecruiterDepthGateway />
        <RecruiterContact />
      </main>
      <Footer />
    </>
  );
}