"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  PhoneIncoming,
  Bot,
  Database,
  Cog,
  Send,
  Users,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { NodeKind } from "@/content/diagrams";

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

const kindIcon: Record<NodeKind, LucideIcon> = {
  input: PhoneIncoming,
  agent: Bot,
  system: Cog,
  data: Database,
  action: Send,
  human: Users,
  outcome: Trophy,
};

const kindStyle: Record<NodeKind, { border: string; text: string; chip: string }> = {
  input: { border: "border-accent-cyan/55", text: "text-accent-cyan", chip: "Input" },
  agent: { border: "border-accent-indigo/60", text: "text-accent-indigo", chip: "Agent" },
  system: { border: "border-accent-cyan/55", text: "text-accent-cyan", chip: "System" },
  data: { border: "border-line-strong", text: "text-ink-muted", chip: "Data" },
  action: { border: "border-accent-cyan/55", text: "text-accent-cyan", chip: "Action" },
  human: { border: "border-warm/60", text: "text-warm", chip: "Human" },
  outcome: { border: "border-warm/70", text: "text-warm", chip: "Outcome" },
};

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
