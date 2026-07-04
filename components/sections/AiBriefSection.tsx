import Image from "next/image";
import { ArrowUpRight, Youtube } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const CHANNEL_URL = "https://www.youtube.com/@matt_martelli";
const FEED_URL =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCjPtaVFOrWxpVL8vptcD6Ug";

// How many briefs ride the ticker. The set is duplicated in the DOM for a
// seamless -50% translate loop, so the visible strip never runs dry.
const ROW_SIZE = 12;

type Brief = { id: string; views: number };

/**
 * The RSS feed needs no API key and carries the latest 15 uploads with a
 * per-video view count, so the row is sorted most-popular-first and
 * refreshes itself on the revalidate interval — same zero-maintenance
 * pattern as the Buzzsprout iframe in PodcastSection. On any fetch failure
 * the section renders copy + CTA without the ticker rather than erroring
 * the homepage.
 */
async function getBriefs(): Promise<Brief[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const briefs = [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)].flatMap(
      (entry) => {
        const id = entry[0].match(/<yt:videoId>([\w-]+)<\/yt:videoId>/)?.[1];
        const views = Number(entry[0].match(/views="(\d+)"/)?.[1] ?? 0);
        return id ? [{ id, views }] : [];
      },
    );
    return briefs.sort((a, b) => b.views - a.views).slice(0, ROW_SIZE);
  } catch {
    return [];
  }
}

const CHIPS = ["60 seconds", "New briefs weekly", "For business leaders"];

/**
 * Portrait tiles: the briefs are Shorts, and hqdefault.jpg pillarboxes
 * vertical video with black side bars. A 9:16 tile with object-cover crops
 * exactly those bars away.
 */
function TickerTile({ brief, hidden }: { brief: Brief; hidden?: boolean }) {
  return (
    <a
      href={`https://www.youtube.com/shorts/${brief.id}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hidden ? undefined : "Watch this brief on YouTube"}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="group/tile relative block w-36 shrink-0 overflow-hidden rounded-lg border border-line bg-surface-elevated transition hover:border-accent-cyan/60 sm:w-44"
    >
      <div className="relative aspect-[9/16]">
        <Image
          src={`https://i.ytimg.com/vi/${brief.id}/hqdefault.jpg`}
          alt=""
          fill
          sizes="176px"
          className="object-cover transition duration-300 group-hover/tile:scale-105"
        />
      </div>
      <span className="absolute inset-0 flex items-center justify-center bg-night/40 opacity-0 transition group-hover/tile:opacity-100">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-cyan text-night">
          <Youtube size={20} aria-hidden />
        </span>
      </span>
    </a>
  );
}

export async function AiBriefSection() {
  const briefs = await getBriefs();

  return (
    <section id="ai-brief" className="section border-b border-line/60">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Thought Leadership</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              The 60-Second AI Brief
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Plain-English AI briefings for business leaders — how AI
              actually drives revenue, cuts costs, and makes teams more
              effective. Every clip in the row below is a real brief from the
              library.
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
          </div>
        </Reveal>

        {briefs.length > 0 && (
          <Reveal delay={0.1}>
            <div className="ticker-hover relative mt-12 overflow-hidden">
              <div className="ticker-track flex w-max gap-3">
                {briefs.map((brief) => (
                  <TickerTile key={brief.id} brief={brief} />
                ))}
                {briefs.map((brief) => (
                  <TickerTile key={`dup-${brief.id}`} brief={brief} hidden />
                ))}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-night to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-night to-transparent"
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className="mt-10 text-center">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-accent-cyan px-5 py-3 text-sm font-semibold text-night transition hover:-translate-y-px"
            >
              <Youtube size={18} aria-hidden />
              Browse the library
              <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
