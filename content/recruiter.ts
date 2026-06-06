/**
 * recruiter.ts — content for the /recruiter fast-path page and the
 * homepage Recruiter summary. Optimized to be read in under 60 seconds.
 */

export const recruiter = {
  heading: "For hiring managers who want the highlights",
  sub: "Everything that matters in under 60 seconds.",

  targetRoles: [
    "Marketing Automation Leader",
    "Customer Journey Infrastructure Owner",
    "Revenue Operations & Systems Leader",
    "AI Systems Architect",
    "Lifecycle Marketing & Automation Executive",
  ],

  flagship: {
    title: "Designing Multi-Agent Systems Businesses Actually Understand",
    description:
      "A flagship case study in turning complex AI workflows into understandable business systems — orchestration, routing, memory, QA gates, workflow automation, voice AI, CRM integration, and human handoffs. Themed as a Seinfeld cast to make the org chart legible, but the theme is the wrapper; the architecture is the product.",
    caseStudy: { label: "Read the Case Study", href: "/seinfeld-hq" },
    demo: { label: "Launch Interactive Demo", href: "https://growthmindset.ai/seinfeld-hq/" },
  },

  executiveSummary:
    "AI Systems Architect and Marketing Operations leader with 25+ years at the intersection of marketing, technology, operations, and customer experience. I design and build production AI systems — voice agents, multi-agent workflows, CRM and lifecycle automation — that connect data, automation, and human teams to deliver measurable business outcomes. I'm framework-agnostic by design: the system and the result come first, the tooling follows.",

  resume: {
    label: "Download Résumé (PDF)",
    href: "/resume.pdf",
  },

  accomplishments: [
    "Designed and deployed production AI voice agents that answer, qualify, schedule, and recover revenue 24/7.",
    "Architected multi-agent workflows with coordination, QA validation, and human-in-the-loop execution.",
    "Led large-scale CRM and lifecycle marketing transformations across enterprise marketing and revenue operations.",
    "Built lead scoring, segmentation, and revenue-attribution systems that focus sales on the highest-value pipeline.",
    "Operated across HubSpot, Salesforce, Marketo, Eloqua, and IBM Watson Campaign Automation (Silverpop).",
    "Framework-agnostic delivery across OpenAI Agents, CrewAI, Microsoft Agent Framework, Claude, Gemini, MCP, n8n, and custom Python systems.",
  ],

  expertise: [
    "AI Automation",
    "Agentic Systems",
    "Multi-Agent Architecture",
    "Voice AI",
    "Marketing Operations",
    "CRM Architecture",
    "Workflow Automation",
    "Revenue Operations",
  ],

  // Condensed featured projects (full versions live in projects.ts).
  featured: [
    {
      title: "Multi-Agent Command Center",
      line: "Flagship case study in agent orchestration, routing, memory, QA, and real workflow execution.",
      points: [
        "Orchestrator routes each request to the right specialist agent",
        "Memory + QA gates keep work consistent and inspectable",
        "Humans stay in the loop where judgment matters",
      ],
      result:
        "Proof a multi-agent system can run real workflows end to end — not a prototype.",
    },
    {
      title: "AI Voice Agent Ecosystem",
      line: "Recovers the revenue that leaks after hours — missed calls answered, qualified, and booked before the lead goes cold.",
      points: [
        "Answers, qualifies, and books 24/7 — including after hours",
        "Connects voice to CRM, scheduling, and follow-up",
        "Turns missed and after-hours calls into booked revenue",
      ],
      result: "The revenue-recovery layer most businesses leak the most through.",
    },
    {
      title: "Revenue Recovery Platform",
      line: "Automation that reclaims missed calls, after-hours inquiries, and delayed follow-up.",
      points: [
        "Detects missed calls, abandoned forms, stalled deals",
        "Re-engages automatically before the lead goes cold",
        "Hands warm, context-rich leads back to the team",
      ],
      result: "Built around speed-to-lead: first responder wins the deal.",
    },
    {
      title: "Marketing Automation Transformation",
      line: "Enterprise CRM and lifecycle programs driving measurable, attributable pipeline.",
      points: [
        "Enterprise CRM + lifecycle programs across the funnel",
        "Lead scoring, segmentation, revenue attribution",
        "Turns fragmented data into measurable, attributable pipeline",
      ],
      result: "25+ years of marketing-ops depth, applied as a system.",
    },
    {
      title: "Interactive Operations Dashboard",
      line: "A live, single-pane command center unifying dashboards, agents, and workflows — built and deployed.",
      points: [
        "Single pane unifying dashboards, agents, and workflows",
        "Live status the operating team actually uses",
        "Built front-end-first for non-technical clients",
      ],
      result: "Clarity instead of complexity — built and deployed.",
    },
  ],

  links: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/mattmartelli/" },
    youtube: { label: "YouTube", href: "https://www.youtube.com/@matt_martelli" },
    email: { label: "Email", href: "mailto:mattmartelli@mac.com" },
  },
} as const;
