"use client";

import { useEffect, useRef } from "react";
import { Signal, Wifi } from "lucide-react";

type VideoItem = {
  kind: "video";
  src: string;
  label: string;
};

type HtmlItem = {
  kind: "html";
  src: string;
  label: string;
  /** When true, the HTML already includes device chrome — no extra notch/status UI. */
  hasOwnFrame?: boolean;
};

export type ExplainerItem = VideoItem | HtmlItem;

/** Shared footprint for every explainer in the train — do not vary per item. */
export const EXPLAINER_PHONE_WIDTH_PX = 220;

type ExplainerPhoneProps = {
  item: ExplainerItem;
  /** Larger shell for the lightbox expand view */
  size?: "train" | "hero";
  /** When true, media cannot receive clicks (train strip) */
  inertMedia?: boolean;
  /**
   * Lightbox: show controls for scrubbing.
   * Audio is always off in this explainer section (sound lives elsewhere).
   */
  interactive?: boolean;
};

/** Force silence on same-origin HTML reels (Howler / <audio> / <video>). */
function silenceFrame(iframe: HTMLIFrameElement) {
  try {
    const doc = iframe.contentDocument;
    const win = iframe.contentWindow as Window & {
      Howler?: { mute: (v: boolean) => void; volume: (v: number) => void; stop?: () => void };
    } | null;
    if (!doc || !win) return;

    doc.querySelectorAll("audio, video").forEach((node) => {
      const el = node as HTMLMediaElement;
      el.muted = true;
      el.volume = 0;
      try {
        el.pause();
      } catch {
        /* ignore */
      }
    });

    if (win.Howler) {
      try {
        win.Howler.mute(true);
        win.Howler.volume(0);
        win.Howler.stop?.();
      } catch {
        /* ignore */
      }
    }

    // Late-starting audio (Howl after mount)
    if (!(win as unknown as { __expMuted?: boolean }).__expMuted) {
      (win as unknown as { __expMuted?: boolean }).__expMuted = true;
      const MediaProto = win.HTMLMediaElement?.prototype;
      if (MediaProto?.play) {
        const orig = MediaProto.play;
        MediaProto.play = function (this: HTMLMediaElement, ...args: unknown[]) {
          this.muted = true;
          this.volume = 0;
          return orig.apply(this, args as []);
        };
      }
    }
  } catch {
    /* cross-origin or not ready */
  }
}

/**
 * 9:16 phone frame — identical outer size for video and HTML reels.
 * Explainer train/lightbox: always silent (no stacked call audio).
 */
export function ExplainerPhone({
  item,
  size = "train",
  inertMedia = true,
  interactive = false,
}: ExplainerPhoneProps) {
  const ownFrame = item.kind === "html" && item.hasOwnFrame;
  const width = size === "hero" ? 360 : EXPLAINER_PHONE_WIDTH_PX;
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.volume = 0;
    const keepMuted = () => {
      v.muted = true;
      v.volume = 0;
    };
    v.addEventListener("volumechange", keepMuted);
    v.addEventListener("play", keepMuted);
    return () => {
      v.removeEventListener("volumechange", keepMuted);
      v.removeEventListener("play", keepMuted);
      try {
        v.pause();
      } catch {
        /* ignore */
      }
    };
  }, [item.src]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const run = () => silenceFrame(iframe);
    run();
    // Howl often boots after first paint
    const t1 = window.setTimeout(run, 200);
    const t2 = window.setTimeout(run, 800);
    const t3 = window.setTimeout(run, 2000);
    const id = window.setInterval(run, 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearInterval(id);
      // Unload iframe media when phone unmounts (close lightbox / leave page)
      try {
        silenceFrame(iframe);
        iframe.src = "about:blank";
      } catch {
        /* ignore */
      }
    };
  }, [item.src]);

  return (
    <div className="relative flex shrink-0 flex-col" style={{ width }}>
      <div
        className="pointer-events-none absolute -inset-8 -z-30 rounded-[5rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.20),rgba(99,102,241,0.08)_45%,transparent_75%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-3 -z-20 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.14),transparent_70%)] blur-xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-[2.2rem] bg-gradient-to-b from-accent-cyan/35 via-accent-indigo/15 to-transparent opacity-70 blur-[2px]"
        aria-hidden
      />

      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.2rem] border border-line-strong bg-night shadow-[0_24px_48px_-12px_rgba(34,211,238,0.40),0_0_0_1px_rgba(255,255,255,0.04)_inset] ring-1 ring-white/[0.04]">
        <div
          className={`absolute inset-0 ${inertMedia ? "pointer-events-none" : ""}`}
        >
          {item.kind === "video" ? (
            <video
              ref={videoRef}
              src={item.src}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={interactive}
              preload="metadata"
              aria-label={item.label}
            />
          ) : (
            <iframe
              ref={iframeRef}
              src={item.src}
              title={item.label}
              className="h-full w-full border-0 bg-night"
              loading="lazy"
              tabIndex={inertMedia ? -1 : 0}
              allow="autoplay; fullscreen"
              onLoad={(e) => silenceFrame(e.currentTarget)}
            />
          )}
        </div>

        {!ownFrame && (
          <>
            <div
              className="pointer-events-none absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-10 items-end justify-between bg-gradient-to-b from-black/50 to-transparent px-5 pb-1 font-mono text-[10px] text-white">
              <span className="font-semibold tabular-nums">9:41</span>
              <div className="flex items-center gap-1">
                <Signal size={10} aria-hidden />
                <Wifi size={10} aria-hidden />
                <span
                  className="relative inline-block h-2 w-4 rounded-[2px] border border-white/80"
                  aria-hidden
                >
                  <span className="absolute inset-0 m-px rounded-[1px] bg-white" />
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {size === "train" && (
        <p className="mt-3 h-8 text-center font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-ink-faint">
          {item.label}
        </p>
      )}
    </div>
  );
}
