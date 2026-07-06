"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * DataRefineryBlueprint — a featured "methodology" card in the Marketing Ops
 * section. Clicking it opens an on-brand presentation lightbox that steps
 * through the Data Refinery Blueprint deck (slides rendered from the PDF),
 * with a link to download the full PDF.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Maximize2, X } from "lucide-react";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const bp = site.marketing.blueprint;

export function DataRefineryBlueprint() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const total = bp.slides.length;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);
  const go = useCallback(
    (delta: number) =>
      setIndex((i) => Math.min(Math.max(i + delta, 0), total - 1)),
    [total],
  );
  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  // Keyboard nav + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, go]);

  // Restore focus to the trigger when the lightbox closes (not on first mount).
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const current = bp.slides[index] ?? bp.slides[0];

  return (
    <>
      {/* Card trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => openAt(0)}
        aria-haspopup="dialog"
        className="group block w-full overflow-hidden rounded-xl border border-line bg-surface-elevated/40 text-left shadow-glow transition-colors hover:border-accent-cyan/40 focus-visible:border-accent-cyan/60"
      >
        <div className="grid items-stretch gap-0 sm:grid-cols-[minmax(0,42%)_1fr]">
          <div className="flex items-center border-b border-line/70 bg-surface-raised/40 p-3 sm:border-b-0 sm:border-r sm:p-5">
            <img
              src={bp.cover}
              alt={bp.coverAlt}
              loading="lazy"
              className="w-full rounded-md border border-line/60 shadow-elevated"
            />
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-7">
            <p className="eyebrow mb-2">{bp.eyebrow}</p>
            <h3 className="font-display text-xl font-semibold text-accent-cyan sm:text-2xl">
              {bp.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
              {bp.body}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan">
              <Maximize2 size={15} aria-hidden />
              {bp.cta}
              <ChevronRight
                size={15}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </button>

      {/* Presentation lightbox */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={dialogRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={`${bp.deckTitle} — presentation viewer`}
                className="fixed inset-0 z-[100] flex flex-col bg-night/95 backdrop-blur-sm"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) close();
                }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold text-ink sm:text-base">
                      {bp.deckTitle}
                    </p>
                    <p className="hidden truncate text-xs text-ink-muted sm:block">
                      {bp.deckSubtitle}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
                    <span className="font-mono text-xs tabular-nums text-ink-muted">
                      {index + 1} / {total}
                    </span>
                    <a
                      href={bp.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-accent-cyan/40 hover:text-ink"
                    >
                      <Download size={14} aria-hidden />
                      <span className="hidden sm:inline">Download PDF</span>
                    </a>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close presentation"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-accent-cyan/40 hover:text-ink"
                    >
                      <X size={16} aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-16 sm:py-6">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    disabled={index === 0}
                    aria-label="Previous slide"
                    className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface-elevated/80 text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan disabled:pointer-events-none disabled:opacity-30 sm:left-4 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft size={22} aria-hidden />
                  </button>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.src}
                      src={current.src}
                      alt={current.title}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduced ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="max-h-full max-w-full rounded-lg border border-line object-contain shadow-elevated"
                    />
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => go(1)}
                    disabled={index === total - 1}
                    aria-label="Next slide"
                    className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface-elevated/80 text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan disabled:pointer-events-none disabled:opacity-30 sm:right-4 sm:h-12 sm:w-12"
                  >
                    <ChevronRight size={22} aria-hidden />
                  </button>
                </div>

                <div className="border-t border-line px-4 py-3 sm:px-6">
                  <p className="mb-2 text-center text-xs text-ink-muted">
                    {current.title}
                  </p>
                  <div className="flex justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
                    {bp.slides.map((s, i) => (
                      <button
                        key={s.src}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}: ${s.title}`}
                        aria-current={i === index || undefined}
                        className={[
                          "shrink-0 overflow-hidden rounded border transition-all",
                          i === index
                            ? "border-accent-cyan ring-1 ring-accent-cyan"
                            : "border-line opacity-60 hover:opacity-100",
                        ].join(" ")}
                      >
                        <img
                          src={s.src}
                          alt=""
                          loading="lazy"
                          className="h-12 w-20 object-cover sm:h-14 sm:w-24"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
