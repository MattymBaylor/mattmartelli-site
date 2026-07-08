"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type DeferredYouTubeEmbedProps = {
  id: string;
  title: string;
  /** Autoplay muted loop once the embed loads. */
  autoplay?: boolean;
  /**
   * Hover-preview audio: unmute while the pointer is over the player,
   * re-mute on leave. Stops the moment the visitor clicks into the player —
   * from then on their own controls win. Hover-only devices; requires autoplay.
   */
  hoverAudio?: boolean;
  className?: string;
};

const YT_ORIGIN = "https://www.youtube-nocookie.com";

function buildSrc(id: string, autoplay: boolean, jsapi: boolean) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://mattmartelli.com";
  const params = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    controls: "1",
    origin,
  });

  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
    params.set("loop", "1");
    params.set("playlist", id);
  }
  if (jsapi) {
    params.set("enablejsapi", "1");
  }

  return `${YT_ORIGIN}/embed/${id}?${params.toString()}`;
}

/**
 * Defers loading the YouTube iframe until the block is near the viewport.
 * Shows a thumbnail first so below-the-fold embeds don't sit on a loading spinner.
 */
export function DeferredYouTubeEmbed({
  id,
  title,
  autoplay = true,
  hoverAudio = false,
  className = "",
}: DeferredYouTubeEmbedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  // Guarded here so server components can request autoplay without wiring
  // the reduced-motion hook themselves.
  const reduced = usePrefersReducedMotion();
  const effectiveAutoplay = autoplay && !reduced;
  const hoverAudioActive = hoverAudio && effectiveAutoplay;

  // Once the visitor clicks into the player, their own controls take over
  // and hover stops touching the audio.
  const [engaged, setEngaged] = useState(false);
  const lastPlayerState = useRef<number | null>(null);
  const recoveryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  const post = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      YT_ORIGIN,
    );
  };

  useEffect(() => {
    if (!mounted || !hoverAudioActive) return;

    // YouTube auto-displays (often junk auto-transcribed) captions on muted
    // autoplay. Deselect the track as the player boots and once on the first
    // playing signal — the CC button stays for visitors who want captions.
    const clearAutoCaptions = () => post("setOption", ["captions", "track", {}]);
    const ccTimers = [setTimeout(clearAutoCaptions, 1500), setTimeout(clearAutoCaptions, 4000)];
    let ccStateShot = false;

    // Player state comes back on the jsapi message channel (1 playing, 2 paused).
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        const state = data?.info?.playerState;
        if (typeof state === "number") {
          lastPlayerState.current = state;
          if (state === 1 && !ccStateShot) {
            ccStateShot = true;
            clearAutoCaptions();
          }
        }
      } catch {
        /* not a player message */
      }
    };

    // Clicking a cross-origin iframe never bubbles out; the window losing
    // focus to it is the only signal the visitor grabbed the real controls.
    const onBlur = () => {
      if (document.activeElement === iframeRef.current) setEngaged(true);
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("blur", onBlur);
      if (recoveryTimer.current) clearTimeout(recoveryTimer.current);
      ccTimers.forEach(clearTimeout);
    };
  }, [mounted, hoverAudioActive]);

  const onHoverStart = (e: React.PointerEvent) => {
    // Touch fires pointerenter on tap — that tap is headed for the player's
    // own controls, so hover-audio is mouse-only.
    if (e.pointerType !== "mouse" || !hoverAudioActive || engaged) return;
    post("unMute");
    post("setVolume", [100]);
    post("playVideo");
    // Browsers refuse audible playback until the page has seen a real
    // click/keypress; if the unmute got the video paused, put the muted
    // loop back rather than leaving a frozen frame.
    if (recoveryTimer.current) clearTimeout(recoveryTimer.current);
    recoveryTimer.current = setTimeout(() => {
      if (lastPlayerState.current === 2) {
        post("mute");
        post("playVideo");
      }
    }, 700);
  };

  const onHoverEnd = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !hoverAudioActive || engaged) return;
    if (recoveryTimer.current) clearTimeout(recoveryTimer.current);
    post("mute");
    post("playVideo");
  };

  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div
      ref={rootRef}
      onPointerEnter={onHoverStart}
      onPointerLeave={onHoverEnd}
      className={`group/embed relative aspect-video overflow-hidden rounded-2xl border border-line bg-black shadow-glow ${className}`}
    >
      {mounted ? (
        <>
          <iframe
            ref={iframeRef}
            title={title}
            src={buildSrc(id, effectiveAutoplay, hoverAudio)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => {
              if (hoverAudioActive) {
                // Handshake so the player starts reporting state changes.
                iframeRef.current?.contentWindow?.postMessage(
                  JSON.stringify({ event: "listening", id }),
                  YT_ORIGIN,
                );
              }
            }}
            className="absolute inset-0 h-full w-full border-0"
          />
          {hoverAudioActive && !engaged && (
            <span className="pointer-events-none absolute right-3 top-3 hidden items-center gap-1.5 rounded bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted transition-opacity duration-300 group-hover/embed:opacity-0 [@media(hover:hover)]:flex">
              <Volume2 size={11} aria-hidden />
              Hover for sound
            </span>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => setMounted(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={thumb}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-night/35 transition-colors group-hover:bg-night/50" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent-gradient shadow-glow transition-transform group-hover:scale-110">
            <Play size={24} className="ml-0.5 text-night" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
