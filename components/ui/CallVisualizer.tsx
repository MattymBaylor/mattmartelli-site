"use client";

import { useEffect, useRef } from "react";

/**
 * Voice call demo embed, with playback guardrails.
 *
 * The recorded call audio lives inside /voice/call-visualizer.html (same-origin
 * iframe). Left alone it keeps playing after you scroll past it or switch tabs,
 * which is how you end up hearing the call overlapping in more than one place.
 * This wrapper pauses the iframe's media the moment it scrolls out of view or
 * the tab is hidden, so it only ever plays while it's on screen.
 */
export function CallVisualizer() {
  const ref = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const pauseMedia = () => {
      try {
        const doc = el.contentWindow?.document;
        doc
          ?.querySelectorAll<HTMLMediaElement>("audio, video")
          .forEach((m) => m.pause());
      } catch {
        /* iframe not ready yet — nothing to pause */
      }
    };

    // Pause when it scrolls (mostly) out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) pauseMedia();
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    // Pause when the tab is hidden (covers audio bleeding across tabs).
    const onVisibility = () => {
      if (document.hidden) pauseMedia();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src="/voice/call-visualizer.html?embed=1"
      title="Interactive AI voice-agent call — play a real recorded outbound call"
      className="pointer-events-auto absolute inset-0 h-full w-full border-0"
      allow="autoplay"
      loading="lazy"
      scrolling="no"
    />
  );
}
