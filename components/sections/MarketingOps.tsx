import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function MarketingOps() {
  const { marketing } = site;
  return (
    <section id="marketing-ops" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Marketing Operations & CRM"
          title={marketing.heading}
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
          <Link
            href="#proof-of-work"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan"
          >
            <ArrowDown size={15} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
            {marketing.diagramRef}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
