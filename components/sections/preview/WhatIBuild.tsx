import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhatIBuild() {
  const { whatIBuild } = site;

  return (
    <section id="what-i-build" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow={whatIBuild.eyebrow}
          title={whatIBuild.heading}
          sub={whatIBuild.framing}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {whatIBuild.pillars.map((pillar, i) => (
            <Reveal key={pillar.n} delay={i * 0.06} as="article">
              <Link
                href={pillar.href}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface-elevated/60 p-6 transition-all hover:-translate-y-0.5 hover:border-accent-cyan/35 hover:bg-surface-elevated"
              >
                <span className="font-mono text-sm text-accent-cyan/80">{pillar.n}</span>
                <h3 className="mt-3 flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
                  {pillar.title}
                  <ArrowUpRight
                    size={16}
                    className="text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-cyan"
                    aria-hidden
                  />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.blurb}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-line/60 pt-5">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-ink-muted">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent-cyan/70" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}