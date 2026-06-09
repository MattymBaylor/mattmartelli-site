export type PageConfig = {
  slug: string;
  clientName: string;
  recipientHonorific: "MR." | "MS." | "MX." | "DR." | "";
  recipientFirstName: string;
  recipientLastName: string;
  caseNumber: string;
  caseDate: string;
  tagline: string;
  logoUrl: string;
  sealEmblemUrl: string;
  primaryColor: string;
  youtubeId: string;
  deck: { dir: string; count: number; label: string };
  audioUrl: string;
  audioLabel?: string;
  audioCaption?: string;
  audioDuration?: string;
  bookingUrl?: string;
  headline: string;
  subheadline: string;
  painPoint: string;
  creativeIssue: string;
  objective: string;
  deliverables: string;
  background?: string;
  target?: string;
  tone?: string;
  timing?: string;
  insightQuote: string;
  insightAttribution?: string;
  exhibitNarrative?: string;
  audioCaptionEyebrow?: string;
  cdHoverPreview?: string;
  infographics?: Array<{
    url: string;
    label?: string;          // small caption shown under the thumbnail
    hoverPreview?: string;   // tooltip text on hover
    headerLabel?: string;    // modal header eyebrow
    caption?: string;        // case officer's note inside the modal
  }>;
  solutionLetterBody: string;
};

