import { site } from "@/content/site";

/**
 * Footnotes — a compact, numbered source list rendered under a section.
 *
 * Pass the 1-based source numbers that the section actually references (the
 * superscript markers ¹–⁶ in the proof lines / StatCallouts). Text lives in
 * `site.footnotes`; numbering here matches that order.
 */
export function Footnotes({ numbers }: { numbers: number[] }) {
  return (
    <ol className="mt-10 space-y-1.5 border-t border-line/60 pt-5">
      {numbers.map((n) => (
        <li key={n} className="flex gap-2 text-[11px] leading-relaxed text-ink-faint">
          <span className="font-mono text-ink-faint">{n}.</span>
          <span>{site.footnotes[n - 1]}</span>
        </li>
      ))}
    </ol>
  );
}
