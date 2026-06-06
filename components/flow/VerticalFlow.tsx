"use client";

import { ChevronDown } from "lucide-react";
import type { DiagramNode } from "@/content/diagrams";
import { kindIcon, kindStyle } from "./kinds";

/**
 * Readable, tappable top-to-bottom rendering of a system flow.
 * Used below the desktop breakpoint where a horizontal canvas would be
 * too cramped — no panning or zooming required.
 */
export function VerticalFlow({
  nodes,
  activeIndex,
  onSelect,
  label,
}: {
  nodes: DiagramNode[];
  activeIndex: number;
  onSelect: (index: number) => void;
  label: string;
}) {
  return (
    <ol className="space-y-0" aria-label={label}>
      {nodes.map((n, i) => {
        const Icon = kindIcon[n.kind];
        const style = kindStyle[n.kind];
        const selected = i === activeIndex;
        return (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={selected}
              className={`flex w-full items-center gap-3 rounded-lg border bg-surface-elevated px-4 py-3 text-left transition-all ${
                style.border
              } ${selected ? "shadow-glow ring-1 ring-accent-cyan/50" : "shadow-elevated"}`}
            >
              <span
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface-raised ${style.text}`}
              >
                <Icon size={17} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-sm font-medium text-ink">{n.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {style.chip}
                </span>
              </span>
              <span className="font-mono text-xs text-ink-faint">{i + 1}</span>
            </button>

            {i < nodes.length - 1 && (
              <div className="flex h-7 items-center justify-center" aria-hidden>
                <ChevronDown size={16} className="text-accent-cyan/60" />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
