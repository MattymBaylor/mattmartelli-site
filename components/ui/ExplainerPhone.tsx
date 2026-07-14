"use client";

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
  /** Play with sound / controls (lightbox only) */
  interactive?: boolean;
};

/**
 * 9:16 phone frame — identical outer size for video and HTML reels.
 */
export function ExplainerPhone({
  item,
  size = "train",
  inertMedia = true,
  interactive = false,
}: ExplainerPhoneProps) {
  const ownFrame = item.kind === "html" && item.hasOwnFrame;
  const width = size === "hero" ? 300 : EXPLAINER_PHONE_WIDTH_PX;

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
              src={item.src}
              className="h-full w-full object-cover"
              autoPlay
              muted={!interactive}
              loop
              playsInline
              controls={interactive}
              preload="metadata"
              aria-label={item.label}
            />
          ) : (
            <iframe
              src={item.src}
              title={item.label}
              className="h-full w-full border-0 bg-night"
              loading="lazy"
              // Block interaction until expanded so reels stay silent / non-clickable
              tabIndex={inertMedia ? -1 : 0}
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
