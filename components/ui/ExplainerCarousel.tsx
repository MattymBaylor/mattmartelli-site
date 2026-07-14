"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExplainerPhone, type ExplainerItem } from "@/components/ui/ExplainerPhone";

/**
 * Horizontal phone strip — drag / scroll / arrow navigation with snap.
 * Scales cleanly as more explainer reels are added.
 */
export function ExplainerCarousel({ items }: { items: readonly ExplainerItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, items.length]);

  const scrollByPhone = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // One phone card ≈ 220px + gap 24px
    el.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="relative mt-8">
      {/* Edge fades */}
      {canLeft && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface-elevated/90 to-transparent sm:w-14"
          aria-hidden
        />
      )}
      {canRight && (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface-elevated/90 to-transparent sm:w-14"
          aria-hidden
        />
      )}

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="Explainer video reels"
      >
        {items.map((item) => (
          <div key={item.src} className="snap-start" role="listitem">
            <ExplainerPhone item={item} />
          </div>
        ))}
        {/* Trailing spacer so last phone can center / breathe */}
        <div className="w-2 shrink-0" aria-hidden />
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByPhone(-1)}
          disabled={!canLeft}
          aria-label="Previous explainer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-surface-elevated/80 text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByPhone(1)}
          disabled={!canRight}
          aria-label="Next explainer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-surface-elevated/80 text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
