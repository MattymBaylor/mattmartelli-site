"use client";

/**
 * Explainer train — same conveyor pattern as WorkflowCarousel / Blueprint Train:
 * items rendered twice on a track that translates -50% forever. Slow drift.
 * Click a phone → train pauses, lightbox expands so the reel can be played.
 * Media stays non-interactive (and muted) on the train so nothing fires audio.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import {
  ExplainerPhone,
  EXPLAINER_PHONE_WIDTH_PX,
  type ExplainerItem,
} from "@/components/ui/ExplainerPhone";

export function ExplainerCarousel({ items }: { items: readonly ExplainerItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  const count = items.length;
  const many = count > 1;
  const open = lightbox !== null;
  const norm = (i: number) => (count ? ((i % count) + count) % count : 0);
  const lightIndex = lightbox === null ? 0 : norm(lightbox);
  const lightCurrent = items[lightIndex];

  // Slow train: ~18s per phone, floor 90s full loop
  const durationSec = Math.max(count * 18, 90);

  const goLightbox = useCallback(
    (dir: number) => setLightbox((i) => (i === null ? null : norm(i + dir))),
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

  const openAt = (i: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setLightbox(i);
  };

  const renderCard = (item: ExplainerItem, i: number, dup: boolean) => (
    <div
      key={`${dup ? "b" : "a"}-${i}-${item.src}`}
      className="exp-card shrink-0"
      style={{ width: EXPLAINER_PHONE_WIDTH_PX }}
      aria-hidden={dup || undefined}
    >
      <button
        type="button"
        onClick={(e) => openAt(i, e.currentTarget)}
        tabIndex={dup ? -1 : 0}
        aria-haspopup="dialog"
        aria-label={`Expand explainer: ${item.label}`}
        className="group relative block w-full rounded-[2.2rem] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60"
      >
        <ExplainerPhone item={item} inertMedia size="train" />
        <span className="pointer-events-none absolute right-2 top-2 z-40 inline-flex items-center gap-1 rounded-md border border-line bg-night/75 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={10} aria-hidden />
          Expand
        </span>
      </button>
    </div>
  );

  const arrowBase =
    "inline-flex shrink-0 items-center justify-center rounded-full border border-line bg-surface-elevated/70 text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60";

  return (
    <div className="mt-8">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Explainer video reels — slow conveyor, click a phone to expand (silent)"
        className="exp-viewport relative overflow-hidden"
      >
        <div
          className="exp-track flex w-max gap-6"
          style={{
            ["--exp-dur" as string]: `${durationSec}s`,
            animationPlayState: open ? "paused" : undefined,
          }}
        >
          {items.map((item, i) => renderCard(item, i, false))}
          {many && items.map((item, i) => renderCard(item, i, true))}
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        Click a phone to expand · silent preview · train pauses while open
      </p>

      <style>{`
        @keyframes exp-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .exp-track {
          animation: exp-marquee var(--exp-dur, 100s) linear infinite;
          will-change: transform;
        }
        .exp-viewport:hover .exp-track,
        .exp-viewport:focus-within .exp-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-track { animation: none; }
          .exp-viewport { overflow-x: auto; }
          .exp-card[aria-hidden="true"] { display: none; }
        }
      `}</style>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={lightCurrent.label}
                className="fixed inset-0 z-[100] flex flex-col bg-night/95 p-4 backdrop-blur-sm sm:p-8"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setLightbox(null);
                }}
              >
                <div className="flex shrink-0 items-center justify-between pb-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-cyan">
                    {lightCurrent.label}
                    {many ? `  ·  ${lightIndex + 1} / ${count}` : ""}
                  </p>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label="Close"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-accent-cyan/40 hover:text-ink"
                  >
                    <X size={18} aria-hidden />
                  </button>
                </div>

                <div
                  className="relative flex flex-1 items-center justify-center overflow-auto"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setLightbox(null);
                  }}
                >
                  {many && (
                    <button
                      type="button"
                      onClick={() => goLightbox(-1)}
                      aria-label="Previous explainer"
                      className={`${arrowBase} absolute left-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 bg-night/70`}
                    >
                      <ChevronLeft size={20} aria-hidden />
                    </button>
                  )}

                  <motion.div
                    key={lightCurrent.src}
                    initial={reduced ? false : { opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="mx-auto"
                  >
                    <ExplainerPhone
                      item={lightCurrent}
                      size="hero"
                      inertMedia={false}
                      interactive
                    />
                  </motion.div>

                  {many && (
                    <button
                      type="button"
                      onClick={() => goLightbox(1)}
                      aria-label="Next explainer"
                      className={`${arrowBase} absolute right-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 bg-night/70`}
                    >
                      <ChevronRight size={20} aria-hidden />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
