import Image from "next/image";
import { ArrowUpRight, Youtube } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const CHANNEL_URL = "https://www.youtube.com/@matt_martelli";
const FEED_URL =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCjPtaVFOrWxpVL8vptcD6Ug";

// 7 columns x 3 rows on desktop — enough tiles that the tilted wall bleeds
// past every edge of the card. The feed returns at most 15 videos, so the
// tile list wraps around to fill the remainder.
const WALL_TILES = 21;

/**
 * The RSS feed needs no API key and carries the latest 15 uploads, so the
 * wall refreshes itself on the revalidate interval as new briefs publish —
 * same zero-maintenance pattern as the Buzzsprout iframe in PodcastSection.
 * On any fetch failure the section renders without thumbnails (dark wall,
 * overlay copy intact) rather than erroring the homepage.
 */
async function getVideoIds(): Promise<string[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<yt:videoId>([\w-]+)<\/yt:videoId>/g)].map(
      (m) => m[1],
    );
  } catch {
    return [];
  }
}

const CHIPS = ["60 seconds", "New briefs weekly", "For business leaders"];

export async function AiBriefSection() {
  const ids = await getVideoIds();
  const tiles = ids.length
    ? Array.from({ length: WALL_TILES }, (_, i) => ids[i % ids.length])
    : [];

  return (
    <section id="ai-brief" className="section border-b border-line/60">
      <div className="container-x">
        <Reveal>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch The 60-Second AI Brief on YouTube"
            className="group relative block overflow-hidden rounded-2xl border border-line bg-night shadow-glow"
          >
            {/* Portrait tiles: the briefs are Shorts, and hqdefault.jpg
                pillarboxes vertical video with black side bars. A 9:16 tile
                with object-cover crops exactly those bars away. */}
            <div
              aria-hidden
              className="absolute -inset-x-16 -inset-y-14 grid grid-cols-4 gap-2.5 opacity-70 transition-opacity duration-700 [transform:perspective(900px)_rotateX(16deg)_scale(1.18)] group-hover:opacity-90 sm:grid-cols-7"
            >
              {tiles.map((id, i) => (
                <div
                  key={`${id}-${i}`}
                  className="relative aspect-[9/16] overflow-hidden rounded-md bg-surface-elevated"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 25vw, 180px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div aria-hidden className="absolute inset-0 bg-night/45" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/25 to-night/40"
            />

            <div className="relative flex min-h-[24rem] flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[28rem]">
              <p className="eyebrow mb-3">Thought Leadership</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                The 60-Second AI Brief
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
                Plain-English AI briefings for business leaders — how AI
                actually drives revenue, cuts costs, and makes teams more
                effective. Every thumbnail behind this card is a real brief
                from the library.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                {CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <span className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-accent-cyan px-5 py-3 text-sm font-semibold text-night transition group-hover:-translate-y-px">
                <Youtube size={18} aria-hidden />
                Browse the library
                <ArrowUpRight size={15} aria-hidden />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
