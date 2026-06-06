/**
 * blueprints.ts — data for the homepage "AI Blueprints" section.
 *
 * Three AI-system blueprints organized by business scale, filterable by the
 * "flow" tags they touch. Mirrors the shape/style of content/projects.ts:
 * components read from here; they don't hardcode copy.
 */

export type FlowTag = "journey" | "agents" | "voice" | "memory" | "mission" | "sales";

export const flowLabels: Record<FlowTag, string> = {
  journey: "Customer journey",
  agents: "Multi-agent",
  voice: "Voice AI",
  memory: "Memory & security",
  mission: "Mission control",
  sales: "Sales & revenue",
};

// Order matters — "journey" first, per design.
export const flowFilters: { id: FlowTag | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "journey", label: "Customer journeys" },
  { id: "agents", label: "Multi-agent" },
  { id: "voice", label: "Voice AI" },
  { id: "memory", label: "Memory & security" },
];

export type Deck = {
  dir: string; // folder under /public/blueprints/decks/
  count: number; // total slides; filenames are slide-01.jpg … (zero-padded)
  width: number; // 1400
  height: number; // 782
  label: string; // e.g. "15-slide walkthrough"
};

export type Blueprint = {
  id: string;
  size: "feature" | "half"; // feature = large tile, half = standard
  image: { src: string; alt: string; width: number; height: number };
  scaleTag: string; // small label, e.g. "Small project · personal"
  headline: string; // plain-English, benefit-first
  sub: string; // one scannable sentence
  flows: FlowTag[];
  problem: string; // human-terms framing, shown first in modal
  does: string[]; // "what the system does" — 3 scannable lines
  note: string; // honesty note: blueprint/concept
  deck?: Deck; // optional full slide-deck walkthrough (third disclosure layer)
};

export const blueprints: Blueprint[] = [
  {
    id: "claudeclaw",
    size: "feature",
    image: {
      src: "/blueprints/claudeclaw.jpg",
      alt: "Personal AI operating system architecture — a council of specialized agents, shared memory, and a security stack",
      width: 1000,
      height: 558,
    },
    scaleTag: "Small project · personal",
    headline: "Run your whole operation from your phone",
    sub: "A personal AI operating system: a team of specialized agents that read your inbox, do the research, and run the routines — controlled from a single chat.",
    flows: ["agents", "memory", "voice", "journey"],
    problem:
      "One person, too many tools, no time. What if your phone could quietly run the back office while you do the real work?",
    does: [
      "A team of specialized agents (comms, research, ops) coordinate through one shared memory",
      "Talk to it by voice or text; it remembers what matters and forgets what doesn't",
      "A security layer guards your data — PIN lock, secret scanner, kill phrase",
    ],
    note: "Blueprint / concept architecture — a designed system, presented to show end-to-end thinking.",
    deck: { dir: "claudeclaw", count: 15, width: 1400, height: 782, label: "15-slide walkthrough" },
  },
  {
    id: "enterprise",
    size: "half",
    image: {
      src: "/blueprints/enterprise.jpg",
      alt: "Enterprise AI command center — a traffic router directing requests to specialized agent teams",
      width: 1000,
      height: 558,
    },
    scaleTag: "Medium business · team",
    headline: "Give a growing team an AI command center",
    sub: "A repeatable methodology for rolling AI into a real org — with the change-management and security a team actually needs.",
    flows: ["agents", "mission", "memory", "journey"],
    problem:
      "Most AI pilots stall because the tech ignores the humans. This plans for both — the architecture and the adoption.",
    does: [
      "A traffic router sends each request to the right specialized agent by skill and load",
      "Built-in change-management: how to win over front-line staff and middle managers",
      "Measures ROI as cycle-time saved vs. coordination overhead removed",
    ],
    note: "Blueprint / concept methodology — a repeatable approach for deploying agent teams.",
    deck: { dir: "enterprise", count: 12, width: 1400, height: 782, label: "12-slide walkthrough" },
  },
  {
    id: "sales",
    size: "half",
    image: {
      src: "/blueprints/sales.jpg",
      alt: "Inside-sales mission control — lead scoring, aged-lead re-engagement, and voice confirmation agents",
      width: 1000,
      height: 558,
    },
    scaleTag: "Service industry · sales",
    headline: "Turn missed leads into booked jobs",
    sub: "An inside-sales 'mission control' for a home-services team: every lead scored, every aged lead re-worked, nothing dropped.",
    flows: ["journey", "sales", "agents", "voice"],
    problem:
      "In home services, speed is everything and leads leak everywhere. This wires the whole lead-to-revenue journey into one system.",
    does: [
      "Scores buying intent and routes only sales-ready prospects to a human",
      "Re-engages aged leads on a 30/60/90-day cadence — automatically",
      "Voice + chat confirmation agents cut no-shows and recover revenue",
    ],
    note: "Blueprint / concept architecture — modeled for a service-industry sales floor.",
    deck: { dir: "sales", count: 15, width: 1400, height: 782, label: "15-slide walkthrough" },
  },
];
