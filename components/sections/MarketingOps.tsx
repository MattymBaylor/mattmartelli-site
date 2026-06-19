import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StatCallout } from "@/components/ui/StatCallout";
import { MarketingOpsDiagram } from "@/components/sections/MarketingOpsDiagram";
import { DataRefineryBlueprint } from "@/components/sections/DataRefineryBlueprint";

export function MarketingOps() {
  const { marketing } = site;

  // Render the "A | B | C" heading with cyan pipe separators.
  const headingNode = marketing.heading.split(" | ").map((part, i, arr) => (
    <span key={part}>
      {part}
      {i < arr.length - 1 && (
        <span className="px-1.5 text-accent-cyan/80" aria-hidden="true">
          |
        </span>
      )}
    </span>
  ));

  return (
    <section id="marketing-ops" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="25+ years in market"
          title={headingNode}
          sub={marketing.copy}
        />

        <Reveal delay={0.08}>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {marketing.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-line bg-surface-elevated/50 px-3.5 py-2 text-sm text-ink-muted transition-colors hover:border-accent-cyan/40 hover:text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8">
            <MarketingOpsDiagram />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-6">
            <DataRefineryBlueprint />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <Link
            href="#architecture"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan"
          >
            <ArrowDown size={15} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
            {marketing.diagramRef}
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <StatCallout value="21×" kind="industry" footnote={site.footnotes[0]}>
            more likely to qualify a lead contacted within 5 minutes vs 30.
          </StatCallout>
        </Reveal>
      </div>
    </section>
  );
}
