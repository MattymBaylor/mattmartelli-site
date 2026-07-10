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
    secondaryRole: "AI Architect | Marketing Automation | AI Voice & RevOps Strategist - (Remote)",
    availability: "Naples, FL · Remote · Open to senior IC, architect/lead, or consulting",
    oneLiner:
      "Voice agents that book the call. Multi-agent systems that run real operations. CRM automation workflows that turn speed-to-lead into attributed pipeline — built as one operating system your team can actually run.",
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
    promise:
      "I ship production AI that stress-tests weak spots, adapts and learns, and scales revenue.",
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
        src: "/workflows/autonomous-enterprise-linear-vs-parallel.webp",
        alt: "The autonomous enterprise — contrasting the past of linear, sequential human effort with parallel agentic execution, where one operator directs many simultaneous AI workstreams.",
        caption: "The autonomous enterprise — from linear human effort to parallel agentic execution",
      },
      {
        src: "/workflows/one-brain-many-channels.webp",
        alt: "The high-level vision — one brain, many channels: replacing a chaotic pile of isolated bot frameworks with a single command center that every interface feeds into.",
        caption: "One brain, many channels — every interface feeds a single command center",
      },
      {
        src: "/workflows/ai-sales-router-outside-room.webp",
        alt: "The router outside the room — a reasoning agent intercepts and triages all incoming traffic by skill, load, and intent before it reaches human operators, so reps only see pre-qualified, scored leads.",
        caption: "The router outside the room — AI triages everything before a human ever sees it",
      },
      {
        src: "/workflows/claw-crew-lead-triage-pipeline.webp",
        alt: "Automated lead triage pipeline — ingestion into the mission control queue, a reasoning router classifying intent and team load, sub-second auto-assignment, then execution with 30/60/90-day rework logic and global memory updates.",
        caption: "Automated lead triage — tasks flow to the precise node of expertise, no manual routing",
      },
      {
        src: "/workflows/ai-sales-hive-mind.webp",
        alt: "The hive mind — parallel task execution across five specialized agents (main, research, comms, ops, content) sharing one unified memory state, with dynamic triage and no human bottleneck.",
        caption: "The hive mind — five specialist agents, one shared memory, zero bottlenecks",
      },
      {
        src: "/workflows/ai-sales-6-layer-os.webp",
        alt: "The 6-layer enterprise OS architecture — deterministic execution, security perimeter, subsystems like Memory v2 and voice I/O, a five-agent core engine with smart routing, channels, and multi-device user interfaces.",
        caption: "The 6-layer enterprise OS — from deterministic core to every channel and device",
      },
      {
        src: "/workflows/claw-crew-mission-control-radar.webp",
        alt: "Mission control radar — a 60-second cron scheduler continuously sweeps the database for due tasks and executes recurring work in strict priority order, from hot leads down to data cleanup.",
        caption: "Mission control radar — operations stop being reactive; the 60-second cron never sleeps",
      },
      {
        src: "/workflows/ai-sales-one-way-pipelines.webp",
        alt: "Securing the perimeter with one-way data pipelines — every interaction processed as a localized, typed frame through VAD, speech-to-text, and the LLM decision center, with zero unauthorized exfiltration.",
        caption: "One-way data pipelines — every interaction is a typed frame, nothing leaks out",
      },
      {
        src: "/workflows/claw-crew-defense-rings.webp",
        alt: "The 4-ring defense model around the data vault — chat ID allowlist, salted SHA-256 PIN verification, an exfiltration guard scanning outbound traffic against 15+ regex patterns, and a typed action audit log, plus an emergency kill phrase.",
        caption: "4-ring defense — allowlist, verification, exfiltration guard, audit log, kill phrase",
      },
      {
        src: "/workflows/gtm-engine-unified-blueprint.webp",
        alt: "A unified go-to-market execution blueprint — Clay as the data foundation for enrichment and sourcing, Chili Piper for routing and inbound conversion, Outreach for outbound execution, unified on a HubSpot and Salesforce core.",
        caption: "The GTM engine — Clay to Chili Piper to Outreach on a HubSpot + Salesforce core",
      },
      {
        src: "/workflows/seven-customer-journeys.webp",
        alt: "Scaling seven distinct customer journeys — persona-routed sales architecture mapping each buyer, from emerging pro to growth-stage founder, to the offer tier, sales cycle, and conversion moment that fits.",
        caption: "Seven distinct journeys — every persona routed to the right offer and sales cycle",
      },
      {
        src: "/workflows/tooling-orbit-infrastructure.webp",
        alt: "The tooling orbit — infrastructure for scale: engagement, revenue capture, learning, and fulfillment systems orbiting one CRM source of truth over bi-directional webhooks and native integrations, no middleware.",
        caption: "The tooling orbit — every system orbits one CRM source of truth, no middleware",
      },
      {
        src: "/workflows/executive-control-panel.webp",
        alt: "The penthouse view — an executive control panel distilling backend complexity, AI routing, and human behavior into a handful of decision-ready numbers.",
        caption: "The penthouse view — immense backend complexity distilled into one executive panel",
      },
      {
        src: "/workflows/ninety-day-implementation-roadmap.webp",
        alt: "The 90-day implementation blueprint — phase 1 baseline and triage, phase 2 high-ticket routing and concierge engine, phase 3 advanced QA and scale, without disrupting current revenue flow.",
        caption: "The 90-day roadmap — baseline, routing, then advanced QA and scale",
      },
    ],
    // Blueprint Train #2 — the field-guide series. One slide per element,
    // arc: problem → offense/defense → agents → stack → ops → security → business → roadmap.
    guides: [
      {
        src: "/workflows/incident-count-698.webp",
        alt: "698 catalogued incidents of misaligned and deceptive AI agent behavior across a five-month study window, with the incident rate climbing nearly fivefold as more capable agentic models rolled out.",
        caption: "698 catalogued incidents — the number that should end the debate",
      },
      {
        src: "/workflows/tiger-sentinel-two-winners.webp",
        alt: "Two winners, opposite victories — the Tiger team is paid to break things with real, cited, reproducible holes; the Sentinel is paid for nothing breaking, catching regressions at the gate. Neither can cheat because the other is watching.",
        caption: "Two winners, opposite victories — Tiger breaks things, Sentinel keeps them whole",
      },
      {
        src: "/workflows/reward-number-line.webp",
        alt: "The reward number line — a caught fabrication scores minus five through the veto layer, silence scores zero, and a true, cited, independently confirmed finding pays plus 0.95, making honesty the only rational strategy.",
        caption: "The reward number line — truth pays +0.95, caught bluffing costs −5",
      },
      {
        src: "/workflows/finding-runs-the-gauntlet.webp",
        alt: "A finding runs the gauntlet — every auditor finding passes three composed gates: the citation gate collapses uncited claims to zero, the veto layer turns refuted fabrications negative, and consensus weighting discounts lone flags.",
        caption: "The gauntlet — cited, rival-confirmed, and refutation-proof before it scores",
      },
      {
        src: "/workflows/cross-lab-rivalry.webp",
        alt: "Cross-lab rivalry — different copies of the same AI share the same blind spots, different platforms don't: independent blind spots, no self-flattery, no single point of failure, no vendor lock-in.",
        caption: "Cross-lab rivalry — different platforms don't share blind spots",
      },
      {
        src: "/workflows/voice-agent-end-to-end.webp",
        alt: "One system, end to end — a typical AI voice agent deployment: the customer reaches the voice agent, which drives workflow automation wired into CRM, calendar, SMS and email, and notifications and reporting.",
        caption: "One system, end to end — voice wired into workflow, CRM, calendar, and SMS",
      },
      {
        src: "/workflows/six-phase-methodology.webp",
        alt: "Six phases, one accountable system — discovery, architecture, prototype, implementation, optimization, and governance; no design until the problem is measured, and an honest go / no-go before anything is built.",
        caption: "Six phases, one accountable system — no design until the problem is measured",
      },
      {
        src: "/workflows/eight-layer-architecture.webp",
        alt: "One architecture, adapted per engagement — eight separated layers from users and business applications through the AI orchestration layer, tool calling and MCP, workflow automation, and reporting and monitoring; models are interchangeable parts.",
        caption: "Eight layers, separated — models are interchangeable; the design is what lasts",
      },
      {
        src: "/workflows/integration-patterns.webp",
        alt: "We integrate with what you already run — CRM, ERP, HubSpot, Salesforce, SQL databases, REST APIs, SharePoint, Microsoft 365, email, calendars, voice, and document processing, every integration following the same authenticate, sync, transform, act, log pattern.",
        caption: "Integrates with what you already run — every connection follows the same pattern",
      },
      {
        src: "/workflows/three-kinds-of-drift.webp",
        alt: "Three kinds of drift — data drift where inputs change, concept drift where what counts as right moves, and semantic drift where embedding space shifts relative to what retrieval was calibrated against; drift doesn't announce itself.",
        caption: "Three kinds of drift — naming the type tells you where to look",
      },
      {
        src: "/workflows/promotion-gate.webp",
        alt: "The promotion gate — no change ships without clearing three conditions: a human reviews and signs off the diagnosis, the fix proves out on a staged slice of traffic, and a tested one-step rollback exists before anything ships.",
        caption: "The promotion gate — reviewed, staged, and a tested way back before it ships",
      },
      {
        src: "/workflows/monitoring-stack-three-layers.webp",
        alt: "The monitoring stack, top-down — quality evaluation scored by online evals on sampled live traffic, LLM telemetry with traces, tokens, latency, cost and tool calls, and infrastructure metrics; only the top layer answers whether the system is right.",
        caption: "The monitoring stack — only the top layer answers “is it right?”",
      },
      {
        src: "/workflows/nine-security-controls.webp",
        alt: "Governed enough for security to say yes — nine controls designed in from day one: authentication, authorization, human approval, audit logs, role-based access, data privacy, monitoring, fallback procedures, and enterprise guardrails; human-in-the-loop by design.",
        caption: "Nine controls, designed in from day one — approval gates on every consequential action",
      },
      {
        src: "/workflows/board-deck-outcomes.webp",
        alt: "Outcomes you can put in a board deck — faster operations, reduced manual work, higher data quality, improved customer experience, scalable automation, enterprise visibility, operational consistency, and better decision-making, measured against discovery baselines.",
        caption: "Outcomes for a board deck — improvement is provable, not claimed",
      },
      {
        src: "/workflows/timeline-decision-gates.webp",
        alt: "A timeline you can hold us to — discovery, architecture, pilot, production, optimization, knowledge transfer, and support, with every phase ending in a decision gate you control: a working demonstration, a document that survives the meeting, and a go / no-go.",
        caption: "A timeline you can hold us to — every phase ends with a decision gate you control",
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
    privacy: { label: "Privacy Policy", href: "/privacy" },
    thoughtLeadership: {
      eyebrow: "Thought leadership & company",
      note: "Audience-building — separate from the portfolio and hiring evaluation.",
    },
  },
} as const;

export type Site = typeof site;
