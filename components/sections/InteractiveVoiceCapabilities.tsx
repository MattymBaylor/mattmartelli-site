"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface Zone {
  id: string;
  label: string;
  position: { x: number; y: number; width: number; height: number };
  title: string;
  description: string;
  icon: string;
}

const zones: Zone[] = [
  {
    id: "intake",
    label: "Intake",
    position: { x: 10, y: 35, width: 16, height: 30 },
    title: "Call Intake",
    description:
      "The voice agent answers instantly, introduces itself, captures the caller's intent and key details in real time—no voicemail, no missed opportunity.",
    icon: "📞",
  },
  {
    id: "qualify",
    label: "Qualify",
    position: { x: 28, y: 35, width: 16, height: 30 },
    title: "Lead Qualification",
    description:
      "Asks discovery questions, scores the opportunity against your criteria, and determines fit—all while the caller is on the line.",
    icon: "✓",
  },
  {
    id: "schedule",
    label: "Schedule",
    position: { x: 46, y: 35, width: 16, height: 30 },
    title: "Appointment Booking",
    description:
      "Checks live calendar availability and books the appointment directly—no back-and-forth emails, no scheduling tools.",
    icon: "📅",
  },
  {
    id: "handoff",
    label: "Handoff",
    position: { x: 64, y: 35, width: 16, height: 30 },
    title: "Warm Transfer",
    description:
      "Briefs your team with everything captured—who the caller is, what they need, and when they're booked. Human takes it from there.",
    icon: "🤝",
  },
  {
    id: "followup",
    label: "Follow-Up",
    position: { x: 82, y: 35, width: 16, height: 30 },
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
            {/* SVG Interactive Grid */}
            <div className="relative mb-8 rounded-xl border border-line bg-surface/50 p-6">
              <svg
                viewBox="0 0 100 100"
                className="w-full"
                style={{ minHeight: "200px" }}
              >
                {/* Flow arrows */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="rgb(100, 116, 139)" />
                  </marker>
                </defs>

                {/* Background connecting line */}
                <line
                  x1="18"
                  y1="50"
                  x2="90"
                  y2="50"
                  stroke="rgb(100, 116, 139)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.3"
                />

                {/* Zone rectangles - clickable areas */}
                {zones.map((zone) => (
                  <g key={zone.id}>
                    {/* Main zone box */}
                    <rect
                      x={zone.position.x}
                      y={zone.position.y}
                      width={zone.position.width}
                      height={zone.position.height}
                      fill={
                        activeZone === zone.id
                          ? "rgb(34, 197, 94)"
                          : "rgb(51, 65, 85)"
                      }
                      stroke={
                        activeZone === zone.id
                          ? "rgb(74, 222, 128)"
                          : "rgb(100, 116, 139)"
                      }
                      strokeWidth="1.5"
                      rx="2"
                      className="cursor-pointer transition-all"
                      onClick={() =>
                        setActiveZone(
                          activeZone === zone.id ? null : zone.id
                        )
                      }
                      style={{
                        filter:
                          activeZone === zone.id
                            ? "drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))"
                            : "none",
                      }}
                    />
                    {/* Label text */}
                    <text
                      x={zone.position.x + zone.position.width / 2}
                      y={zone.position.y + zone.position.height / 2 + 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={activeZone === zone.id ? "white" : "rgb(148, 163, 184)"}
                      fontSize="6"
                      fontWeight={activeZone === zone.id ? "700" : "500"}
                      className="pointer-events-none"
                    >
                      {zone.label}
                    </text>
                  </g>
                ))}

                {/* Icons above zones */}
                {zones.map((zone) => (
                  <text
                    key={`icon-${zone.id}`}
                    x={zone.position.x + zone.position.width / 2}
                    y={zone.position.y - 4}
                    textAnchor="middle"
                    fontSize="8"
                    className="pointer-events-none"
                  >
                    {zone.icon}
                  </text>
                ))}
              </svg>
            </div>

            {/* Details panel */}
            {active ? (
              <div className="rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 p-6 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{active.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-accent-cyan">
                      {active.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
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
      </div>
    </section>
  );
}
