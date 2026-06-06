"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Deck } from "@/content/blueprints";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const slideSrc = (dir: string, n: number) =>
  `/blueprints/decks/${dir}/slide-${String(n).padStart(2, "0")}.jpg`;

/**
 * DeckViewer — full-screen slide stepper, the third disclosure layer for a
 * blueprint. Opens above the blueprint modal (z-[110] vs z-[100]). Keyboard,
 * swipe, progress bar / dots; focus-trapped; body-scroll locked while open.
 */
export function DeckViewer({
  deck,
  title,
  onClose,
}: {
  deck: Deck;
  title: string;
  onClose: () => void;
}) {
  const [n, setN] = useState(1);
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const go = (next: number) => setN(Math.min(deck.count, Math.max(1, next)));

  // Body-scroll lock + initial focus. Focus restoration to the trigger is
  // handled by the parent (it re-focuses the button after onClose).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard: step / jump / close + a simple focus trap on Tab.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          return;
        case "ArrowLeft":
          e.preventDefault();
          setN((v) => Math.max(1, v - 1));
          return;
        case "ArrowRight":
          e.preventDefault();
          setN((v) => Math.min(deck.count, v + 1));
          return;
        case "Home":
          e.preventDefault();
          setN(1);
          return;
        case "End":
          e.preventDefault();
          setN(deck.count);
          return;
        case "Tab": {
          const root = containerRef.current;
          if (!root) return;
          const focusables = Array.from(
            root.querySelectorAll<HTMLElement>(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null || el === document.activeElement);
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          return;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deck.count, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? n + 1 : n - 1);
    touchStartX.current = null;
  };

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — full deck`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[110] flex flex-col bg-night/95 p-4 backdrop-blur-sm sm:p-6"
    >
      {/* Top chrome: title + counter + close */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-ink sm:text-base">
            {title}
          </p>
          <p className="font-mono text-xs text-ink-muted">
            {n} / {deck.count}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close deck"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-raised text-ink hover:border-accent-cyan/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
        >
          <X size={18} aria-hidden />
        </button>
      </div>

      {/* Stage */}
      <div
        className="flex flex-1 items-center justify-center overflow-hidden py-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={n}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            <Image
              src={slideSrc(deck.dir, n)}
              alt={`${title} — slide ${n} of ${deck.count}`}
              width={deck.width}
              height={deck.height}
              priority={n === 1}
              sizes="(min-width: 768px) 80vw, 100vw"
              className="max-h-[78vh] w-auto rounded-lg border border-line object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Preload only the next slide so paging feels instant. */}
        {n < deck.count && (
          <div className="sr-only" aria-hidden>
            <Image
              src={slideSrc(deck.dir, n + 1)}
              alt=""
              width={deck.width}
              height={deck.height}
              loading="eager"
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(n - 1)}
          disabled={n === 1}
          aria-label="Previous slide"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-surface-elevated text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
        >
          <ChevronLeft size={20} aria-hidden />
        </button>

        {/* Dots (sm+) */}
        <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex">
          {Array.from({ length: deck.count }, (_, i) => i + 1).map((slide) => (
            <button
              key={slide}
              type="button"
              onClick={() => go(slide)}
              aria-label={`Go to slide ${slide}`}
              aria-current={slide === n ? "true" : undefined}
              className={`h-2.5 w-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70 ${
                slide === n
                  ? "bg-accent-cyan"
                  : "bg-line-strong hover:bg-ink-faint"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(n + 1)}
          disabled={n === deck.count}
          aria-label="Next slide"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-surface-elevated text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/70"
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>

      {/* Progress bar (works on mobile) */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-accent-gradient transition-[width] duration-300"
          style={{ width: `${(n / deck.count) * 100}%` }}
        />
      </div>

      {/* Screen-reader live region */}
      <p className="sr-only" aria-live="polite">
        Slide {n} of {deck.count}
      </p>
    </motion.div>
  );
}
