"use client";

import { useCallback, useRef, type IframeHTMLAttributes } from "react";

/**
 * Living Flow iframe embed.
 *
 * The standalone HTML is a full-page canvas (body min-height: 100vh). Inside a
 * shorter iframe that creates an internal scroll surface — the “I can drag the
 * page up and down” feel. On load we inject same-origin CSS so the document
 * fills the frame without scrolling; the parent also clips overscroll.
 */
export function LivingFlowEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  const lockScroll = useCallback(() => {
    const doc = ref.current?.contentDocument;
    if (!doc?.documentElement) return;

    const id = "mm-living-flow-embed-lock";
    if (doc.getElementById(id)) return;

    const style = doc.createElement("style");
    style.id = id;
    style.textContent = `
      html, body {
        height: 100% !important;
        max-height: 100% !important;
        min-height: 0 !important;
        overflow: hidden !important;
        overscroll-behavior: none !important;
      }
      body {
        position: relative !important;
      }
      /* Prefer fixed full-frame root if the bundler mounts one */
      body > *:first-child {
        max-height: 100% !important;
      }
    `;
    doc.head.appendChild(style);

    // Re-apply after the unpacker swaps the DOM (bundled pages rewrite body).
    const obs = new MutationObserver(() => {
      if (!doc.getElementById(id) && doc.head) {
        doc.head.appendChild(style.cloneNode(true));
      }
      doc.documentElement.style.overflow = "hidden";
      if (doc.body) {
        doc.body.style.overflow = "hidden";
        doc.body.style.minHeight = "0";
        doc.body.style.height = "100%";
      }
    });
    obs.observe(doc.documentElement, { childList: true, subtree: true });

    // Disconnect after the bundle has had time to settle.
    window.setTimeout(() => obs.disconnect(), 8000);
  }, []);

  return (
    <div className="relative w-full overflow-hidden overscroll-none rounded-xl border border-line bg-night/40 [touch-action:pan-x]">
      <iframe
        ref={ref}
        src={src}
        title={title}
        onLoad={lockScroll}
        className="block h-[min(90vh,1020px)] min-h-[560px] w-full border-0 sm:min-h-[680px] lg:min-h-[800px]"
        loading="lazy"
        allow="fullscreen"
        // Legacy attribute — still reduces internal scroll affordance in some engines
        {...({ scrolling: "no" } as IframeHTMLAttributes<HTMLIFrameElement>)}
      />
    </div>
  );
}
