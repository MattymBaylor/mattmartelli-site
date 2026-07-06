"use client";

import { site } from "@/content/site";

export function TechMarquee() {
  const items = [...site.techStack, ...site.techStack];

  return (
    <section aria-label="Technology stack" className="border-y border-line/60 bg-surface/50 py-5">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max gap-3">
          {items.map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface-elevated/80 px-4 py-2 font-mono text-xs text-ink-muted"
            >
              <span className="text-accent-cyan/70" aria-hidden>
                ✦
              </span>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}