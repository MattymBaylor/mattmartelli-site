"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X, Check, Maximize2, AudioWaveform } from "lucide-react";
import {
  blueprints,
  flowFilters,
  flowLabels,
  type Blueprint,
  type FlowTag,
} from "@/content/blueprints";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Card visual — feature tiles split horizontally on desktop; halves stack. */
function BlueprintCard({
  b,
  onOpen,
}: {
  b: Blueprint;
  onOpen: (trigger: HTMLButtonElement) => void;
}) {
  const feature = b.size === "feature";
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => onOpen(e.currentTarget)}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface-elevated/70 text-left transition-all hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-glow ${
        feature ? "md:flex-row" : ""
      }`}
    >
      <div className={`relative ${feature ? "md:w-1/2" : ""}`}>
        <div className="aspect-[16/9] w-full overflow-hidden border-b border-line md:border-b-0">
          <Image
            src={b.image.src}
            alt={b.image.alt}
            width={b.image.width}
            height={b.image.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/80 to-transparent"
          aria-hidden
        />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-line-strong bg-night/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
          {b.scaleTag.split("·")[0].trim()}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md border border-line-strong bg-night/70 px-2 py-1 font-mono text-[10px] text-ink opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Maximize2 size={11} aria-hidden /> Open
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          className={`font-display font-semibold text-ink ${
            feature ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {b.headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.sub}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {b.flows.slice(0, 3).map((f) => (
            <span
              key={f}
              className="rounded-md border border-line/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint"
            >
              {flowLabels[f]}
            </span>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-accent-cyan">
          Open the blueprint
          <ChevronRight
            size={13}
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </button>
  );
}

/** Audio card — full width, an alternative way to consume the same material. */
function AudioCard() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface-elevated/70 p-5 sm:flex-row sm:items-center sm:p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent-cyan bg-accent-cyan/12 text-accent-cyan">
        <AudioWaveform size={20} aria-hidden />
      </span>
      <div className="flex-1">
        <p className="eyebrow mb-1.5">For the people who&apos;d rather listen</p>
        <p className="font-display text-base font-semibold text-ink sm:text-lg">
          The whole system, in plain English — the full walkthrough (~20 min)
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          Same architecture, no jargon. The way I walk a client through it when the
          diagram isn&apos;t the language they think in.
        </p>
      </div>
      <audio controls preload="none" className="w-full sm:w-[300px]">
        <source src="/blueprints/claudeclaw-overview.m4a" type="audio/mp4" />
        Your browser doesn&apos;t support the audio element.
      </audio>
    </div>
  );
}

export function AiBlueprints() {
  const [activeFlow, setActiveFlow] = useState<FlowTag | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const active = blueprints.find((b) => b.id === activeId) ?? null;

  const visible = blueprints.filter(
    (b) => activeFlow === "all" || b.flows.includes(activeFlow)
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveId(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lastTrigger.current?.focus();
    };
  }, [active]);

  const liveText =
    activeFlow === "all"
      ? `Showing all ${visible.length} blueprints`
      : `Showing ${visible.length} blueprint${
          visible.length === 1 ? "" : "s"
        } with ${flowLabels[activeFlow].toLowerCase()}`;

  return (
    <section id="ai-blueprints" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Architecture, not screenshots"
          title="AI Blueprints"
          sub="The same system, designed for three very different businesses. Every one was planned top-down — the business outcome first, the tools last."
        />

        <Reveal>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-faint">
            <span className="text-ink">
              The framework is never the product. The system is.
            </span>{" "}
            These are the blueprints I draw before a single tool is chosen — so the
            plan survives a landscape that changes every month.
          </p>
        </Reveal>

        {/* Filter chips */}
        <div className="mt-8">
          <p className="mb-3 text-xs text-ink-faint">Show me</p>
          <div
            role="group"
            aria-label="Filter blueprints by capability"
            className="flex flex-wrap gap-2"
          >
            {flowFilters.map((f) => {
              const isActive = activeFlow === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFlow(f.id)}
                  className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 ${
                    isActive
                      ? "border-accent-cyan bg-accent-cyan/12 text-accent-cyan"
                      : "border-line text-ink-muted hover:border-accent-cyan/60 hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="mt-3 text-xs text-ink-faint">
            {liveText}
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-8 grid grid-cols-1 gap-[18px] md:grid-cols-6">
          {visible.map((b, i) => (
            <Reveal
              key={b.id}
              delay={(i % 3) * 0.06}
              as="article"
              className={b.size === "feature" ? "md:col-span-6" : "md:col-span-3"}
            >
              <BlueprintCard
                b={b}
                onOpen={(trigger) => {
                  lastTrigger.current = trigger;
                  setActiveId(b.id);
                }}
              />
            </Reveal>
          ))}

          {/* Audio card — full width, always shown */}
          <div className="md:col-span-6">
            <AudioCard />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blueprint-modal-title"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-night/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto my-auto max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface-elevated shadow-elevated"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
                <div>
                  <span className="mb-1.5 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan">
                    {active.scaleTag}
                  </span>
                  <h3
                    id="blueprint-modal-title"
                    className="font-display text-xl font-semibold sm:text-2xl"
                  >
                    {active.headline}
                  </h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-label="Close"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-raised text-ink hover:border-accent-cyan/50"
                >
                  <X size={18} aria-hidden />
                </button>
              </div>

              {/* Visual */}
              <div className="border-b border-line bg-night/40 p-4 sm:p-5">
                <Image
                  src={active.image.src}
                  alt={active.image.alt}
                  width={active.image.width}
                  height={active.image.height}
                  sizes="(min-width: 768px) 56rem, 100vw"
                  className="mx-auto max-h-[55vh] w-auto rounded-lg border border-line object-contain"
                />
              </div>

              <div className="px-6 py-5">
                <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                  {active.problem}
                </p>

                <div className="mt-5">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    What the system does
                  </p>
                  <ul className="grid gap-2.5">
                    {active.does.map((d) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-accent-cyan"
                          aria-hidden
                        />
                        <span className="text-sm leading-snug text-ink-muted">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {active.flows.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                    >
                      {flowLabels[f]}
                    </span>
                  ))}
                </div>

                <p className="mt-6 rounded-lg border border-dashed border-line px-4 py-3 text-xs leading-relaxed text-ink-faint">
                  {active.note}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
