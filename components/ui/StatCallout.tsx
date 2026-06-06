"use client";

import { useId } from "react";

/**
 * StatCallout — a pull-quote-style stat block, one per section (never stacked).
 *
 * Two kinds, color-coded so a reader never conflates them:
 *   - "owned"    → warm/gold, eyebrow "My result" (first-party, deployed result)
 *   - "industry" → cyan,      eyebrow "Industry benchmark" (cited research)
 *
 * The warm treatment mirrors the "Business impact" block in DetailPanel.
 */
export function StatCallout({
  value,
  kind,
  footnote,
  children,
}: {
  value: string;
  kind: "owned" | "industry";
  footnote?: string;
  children: React.ReactNode;
}) {
  const footnoteId = useId();
  const owned = kind === "owned";

  return (
    <aside
      aria-describedby={footnote ? footnoteId : undefined}
      className={[
        "my-12 flex flex-col gap-4 rounded-xl border border-l-4 p-6 sm:my-16 sm:flex-row sm:items-center sm:gap-6 sm:p-7",
        owned
          ? "border-warm/25 border-l-warm bg-warm/[0.06]"
          : "border-[#10B981]/25 border-l-[#10B981]/50 bg-[#10B981]/5",
      ].join(" ")}
    >
      <span
        className={[
          "font-display text-5xl font-bold leading-none sm:text-6xl",
          owned ? "text-warm" : "text-[#34D399]",
        ].join(" ")}
      >
        {value}
      </span>
      <div className="min-w-0">
        <p
          className={[
            "font-mono text-[10px] uppercase tracking-[0.18em]",
            owned ? "text-warm/90" : "text-[#10B981]",
          ].join(" ")}
        >
          {owned ? "My result" : "Industry benchmark"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink sm:text-base">{children}</p>
        {footnote && (
          <cite id={footnoteId} className="mt-2 block text-xs not-italic text-ink-faint">
            {footnote}
          </cite>
        )}
      </div>
    </aside>
  );
}
