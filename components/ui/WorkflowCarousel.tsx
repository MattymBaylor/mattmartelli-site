"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * WorkflowCarousel — a manual (arrow-navigated) slideshow of workflow diagrams.
 * No autoplay. Each slide keeps a click-to-expand full-screen lightbox. Slides
 * are framed to a uniform aspect box so images of slightly different sizes stay
 * visually consistent. Controls (arrows, dots, counter) only render for 2+ slides.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type Slide = { src: string; alt: string; caption?: string };

export function WorkflowCarousel({ items }: { items: readonly Slide[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const count = items.length;
  const safeIndex = count ? ((index % count) + count) % count : 0;
  const current = items[safeIndex];
  const many = count > 1;

  const go = (dir: number) =>
    setIndex((i) => (count ? (((i + dir) % count) + count) % count : 0));

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, count]);

  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  if (!current) return null;

  const arrowBase =
    "inline-flex shrink-0 items-center justify-center rounded-full border border-line bg-surface-elevated/70 text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60";

  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="flex items-center gap-2 sm:gap-3"
        role="group"
        aria-roledescription="carousel"
        aria-label="Agentic workflow diagrams"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!many) return;
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        }}
      >
        {many && (
          <button type="button" onClick={() => go(-1)} aria-label="Previous workflow" className={`${arrowBase} h-10 w-10`}>
            <ChevronLeft size={18} aria-hidden />
          </button>
        )}

        <div className="min-w-0 flex-1">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Expand workflow: ${current.alt}`}
            className="group relative block w-full overflow-hidden rounded-xl border border-line bg-surface-elevated/40 shadow-glow transition-colors hover:border-accent-cyan/40 focus-visible:border-accent-cyan/60"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={safeIndex}
                className="block"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <img src={current.src} alt={current.alt} loading="lazy" className="block w-full" />
              </motion.span>
            </AnimatePresence>
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-line bg-night/70 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted backdrop-blur-sm transition-colors group-hover:border-accent-cyan/50 group-hover:text-accent-cyan">
              <Maximize2 size={12} aria-hidden />
              Click to expand
            </span>
          </button>
        </div>

        {many && (
          <button type="button" onClick={() => go(1)} aria-label="Next workflow" className={`${arrowBase} h-10 w-10`}>
            <ChevronRight size={18} aria-hidden />
          </button>
        )}
      </div>

      {current.caption && (
        <p className="mt-3 text-center text-xs text-ink-muted">{current.caption}</p>
      )}

      {many && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to workflow ${i + 1}`}
                aria-current={i === safeIndex}
                className={`h-2 w-2 rounded-full transition-colors ${i === safeIndex ? "bg-accent-cyan" : "bg-line hover:bg-ink-faint"}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {safeIndex + 1} / {count}
          </span>
        </div>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={current.caption || current.alt}
                className="fixed inset-0 z-[100] flex flex-col bg-night/95 p-4 backdrop-blur-sm sm:p-8"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
              >
                <div className="flex shrink-0 justify-end pb-3">
                  <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-accent-cyan/40 hover:text-ink">
                    <X size={18} aria-hidden />
                  </button>
                </div>
                <div className="relative flex flex-1 items-center justify-center overflow-auto" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
                  {many && (
                    <button type="button" onClick={() => go(-1)} aria-label="Previous workflow" className={`${arrowBase} absolute left-0 top-1/2 h-11 w-11 -translate-y-1/2 bg-night/70`}>
                      <ChevronLeft size={20} aria-hidden />
                    </button>
                  )}
                  <img src={current.src} alt={current.alt} className="max-h-full max-w-full rounded-lg border border-line object-contain shadow-elevated" />
                  {many && (
                    <button type="button" onClick={() => go(1)} aria-label="Next workflow" className={`${arrowBase} absolute right-0 top-1/2 h-11 w-11 -translate-y-1/2 bg-night/70`}>
                      <ChevronRight size={20} aria-hidden />
                    </button>
                  )}
                </div>
                <p className="shrink-0 pt-3 text-center text-xs text-ink-muted">
                  {current.caption}{many ? `  ·  ${safeIndex + 1} / ${count}` : ""}
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
