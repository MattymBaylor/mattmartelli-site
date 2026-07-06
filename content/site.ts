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
    title: "Matt Martelli — AI Automation Architect & Marketing Automation Architect",
    description:
      "Matt Martelli designs and builds production AI systems that connect voice, CRM, marketing automation, data pipelines, and multi-agent workflows to solve real business problems.",
    email: "mattmartelli@mac.com",
    phone: "(214) 608-8290",
    phoneHref: "tel:+12146088290",
    linkedin: "https://www.linkedin.com/in/mattmartelli/",
    youtube: "https://www.youtube.com/@matt_martelli",
    youtubeLabel: "The 60-Second AI Brief",
    videoId: "bF7DsaHtUcQ",
    company: { name: "growthmindset.ai", url: "https://growthmindset.ai" },
    podcast: { name: "The Matt & Maya Show", url: "https://mattandmayashow.com" },
    jobTitle: "AI Automation Architect",
    location: "United States",
  },

  nav: {
    // A nav item is either a dropdown (has `links`) or a direct link (has `href`).
    // Approach stays a dropdown; Work, Projects, Blueprints are direct links.
    items: [
      {
        label: "Systems",
        links: [
          { label: "Agentic Systems", href: "#agentic-systems" },
          { label: "Voice AI", href: "#voice-ai" },
          { label: "Marketing Ops & CRM", href: "#marketing-ops" },
          { label: "AI Orchestration", href: "#orchestration" },
          { label: "System Blueprints", href: "#architecture" },
        ],
      },
      { label: "Projects", href: "#projects" },
    ],
    cta: {
      resume: {
        label: "Download Résumé",
        href: "/matt_martelli_resume.pdf",
        filename: "matt_martelli_resume.pdf",
      },
      recruiter: { label: "Recruiter Fast Path", href: "/recruiter" },
      contact: { label: "Contact", href: "#contact" },
    },
  },

  hiring: {
    primaryRole: "AI Systems Architect",
    secondaryRole: "Production AI · Voice · RevOps",
    availability: "Naples, FL · Remote · Open to senior IC, architect/lead, or consulting",
    oneLiner:
      "I design and ship production AI systems — voice agents, multi-agent workflows, and CRM automation — that connect data, automation, and human teams to measurable business outcomes.",
    targetRoles: [
      "AI Systems Architect",
      "Forward Deployed Engineer",
      "Senior Applied AI Engineer",
    ],
    targetRolesNote: "Also open to RevOps and marketing automation leadership roles.",
    systemsDepth: {
      eyebrow: "Technical depth",
      title: "For evaluators who want to go deeper",
      sub: "Interactive architecture canvases, voice AI demos, orchestration patterns, and the methodology behind how I pressure-test AI before it ships.",
    },
  },

  hero: {
    eyebrow: "AI Systems Architect",
    name: "Matt Martelli",
    // Headline renders as two stacked lines; line 2 carries the emphasis.
    headlineLine1: "AI is the tool.",
    headlineLine2: "The system is the product.",
    promise: "I build AI systems that find flaws, fix fast, and scale revenue.",
    capabilities:
      "AI Automation Architect | RevOps & CRM Systems | Marketing Automation | HubSpot Certified | Remote",
    introduction:
      "I design production AI systems that connect voice agents, automation, CRM platforms, and human teams into measurable operating systems for growth.",
    experience:
      "My work is built for the real world: pressure-tested, failure-aware, and designed to turn weak spots into fix-ready execution.",
    stats: [
      { value: "25+", label: "years building systems" },
      { value: "100+", label: "custom agent workflows" },
      { value: "HubSpot", label: "certified architect" },
    ],
    ctas: {
      primary: { label: "Download Résumé", href: "/matt_martelli_resume.pdf" },
      secondary: { label: "Explore Systems", href: "#agentic-systems" },
      recruiter: { label: "Recruiter Fast Path", href: "/recruiter" },
    },
    // Single flagship teaser — the one artifact that demonstrates the whole
    // thesis. Lives just under the hero CTAs; the full flagship card is in
    // Projects. Theme stays second; this leads with what it proves.
    flagshipTeaser: {
      lead: "Proof I practice what I build:",
      detail: "the multi-agent system that runs my own company.",
      href: "/seinfeld-hq",
    },
  },

  systemFlow: {
    nodes: ["Voice", "Automation", "CRM", "Human teams"],
  },

  techStack: [
    "n8n",
    "Retell AI",
    "OpenAI",
    "Claude",
    "HubSpot",
    "Salesforce",
    "CrewAI",
    "ElevenLabs",
    "HeyGen",
    "Python",
    "PostgreSQL",
    "MCP",
  ],

  industries: [
    "Home Services",
    "Marketing Ops",
    "RevOps",
    "SaaS",
    "Coaching",
    "Enterprise",
    "Lead Generation",
    "Customer Support",
  ],

  focusAreas: [
    { n: "01", label: "Agentic workflows", href: "#agentic-systems" },
    { n: "02", label: "Voice AI systems", href: "#voice-ai" },
    { n: "03", label: "Revenue operations", href: "#marketing-ops" },
  ],

  whatIBuild: {
    eyebrow: "What I build",
    heading: "From uncertain idea to dependable system.",
    framing:
      "I work where AI meets real organizational complexity — legacy CRMs, sensitive data, human decisions, and the need to prove something actually works.",
    pillars: [
      {
        n: "01",
        title: "Agentic systems",
        blurb:
          "Designing observable workflows where models, tools, data, and human judgment work together safely.",
        points: ["Workflow architecture", "Tool orchestration", "Human oversight"],
        href: "#agentic-systems",
      },
      {
        n: "02",
        title: "Voice & revenue AI",
        blurb:
          "Voice agents and recovery workflows that answer, qualify, schedule, and reclaim revenue — coordinated as one system.",
        points: ["Realtime voice agents", "Speed-to-lead", "CRM integration"],
        href: "#voice-ai",
      },
      {
        n: "03",
        title: "Marketing & RevOps",
        blurb:
          "Lifecycle marketing, lead management, and data hygiene at enterprise scale — the infrastructure businesses run on.",
        points: ["CRM architecture", "Data hygiene", "Revenue attribution"],
        href: "#marketing-ops",
      },
    ],
  },

  operatingPrinciples: {
    eyebrow: "Operating principles",
    heading: "How I think about AI delivery.",
    sub: "The most valuable systems are understandable, governable, and quietly useful in ordinary work.",
    items: [
      {
        n: "01",
        title: "Useful before autonomous",
        blurb: "Start with a real decision or workflow. Earn autonomy through evidence.",
      },
      {
        n: "02",
        title: "Visible before magical",
        blurb: "Expose sources, reasoning boundaries, approvals, and failure paths.",
      },
      {
        n: "03",
        title: "Systems before prompts",
        blurb: "The model is one component. Data, interfaces, evaluation, and operations make it work.",
      },
    ],
  },

  selectedWork: {
    eyebrow: "Selected systems",
    heading: "Practical AI. Built for real work.",
    sub: "Production prototypes for real revenue, operations, and growth workflows.",
    cta: { label: "View all projects", href: "#projects" },
  },

  whatIDo: {
    heading: "How I Think",
    framing:
      "I start with the business problem, not the technology. The operating philosophy is simple: design the system first, then choose the tools that serve it.",
    pillars: [
      {
        id: "agentic",
        title: "Agentic Systems",
        href: "#agentic-systems",
        blurb: "Multi-agent systems that run real processes end to end.",
      },
      {
        id: "voice",
        title: "Voice AI",
        href: "#voice-ai",
        blurb: "Voice agents that answer, qualify, schedule, and recover revenue.",
      },
      {
        id: "marketing",
        title: "Marketing Operations & CRM",
        href: "#marketing-ops",
        blurb: "Lifecycle, lead, and revenue operations at enterprise scale.",
      },
      {
        id: "orchestration",
        title: "AI Orchestration",
        href: "#orchestration",
        blurb: "Framework-agnostic orchestration across agents, data, and teams.",
      },
    ],
  },

  agentic: {
    heading: "Agentic Systems for Every Business Process",
    copy: "AI workers that qualify leads, recover revenue, support customers, and automate operations — coordinated as a single system.",
    // Visual summary of the end-to-end agentic lead lifecycle (click to expand).
    lifecycle: {
      src: "/lead-lifecycle-workflow.webp",
      alt: "The AI-Powered Lead Lifecycle — an end-to-end agentic journey: ingestion and triage, data hygiene and semantic standardization, enrichment and strategic routing, then final sync and operational action across HubSpot and Salesforce.",
      caption: "The AI-powered lead lifecycle — an end-to-end agentic journey",
      hint: "Click to expand",
    },
    // Workflow carousel — arrow-navigated diagrams in the Agentic section.
    // Add slides by appending { src, alt, caption }. Images live in /public.
    workflows: [
      {
        src: "/lead-lifecycle-workflow.webp",
        alt: "The AI-Powered Lead Lifecycle — an end-to-end agentic journey: ingestion and triage, data hygiene and semantic standardization, enrichment and strategic routing, then final sync and operational action across HubSpot and Salesforce.",
        caption: "The AI-powered lead lifecycle — an end-to-end agentic journey",
      },
      {
        src: "/workflows/ai-architecture-orchestrator.webp",
        alt: "Custom AI architecture blueprint — a master orchestrator agent that routes work to specialized agents for research, coding, design, analysis, and deployment over a secure API bridge.",
        caption: "AI architecture — a master orchestrator delegating to specialized agents",
      },
      {
        src: "/workflows/scalable-revenue-architecture.webp",
        alt: "Scalable revenue architecture — a centralized HubSpot central nervous system connecting acquisition, fulfillment, and finance to eliminate data silos and sync drift.",
        caption: "Scalable revenue architecture — one central nervous system, no data silos",
      },
      {
        src: "/workflows/scaling-blueprint-journeys.webp",
        alt: "The scaling blueprint — routing seven distinct customer personas by offer tier, sales cycle, and the high-leverage moment that converts each.",
        caption: "The scaling blueprint — seven customer journeys, routed by intent",
      },
      {
        src: "/workflows/multi-agent-specialist-roster.webp",
        alt: "A 15-agent AI operation — a specialist roster organized into Intelligence, Creation, Systems, and Quality Control departments, each agent owning a domain-specific job.",
        caption: "Multi-agent operations — a 15-agent specialist roster across intelligence, creation, systems, and QA",
      },
      {
        src: "/workflows/gtm-engine-blueprint.webp",
        alt: "A unified go-to-market execution blueprint — data foundation and enrichment via Clay, routing and conversion via Chili Piper, outbound engagement via Outreach, unified on a HubSpot and Salesforce system of record.",
        caption: "The GTM engine — Clay to Chili Piper to Outreach, unified on HubSpot + Salesforce",
      },
      {
        src: "/workflows/tech-stack-decision-tree.webp",
        alt: "A tech-stack architecture decision tree — choosing the right CRM and automation stack by ARR and contact volume, from sub-$1M scrappy stacks to enterprise.",
        caption: "Tech-stack decision tree — the right architecture by ARR and contact volume",
      },
    ],
    // Explorable chips — selecting one updates the inline description.
    applications: [
      {
        id: "lead-qual",
        label: "Lead Qualification Systems",
        detail:
          "Agents intake, enrich, and score inbound leads in real time, then route only sales-ready prospects to humans — compressing response time from hours to seconds.",
        points: [
          "Enriches and scores every inbound lead in real time",
          "Routes only sales-ready prospects to a human",
          "Compresses response from hours to seconds",
        ],
        proof:
          "Speed matters: contacting a lead within 5 minutes makes qualifying 21× likelier than at 30.¹",
      },
      {
        id: "revenue-recovery",
        label: "Revenue Recovery Workflows",
        detail:
          "Coordinated agents detect missed calls, abandoned forms, and stalled deals, then re-engage automatically to reclaim opportunities that would otherwise be lost.",
        points: [
          "Detects missed calls, abandoned forms, stalled deals",
          "Re-engages automatically before the lead goes cold",
          "Hands warm, context-rich leads back to the team",
        ],
        proof:
          "78% of buyers purchase from whoever responds first — recovery is about being first, automatically.²",
      },
      {
        id: "cs-automation",
        label: "Customer Service Automation",
        detail:
          "Tiered agents resolve routine requests, gather context, and escalate edge cases to the right human with a full summary attached.",
        points: [
          "Resolves routine requests end to end",
          "Gathers full context before any escalation",
          "Escalates edge cases to the right human with a summary attached",
        ],
        proof:
          "Tiered handling means humans only touch what actually needs judgment.",
      },
      {
        id: "scheduling",
        label: "Scheduling & Dispatch Automation",
        detail:
          "Agents negotiate availability, book appointments, and dispatch the right resource — keeping calendars and teams in sync without manual coordination.",
        points: [
          "Negotiates availability and books against live calendars",
          "Dispatches the right resource automatically",
          "Keeps calendars and teams in sync without manual coordination",
        ],
        proof:
          "Applies to any business that books time: coaching, medical, services, B2B.",
      },
      {
        id: "marketing-copilots",
        label: "Marketing Operations Copilots",
        detail:
          "Embedded agents draft campaigns, audit data hygiene, and surface pipeline anomalies so marketing teams operate with leverage instead of busywork.",
        points: [
          "Drafts campaigns and audits data hygiene",
          "Surfaces pipeline anomalies before they cost revenue",
          "Gives marketing leverage instead of busywork",
        ],
        proof: "The 'marketing-automation ecosystem' layer, run by agents.",
      },
      {
        id: "internal-assistants",
        label: "Internal AI Assistants",
        detail:
          "Knowledge-grounded assistants give teams instant, governed access to internal data, process, and tooling — with humans in the loop where it matters.",
        points: [
          "Governed, knowledge-grounded access to internal data and process",
          "Humans in the loop where judgment matters",
          "Consistent answers across the team",
        ],
        proof: "Adoption depends on trust — these are inspectable, not black boxes.",
      },
      {
        id: "research",
        label: "Research & Analysis Workflows",
        detail:
          "Agent pipelines gather, verify, and synthesize information across sources, returning decision-ready briefs instead of raw search results.",
        points: [
          "Gathers and verifies across sources",
          "Synthesizes into decision-ready briefs",
          "Returns conclusions, not raw search results",
        ],
        proof: "The same verify-then-synthesize pattern behind real analyst work.",
      },
    ],
  },

  orchestration: {
    heading: "AI Orchestration & Frameworks",
    framing:
      "I've built 100+ custom agent workflows and harnesses over the last few years, and no two are alike. That's the point — each one is architected around your specific business, not a template.",
    body: "Once you realize one size never fits all, you get the flexibility to build something streamlined and genuinely custom. Every build brings a new challenge.",
    // Points the reader up to the interactive diagram dropdown (Architecture
    // section sits directly above this one).
    cue: "Select from the dropdown menu to explore different ways to architect a fully functional multi-agent harness or workflow.",
    // Priority order the site emphasizes — surfaced as a visible, clickable
    // hierarchy. Each links to the section that best demonstrates it.
    emphasis: [
      { label: "System design", href: "#architecture" },
      { label: "Business outcomes", href: "#projects" },
      { label: "Agent orchestration", href: "#agentic-systems" },
      { label: "Workflow architecture", href: "#architecture" },
      { label: "Voice AI", href: "#voice-ai" },
      { label: "Marketing operations", href: "#marketing-ops" },
      { label: "Revenue operations", href: "#projects" },
    ],
    takeaway:
      "I design, build, and deploy production AI systems regardless of the orchestration framework.",
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
    heading: "Professional Voice AI Frameworks",
    copy: "Ability to run over 60 simultaneous calls using one workflow.",
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
        points: [
          "Answers instantly, never sends a caller to voicemail",
          "Captures intent in natural conversation",
          "Logs everything to CRM in real time",
        ],
        proof:
          "~80% of callers who hit voicemail hang up without leaving a message.³",
      },
      {
        id: "scheduling",
        label: "Appointment Scheduling",
        detail:
          "Books, reschedules, and confirms appointments directly against live calendar availability during the call.",
        points: [
          "Books, reschedules, confirms against live availability",
          "Confirms during the call, not after",
          "Syncs to calendar + CRM automatically",
        ],
        proof:
          "In a confirmation workflow I built (home services), cancellations dropped 38% — the same pattern fits any business that books appointments.⁴",
        proofKind: "owned",
      },
      {
        id: "qualification",
        label: "Lead Qualification",
        detail:
          "Asks the right questions, scores the opportunity, and routes hot leads to the team while logging everything to CRM.",
        points: [
          "Asks the right questions, scores the opportunity",
          "Routes hot leads to the team live",
          "Logs the full transcript and outcome",
        ],
        proof:
          "21× more likely to qualify when contact happens within 5 minutes.¹",
      },
      {
        id: "after-hours",
        label: "After-Hours Coverage",
        detail:
          "Provides 24/7 coverage so inquiries outside business hours convert instead of going cold overnight.",
        points: [
          "Answers at 2am the same as 2pm",
          "Books and logs while the caller is still engaged",
          "Routes urgent items to a human with context",
        ],
        proof:
          "30–40% of call volume is after-hours; without coverage it goes cold.³",
      },
      {
        id: "support",
        label: "Customer Support",
        detail:
          "Resolves common questions and triages complex issues with full context handed to a human when needed.",
        points: [
          "Resolves common questions instantly",
          "Triages complex issues with full context",
          "Hands off to a human only when needed",
        ],
        proof: "Deflects volume without the 'press 1' maze.",
      },
      {
        id: "follow-up",
        label: "Follow-Up Automation",
        detail:
          "Triggers SMS and call-back sequences automatically so no commitment or next step slips through the cracks.",
        points: [
          "Triggers SMS and call-back sequences automatically",
          "Persists until there's a next step",
          "No commitment slips through",
        ],
        proof:
          "Two-way confirmation cuts no-shows ~23% more than one-way.⁵",
      },
      {
        id: "revenue-recovery",
        label: "Revenue Recovery",
        detail:
          "Re-engages missed calls and dropped inquiries the moment they happen — turning lost calls into booked revenue.",
        points: [
          "Re-engages missed calls and dropped inquiries the moment they happen",
          "Turns lost calls into booked revenue",
          "Closes the loop without manual chasing",
        ],
        proof:
          "Service businesses lose an estimated ~$150B/yr to missed appointments.⁶",
      },
    ],
    diagramRef:
      "Explore the full Voice AI architecture in the interactive diagram below.",
    demo: {
      eyebrow: "Hear it in action",
      headline: "Most voice AI still sounds like a robot. Listen to one that doesn't.",
      craft:
        "That natural tone is engineered — not defaulted. I spent weeks tuning persona, pacing, turn-taking, objection handling, and voice selection until callers stay on the line and actually book. Every hesitation, every interruption, every \"uh-huh\" moment was deliberate.",
      stack:
        "Under the hood: n8n orchestration, Retell AI realtime voice, OpenAI and Claude for reasoning, ElevenLabs and HeyGen for synthesis, CrewAI on the vector memory layer. The stack runs production. The sound is what proves it works.",
      cta: "Push play — real outbound call, zero edits",
    },
  },

  marketing: {
    heading: "Lifecycle Marketing | RevOps | Data Hygiene",
    copy: "Enterprise-scale lifecycle marketing, lead management, and revenue operations — the marketing-automation ecosystem and customer-journey infrastructure that businesses run on.",
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
    // Featured "methodology" artifact — the Data Refinery Blueprint deck.
    // Rendered slides live in /public/blueprints; the lightbox reads this.
    blueprint: {
      eyebrow: "Featured methodology",
      title: "Data Hygiene is critical!",
      body: "Data hygiene ensures information is accurate, consistent, and up-to-date. It is the critical foundation for eliminating errors, driving strategic decisions, reducing operational costs, and maintaining regulatory compliance. Neglecting it leads to flawed analytics, wasted resources, and serious security vulnerabilities.",
      cta: "Click to view methodology",
      cover: "/blueprints/cover.webp",
      coverAlt: "The Data Refinery Blueprint — title slide",
      pdf: "/blueprints/data-refinery-blueprint.pdf",
      deckTitle: "The Data Refinery Blueprint",
      deckSubtitle: "Architecting the Intelligent RevOps Assembly Line",
      slides: [
        { src: "/blueprints/slide-01.webp", title: "The Data Refinery Blueprint" },
        { src: "/blueprints/slide-02.webp", title: "The Problem: The Silent Tax of Unstructured Data" },
        { src: "/blueprints/slide-03.webp", title: "The Master Schematic: A Left-to-Right Architecture" },
        { src: "/blueprints/slide-04.webp", title: "Stage 01 — Pre-Sync Triage & Diagnostic Gating" },
        { src: "/blueprints/slide-05.webp", title: "Stage 02 — Standardization: From Rules to Reasoning" },
        { src: "/blueprints/slide-06.webp", title: "Stage 02 — Enrichment: Appending Context" },
        { src: "/blueprints/slide-07.webp", title: "Stage 03 — The Native Deduplication Divide" },
        { src: "/blueprints/slide-08.webp", title: "Stage 03 — The Safe Merge Protocol" },
        { src: "/blueprints/slide-09.webp", title: "Stage 03 — Vector Similarity & Semantic Resolution" },
        { src: "/blueprints/slide-10.webp", title: "Stage 04 — The Orchestration Engine Matrix" },
        { src: "/blueprints/slide-11.webp", title: "Stage 04 — Anatomy of a Delegated AI Agent" },
        { src: "/blueprints/slide-12.webp", title: "Stage 04–05 — The Human-in-the-Loop Safeguard" },
        { src: "/blueprints/slide-13.webp", title: "Stage 05 — Continuous Maintenance Governance" },
        { src: "/blueprints/slide-14.webp", title: "The Paradigm Shift: From Rules to Reasoning" },
      ],
    },
    diagramRef:
      "See how the pieces connect in the interactive Marketing Operations Engine below.",
  },

  proofOfWork: {
    heading: "Explore the Architecture",
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
    preferenceNote: "Email or a text usually reaches me fastest — happy to jump on a call from there.",
    email: "mattmartelli@mac.com",
    linkedinLabel: "Connect on LinkedIn",
    closingStatement:
      "The future belongs to organizations that successfully combine AI, automation, data, and human expertise. My role is helping design and build the systems that make that possible.",
  },

  // Shared source list. Superscript markers (¹–⁶) in the proof lines and the
  // StatCallouts map to these by number. Owned vs. industry framing is honest:
  // note 4 is a first-party deployed result, cited research only corroborates.
  footnotes: [
    'MIT / Dr. James Oldroyd + InsideSales; HBR, "The Short Life of Online Sales Leads" (2011, 2007 data — directional).',
    "Lead Response Management Study / Lead Connect Survey.",
    "Industry aggregate (voicemail abandonment ~75–90%; after-hours 30–40% of volume).",
    "Owned result — home-services confirmation workflow (no client named); corroborated by Klara (text reminders ~38%) and Am. J. Medicine (phone reminders: no-show 21%→7%).",
    "Journal of General Internal Medicine — two-way vs one-way reminders.",
    "Statista — service-sector missed-appointment losses (~$150B/yr).",
  ],

  footer: {
    tagline: "Designing business systems powered by AI.",
    thoughtLeadership: {
      eyebrow: "Thought leadership & company",
      note: "Audience-building — separate from the portfolio and hiring evaluation.",
    },
  },
} as const;

export type Site = typeof site;
