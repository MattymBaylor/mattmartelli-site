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
};

export type ExplainerItem = VideoItem | HtmlItem;

/**
 * 9:16 phone frame matching LiveAgentFeedPhone bezel/glow language.
 * Screen content is either a looping muted video or a same-origin HTML iframe.
 */
export function ExplainerPhone({ item }: { item: ExplainerItem }) {
  return (
    <div className="relative mx-auto w-full max-w-[220px] sm:max-w-none">
      {/* Backlight stack — same depth language as #public-pulse phone */}
      <div
        className="pointer-events-none absolute -inset-10 -z-30 rounded-[5rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.20),rgba(99,102,241,0.08)_45%,transparent_75%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-4 -z-20 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.14),transparent_70%)] blur-xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-[2.2rem] bg-gradient-to-b from-accent-cyan/35 via-accent-indigo/15 to-transparent opacity-70 blur-[2px]"
        aria-hidden
      />

      {/* Bezel */}
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.2rem] border border-line-strong bg-night shadow-[0_24px_48px_-12px_rgba(34,211,238,0.40),0_0_0_1px_rgba(255,255,255,0.04)_inset] ring-1 ring-white/[0.04]">
        {/* Notch */}
        <div
          className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black"
          aria-hidden
        />

        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex h-10 items-end justify-between px-5 pb-1 font-mono text-[10px] text-white">
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

        {/* Screen */}
        <div className="absolute inset-0 pt-10">
          {item.kind === "video" ? (
            <video
              src={item.src}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={item.label}
            />
          ) : (
            <iframe
              src={item.src}
              title={item.label}
              className="h-full w-full border-0 bg-night"
              loading="lazy"
            />
          )}
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        {item.label}
      </p>
    </div>
  );
}
