import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Repurposed in place from the old "Contact" section — this is now the
// AI Training & Evals closing section. Direct contact channels live in the
// footer, which carries the #contact anchor for the header's Contact CTA.
export function Contact() {
  return (
    <section
      id="training-evals"
      className="section border-t border-line/60"
      aria-labelledby="training-evals-heading"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="AI Training & Evals"
          title="Teaching AI to reason better through human expertise."
          sub="Every AI system is only as sharp as the feedback it learns from. We build the evaluation frameworks and training pipelines that turn raw model output into reliable, production-ready intelligence — the difference between an AI that guesses and one that reasons."
          align="center"
          headingId="training-evals-heading"
        />

        <Reveal delay={0.08}>
          <div className="mx-auto mt-12 aspect-square w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-black shadow-glow">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/ai-evaluation-poster.jpg"
            >
              <source src="/ai-evaluation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
