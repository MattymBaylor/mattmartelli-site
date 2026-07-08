"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * WorkflowCarousel — a manual (arrow-navigated) slideshow of workflow diagrams,
 * shown two-up so the row stays balanced and fills the section width. No
 * autoplay. Each slide keeps a click-to-expand full-screen lightbox and is
 * framed to a uniform aspect box so diagrams of different sizes stay the same
 * height. Controls (arrows, dots, counter) only render for 2+ slides.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type Slide = { src: string; alt: string; caption?: string };

export function WorkflowCarousel({ items }: { items: readonly Slide[] }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  const count = items.length;
  const many = count > 1;
  const norm = (i: number) => (count ? ((i % count) + count) % count : 0);
  const safeIndex = norm(index);
  const open = lightbox !== null;
  const lightIndex = lightbox === null ? safeIndex : norm(lightbox);
  const lightCurrent = items[lightIndex];

  // Two-up: the leading slide plus the next (wraps). A lone slide shows once.
  const visible = many ? [safeIndex, norm(safeIndex + 1)] : [safeIndex];

  const go = (dir: number) => setIndex((i) => norm(i + dir));
  const goLightbox = (dir: number) =>
    setLightbox((i) => (i === null ? null : norm(i + dir)));

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
  }, [open, count]);

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

  return (
    <div>
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
          <button type="button" onClick={() => go(-1)} aria-label="Previous workflows" className={`${arrowBase} h-10 w-10`}>
            <ChevronLeft size={18} aria-hidden />
          </button>
        )}

        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={safeIndex}
              className={`grid gap-3 sm:gap-4 ${many ? "sm:grid-cols-2" : ""}`}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {visible.map((i) => {
                const s = items[i];
                if (!s) return null;
                return (
                  <figure key={`${i}-${s.src}`} className="min-w-0">
                    <button
                      type="button"
                      onClick={(e) => openAt(i, e.currentTarget)}
                      aria-haspopup="dialog"
                      aria-label={`Expand workflow: ${s.alt}`}
                      className="group relative block w-full overflow-hidden rounded-xl border border-line bg-surface-elevated/40 shadow-glow transition-colors hover:border-accent-cyan/40 focus-visible:border-accent-cyan/60"
                    >
                      <span className="flex aspect-[16/10] items-center justify-center bg-night/40 p-2">
                        <img src={s.src} alt={s.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
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
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {many && (
          <button type="button" onClick={() => go(1)} aria-label="Next workflows" className={`${arrowBase} h-10 w-10`}>
            <ChevronRight size={18} aria-hidden />
          </button>
        )}
      </div>

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
