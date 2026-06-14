"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { recruiter } from "@/content/recruiter";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * FeaturedProjects — recruiter fast-path "Featured projects" list.
 *
 * Each card is a button that expands in place to reveal scannable `points`
 * and a one-line `result` — no navigation, no page leave. Accordion behavior
 * (one open at a time), keyboard operable via the native button (Enter/Space),
 * with aria-expanded and reduced-motion support.
 */
export function FeaturedProjects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <ul className="mt-4 space-y-4">
      {recruiter.featured.map((f) => {
        const expandable = Boolean(f.points?.length || f.result);
        const open = openId === f.title;
        const panelId = `featured-panel-${f.title.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <li key={f.title} className="surface-card overflow-hidden">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={expandable ? panelId : undefined}
              onClick={() => expandable && setOpenId(open ? null : f.title)}
              className="flex w-full items-start justify-between gap-3 p-4 text-left transition-colors hover:bg-surface-elevated"
            >
              <span className="min-w-0">
                <span className="block font-display font-semibold text-ink">{f.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {f.line}
                </span>
              </span>
              {expandable && (
                <ChevronDown
                  size={18}
                  aria-hidden
                  className={`mt-0.5 shrink-0 text-ink-faint transition-transform duration-200 ${
                    open ? "rotate-180 text-accent-cyan" : ""
                  }`}
                />
              )}
            </button>

            {expandable && (
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-emerald-500/30 bg-emerald-500/10 px-4 pb-4 pt-3">
                      {f.points && f.points.length > 0 && (
                        <ul className="space-y-1.5">
                          {f.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-sm leading-relaxed text-white/90"
                            >
                              <span
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400/80"
                                aria-hidden
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                      {f.result && (
                        <p className="mt-3 text-xs leading-relaxed text-emerald-200">
                          {f.result}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </li>
        );
      })}
    </ul>
  );
}
