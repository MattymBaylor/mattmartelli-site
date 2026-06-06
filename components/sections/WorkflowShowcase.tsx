"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Expand, ImageOff, X } from "lucide-react";
import { showcases, type Showcase } from "@/content/workflowShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Renders every showcase block in the Projects section. */
export function Showcases() {
  return (
    <div className="mt-16 space-y-10">
      {showcases.map((s, i) => (
        <Reveal key={s.id} delay={i * 0.05}>
          <ShowcaseBlock showcase={s} />
        </Reveal>
      ))}
    </div>
  );
}

function ShowcaseBlock({ showcase: s }: { showcase: Showcase }) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isPlaceholder = s.image.placeholder;

  // Lightbox: lock scroll, focus the close button, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="surface-card overflow-hidden">
      <div className="border-b border-line px-6 py-5">
        <p className="eyebrow mb-2">{s.eyebrow}</p>
        <h3 className="font-display text-xl font-semibold sm:text-2xl">{s.title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
          {s.summary}
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.65fr_1fr]">
        {/* Screenshot (click to enlarge) — or a placeholder panel */}
        <div className="border-b border-line p-4 sm:p-5 lg:border-b-0 lg:border-r">
          {isPlaceholder ? (
            <div className="flex aspect-[37/19] w-full flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface/40 text-center">
              <ImageOff size={26} className="text-ink-faint" aria-hidden />
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                Screenshot coming soon
              </p>
              <p className="mt-1 px-6 text-xs text-ink-faint">
                An example of my work — visual to be added.
              </p>
            </div>
          ) : (
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Enlarge the workflow screenshot"
              className="group relative block w-full overflow-hidden rounded-lg border border-line"
            >
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full"
              />
              <span className="pointer-events-none absolute inset-0 bg-night/0 transition-colors group-hover:bg-night/20" />
              <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-night/80 px-2.5 py-1.5 font-mono text-[11px] text-ink backdrop-blur-sm">
                <Expand size={13} aria-hidden /> Click to enlarge
              </span>
            </button>
          )}
        </div>

        {/* Numbered callouts */}
        <div className="p-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            How it works
          </p>
          <ol className="space-y-2.5">
            {s.callouts.map((c) => (
              <li key={c.n} className="flex items-start gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-gradient font-mono text-[11px] font-bold text-night">
                  {c.n}
                </span>
                <span className="text-sm leading-snug text-ink-muted">{c.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Tech stack + optional live link */}
      <div className="border-t border-line px-6 py-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          Tech stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {s.techStack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line/70 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {s.live && (
          <a
            href={s.live.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-2.5 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03]"
          >
            {s.live.label}
            <ArrowUpRight size={15} aria-hidden />
          </a>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && !isPlaceholder && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${s.title} — enlarged screenshot`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-night/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(false)}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="truncate pr-3 font-mono text-xs text-ink-muted">{s.title}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close enlarged view"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-elevated text-ink hover:border-accent-cyan/50"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <div
              className="flex flex-1 items-center justify-center overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                sizes="100vw"
                className="h-auto max-h-full w-auto max-w-full rounded-lg border border-line"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
