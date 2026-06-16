"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * ExpandableImage — a fit-to-width figure that opens a full-screen lightbox
 * when clicked. For diagrams/infographics that read fine small but benefit
 * from a zoomed view. Esc or click-outside closes; focus returns to trigger.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

export function ExpandableImage({
  src,
  alt,
  caption,
  hint = "Click to expand",
}: {
  src: string;
  alt: string;
  caption?: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <figure className="mx-auto max-w-3xl">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group relative block w-full overflow-hidden rounded-xl border border-line bg-surface-elevated/40 transition-colors hover:border-accent-cyan/40 focus-visible:border-accent-cyan/60"
      >
        <img src={src} alt={alt} loading="lazy" className="block w-full" />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-line bg-night/70 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted backdrop-blur-sm transition-colors group-hover:border-accent-cyan/50 group-hover:text-accent-cyan">
          <Maximize2 size={12} aria-hidden />
          {hint}
        </span>
      </button>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-ink-muted">
          {caption}
        </figcaption>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={caption || alt}
                className="fixed inset-0 z-[100] flex flex-col bg-night/95 p-4 backdrop-blur-sm sm:p-8"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setOpen(false);
                }}
              >
                <div className="flex shrink-0 justify-end pb-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-accent-cyan/40 hover:text-ink"
                  >
                    <X size={18} aria-hidden />
                  </button>
                </div>
                <div
                  className="flex flex-1 items-center justify-center overflow-auto"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setOpen(false);
                  }}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="max-h-full max-w-full rounded-lg border border-line object-contain shadow-elevated"
                  />
                </div>
                {caption && (
                  <p className="shrink-0 pt-3 text-center text-xs text-ink-muted">
                    {caption}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </figure>
  );
}
