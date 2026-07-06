import { site } from "@/content/site";

export function IndustryTags() {
  return (
    <section aria-label="Industries served" className="py-10">
      <div className="container-x">
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {site.industries.map((industry) => (
            <span
              key={industry}
              className="rounded-md border border-line/80 bg-surface-elevated/50 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint sm:text-xs"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}