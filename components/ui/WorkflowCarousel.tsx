"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * WorkflowCarousel — a continuous, smoothly drifting ticker of workflow
 * diagrams. The full set is rendered twice on one track that translates
 * -50% on a linear loop, so the strip scrolls right-to-left forever with no
 * visible seam. Hovering (or keyboard-focusing) the strip pauses the motion,
 * and every card keeps its click-to-expand full-screen lightbox. Users with
 * prefers-reduced-motion get a static, horizontally scrollable strip.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type Slide = { src: string; alt: string; caption?: string };

export function WorkflowCarousel({ items, reverse }: { items: readonly Slide[]; reverse?: boolean }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  const count = items.length;
  const many = count > 1;
  const norm = (i: number) => (count ? ((i % count) + count) % count : 0);
  const open = lightbox !== null;
  const lightIndex = lightbox === null ? 0 : norm(lightbox);
  const lightCurrent = items[lightIndex];

  const goLightbox = useCallback(
    (dir: number) => setLightbox((i) => (i === null ? null : norm(i + dir))),
    // norm closes over count; recreate when slide count changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") goLightbox(-1);
      if (e.key === "ArrowRight") goLightbox(1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, goLightbox]);

  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  if (!count || !lightCurrent) return null;

  const arrowBase =
    "inline-flex shrink-0 items-center justify-center rounded-full border border-line bg-surface-elevated/70 text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60";

  const openAt = (i: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setLightbox(i);
  };

  const renderCard = (s: Slide, i: number, dup: boolean) => (
    <figure
      key={`${dup ? "b" : "a"}-${i}-${s.src}`}
      className="wf-card w-[78vw] shrink-0 sm:w-[min(44vw,560px)]"
      aria-hidden={dup || undefined}
    >
      <button
        type="button"
        onClick={(e) => openAt(i, e.currentTarget)}
        tabIndex={dup ? -1 : 0}
        aria-haspopup="dialog"
        aria-label={`Expand workflow: ${s.alt}`}
        className="group relative block w-full overflow-hidden rounded-xl border border-line bg-surface-elevated/40 shadow-glow transition-colors hover:border-accent-cyan/40 focus-visible:border-accent-cyan/60"
      >
        <span className="flex aspect-[16/10] items-center justify-center bg-night/40 p-2">
          <img src={s.src} alt={dup ? "" : s.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
        </span>
        <span className="pointer-events-none absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-md border border-line bg-night/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted backdrop-blur-sm transition-colors group-hover:border-accent-cyan/50 group-hover:text-accent-cyan">
          <Maximize2 size={11} aria-hidden />
          Expand
        </span>
      </button>
      {s.caption && (
        <figcaption className="mt-2.5 text-center text-xs text-ink-muted">{s.caption}</figcaption>
      )}
    </figure>
  );

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Agentic workflow diagrams — auto-scrolling, hover to pause"
        className="wf-viewport relative overflow-hidden"
      >
        <div
          className="wf-track flex w-max gap-3 sm:gap-4"
          style={{
            ["--wf-dur" as string]: `${Math.max(count * 7, 60)}s`,
            animationDirection: reverse ? "reverse" : undefined,
            animationPlayState: open ? "paused" : undefined,
          }}
        >
          {items.map((s, i) => renderCard(s, i, false))}
          {many && items.map((s, i) => renderCard(s, i, true))}
        </div>
      </div>

      <style>{`
        @keyframes wf-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .wf-track {
          animation: wf-marquee var(--wf-dur, 90s) linear infinite;
          will-change: transform;
        }
        .wf-viewport:hover .wf-track,
        .wf-viewport:focus-within .wf-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .wf-track { animation: none; }
          .wf-viewport { overflow-x: auto; }
          .wf-card[aria-hidden="true"] { display: none; }
        }
      `}</style>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={lightCurrent.caption || lightCurrent.alt}
                className="fixed inset-0 z-[100] flex flex-col bg-night/95 p-4 backdrop-blur-sm sm:p-8"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
              >
                <div className="flex shrink-0 justify-end pb-3">
                  <button type="button" onClick={() => setLightbox(null)} aria-label="Close" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-accent-cyan/40 hover:text-ink">
                    <X size={18} aria-hidden />
                  </button>
                </div>
                <div className="relative flex flex-1 items-center justify-center overflow-auto" onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}>
                  {many && (
                    <button type="button" onClick={() => goLightbox(-1)} aria-label="Previous workflow" className={`${arrowBase} absolute left-0 top-1/2 h-11 w-11 -translate-y-1/2 bg-night/70`}>
                      <ChevronLeft size={20} aria-hidden />
                    </button>
                  )}
                  <img src={lightCurrent.src} alt={lightCurrent.alt} className="max-h-full max-w-full rounded-lg border border-line object-contain shadow-elevated" />
                  {many && (
                    <button type="button" onClick={() => goLightbox(1)} aria-label="Next workflow" className={`${arrowBase} absolute right-0 top-1/2 h-11 w-11 -translate-y-1/2 bg-night/70`}>
                      <ChevronRight size={20} aria-hidden />
                    </button>
                  )}
                </div>
                <p className="shrink-0 pt-3 text-center text-xs text-ink-muted">
                  {lightCurrent.caption}{many ? `  ·  ${lightIndex + 1} / ${count}` : ""}
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
