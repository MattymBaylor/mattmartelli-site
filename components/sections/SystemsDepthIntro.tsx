import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";

const { hiring } = site;

export function SystemsDepthIntro() {
  return (
    <section
      id="systems-depth"
      className="scroll-mt-24 border-t border-line/60 bg-night py-12 sm:py-14"
    >
      <div className="container-x text-center">
        <p className="eyebrow mb-3">{hiring.systemsDepth.eyebrow}</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">{hiring.systemsDepth.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-ink-muted sm:text-base">
          {hiring.systemsDepth.sub}
        </p>
        <a
          href="#agentic-systems"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-cyan transition-colors hover:text-ink"
        >
          Scroll to systems
          <ArrowDown size={14} aria-hidden />
        </a>
      </div>
    </section>
  );
}