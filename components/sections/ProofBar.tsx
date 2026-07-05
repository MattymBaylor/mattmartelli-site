import { site } from "@/content/site-alt";

const { proofBar } = site;

/**
 * ProofBar — a tight, scannable strip of stat callouts that sits directly
 * under the Hero. Deliberately NOT a `.section`: no eyebrow, no heading, no
 * vertical padding rhythm. It's a strip, not a section — proof delivered in
 * passing, before the reader commits to reading further.
 */
export function ProofBar() {
  return (
    <div className="border-y border-line bg-surface/60">
      <div className="container-x flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-7">
        {proofBar.map((stat) => (
          <div key={stat.value} className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <span className="accent-text font-display text-2xl font-semibold leading-none">
              {stat.value}
            </span>
            <span className="text-xs leading-snug text-ink-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
