/**
 * site.ts — single source of truth for all narrative copy, navigation,
 * the framework/tool lists, and section-level content.
 *
 * To change wording anywhere on the site, edit it here. Components read
 * from this file; they do not hardcode copy.
 */

export const site = {
  meta: {
    name: "Matt Martelli",
    domain: "mattmartelli.com",
    url: "https://mattmartelli.com",
    title: "Matt Martelli — AI Systems Architect & Marketing Operations Leader",
    description:
      "Matt Martelli designs and builds production AI systems that connect voice, CRM, marketing automation, data pipelines, and multi-agent workflows to solve real business problems.",
    email: "mattmartelli@mac.com",
    // Replace with the real LinkedIn URL when available.
    linkedin: "https://www.linkedin.com/in/mattmartelli/",
    jobTitle: "AI Systems Architect",
    location: "United States",
  },

  nav: {
    links: [
      { label: "What I Do", href: "#what-i-do" },
      { label: "Agentic Systems", href: "#agentic-systems" },
      { label: "Orchestration", href: "#orchestration" },
      { label: "Voice AI", href: "#voice-ai" },
      { label: "Marketing Ops", href: "#marketing-ops" },
      { label: "Proof of Work", href: "#proof-of-work" },
      { label: "Projects", href: "#projects" },
    ],
    cta: {
      recruiter: { label: "Recruiter Fast Path", href: "/recruiter" },
      contact: { label: "Contact", href: "#contact" },
    },
  },

  hero: {
    name: "Matt Martelli",
    titleLine:
      "AI Systems Architect · Marketing Operations Leader · Agentic Systems Builder",
    coreStatement:
      "I don't specialize in AI tools. I specialize in designing business systems powered by AI.",
    subLine: "Frameworks evolve. Business outcomes remain.",
    introduction:
      "I've spent 25+ years building marketing, CRM, and operational systems. Today I design AI-powered systems that connect voice, automation, data, and human teams to get real work done.",
    positioning:
      "I design and build production AI systems that connect voice, CRM, marketing automation, data pipelines, and multi-agent workflows to solve real business problems. For more than 25 years, I've worked at the intersection of marketing, technology, operations, and customer experience.",
    ctas: {
      primary: { label: "Explore the Systems", href: "#proof-of-work" },
      secondary: { label: "Recruiter Fast Path", href: "/recruiter" },
    },
  },

  whatIDo: {
    heading: "What I Do",
    framing:
      "I start with the business problem, not the technology. The operating philosophy is simple: design the system first, then choose the tools that serve it.",
    reinforce: "The framework is never the product. The system is the product.",
    pillars: [
      {
        id: "agentic",
        title: "Agentic Systems",
        href: "#agentic-systems",
        blurb:
          "Multi-agent architectures where specialized AI workers coordinate to execute real business processes end to end.",
      },
      {
        id: "voice",
        title: "Voice AI",
        href: "#voice-ai",
        blurb:
          "Production voice agents that answer, qualify, schedule, and recover revenue — around the clock.",
      },
      {
        id: "marketing",
        title: "Marketing Operations & CRM",
        href: "#marketing-ops",
        blurb:
          "25+ years architecting lifecycle marketing, lead management, and revenue operations at enterprise scale.",
      },
      {
        id: "orchestration",
        title: "AI Orchestration",
        href: "#orchestration",
        blurb:
          "Framework-agnostic orchestration that connects agents, data, and human teams into one coherent system.",
      },
    ],
  },

  agentic: {
    heading: "Agentic Systems",
    copy: "Design and orchestrate multi-agent architectures that coordinate specialized AI workers to execute business processes.",
    // Explorable chips — selecting one updates the inline description.
    applications: [
      {
        id: "lead-qual",
        label: "Lead Qualification Systems",
        detail:
          "Agents intake, enrich, and score inbound leads in real time, then route only sales-ready prospects to humans — compressing response time from hours to seconds.",
      },
      {
        id: "revenue-recovery",
        label: "Revenue Recovery Workflows",
        detail:
          "Coordinated agents detect missed calls, abandoned forms, and stalled deals, then re-engage automatically to reclaim opportunities that would otherwise be lost.",
      },
      {
        id: "cs-automation",
        label: "Customer Service Automation",
        detail:
          "Tiered agents resolve routine requests, gather context, and escalate edge cases to the right human with a full summary attached.",
      },
      {
        id: "scheduling",
        label: "Scheduling & Dispatch Automation",
        detail:
          "Agents negotiate availability, book appointments, and dispatch the right resource — keeping calendars and field teams in sync without manual coordination.",
      },
      {
        id: "marketing-copilots",
        label: "Marketing Operations Copilots",
        detail:
          "Embedded agents draft campaigns, audit data hygiene, and surface pipeline anomalies so marketing teams operate with leverage instead of busywork.",
      },
      {
        id: "internal-assistants",
        label: "Internal AI Assistants",
        detail:
          "Knowledge-grounded assistants give teams instant, governed access to internal data, process, and tooling — with humans in the loop where it matters.",
      },
      {
        id: "research",
        label: "Research & Analysis Workflows",
        detail:
          "Agent pipelines gather, verify, and synthesize information across sources, returning decision-ready briefs instead of raw search results.",
      },
    ],
  },

  orchestration: {
    heading: "AI Orchestration & Frameworks",
    framing: "The framework is never the product. The system is the product.",
    body: "Frameworks are supporting implementation options — interchangeable parts in service of a design. I select them to fit the system and the business outcome, never the other way around.",
    // Priority order the site emphasizes — surfaced as a visible hierarchy.
    emphasis: [
      "System design",
      "Business outcomes",
      "Agent orchestration",
      "Workflow architecture",
      "Voice AI",
      "Marketing operations",
      "Revenue operations",
    ],
    takeaway:
      "Matt can design, build, and deploy production AI systems regardless of the orchestration framework.",
    // The "tooling layer" — deliberately secondary, orbiting the System node.
    tools: [
      { name: "OpenClaw", note: "Agent orchestration" },
      { name: "CrewAI", note: "Multi-agent crews" },
      { name: "OpenAI Agents", note: "Agent runtime" },
      { name: "Microsoft Copilot Studio & Agent Framework", note: "Enterprise agents" },
      { name: "Anthropic Claude", note: "Reasoning & tools" },
      { name: "Google Gemini", note: "Multimodal models" },
      { name: "MCP Architectures", note: "Tool & data interop" },
      { name: "Custom Python Agent Systems", note: "Bespoke control" },
      { name: "n8n", note: "Workflow automation" },
    ],
  },

  voice: {
    heading: "Voice AI",
    copy: "Production voice solutions.",
    platforms: [
      { name: "Retell AI", note: "Realtime voice agents" },
      { name: "ElevenLabs", note: "Voice synthesis" },
      { name: "OpenAI Realtime", note: "Speech-to-speech" },
      { name: "Gemini Voice", note: "Multimodal voice" },
    ],
    capabilities: [
      {
        id: "inbound",
        label: "Inbound Call Handling",
        detail:
          "Answers every call instantly with a natural-sounding agent that captures intent and never sends a caller to voicemail.",
      },
      {
        id: "scheduling",
        label: "Appointment Scheduling",
        detail:
          "Books, reschedules, and confirms appointments directly against live calendar availability during the call.",
      },
      {
        id: "qualification",
        label: "Lead Qualification",
        detail:
          "Asks the right questions, scores the opportunity, and routes hot leads to the team while logging everything to CRM.",
      },
      {
        id: "after-hours",
        label: "After-Hours Coverage",
        detail:
          "Provides 24/7 coverage so inquiries outside business hours convert instead of going cold overnight.",
      },
      {
        id: "support",
        label: "Customer Support",
        detail:
          "Resolves common questions and triages complex issues with full context handed to a human when needed.",
      },
      {
        id: "follow-up",
        label: "Follow-Up Automation",
        detail:
          "Triggers SMS and call-back sequences automatically so no commitment or next step slips through the cracks.",
      },
      {
        id: "revenue-recovery",
        label: "Revenue Recovery",
        detail:
          "Re-engages missed calls and dropped inquiries the moment they happen — turning lost calls into booked revenue.",
      },
    ],
    diagramRef:
      "Explore the full Voice AI architecture in the interactive diagram below.",
  },

  marketing: {
    heading: "Marketing Operations & CRM",
    copy: "25+ years of experience across enterprise marketing and revenue operations.",
    stack: [
      "HubSpot",
      "Salesforce",
      "Marketo",
      "Eloqua",
      "IBM Watson Campaign Automation (Silverpop)",
      "Lifecycle Marketing",
      "Lead Scoring",
      "Customer Journeys",
      "Revenue Attribution",
      "Marketing Automation Strategy",
    ],
    diagramRef:
      "See how the pieces connect in the interactive Marketing Operations Engine below.",
  },

  proofOfWork: {
    heading: "Explore the Systems",
    sub: "Rather than reading a resume, explore interactive visualizations of real-world AI systems.",
    hint: "Select a node to see what happens at each stage — what the system does, why it matters, and the business outcome.",
  },

  recruiterSummary: {
    heading: "For hiring managers who want the highlights",
    sub: "The 60-second version. The full fast-path page has the rest.",
    cta: { label: "Open the Recruiter Fast Path", href: "/recruiter" },
  },

  contact: {
    heading: "Let's build the system",
    sub: "Tell me about the business problem. I'll tell you how I'd architect the system that solves it.",
    email: "mattmartelli@mac.com",
    linkedinLabel: "Connect on LinkedIn",
    closingStatement:
      "The future belongs to organizations that successfully combine AI, automation, data, and human expertise. My role is helping design and build the systems that make that possible.",
  },

  footer: {
    tagline: "Designing business systems powered by AI.",
  },
} as const;

export type Site = typeof site;
