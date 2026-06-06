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
    title: "Seinfeld HQ: Multi-Agent Command Center",
    description:
      "An interactive multi-agent system demonstrating orchestration, routing, memory management, QA gates, workflow automation, voice AI, CRM integration, and human handoffs. This project showcases how complex AI systems can be transformed into intuitive operating models that organizations can understand, trust, and scale.",
    caseStudy: { label: "Read the Case Study", href: "/seinfeld-hq" },
    demo: { label: "Launch Interactive Demo", href: "https://growthmindset.ai/seinfeld-hq/" },
    repo: {
      label: "View on GitHub",
      href: "https://github.com/MattymBaylor/gms-website-3.0-perplexity",
    },
  },

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
      title: "Interactive Operations Dashboard",
      line: "A live, single-pane command center unifying dashboards, agents, and workflows — built and deployed.",
    },
  ],

  links: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/mattmartelli/" },
    email: { label: "Email", href: "mailto:mattmartelli@mac.com" },
  },
} as const;
