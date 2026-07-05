import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureShowcase } from "@/components/sections/ArchitectureShowcase";

export function Orchestration() {
  const { orchestration } = site;
  return (
    <section id="orchestration" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Framework-agnostic by design"
          title={orchestration.heading}
        />

        <Reveal>
          <div className="mt-5 max-w-4xl space-y-4">
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {orchestration.framing}
            </p>
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {orchestration.body}
            </p>
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {orchestration.cue}
            </p>
          </div>
        </Reveal>

        {/* Interactive system-blueprint viewer (dropdown + diagram). */}
        <ArchitectureShowcase className="mt-6 max-w-5xl" />

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-5xl border-l-2 border-accent-cyan/50 pl-4 text-base font-medium text-ink sm:text-lg">
            {orchestration.takeaway}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
