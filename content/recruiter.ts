/**
 * recruiter.ts — content for the /recruiter fast-path page and the
 * homepage Recruiter summary. Optimized to be read in under 60 seconds.
 */

export const recruiter = {
  heading: "For hiring managers who want the highlights",
  sub: "Everything that matters in under 60 seconds.",

  location: "Naples, FL · Remote",
  availability: "Open to senior IC, architect/lead, or consulting engagements",

  targetRoles: [
    "Forward Deployed Engineer",
    "Founding Applied AI Engineer",
    "AI Agent Engineer",
    "Senior AI Engineer",
    "AI Systems Architect",
    "Revenue Operations & Systems Leader",
    "Marketing Automation Leader",
    "Customer Journey Infrastructure Owner",
    "Lifecycle Marketing & Automation Executive",
  ],

  // Field-note video — sits between Target Roles and the flagship card.
  fieldNote: {
    eyebrow: "Field Note Nº 01 · Game Theory",
    title: "Is your architecture Battle Tested?",
    lead: "Before AI agents can be trusted, someone has to watch them. Most companies are racing to deploy AI — far fewer are asking the harder question: who audits the robots?",
    pointsLead: "The opening paper in my production-AI research:",
    points: [
      "Why the most dangerous AI failures aren't crashes — they quietly pass health checks while drifting from the outcomes they were designed to produce",
      "Adversarial testing, independent verification, and continuous observability — applied, not theoretical",
      "Reward engineering that encourages truth instead of good-looking metrics",
      "The same principles I use designing production AI systems for enterprise organizations",
    ],
    close:
      "If you're hiring someone to build AI that can be trusted in production — not just impressive demos — start here. The 100-second field note below shows how I pressure-test AI systems before they ship.",
    paper: {
      label: "Read the paper — No One Was Watching (PDF)",
      href: "/no-one-was-watching.pdf",
      filename: "No One Was Watching — Matt Martelli.pdf",
    },
    videoTitle: "The Battle for Your Company's Profitability — Field Notes Nº 01, Game Theory",
    youtubeId: "X5q5sgkwMP4",
  },

  // Living Flow — interactive landscape between governance (Field Note) and multi-agent flagship.
  livingFlow: {
    eyebrow: "Living Flow",
    title: "How trusted agents actually move work",
    lead:
      "Governance decides what should never happen. Architecture decides who does what. Living Flow is the bridge — an interactive map of how AI and human handoffs move through a real operating system, not a slide deck.",
    iframeTitle: "Living Flow landscape — interactive multi-agent workflow",
    src: "/Living Flow Landscape - Standalone (5).html",
    openLabel: "Open full screen",
  },

  fiveLayer: {
    eyebrow: "Methodology",
    title: "The Five-Layer Enterprise AI Framework",
    lead:
      "How I sequence an enterprise AI engagement. Each layer bears load for every layer that follows it \u2014 skipping one does not save time, it relocates the cost to a more expensive point later. Notice what is missing from the top of the list: technology.",
    openLabel: "Open full screen",
    articleLabel: "Read the article on LinkedIn",
    articleUrl:
      "https://www.linkedin.com/pulse/enterprise-ai-starts-business-model-matt-martelli-orkfe",
    src: "/five-layer-framework.html",
    iframeTitle: "The Five-Layer Enterprise AI Framework \u2014 interactive",
    layers: [
      {
        n: 1,
        name: "Business Outcome",
        question: "What business problem are we trying to solve?",
        rung: "Emerging",
        why: "Before discussing AI, understand how the organization creates value, where value is leaking, what frustrates customers, what slows employees down, how leadership defines success, and what happens if nothing changes. Without those answers it is impossible to know whether AI is even the right solution.",
        pull: "The best AI strategy doesn\u2019t begin with AI. It begins with the business.",
        subs: [
          { label: "Value flow", detail: "How work actually moves through the organization \u2014 the real path, not the org chart. Surfaces manual handoffs, rework loops, and informal workarounds." },
          { label: "Customer friction", detail: "Where customers experience the most friction. Anchors the conversation in outcome rather than internal convenience." },
          { label: "Expertise concentration", detail: "Which decisions require your most experienced people. Finds knowledge living inside a handful of heads \u2014 the biggest opportunity and the biggest organizational risk." },
          { label: "Time loss", detail: "Where teams lose the most time. Finds repetitive work consuming highly skilled employees." },
          { label: "The forcing question", detail: "If you could solve only one problem this year, what would create the biggest business impact? Everything before produces a list; this produces a priority." },
        ],
        fails: "The problem is stated in technology terms. \u201cWe need an agent\u201d is not a business outcome.",
        principle: "Business Before Technology",
      },
      {
        n: 2,
        name: "Governance",
        question: "What constraints, and who owns the decisions?",
        rung: "Seed",
        why: "Governance decisions are architectural constraints. What data may be used, what requires a human, what must be explainable, what must be logged \u2014 these determine the design. Discovering them after the architecture exists means rebuilding it.",
        pull: "Governance isn\u2019t bureaucracy. It\u2019s what allows organizations to deploy AI with confidence instead of hesitation.",
        subs: [
          { label: "Decision rights", detail: "Who approves, who halts, who is accountable. Halt authority is broad and never vetoable \u2014 an unnecessary halt is cheap, a delayed one is not." },
          { label: "Risk tiering", detail: "Governance intensity scales with consequence. Uniform rigor produces either over-governance or quiet non-compliance." },
          { label: "Human oversight", detail: "Where human judgment belongs, architecturally. Badly designed oversight is worse than none \u2014 it produces documented assurance and zero control." },
          { label: "Controls", detail: "Mapped to risk category, layer, and tier. An untested control has unknown effectiveness, which should be treated as zero." },
          { label: "Standards", detail: "NIST AI RMF \u00b7 ISO/IEC 42001 \u00b7 EU AI Act \u00b7 OWASP LLM Top 10 \u00b7 SR 11-7. Complementary, not substitutable." },
        ],
        fails: "Run as a launch gate rather than a design input. Run last, governance can only say no.",
        principle: "Governance Before Automation",
      },
      {
        n: 3,
        name: "Architecture",
        question: "What structure supports the business within the constraints?",
        rung: "Seed",
        tech: true,
        why: "Only now does technology enter. When the business problem is understood and the constraints are known, technology choices become implementation decisions instead of philosophical debates \u2014 the framework-versus-framework argument evaporates once everyone agrees what the system is for.",
        pull: "The architecture should support the business \u2014 not dictate it. Technology lives inside the framework. It doesn\u2019t define the framework.",
        subs: [
          { label: "Models \u00b7 Frameworks", detail: "Selected against known constraints, behind an abstraction layer. The model can change underneath you." },
          { label: "Knowledge bases \u00b7 Retrieval", detail: "In a RAG system, retrieval quality determines system quality. Most reported generation failures are retrieval failures." },
          { label: "Integrations \u00b7 Orchestration", detail: "Systems fail at the seams \u2014 context assembly, tool invocation, handoffs \u2014 not at the model." },
          { label: "Pattern escalation", detail: "Assisted generation \u2192 RAG \u2192 tool-using agent \u2192 multi-agent. Each step raises capability and governance burden together. Choose the least capable pattern that solves the problem." },
          { label: "Cross-cutting decisions", detail: "Decision logging, evaluation hooks, trace propagation, output validation, tool permissions, cost attribution. Cheap now, impossible later." },
        ],
        fails: "Chosen before Layers 1 and 2 are settled \u2014 then it is a technology preference wearing an architecture diagram.",
        principle: "Technology-Agnostic Architecture",
      },
      {
        n: 4,
        name: "Operations",
        question: "Can leadership trust this system six months from now?",
        rung: "Seed",
        why: "An AI system can be fully available, fast, error-free, and completely wrong \u2014 and nothing in a conventional monitoring stack notices. Evaluation, security, and observability are not separate stages. They are the disciplines that make this layer possible.",
        pull: "Deployment isn\u2019t the finish line. It\u2019s the starting line. Without operational visibility, an AI system doesn\u2019t become an enterprise capability \u2014 it becomes an experiment.",
        subs: [
          { label: "Observability", detail: "Infrastructure, behavioral, decision trace, cost. The behavioral layer is what distinguishes AI observability, and it must be designed in." },
          { label: "Evaluation", detail: "Component, system, behavioral, adversarial, disaggregated \u2014 evaluated separately, because combined evaluation tells you it broke, not where." },
          { label: "Security", detail: "The threat model in operation. Model output treated as untrusted input; tool permissions least-privilege." },
          { label: "Incident response", detail: "Detect, halt, bound, investigate, remediate, notify, learn." },
          { label: "Ownership", detail: "A named system owner accountable through the full lifecycle \u2014 the role most commonly missing after launch." },
        ],
        fails: "Treated as post-launch overhead. Observability in particular is architectural and cannot be retrofitted.",
        principle: "Trust Before Scale",
      },
      {
        n: 5,
        name: "Continuous Improvement",
        question: "How does this evolve without getting worse?",
        rung: "Seed",
        why: "Enterprise AI is never finished. Businesses evolve, customers evolve, regulations evolve. The mechanisms that let a system evolve with them are built in from the beginning \u2014 not added after something goes wrong.",
        pull: "The organizations that succeed with AI won\u2019t necessarily build the smartest systems first. They\u2019ll build the systems that improve continuously.",
        subs: [
          { label: "Evaluation", detail: "Continuous, not point-in-time. Catches quality drift and regression against a maintained baseline." },
          { label: "Governance reviews", detail: "Re-assessment on a defined cadence. Catches a changed risk profile or changed regulation." },
          { label: "User feedback", detail: "Routed to someone who can act. Catches what the metrics do not show." },
          { label: "Red teaming", detail: "Recurring, not a pre-launch exercise. Catches new attack surface as the system changes." },
          { label: "Optimization", detail: "Cost and latency drift, measured against unit economics modeled at production volume." },
        ],
        fails: "There is no regression baseline, so improvement and degradation are indistinguishable.",
        principle: "Continuous Improvement",
      },
    ],
  },

  flagship: {
    title: "A Multi-Agent Company, Cast as Seinfeld",
    lead: "The real operating system that runs my own company — and the clearest proof of how I make complex AI legible.",
    pointsLead: "The casting is the innovation:",
    points: [
      "Every specialized agent — planner, router, specialists, critic, memory — is a Seinfeld character with a defined job",
      "A familiar ensemble makes abstract architecture instantly legible: who does what, and why",
      "Reads for engineers and executives alike — a cast of characters, not boxes labeled “Agent 1”",
      "The cast runs real workflows end to end: lead capture, qualification, follow-up, QA, human handoffs",
    ],
    caseStudy: { label: "Read the Case Study", href: "/seinfeld-hq" },
    demo: { label: "Launch Interactive Demo", href: "https://growthmindset.ai/seinfeld-hq/" },
  },

  // Interactive, full-screen playbook (its own route at /playbook).
  playbook: {
    eyebrow: "Interactive",
    title: "The Strategic Alignment Playbook",
    description:
      "A live, two-pane walkthrough of my production systems. Pick any project on the left and its live demo or full case study loads in the panel beside it — the Zapier-to-n8n migration, the real-time operations dashboard, voice AI agents, the multi-agent operating system, and customer-journey automation, all in one interactive view.",
    cta: { label: "Launch the Interactive Playbook", href: "/playbook" },
  },

  // Vertical 9:16 explainers — sit under the Playbook card on /recruiter.
  explainerVideos: {
    eyebrow: "Explainer Videos",
    body:
      "High-level 30–60 second animations that give C-level leaders and teams the 30,000-foot view instantly. No deep dive required. Complex systems become clear in under a minute — so decision-makers and the rest of the organization grasp the concept before the detailed charts ever reach IT.",
    items: [
      {
        kind: "video" as const,
        src: "/explainers/tiger-team.mp4",
        label: "Tiger Team",
      },
      {
        kind: "video" as const,
        src: "/explainers/missed-call.mp4",
        label: "Missed Call",
      },
      {
        kind: "html" as const,
        src: "/explainers/one-way-interview.html",
        label: "One-Way Interview",
        hasOwnFrame: true,
      },
      {
        kind: "html" as const,
        src: "/explainers/lead-nurture.html",
        label: "Lead Nurture",
        hasOwnFrame: true,
      },
      {
        kind: "html" as const,
        src: "/explainers/voice-ai-flywheel.html",
        label: "Voice AI Flywheel",
        hasOwnFrame: true,
      },
    ],
  },

  // Prose version — still used by the homepage RecruiterSummary section.
  executiveSummary:
    "AI Automation Architect and Marketing Automation Architect — 25 years in marketing, the last 15+ building AI and automation systems at the intersection of technology, operations, and customer experience. I design and build production AI systems — voice agents, multi-agent workflows, CRM and lifecycle automation — that connect data, automation, and human teams to deliver measurable business outcomes. I'm framework-agnostic by design: the system and the result come first, the tooling follows.",
  // Structured version — the recruiter fast-path page renders lead + bullets.
  executiveSummaryLead:
    "AI Automation Architect and Marketing Automation Architect — 25 years in marketing, the last 15+ building AI and automation systems at the intersection of technology, operations, and customer experience.",
  executiveSummaryPointsLead: "What I design and build:",
  executiveSummaryPoints: [
    "Production voice agents",
    "Multi-agent workflows",
    "CRM and lifecycle automation",
  ],
  executiveSummaryClose:
    "Systems that connect data, automation, and human teams to deliver measurable business outcomes. Framework-agnostic by design: the system and the result come first, the tooling follows.",

  resume: {
    label: "Download Résumé (PDF)",
    href: "/matt_martelli_resume.pdf",
    filename: "matt_martelli_resume.pdf",
  },

  experience: [
    {
      company: "growthmindset.ai",
      role: "Founder & AI Systems Architect",
      dates: "2023–Present",
      note: "Production voice AI, multi-agent operating systems, and revenue automation — designed, built, and shipped as the growthmindset.ai platform.",
    },
    {
      company: "Home Genius Exteriors",
      role: "AI Integration Strategist",
      dates: "2025–2026",
      note: "Enterprise AI and automation across recruiting, sales, customer experience, and operations — production voice agents, multi-agent workflows, and a zero-downtime Zapier-to-n8n migration.",
    },
    {
      company: "Expo Home Improvement",
      role: "Marketing Automation Specialist | Business Analyst",
      dates: "2020–2025",
      note: "Lifecycle, CRM, and speed-to-lead automation on HubSpot + Salesforce.",
    },
    {
      company: "Flywheel360",
      role: "Co-Founder & Chief Marketing Officer",
      dates: "2010–2020",
      note: "MarTech and automation strategy for clients up to Fortune 400/500.",
    },
    {
      company: "Cambium Learning Group",
      role: "Email Marketing Manager | Senior Copywriter",
      dates: "2007–2010",
      note: "Personalization pilot that drove $3.1M in six months.",
    },
  ],

  accomplishments: [
    "Generate $750K/month in attributed pipeline through AI-driven initiatives and campaigns.",
    "Drove $3.1M in new revenue within six months with a personalization pilot at Cambium Learning Group.",
    "Saved $90K+/year by re-architecting enterprise automation from Zapier to self-hosted n8n — with zero downtime.",
    "Led CRM and lifecycle transformations across databases of 500,000+ records, with TCPA/CAN-SPAM governance.",
    "Advised Fortune 400/500 organizations on automation architecture; co-founder and one of the First 100 HubSpot Partners.",
    "Designed and deployed production AI voice agents and multi-agent systems (Claude, OpenClaw, CrewAI) that run real workflows 24/7.",
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

  // Quantified impact for the recruiter right-rail "By the numbers" card.
  byNumbers: [
    { value: "25 yrs", label: "Marketing — last 15 in marketing automation" },
    { value: "$90K+/yr", label: "Saved via a zero-downtime Zapier-to-n8n migration" },
    { value: "$750K+/mo", label: "Attributed pipeline from lifecycle automation" },
    { value: "500K+", label: "CRM records architected and kept compliant" },
  ],

  // Condensed featured projects (full versions live in projects.ts).
  featured: [
    {
      title: "Multi-Agent Command Center",
      line: "The system that runs my own company — every agent cast as a Seinfeld character so a complex orchestration reads like an ensemble, not a wiring diagram.",
      points: [
        "Each agent is a named Seinfeld character with one clear job",
        "Planner, router, specialists, critic, and memory, coordinated as a cast",
        "Runs real workflows end to end — humans in the loop where judgment matters",
      ],
      result:
        "Proof a multi-agent system can run real workflows end to end — and stay legible to everyone.",
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
      result: "25 years of marketing-ops depth, applied as a system.",
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

  testimonial: {
    quote:
      "Matt is a visionary, yet has his eye on the present. His ideas and creativity are at the pinnacle of his field. I often ask Matt his opinions in business needs outside of his scope, knowing that he will produce an option I would never think of.",
    name: "Kelly Clark",
    title: "Sr. Business Development Manager, ACS Group",
  },

  // Homepage vouching block. Quotes are verbatim-sentence excerpts from public
  // LinkedIn recommendations (full harvest: docs/linkedin-recommendations.md);
  // excerpt with "…" only — never paraphrase inside quotation marks.
  recommendations: {
    heading: "On the record",
    sub: "From LinkedIn recommendations — verbatim, and verifiable on the profile.",
    linkLabel: "Read all of them on LinkedIn",
    linkHref: "https://www.linkedin.com/in/mattmartelli/details/recommendations/",
    quotes: [
      {
        quote:
          "He didn't just manage systems; he optimized them, always finding ways to improve scalability and productivity. … Any company would be incredibly fortunate to have Matt on their team. He is a true asset, a problem-solver, and a leader who brings both vision and execution to every project he touches.",
        name: "Christopher Seibert",
        title: "VP of Growth",
        context: "Managed Matt directly · March 2025",
      },
      {
        quote:
          "My recommendation of Matt is unequivocal. … The clearest statement I could give is that I would hire him immediately if I had a need for a consummate marketing professional.",
        name: "John Campbell",
        title: "Board Member, Cambium Learning Group",
        context: "Senior leadership at Voyager · March 2010",
      },
    ],
  },

  thoughtLeadership: {
    line: "I also publish The 60-Second AI Brief on YouTube and co-host The Matt & Maya Show — linked in the site footer, not part of the hiring evaluation.",
    youtube: { label: "The 60-Second AI Brief", href: "https://www.youtube.com/@matt_martelli" },
    podcast: { label: "The Matt & Maya Show", href: "https://mattandmayashow.com" },
  },

  closingCta: {
    heading: "Tell me about the role",
    sub: "Email or a text reaches me fastest — give me the business problem and I'll tell you how I'd architect the system that solves it.",
    label: "Email Matt",
  },

  links: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/mattmartelli/" },
    youtube: { label: "YouTube", href: "https://www.youtube.com/@matt_martelli" },
    email: { label: "Email", href: "mailto:mattmartelli@mac.com" },
    website: { label: "Website", href: "https://growthmindset.ai" },
  },
} as const;
