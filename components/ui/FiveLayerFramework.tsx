"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";

export type FrameworkLayer = {
  n: number;
  name: string;
  question: string;
  rung: string;
  tech?: boolean;
  why: string;
  pull: string;
  subs: readonly { readonly label: string; readonly detail: string }[];
  fails: string;
  principle: string;
};

/**
 * The Five-Layer Enterprise AI Framework — rendered natively rather than in an
 * iframe so it inherits the page's type scale, spacing, and focus styles, and
 * so an expanded layer grows the page instead of trapping a second scroll
 * surface (the problem LivingFlowEmbed has to patch around).
 *
 * The "Where does technology live?" control dims every layer except
 * Architecture. Technology deliberately has no band of its own — the absence is
 * the argument — so this answers the question on demand rather than
 * pre-empting it in the layout.
 */
export function FiveLayerFramework({ layers }: { layers: readonly FrameworkLayer[] }) {
  const [open, setOpen] = useState<number[]>([1]);
  const [spotlight, setSpotlight] = useState(false);

  const allOpen = open.length === layers.length;

  const toggle = useCallback((n: number) => {
    setOpen((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }, []);

  const toggleAll = useCallback(() => {
    setOpen((prev) => (prev.length === layers.length ? [] : layers.map((l) => l.n)));
  }, [layers]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggleAll}
          className="rounded-md border border-line-strong bg-surface-elevated/60 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-ink"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
        <button
          type="button"
          onClick={() => setSpotlight((s) => !s)}
          aria-pressed={spotlight}
          className={`rounded-md border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
            spotlight
              ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-glow"
              : "border-line-strong bg-surface-elevated/60 text-ink-muted hover:border-accent-cyan/50 hover:text-ink"
          }`}
        >
          Where does technology live?
        </button>
      </div>

      <ol className="mt-5 space-y-3">
        {layers.map((layer) => {
          const isOpen = open.includes(layer.n);
          const dimmed = spotlight && !layer.tech;
          const lit = spotlight && layer.tech;

          return (
            <li
              key={layer.n}
              className={`overflow-hidden rounded-xl border bg-surface-elevated/60 transition-all duration-300 ${
                dimmed
                  ? "border-line opacity-30"
                  : lit
                    ? "border-accent-cyan shadow-glow"
                    : isOpen
                      ? "border-accent-cyan/40 shadow-glow"
                      : "border-line hover:border-line-strong"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(layer.n)}
                aria-expanded={isOpen}
                aria-controls={`layer-panel-${layer.n}`}
                className="flex w-full items-center gap-4 p-4 text-left sm:gap-5 sm:p-5"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-semibold transition-colors ${
                    isOpen || lit
                      ? "border-accent-cyan text-accent-cyan"
                      : "border-line-strong text-ink-faint"
                  }`}
                  aria-hidden
                >
                  {layer.n}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {layer.name}
                    </span>
                    {layer.tech ? (
                      <span className="rounded border border-accent-cyan/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent-cyan">
                        Technology lives here
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-xs italic text-ink-muted sm:text-sm">
                    {layer.question}
                  </span>
                </span>

                <span className="hidden shrink-0 rounded-full border border-line-strong px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint sm:inline-block">
                  {layer.rung}
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className={`shrink-0 text-ink-faint transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-accent-cyan" : ""
                  }`}
                />
              </button>

              {isOpen ? (
                <div
                  id={`layer-panel-${layer.n}`}
                  className="border-t border-line px-4 pb-5 pt-4 sm:px-5 sm:pl-[5.5rem]"
                >
                  <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">{layer.why}</p>
                  <p className="mt-4 max-w-2xl border-l-2 border-accent-cyan pl-3.5 text-sm font-medium leading-relaxed text-ink">
                    {layer.pull}
                  </p>

                  <ul className="mt-5 divide-y divide-line overflow-hidden rounded-lg border border-line">
                    {layer.subs.map((sub) => (
                      <li key={sub.label} className="bg-surface-raised/40 p-3.5">
                        <p className="text-[13px] font-semibold text-ink">{sub.label}</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-ink-muted">
                          {sub.detail}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-3.5">
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                        Guiding principle
                      </dt>
                      <dd className="mt-0.5 text-xs text-ink-muted">{layer.principle}</dd>
                    </div>
                    <div className="max-w-lg">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                        Fails when
                      </dt>
                      <dd className="mt-0.5 text-xs text-accent-cyan/90">{layer.fails}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
