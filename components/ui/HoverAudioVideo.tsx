"use client";

import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type HoverAudioVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Native-video counterpart of DeferredYouTubeEmbed's hover audio: autoplays
 * muted on a loop, unmutes while the mouse is over it, re-mutes on leave,
 * and stops interfering the moment the visitor touches the real controls.
 * Render inside a `relative` container (the chip is absolutely positioned).
 */
export function HoverAudioVideo({ src, poster, className = "" }: HoverAudioVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [engaged, setEngaged] = useState(false);
  const [hovering, setHovering] = useState(false);
  const recoveryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onHoverStart = (e: React.PointerEvent) => {
    setHovering(true);
    // Touch fires pointerenter on tap — that tap is headed for the controls.
    if (e.pointerType !== "mouse" || engaged) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    if (el.paused) el.play().catch(() => {});
    // Browsers pause a video that unmutes before the page has seen a real
    // click/keypress; restore the muted loop instead of a frozen frame.
    if (recoveryTimer.current) clearTimeout(recoveryTimer.current);
    recoveryTimer.current = setTimeout(() => {
      const v = videoRef.current;
      if (v && v.paused && !engaged) {
        v.muted = true;
        v.play().catch(() => {});
      }
    }, 400);
  };

  const onHoverEnd = (e: React.PointerEvent) => {
    setHovering(false);
    if (e.pointerType !== "mouse" || engaged) return;
    if (recoveryTimer.current) clearTimeout(recoveryTimer.current);
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    if (el.paused) el.play().catch(() => {});
  };

  return (
    <>
      {/* Poster + controls (no autoplay) for reduced-motion visitors. */}
      <video
        ref={videoRef}
        onPointerEnter={onHoverStart}
        onPointerLeave={onHoverEnd}
        onPointerDown={() => setEngaged(true)}
        className={className}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        controls
        preload="auto"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!reduced && !engaged && (
        <span
          className={`pointer-events-none absolute right-3 top-3 hidden items-center gap-1.5 rounded bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted transition-opacity duration-300 [@media(hover:hover)]:flex ${hovering ? "opacity-0" : "opacity-100"}`}
        >
          <Volume2 size={11} aria-hidden />
          Hover for sound
        </span>
      )}
    </>
  );
}
