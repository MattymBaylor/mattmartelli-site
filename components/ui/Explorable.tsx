"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export interface ExplorableItem {
  id: string;
  label: string;
  detail: string;
}

/**
 * Selectable chips that update an inline detail panel. Fully keyboard
 * operable via roving tabindex inside a radiogroup pattern.
 */
export function Explorable({
  items,
  ariaLabel,
}: {
  items: readonly ExplorableItem[];
  ariaLabel: string;
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
      <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2.5">
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
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-all ${
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

      <div className="surface-card min-h-[150px] p-6">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
