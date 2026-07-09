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
          {/* Shares max-w-5xl with the showcase + takeaway below so all right edges align. */}
          <div className="mt-5 max-w-5xl space-y-4">
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

        {/* Primary-foundation callout → the standalone LangChain stack page (/stack.html). */}
        <Reveal delay={0.15}>
          <div className="mt-6 flex max-w-5xl flex-col gap-3 rounded-xl border border-accent-cyan/25 bg-accent-cyan/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              My primary foundation moving forward is{" "}
              <span className="font-semibold text-ink">LangChain</span> — the
              framework the largest AI teams standardize on, layered from a single
              agent up to a fully evaluated, multi-agent system.
            </p>
            <a
              href="/stack.html"
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-accent-cyan/40 px-4 py-2.5 text-sm font-semibold text-accent-cyan transition-colors hover:bg-accent-cyan/10"
            >
              Explore the LangChain stack
              <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
