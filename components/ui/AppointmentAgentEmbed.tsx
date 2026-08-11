"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live appointment agent, embedded in the Living Flow section on /recruiter.
 *
 * Served from this site (public/appointment-demo/index.html, exposed at
 * /appointment-demo by a rewrite in next.config.mjs) so the iframe is
 * same-origin and the page never depends on a second domain. That file is a
 * verbatim copy of realtime.html from MattymBaylor/gms-voice-demo plus one
 * appended <style id="mm-site-skin"> block mapping it onto this site's tokens.
 *
 * ?embed=1 strips the demo's own header, footer and hero down to the card.
 *
 * allow="microphone" is mandatory. Without it the card renders, the button
 * works, and the agent never hears anything — with no error shown anywhere.
 */
const SRC = "/appointment-demo?embed=1";
const MIN_HEIGHT = 420;

export function AppointmentAgentEmbed() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(760);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let observer: ResizeObserver | undefined;
    // Once the frame is readable we stop trusting its postMessage: the demo
    // reports documentElement.scrollHeight, which can never fall below the
    // height we already gave the iframe, so alone it only ratchets upward.
    let measuredDirectly = false;

    const measure = () => {
      const body = frame.contentDocument?.body;
      if (!body) return false;
      const next = Math.ceil(body.getBoundingClientRect().height);
      if (next <= 0) return false;
      measuredDirectly = true;
      setHeight(Math.max(MIN_HEIGHT, next));
      return true;
    };

    const attach = () => {
      try {
        if (!measure()) return;
        const body = frame.contentDocument?.body;
        if (body && typeof ResizeObserver !== "undefined") {
          observer?.disconnect();
          observer = new ResizeObserver(() => {
            try {
              measure();
            } catch {
              /* frame navigated away */
            }
          });
          observer.observe(body);
        }
      } catch {
        /* cross-origin — fall back to the postMessage below */
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (measuredDirectly) return;
      if (event.source !== frame.contentWindow) return;
      const next = (event.data as { gmsVoiceDemoHeight?: unknown } | null)
        ?.gmsVoiceDemoHeight;
      if (typeof next !== "number" || !Number.isFinite(next)) return;
      setHeight(Math.max(MIN_HEIGHT, Math.ceil(next)));
    };

    frame.addEventListener("load", attach);
    window.addEventListener("message", onMessage);
    attach();

    return () => {
      observer?.disconnect();
      frame.removeEventListener("load", attach);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div className="mt-8 border-t border-line/60 pt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan">
        Stage 02 · Try it live
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
        Talk to the agent yourself.
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Not a video and not a recording — the stage-02 agent, answering in your
        browser. Push on it: move the appointment, or tell it you never booked
        one, and listen to how it handles being wrong-footed.
      </p>

      <div className="mx-auto mt-6 w-full max-w-[596px]">
        <iframe
          ref={frameRef}
          src={SRC}
          title="Live AI appointment agent"
          allow="microphone"
          loading="lazy"
          scrolling="no"
          className="block w-full border-0 bg-transparent"
          style={{ height, colorScheme: "dark" }}
        />
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        Live agent · two-minute cap · nothing recorded, nothing stored
      </p>
    </div>
  );
}
