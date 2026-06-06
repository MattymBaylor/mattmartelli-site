"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { NodeKind } from "@/content/diagrams";
import { kindIcon, kindStyle } from "./kinds";

export interface SystemNodeData {
  label: string;
  kind: NodeKind;
  index: number;
  isActive: boolean;
  hasSource: boolean;
  hasTarget: boolean;
  onSelect: (index: number) => void;
  [key: string]: unknown;
}

function SystemNodeComponent({ data }: NodeProps) {
  const d = data as SystemNodeData;
  const Icon = kindIcon[d.kind];
  const style = kindStyle[d.kind];

  return (
    <div className="group">
      {d.hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className="!h-2 !w-2 !border-0 !bg-accent-cyan/70"
        />
      )}

      <button
        type="button"
        tabIndex={-1}
        onClick={() => d.onSelect(d.index)}
        aria-pressed={d.isActive}
        aria-label={`${d.label} — ${style.chip}. View details.`}
        className={`w-[150px] rounded-lg border bg-surface-elevated px-3 py-3 text-left transition-all hover:-translate-y-0.5 ${
          style.border
        } ${
          d.isActive
            ? "shadow-glow ring-1 ring-accent-cyan/50"
            : "shadow-elevated hover:shadow-glow"
        }`}
      >
        <span className="mb-2 flex items-center justify-between">
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface-raised ${style.text}`}>
            <Icon size={15} aria-hidden />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            {style.chip}
          </span>
        </span>
        <span className="block font-mono text-[13px] font-medium leading-snug text-ink">
          {d.label}
        </span>
      </button>

      {d.hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          className="!h-2 !w-2 !border-0 !bg-accent-cyan/70"
        />
      )}
    </div>
  );
}

export const SystemNode = memo(SystemNodeComponent);
