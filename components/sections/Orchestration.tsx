import Link from "next/link";
import { Boxes, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { OrchestrationToolGrid } from "@/components/sections/OrchestrationToolGrid";

export function Orchestration() {
  const { orchestration } = site;
  return (
    <section id="orchestration" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Framework-agnostic by design"
          title={orchestration.heading}
        >
          <p className="mt-4 font-display text-xl text-ink sm:text-2xl">
            {orchestration.framing}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {orchestration.body}
          </p>
          <p className="mt-5 text-base font-medium text-ink">
            {orchestration.cue}
          </p>
        </SectionHeading>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* What the site emphasizes — the actual story */}
          <Reveal>
            <div className="surface-card h-full p-6">
              <p className="eyebrow mb-4">What matters, in order</p>
              <ol className="space-y-1.5">
                {orchestration.emphasis.map((item, i) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2 -mx-2 transition-colors hover:bg-surface-raised/60"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-gradient font-mono text-[11px] font-bold text-night">
                        {i + 1}
                      </span>
                      <span
                        className={`${
                          i < 2 ? "text-ink" : "text-ink-muted"
                        } flex-1 text-sm font-medium transition-colors group-hover:text-ink sm:text-base`}
                      >
                        {item.label}
                      </span>
                      <ArrowRight
                        size={15}
                        aria-hidden
                        className="shrink-0 text-ink-faint opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-accent-cyan group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* The tooling layer — deliberately secondary */}
          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-dashed border-line bg-surface/30 p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface-raised text-ink-faint">
                  <Boxes size={16} aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                    Supporting tooling layer
                  </p>
                  <p className="text-xs text-ink-faint">
                    Interchangeable implementation options — not the story
                  </p>
                </div>
              </div>

              <OrchestrationToolGrid tools={orchestration.tools} />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl border-l-2 border-accent-cyan/50 pl-4 text-base font-medium text-ink sm:text-lg">
            {orchestration.takeaway}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
