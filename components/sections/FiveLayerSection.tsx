import { ArrowUpRight, Layers } from "lucide-react";
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

        <p className="mt-4">
          <a
            href={fiveLayer.src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent-cyan transition-colors hover:text-accent-cyan/80"
          >
            {fiveLayer.openLabel}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        </p>
      </section>
  );
}
