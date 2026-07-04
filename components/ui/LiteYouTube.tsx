"use client";

/**
 * LiteYouTube — a lightweight, privacy-respecting YouTube embed.
 * Shows a thumbnail + play button (a "facade"); only loads the actual
 * YouTube iframe after the user clicks. This keeps the homepage fast
 * (no heavy YouTube script on initial load) and avoids YouTube cookies
 * firing before the visitor opts in by playing. Uses youtube-nocookie.
 */

import { useState } from "react";
import { Play } from "lucide-react";

export function LiteYouTube({
  id,
  title,
  poster = "hqdefault",
  aspectClassName = "aspect-video",
  className = "",
}: {
  id: string;
  title: string;
  poster?: "hqdefault" | "maxresdefault" | "sddefault";
  aspectClassName?: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/${poster}.jpg`;

  return (
    <div className={`relative ${aspectClassName} w-full overflow-hidden rounded-xl border border-line bg-surface-elevated ${className}`}>
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={thumb}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-night/30 transition-colors group-hover:bg-night/45" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent-gradient shadow-glow transition-transform group-hover:scale-110">
            <Play size={24} className="ml-0.5 text-night" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
