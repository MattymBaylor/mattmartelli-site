"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * SeinfeldHighlight — a single, can't-miss yellow CTA that sits just below the
 * hero and opens the flagship /seinfeld-hq case study. The bright glow (and slow
 * pulse, when motion is allowed) is the one warm accent on the page, so it pops
 * against the cyan/indigo system. This is a placeholder home for the link — the
 * surrounding section can grow later; for now the button carries it.
 */
export function SeinfeldHighlight() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="flagship-highlight"
      className="border-t border-line/60 bg-surface/30 py-12 sm:py-16"
      aria-labelledby="flagship-highlight-heading"
    >
      <div className="container-x text-left">
        <Reveal>
          <h2
            id="flagship-highlight-heading"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint"
          >
            See it run
          </h2>

          <Link
            href="/seinfeld-hq"
            className={`group mt-4 inline-flex items-center gap-3 rounded-lg bg-[#FACC15] px-6 py-4 text-base font-semibold text-night transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-night sm:px-8 sm:text-lg ${
              reduced
                ? "shadow-[0_0_0_1px_rgba(250,204,21,0.5),0_0_42px_-6px_rgba(250,204,21,0.75)]"
                : "animate-ribbon-pulse"
            }`}
          >
            <Sparkles size={18} className="shrink-0" aria-hidden />
            See a live multi-agent workflow in action
            <ArrowUpRight
              size={18}
              className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
