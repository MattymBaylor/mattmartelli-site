"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { DiagramNode } from "@/content/diagrams";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export function DetailPanel({
  node,
  step,
  total,
}: {
  node: DiagramNode;
  step: number;
  total: number;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="surface-card flex h-full flex-col p-6" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            Stage {step + 1} / {total}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">{node.label}</h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
            {node.function}
          </p>
          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-warm/25 bg-warm/[0.06] p-3.5">
            <TrendingUp size={16} className="mt-0.5 shrink-0 text-warm" aria-hidden />
            <p className="text-sm leading-relaxed text-ink">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-warm/90">
                Business impact
              </span>
              <br />
              {node.impact}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
