import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Explorable } from "@/components/ui/Explorable";
import { WorkflowCarousel } from "@/components/ui/WorkflowCarousel";
import { StatCallout } from "@/components/ui/StatCallout";
import { Footnotes } from "@/components/ui/Footnotes";

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
            <Explorable items={agentic.applications} ariaLabel="Agentic system applications" compact />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <WorkflowCarousel items={agentic.workflows} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
              The field-guide series — problem to roadmap
            </p>
            <WorkflowCarousel items={agentic.guides} reverse />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <StatCallout value="78%" kind="industry" footnote={site.footnotes[1]}>
            of buyers purchase from whoever responds first.
          </StatCallout>
        </Reveal>

        <Footnotes numbers={[1, 2]} />
      </div>
    </section>
  );
}
