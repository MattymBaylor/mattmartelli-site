"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { site } from "@/content/site";
import { diagrams } from "@/content/diagrams";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Lazy-load React Flow so it stays out of the first-paint bundle.
const SystemDiagram = dynamic(
  () => import("@/components/flow/SystemDiagram").then((m) => m.SystemDiagram),
  {
    ssr: false,
    loading: () => (
      <div className="surface-card grid h-[420px] place-items-center text-sm text-ink-faint">
        Loading interactive diagram…
      </div>
    ),
  }
);

export function ProofOfWork() {
  const { proofOfWork } = site;
  const [activeId, setActiveId] = useState(diagrams[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const active = diagrams.find((d) => d.id === activeId) ?? diagrams[0];

  const onTabsKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = diagrams.length - 1;
    let next = index;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActiveId(diagrams[next].id);
    const buttons = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[data-tab]");
    buttons?.[next]?.focus();
  };

  return (
    <section id="proof-of-work" className="section border-t border-line/60 bg-surface/30">
      <div className="container-x">
        <SectionHeading
          eyebrow="Interactive Proof of Work"
          title={proofOfWork.heading}
          sub={proofOfWork.sub}
        />

        <Reveal delay={0.06}>
          {/* Segmented control / tablist */}
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Choose a system to explore"
            className="mt-9 inline-flex max-w-full flex-wrap gap-1 rounded-lg border border-line bg-surface-elevated/60 p-1"
          >
            {diagrams.map((d, i) => {
              const selected = d.id === activeId;
              return (
                <button
                  key={d.id}
                  data-tab
                  role="tab"
                  id={`tab-${d.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${d.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(d.id)}
                  onKeyDown={(e) => onTabsKeyDown(e, i)}
                  className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-accent-gradient text-night shadow-glow"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {d.tab}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-6"
        >
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-ink-muted">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-cyan/80">
              {active.title}
            </span>
            <br />
            {active.summary}
          </p>

          <SystemDiagram diagram={active} />

          <p className="mt-5 text-xs text-ink-faint">{proofOfWork.hint}</p>
        </div>
      </div>
    </section>
  );
}