export const PAGES: Record<string, PageConfig> = {
  "matt-martelli": {
    slug: "matt-martelli",
    clientName: "MARTELLI, MATTHEW",
    recipientHonorific: "",
    recipientFirstName: "Matt",
    recipientLastName: "",
    caseNumber: "MM/2026/001",
    caseDate: "06.06.2026",
    tagline: "AI SYSTEMS ARCHITECT",
    logoUrl: "/brand/matt-mm-monogram-symbol-transparent.svg",
    sealEmblemUrl: "/brand/gms-emblem.svg",
    primaryColor: "#B07D2D",
    youtubeId: "6rEDK6LX_AA",
    deck: { dir: "claudeclaw", count: 15, label: "15 EXHIBITS" },
    audioUrl: "/blueprints/claudeclaw-overview.m4a",
    audioLabel: "CLAUDECLAW · INTERVIEW · 8:24",
    audioCaption:
      "Audio walkthrough of the lifecycle architecture, narrated end-to-end. Same case, third angle — for readers who absorb by listening rather than by spread.",
    audioDuration: "8:24",
    bookingUrl: "#book",
    headline: "AI-powered marketing automation for coaching brands.",
    subheadline:
      "A 60-second walkthrough of how agent-based workflows plug into your current funnel without ripping out what already works.",
    painPoint: "Manual, brittle customer journeys across CRM and email.",
    creativeIssue:
      "Design an AI-driven system that scales qualified revenue without linear headcount.",
    objective:
      "Give a clear, recruiter-friendly view of the workflow, guardrails, and rollout plan.",
    deliverables: "60-second explainer, agent blueprint, rollout plan.",
    background:
      "Founder-led coaching brand. Existing CRM/email stack stitched together over five years. New revenue targets demand a step-change without a five-figure headcount add.",
    target: "RevOps and growth leaders evaluating AI augmentation vs. replacement.",
    tone: "Confident, methodical, low on hype. Speaks to engineers and operators equally.",
    timing: "20-minute walkthrough; 90-day rollout.",
    insightQuote: "agents handle the chase, humans close the qualified.",
    insightAttribution: "field notes · 06.06.2026",
    solutionLetterBody:
      "You've read the file. The pain you described — manual journeys, brittle CRM — maps to a system I've already shipped. Twenty minutes will show you the rollout.\n\nThe case closes when we talk.",
  },
  "seth-hood": {
    slug: "seth-hood",
    clientName: "HOOD, SETH",
    recipientHonorific: "MR.",
    recipientFirstName: "Seth",
    recipientLastName: "HOOD",
    caseNumber: "ENT/2026/001",
    caseDate: "06.07.2026",
    tagline: "AI SYSTEMS ARCHITECT",
    logoUrl: "/brand/matt-mm-monogram-symbol-transparent.svg",
    sealEmblemUrl: "/brand/gms-emblem.svg",
    primaryColor: "#B07D2D",
    youtubeId: "rp9W6qtjPyc",
    deck: { dir: "seth-hood", count: 1, label: "1 EXHIBIT — ARCHITECTURE BLUEPRINT" },
    audioUrl: "/blueprints/audio/customer-journey-explained.mp3",
    audioLabel: "CUSTOMER JOURNEY · INTERVIEW · 19:14",
    audioCaption:
      "Discover how an AI-driven Concierge Engine transforms the sales journey for high-ticket buyers evaluating $15k to $50k investments.",
    audioCaptionEyebrow: "Explained in easy-to-understand terms",
    cdHoverPreview: "Click here to listen in →",
    audioDuration: "19:14",
    bookingUrl:
      "https://mail.google.com/mail/?view=cm&fs=1&to=matt@growthmindset.ai&su=Re%3A%20Marketing%20Automation%20Opportunity%20%E2%80%94%2020-Min%20Walkthrough&body=Hi%20Matt%2C%0A%0AI%20reviewed%20your%20case%20file.%20Let%27s%20set%20up%20the%2020-minute%20walkthrough.%0A%0ABest%2C%0ASeth",
    headline:
      "Own the marketing automation ecosystem, customer journey infrastructure, and platform evolution — as one system, not three roadmaps.",
    subheadline:
      "A 60-second walkthrough of how I'd take a founder-led coaching brand from a stitched-together stack to an agent-grafted system that scales qualified revenue without linear headcount.",
    painPoint:
      "Founder-led growth stalling on a stitched-together CRM, email, and content stack. Marketing automation is an ecosystem on paper, a graveyard of half-finished workflows in practice. No one owns the connective tissue.",
    creativeIssue:
      "Design the marketing-automation, customer-journey, and platform-evolution layers as one coherent system — not three vendor-spaced roadmaps fighting for the founder's attention.",
    objective:
      "Give Seth a tight, recruiter-friendly view of the architecture, the rollout, and the operator behind it — enough to route confidently to the client.",
    deliverables:
      "60-second explainer, agent blueprint, 90-day rollout plan with measurable gates at days 30 / 60 / 90.",
    background:
      "Founder-led coaching brand. Existing CRM, email, and content stack assembled over years by smart people with different priorities. Growth targets now demand a step-change without a five-figure headcount add. The job is to inherit the mess and turn it into infrastructure.",
    target:
      "The founder, the ops lead, and the recruiter routing the search. Different audiences, same need: confidence the operator can hold the systems, the growth math, and the team alignment at the same time.",
    tone:
      "Confident, methodical, low on hype. Engineers trust it because it shows the architecture. Founders trust it because it speaks to revenue. Recruiters trust it because the pitch matches the JD.",
    timing:
      "20-minute walkthrough this week. 90-day rollout. First measurable result inside 30 days.",
    insightQuote: "agents handle the chase, humans close the qualified.",
    insightAttribution: "field notes · 06.07.2026",
    exhibitNarrative:
      "The Scalable Revenue Architecture Blueprint. One page, three phases. Phase 1 (months 1-3) is foundation work — instrument the CRM, kill the manual bottleneck, ship the data dictionary. Phase 2 (4-6) grafts the agent layer onto the funnel: nurture sequences, scoring, AI-routed handoff to sales. Phase 3 (7+) is the optimization loop — adoption tracking, renewal motion, expansion playbooks. The dashboard inset is where the founder and the ops lead see the same numbers. The end state is the box on the right: predictable revenue, not founder-led grind.",
    infographics: [
      {
        url: "/blueprints/founders-growth-architecture.jpg",
        label: "Founder's Growth Architecture",
        headerLabel: "Schema · Architecture Overview",
        hoverPreview: "Click to blow up the full architecture →",
        caption:
          "The Founder's Growth Architecture — one frame, the whole engine. 7-stage lifecycle across the top, persona portfolio + automation catalog in the middle, and a Data Governance & Dashboard Control Center across the bottom. This is what a founder-led coaching brand looks like when the marketing-automation ecosystem, customer-journey infrastructure, and governance layer are designed as one system instead of three.",
      },
      // Add more entries here when you want a 2nd/3rd infographic — each becomes its own clickable thumbnail.
    ],
    solutionLetterBody:
      "Seth,\n\nYou described a founder-led coaching brand looking for a leader to own marketing automation, customer journey infrastructure, and the platform that holds them together. That's the job I've been building toward.\n\nThe last year of my work has been agent-grafted systems that sit between the CRM and the customer — not replacing the stack, repairing it. The exhibit in this file is the architecture I'd bring in. The 60-second case film is the version your founder can watch over coffee.\n\nTwenty minutes will tell you whether the fit is real. The case closes when we talk.",
  },
};
