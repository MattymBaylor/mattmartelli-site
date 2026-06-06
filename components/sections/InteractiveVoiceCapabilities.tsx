"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StatCallout } from "@/components/ui/StatCallout";
import { site } from "@/content/site";

interface Zone {
  id: string;
  label: string;
  index: number;
  title: string;
  description: string;
  icon: string;
}

const zones: Zone[] = [
  {
    id: "intake",
    label: "Intake",
    index: 0,
    title: "Call Intake",
    description:
      "The voice agent answers instantly, introduces itself, captures the caller's intent and key details in real time—no voicemail, no missed opportunity.",
    icon: "📞",
  },
  {
    id: "qualify",
    label: "Qualify",
    index: 1,
    title: "Lead Qualification",
    description:
      "Asks discovery questions, scores the opportunity against your criteria, and determines fit—all while the caller is on the line.",
    icon: "✓",
  },
  {
    id: "schedule",
    label: "Schedule",
    index: 2,
    title: "Appointment Booking",
    description:
      "Checks live calendar availability and books the appointment directly—no back-and-forth emails, no scheduling tools.",
    icon: "📅",
  },
  {
    id: "handoff",
    label: "Handoff",
    index: 3,
    title: "Warm Transfer",
    description:
      "Briefs your team with everything captured—who the caller is, what they need, and when they're booked. Human takes it from there.",
    icon: "🤝",
  },
  {
    id: "followup",
    label: "Follow-Up",
    index: 4,
    title: "Automated Follow-Up",
    description:
      "Sends SMS confirmation, reminder, and follow-up sequences automatically. No step gets missed, no lead goes cold.",
    icon: "📬",
  },
];

export function InteractiveVoiceCapabilities() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const active = zones.find((z) => z.id === activeZone);

  return (
    <section id="voice-capabilities" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Interactive diagram"
          title="How It Works"
          sub="Click each stage to see what the voice agent handles at every step."
        />

        <Reveal delay={0.08}>
          <div className="mt-12">
            {/* Grid of clickable stage cards */}
            <div className="grid gap-3 lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 mb-8">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() =>
                    setActiveZone(activeZone === zone.id ? null : zone.id)
                  }
                  className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer group ${ activeZone === zone.id
                    ? "border-accent-cyan bg-accent-cyan/10 shadow-glow"
                    : "border-line bg-surface/50 hover:border-accent-cyan/50 hover:bg-surface/70"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">{zone.icon}</span>
                    <span className={`text-xs font-medium tracking-wider uppercase ${ activeZone === zone.id
                      ? "text-accent-cyan"
                      : "text-ink-muted group-hover:text-accent-cyan"
                    }`}>
                      {zone.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Connecting flow line (visual only) */}
            <div className="relative mb-8 h-1 bg-gradient-to-r from-transparent via-line/40 to-transparent rounded-full" />

            {/* Details panel */}
            {active ? (
              <div className="rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 p-6 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{active.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-accent-cyan">
                      {active.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {active.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-line bg-surface/30 p-6 text-center text-ink-faint">
                <p className="text-sm">
                  Click a stage above to see what happens at each step of the
                  voice agent workflow.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <StatCallout value="~80%" kind="industry" footnote={site.footnotes[2]}>
            of callers who reach voicemail hang up without leaving a message.
          </StatCallout>
        </Reveal>
      </div>
    </section>
  );
}
