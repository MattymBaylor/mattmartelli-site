import { ArrowUpRight, BookOpen, Layers } from "lucide-react";
import { fiveLayer } from "@/content/five-layer";
import { FiveLayerFramework } from "@/components/ui/FiveLayerFramework";

/** Sequencing methodology, interactive. Sits between Target Roles and the
 *  Field Note on /recruiter. Copy and layer data live in content/five-layer.ts. */
export function FiveLayerSection() {
  return (
      <section aria-labelledby="five-layer" className="mt-12">
        <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-warm">
          <Layers size={11} aria-hidden /> {fiveLayer.eyebrow}
        </p>
        <h2 id="five-layer" className="font-display text-2xl font-semibold sm:text-3xl">
          {fiveLayer.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
          {fiveLayer.lead}
        </p>

        <FiveLayerFramework layers={fiveLayer.layers} />

        <a
          href={fiveLayer.src}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 flex flex-col gap-4 rounded-xl border border-accent-cyan/30 bg-[#06070B] p-5 shadow-glow transition-colors hover:border-accent-cyan/60 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          <span className="min-w-0">
            <span className="flex items-center gap-2 font-display text-base font-semibold text-ink">
              <BookOpen size={16} className="shrink-0 text-accent-cyan" aria-hidden />
              {fiveLayer.deepDive.title}
            </span>
            <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink-muted">
              {fiveLayer.deepDive.body}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform group-hover:scale-[1.03] sm:self-auto">
            {fiveLayer.deepDive.cta}
            <ArrowUpRight size={15} aria-hidden />
          </span>
        </a>
      </section>
  );
}
