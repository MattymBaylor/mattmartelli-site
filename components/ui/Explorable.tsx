"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export interface ExplorableItem {
  id: string;
  label: string;
  detail: string;
  points?: readonly string[]; // NEW: 2–3 scannable sub-capabilities
  proof?: string; // NEW: optional one-line outcome / who it's for
  // Owned (first-party) proof renders warm/gold; industry benchmarks render cyan.
  proofKind?: "owned" | "industry";
}

/**
 * Selectable chips that update an inline detail panel. Fully keyboard
 * operable via roving tabindex inside a radiogroup pattern.
 */
export function Explorable({
  items,
  ariaLabel,
  compact = false,
}: {
  items: readonly ExplorableItem[];
  ariaLabel: string;
  /** Smaller chips (tighter padding + 11px text). */
  compact?: boolean;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const reduced = usePrefersReducedMotion();
  const active = items.find((i) => i.id === activeId) ?? items[0];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = items.length - 1;
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActiveId(items[next].id);
    const group = e.currentTarget.parentElement;
    const btn = group?.querySelectorAll<HTMLButtonElement>("[role=radio]")[next];
    btn?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div role="radiogroup" aria-label={ariaLabel} className={`flex flex-wrap ${compact ? "gap-2" : "gap-2.5"}`}>
        {items.map((item, i) => {
          const selected = item.id === active?.id;
          return (
            <button
              key={item.id}
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-full border font-mono transition-all ${
                compact ? "px-3 py-1 text-[11px]" : "px-4 py-2 text-xs"
              } ${
                selected
                  ? "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan shadow-glow"
                  : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="surface-card min-h-[150px] border-l-2 border-accent-cyan/50 p-6 ring-1 ring-accent-cyan/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-cyan/80">
              {active?.label}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base" aria-live="polite">
              {active?.detail}
            </p>
            {active?.points && active.points.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {active.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan/60"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {active?.proof && (
              <p
                className={`mt-4 text-xs leading-relaxed ${
                  active.proofKind === "owned" ? "text-warm/90" : "text-accent-cyan/80"
                }`}
              >
                {active.proof}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
