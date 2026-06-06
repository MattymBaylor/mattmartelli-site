/**
 * diagrams.ts — definitions for the three interactive React Flow systems
 * in the "Interactive Proof of Work" section.
 *
 * Each diagram is a horizontal left-to-right flow. To edit a diagram:
 *   - change a node's `label` / `kind` / `detail` copy below, or
 *   - add/remove nodes in the `nodes` array and wire `edges` accordingly.
 * Positions are laid out automatically by index (see SystemDiagram.tsx),
 * so you only need to provide ordered nodes + the edges between their ids.
 */

export type NodeKind =
  | "input"
  | "agent"
  | "system"
  | "data"
  | "action"
  | "human"
  | "outcome";

export interface DiagramNode {
  id: string;
  label: string;
  kind: NodeKind;
  /** 1–2 sentences on what happens here. */
  function: string;
  /** One line on the business impact. */
  impact: string;
}

export interface DiagramEdge {
  source: string;
  target: string;
  /** Optional short label rendered on the edge. */
  label?: string;
}

export interface SystemDiagram {
  id: string;
  tab: string;
  title: string;
  summary: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export const diagrams: SystemDiagram[] = [
  {
    id: "voice-ai",
    tab: "Voice AI Architecture",
    title: "Voice AI Architecture",
    summary:
      "A live caller is answered, understood, logged, scheduled, and followed up — with humans looped in only where they add value.",
    nodes: [
      {
        id: "caller",
        label: "Caller",
        kind: "input",
        function:
          "An inbound prospect or customer calls in — during or outside business hours.",
        impact: "Every call is answered instantly. No missed opportunities.",
      },
      {
        id: "voice-agent",
        label: "AI Voice Agent",
        kind: "agent",
        function:
          "A natural-sounding voice agent greets the caller, understands intent, answers questions, and qualifies the opportunity in real time.",
        impact: "24/7 coverage that converts calls instead of losing them to voicemail.",
      },
      {
        id: "crm",
        label: "CRM",
        kind: "data",
        function:
          "The agent writes the caller, intent, and qualification data straight into the CRM as a structured record.",
        impact: "Clean, complete data with zero manual entry or dropped details.",
      },
      {
        id: "scheduler",
        label: "Scheduler",
        kind: "system",
        function:
          "When the caller is ready, the system checks live availability and books the appointment on the spot.",
        impact: "Booked appointments during the call — not a callback that never happens.",
      },
      {
        id: "sms",
        label: "SMS Follow-Up",
        kind: "action",
        function:
          "An automated SMS confirms the appointment and triggers reminder and nurture sequences.",
        impact: "Fewer no-shows and consistent follow-through on every lead.",
      },
      {
        id: "team",
        label: "Human Team",
        kind: "human",
        function:
          "Sales-ready, fully-briefed opportunities are handed to the team with full context attached.",
        impact: "People spend their time closing, not chasing or qualifying.",
      },
    ],
    edges: [
      { source: "caller", target: "voice-agent", label: "call" },
      { source: "voice-agent", target: "crm", label: "log" },
      { source: "crm", target: "scheduler", label: "route" },
      { source: "scheduler", target: "sms", label: "confirm" },
      { source: "sms", target: "team", label: "handoff" },
    ],
  },
  {
    id: "multi-agent",
    tab: "Multi-Agent Workflow",
    title: "Multi-Agent Workflow",
    summary:
      "A coordinator decomposes a goal and delegates to specialized agents, each owning one stage — with a QA gate before anything executes.",
    nodes: [
      {
        id: "coordinator",
        label: "Coordinator Agent",
        kind: "agent",
        function:
          "Receives the business goal, breaks it into tasks, and delegates each to the right specialist agent.",
        impact: "Complex work is decomposed and parallelized instead of bottlenecked.",
      },
      {
        id: "research",
        label: "Research Agent",
        kind: "agent",
        function:
          "Gathers and verifies the information the task requires from internal and external sources.",
        impact: "Decisions are grounded in current, verified context — not guesswork.",
      },
      {
        id: "data",
        label: "Data Agent",
        kind: "data",
        function:
          "Pulls, cleans, and structures the data the workflow needs, reconciling it against systems of record.",
        impact: "Downstream steps run on trustworthy, structured data.",
      },
      {
        id: "content",
        label: "Content Agent",
        kind: "agent",
        function:
          "Produces the required output — copy, briefs, records, or messages — to spec and on brand.",
        impact: "Output is generated at scale without sacrificing quality or voice.",
      },
      {
        id: "qa",
        label: "QA Agent",
        kind: "system",
        function:
          "Validates the work against rules, policies, and quality criteria, sending anything questionable back for revision.",
        impact: "A quality gate catches errors before they ever reach a customer.",
      },
      {
        id: "execution",
        label: "Execution Agent",
        kind: "action",
        function:
          "Carries out the approved action in the real systems — updating records, sending messages, triggering workflows.",
        impact: "The system doesn't just recommend; it gets the work done.",
      },
    ],
    edges: [
      { source: "coordinator", target: "research", label: "delegate" },
      { source: "research", target: "data", label: "context" },
      { source: "data", target: "content", label: "inputs" },
      { source: "content", target: "qa", label: "review" },
      { source: "qa", target: "execution", label: "approve" },
    ],
  },
  {
    id: "marketing-ops",
    tab: "Marketing Operations Engine",
    title: "Marketing Operations Engine",
    summary:
      "A raw lead is captured, organized, scored, nurtured, and converted — a measurable path from first touch to closed revenue.",
    nodes: [
      {
        id: "lead",
        label: "Lead",
        kind: "input",
        function:
          "A new lead enters from any source — form, call, campaign, or event.",
        impact: "Every inbound signal is captured and accounted for.",
      },
      {
        id: "crm",
        label: "CRM",
        kind: "data",
        function:
          "The lead is created and deduplicated as a single record with a complete activity history.",
        impact: "One source of truth — no fragmented or duplicate contacts.",
      },
      {
        id: "segmentation",
        label: "Segmentation",
        kind: "system",
        function:
          "The lead is classified by fit, behavior, and lifecycle stage into the right audience.",
        impact: "The right message reaches the right person at the right moment.",
      },
      {
        id: "scoring",
        label: "Scoring",
        kind: "system",
        function:
          "Fit and engagement signals are combined into a score that flags sales-readiness.",
        impact: "Sales focuses on the leads most likely to convert.",
      },
      {
        id: "nurture",
        label: "Nurture",
        kind: "action",
        function:
          "Automated, personalized journeys move not-yet-ready leads forward over time.",
        impact: "Pipeline is built continuously instead of leads going cold.",
      },
      {
        id: "appointment",
        label: "Appointment",
        kind: "human",
        function:
          "Qualified, scored leads are routed to book a meeting with the right rep.",
        impact: "Marketing hands sales meetings, not just names.",
      },
      {
        id: "sale",
        label: "Sale",
        kind: "outcome",
        function:
          "The opportunity converts, and revenue is attributed back through the full journey.",
        impact: "Closed revenue — with clear attribution to what drove it.",
      },
    ],
    edges: [
      { source: "lead", target: "crm", label: "capture" },
      { source: "crm", target: "segmentation", label: "classify" },
      { source: "segmentation", target: "scoring", label: "evaluate" },
      { source: "scoring", target: "nurture", label: "engage" },
      { source: "nurture", target: "appointment", label: "convert" },
      { source: "appointment", target: "sale", label: "close" },
    ],
  },
];
