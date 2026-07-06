"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type DeferredYouTubeEmbedProps = {
  id: string;
  title: string;
  /** Autoplay muted loop once the embed loads. */
  autoplay?: boolean;
  className?: string;
};

function buildSrc(id: string, autoplay: boolean) {
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

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/**
 * Defers loading the YouTube iframe until the block is near the viewport.
 * Shows a thumbnail first so below-the-fold embeds don't sit on a loading spinner.
 */
export function DeferredYouTubeEmbed({
  id,
  title,
  autoplay = true,
  className = "",
}: DeferredYouTubeEmbedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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

  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div
      ref={rootRef}
      className={`relative aspect-video overflow-hidden rounded-2xl border border-line bg-black shadow-glow ${className}`}
    >
      {mounted ? (
        <iframe
          title={title}
          src={buildSrc(id, autoplay)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
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