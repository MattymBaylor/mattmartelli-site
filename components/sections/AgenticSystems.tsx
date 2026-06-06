import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Explorable } from "@/components/ui/Explorable";

export function AgenticSystems() {
  const { agentic } = site;
  return (
    <section id="agentic-systems" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Multi-agent architecture"
          title={agentic.heading}
          sub={agentic.copy}
        />
        <Reveal delay={0.08}>
          <div className="mt-10">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
              Example applications — select to explore
            </p>
            <Explorable items={agentic.applications} ariaLabel="Agentic system applications" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
