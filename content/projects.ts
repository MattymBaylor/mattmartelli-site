/**
 * projects.ts — Featured Projects shown as "system showcases."
 *
 * To edit a project: change its copy below. To add a real link, fill in the
 * `link` field (set `link: undefined` to render the slot as "Link coming soon").
 * `flow` is a short ordered list of stage labels rendered as a mini-diagram
 * motif on each card — keep it to 3–6 short, mono-friendly labels.
 * `outcome` leads the card; lead with business impact, not technology.
 */

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  /** Marks the flagship demonstration for prominent layout treatment. */
  flagship?: boolean;
  /** Business-outcome-first one-liner — the lead of the card. */
  outcome: string;
  description: string;
  /** Short mono labels rendered as a flow/architecture motif. */
  flow: string[];
  /** Skills demonstrated — rendered as restrained tags. */
  skills?: string[];
  /** Optional real link; leave undefined to show a "coming soon" slot. */
  link?: ProjectLink;
}

export const projects: Project[] = [
  {
    id: "seinfeld-hq",
    title: "Seinfeld HQ: Multi-Agent Command Center",
    flagship: true,
    outcome:
      "A working demonstration that orchestration, routing, memory, and QA can run real workflows end to end — not a prototype, a system.",
    description:
      "An interactive AI environment demonstrating agent orchestration, specialized worker agents, routing, memory, QA validation, and real-world workflow execution.",
    flow: [
      "Router",
      "Worker Agents",
      "Memory",
      "QA Validation",
      "Execution",
    ],
    skills: [
      "Agent orchestration",
      "Multi-agent architecture",
      "Workflow design",
      "State management",
      "Tool integration",
      "Human-in-the-loop systems",
      "Technical storytelling",
      "UX design",
    ],
    // Drop the live demo / repo link here when ready.
    link: undefined,
  },
  {
    id: "command-center",
    title: "Interactive Multi-Agent Command Center",
    outcome:
      "Shows decision-makers, in real time, how specialized agents divide and conquer a business problem.",
    description:
      "A fully interactive environment demonstrating how specialized AI agents collaborate to solve business problems.",
    flow: ["Coordinator", "Specialists", "Collaboration", "Result"],
    skills: ["Agent collaboration", "Routing", "Orchestration", "Interactive UX"],
    link: undefined,
  },
  {
    id: "voice-ecosystem",
    title: "AI Voice Agent Ecosystem",
    outcome:
      "Turns missed and after-hours calls into qualified, scheduled, revenue-generating conversations.",
    description:
      "Voice AI systems that answer calls, qualify leads, schedule appointments, and recover revenue opportunities.",
    flow: ["Call", "Voice Agent", "CRM", "Scheduler", "Follow-Up"],
    skills: ["Voice AI", "Realtime systems", "CRM integration", "Scheduling"],
    link: undefined,
  },
  {
    id: "revenue-recovery",
    title: "Revenue Recovery Platform",
    outcome:
      "Recaptures revenue that normally leaks away — missed calls, after-hours inquiries, and slow follow-up.",
    description:
      "Automation that captures missed opportunities from missed calls, after-hours inquiries, and delayed follow-up.",
    flow: ["Detect", "Re-engage", "Qualify", "Recover"],
    skills: ["Workflow automation", "Revenue operations", "Event detection"],
    link: undefined,
  },
  {
    id: "marketing-transformation",
    title: "Marketing Automation Transformation",
    outcome:
      "Large-scale lifecycle and CRM programs that turned fragmented data into measurable, attributable pipeline.",
    description:
      "Large-scale CRM and lifecycle marketing initiatives focused on lead management, customer journeys, reporting, and operational efficiency.",
    flow: ["Lead Mgmt", "Journeys", "Scoring", "Reporting", "Efficiency"],
    skills: [
      "Lifecycle marketing",
      "CRM architecture",
      "Lead scoring",
      "Revenue attribution",
    ],
    link: undefined,
  },
];
