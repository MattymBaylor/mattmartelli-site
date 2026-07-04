"use client";

import { useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { orchestrationToolBlurbs } from "@/content/orchestrationTools";

type Tool = { name: string; note: string };

/**
 * OrchestrationToolGrid — the "supporting tooling layer" grid, made interactive.
 * Each tool card is a button; clicking it opens a lightweight modal popup with a
 * plain-English blurb on what the tool is and how I use it. Deliberately simple:
 * one dialog, Esc / backdrop / X to close, scroll locked while open.
 */
export function OrchestrationToolGrid({ tools }: { tools: readonly Tool[] }) {
  const [active, setActive] = useState<Tool | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {tools.map((t) => (
          <li key={t.name}>
            <button
              type="button"
              onClick={() => setActive(t)}
              aria-haspopup="dialog"
              className="group flex w-full flex-col rounded-md border border-line/70 bg-surface-elevated/40 px-3 py-2.5 text-left transition-colors hover:border-accent-cyan/50 hover:bg-surface-elevated/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-ink-muted transition-colors group-hover:text-ink">
                  {t.name}
                </span>
                <ArrowUpRight
                  size={13}
                  aria-hidden
                  className="shrink-0 text-ink-faint opacity-0 transition-all group-hover:text-accent-cyan group-hover:opacity-100"
                />
              </span>
              <span className="text-[11px] text-ink-faint">{t.note}</span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="orch-tool-title"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-night/80 backdrop-blur-sm"
          />
          <div className="relative z-[101] w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-glow">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              autoFocus
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-md border border-line text-ink-faint transition-colors hover:border-accent-cyan/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
            >
              <X size={15} aria-hidden />
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan/80">
              {active.note}
            </p>
            <h3
              id="orch-tool-title"
              className="mt-2 font-display text-xl font-semibold text-ink"
            >
              {active.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {orchestrationToolBlurbs[active.name] ??
                "Part of my interchangeable tooling layer — chosen to fit the system and the business outcome, never the reverse."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
