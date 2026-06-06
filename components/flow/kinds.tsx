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

/** Shared visual language for diagram node kinds (canvas + vertical fallback). */
export const kindIcon: Record<NodeKind, LucideIcon> = {
  input: PhoneIncoming,
  agent: Bot,
  system: Cog,
  data: Database,
  action: Send,
  human: Users,
  outcome: Trophy,
};

export const kindStyle: Record<
  NodeKind,
  { border: string; text: string; chip: string }
> = {
  input: { border: "border-accent-cyan/55", text: "text-accent-cyan", chip: "Input" },
  agent: { border: "border-accent-indigo/60", text: "text-accent-indigo", chip: "Agent" },
  system: { border: "border-accent-cyan/55", text: "text-accent-cyan", chip: "System" },
  data: { border: "border-line-strong", text: "text-ink-muted", chip: "Data" },
  action: { border: "border-accent-cyan/55", text: "text-accent-cyan", chip: "Action" },
  human: { border: "border-warm/60", text: "text-warm", chip: "Human" },
  outcome: { border: "border-warm/70", text: "text-warm", chip: "Outcome" },
};
