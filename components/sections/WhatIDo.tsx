import Link from "next/link";
import { Network, AudioLines, LineChart, Workflow, ArrowUpRight, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = {
  agentic: Network,
  voice: AudioLines,
  marketing: LineChart,
  orchestration: Workflow,
} as const;

export function WhatIDo() {
  const { whatIDo } = site;
  return (
    <section id="what-i-do" className="section pt-12 sm:pt-16">
      <div className="container-x">
        <SectionHeading eyebrow="What drives me" title={whatIDo.heading} />

        <Reveal>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg lg:max-w-4xl">
            {whatIDo.framing}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatIDo.pillars.map((p, i) => {
            const Icon = icons[p.id as keyof typeof icons];
            return (
              <Reveal key={p.id} delay={i * 0.06} as="article">
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface-elevated/70 p-5 transition-all hover:-translate-y-1 hover:border-accent-cyan/40 hover:bg-surface-elevated hover:shadow-glow"
                >
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface-raised text-accent-cyan">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="flex items-center gap-1 font-display text-base font-semibold">
                    {p.title}
                    <ArrowUpRight
                      size={15}
                      className="text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-cyan"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.blurb}</p>
                  <span className="mt-auto flex items-center gap-1 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint transition-colors group-hover:text-accent-cyan">
                    Jump to
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
