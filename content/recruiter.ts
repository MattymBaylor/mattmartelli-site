/**
 * recruiter.ts — content for the /recruiter fast-path page and the
 * homepage Recruiter summary. Optimized to be read in under 60 seconds.
 */

export const recruiter = {
  heading: "For hiring managers who want the highlights",
  sub: "Everything that matters in under 60 seconds.",

  executiveSummary:
    "AI Systems Architect and Marketing Operations leader with 25+ years at the intersection of marketing, technology, operations, and customer experience. I design and build production AI systems — voice agents, multi-agent workflows, CRM and lifecycle automation — that connect data, automation, and human teams to deliver measurable business outcomes. I'm framework-agnostic by design: the system and the result come first, the tooling follows.",

  // Wire to the real file when ready. Placeholder lives at /public/resume.pdf.
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
      title: "Seinfeld HQ: Multi-Agent Command Center",
      line: "Flagship interactive demo of agent orchestration, routing, memory, QA, and real workflow execution.",
    },
    {
      title: "AI Voice Agent Ecosystem",
      line: "Voice systems that answer, qualify, schedule, and recover revenue around the clock.",
    },
    {
      title: "Revenue Recovery Platform",
      line: "Automation that reclaims missed calls, after-hours inquiries, and delayed follow-up.",
    },
    {
      title: "Marketing Automation Transformation",
      line: "Enterprise CRM and lifecycle programs driving measurable, attributable pipeline.",
    },
    {
      title: "Yelp Interactive Dashboard",
      line: "Custom front-end analytics dashboard delivered as the output of an agentic workflow.",
    },
  ],

  links: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/mattmartelli/" },
    email: { label: "Email", href: "mailto:mattmartelli@mac.com" },
  },
} as const;
