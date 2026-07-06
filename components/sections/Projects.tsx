"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Maximize2, Star, X } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const CARD_ASPECT = "aspect-[16/10]";

/** Architecture motif used for projects that don't have a screenshot yet. */
function FlowMotif({ steps, large = false }: { steps?: string[]; large?: boolean }) {
  return (
    <div
      className={`flex h-full w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-2 bg-grid-faint p-4 [background-size:22px_22px] ${
        large ? "gap-x-2" : ""
      }`}
    >
      {(steps ?? []).map((s, i) => (
        <span key={s} className="flex items-center gap-1.5">
          <span
            className={`rounded border border-line-strong bg-surface-raised/70 font-mono text-ink-muted ${
              large ? "px-3 py-1.5 text-xs" : "px-2 py-1 text-[10px]"
            }`}
          >
            {s}
          </span>
          {i < (steps?.length ?? 0) - 1 && (
            <ChevronRight size={large ? 14 : 11} className="text-accent-cyan/60" aria-hidden />
          )}
        </span>
      ))}
    </div>
  );
}

function CardVisual({ project }: { project: Project }) {
  if (project.image.placeholder || !project.image.src) {
    return (
      <div className={`${CARD_ASPECT} w-full overflow-hidden`}>
        <FlowMotif steps={project.flow} />
      </div>
    );
  }
  return (
    <div className={`${CARD_ASPECT} w-full overflow-hidden`}>
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
  );
}

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;

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

  return (
    <section id="projects" className="section border-t border-line/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Full project library"
          title="Systems, not screenshots"
          sub="Every card leads with the business outcome. Click for architecture detail, tech stack, and live links."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setActiveId(p.id);
                }}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface-elevated/70 text-left transition-all hover:-translate-y-1 hover:border-accent-cyan/40 hover:bg-surface-elevated hover:shadow-glow"
              >
                <div className="relative border-b border-line">
                  <CardVisual project={p} />
                  {p.flagship && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-warm/40 bg-night/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-warm backdrop-blur-sm">
                      <Star size={10} aria-hidden /> Flagship
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md border border-line-strong bg-night/70 px-2 py-1 font-mono text-[10px] text-ink opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 size={11} aria-hidden /> Open
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.outcome}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent-cyan">
                    View details
                    <ChevronRight
                      size={13}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
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
                  {active.flagship && (
                    <span className="mb-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-warm">
                      <Star size={10} aria-hidden /> Flagship demonstration
                    </span>
                  )}
                  <h3 id="project-modal-title" className="font-display text-xl font-semibold sm:text-2xl">
                    {active.title}
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
                {active.image.placeholder || !active.image.src ? (
                  <div className="aspect-[16/8] w-full overflow-hidden rounded-lg border border-line">
                    <FlowMotif steps={active.flow} large />
                  </div>
                ) : (
                  <Image
                    src={active.image.src}
                    alt={active.image.alt}
                    width={active.image.width}
                    height={active.image.height}
                    sizes="(min-width: 768px) 56rem, 100vw"
                    className="mx-auto max-h-[55vh] w-auto rounded-lg border border-line object-contain"
                  />
                )}
              </div>

              <div className="px-6 py-5">
                <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                  {active.description}
                </p>

                {active.callouts && (
                  <div className="mt-5">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      How it works
                    </p>
                    <ol className="grid gap-2 sm:grid-cols-2">
                      {active.callouts.map((c) => (
                        <li key={c.n} className="flex items-start gap-2.5">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-accent-gradient font-mono text-[10px] font-bold text-night">
                            {c.n}
                          </span>
                          <span className="text-sm leading-snug text-ink-muted">{c.label}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {(active.tech || active.skills) && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {(active.tech ?? active.skills ?? []).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {active.link && (
                  <a
                    href={active.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    {active.link.label}
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
