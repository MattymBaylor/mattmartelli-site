"use client";

import Image from "next/image";
import {
  Special_Elite,
  Courier_Prime,
  JetBrains_Mono,
  Caveat,
  IM_Fell_DW_Pica,
} from "next/font/google";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  ArrowRight,
  Check,
  Maximize2,
} from "lucide-react";
import type { PageConfig } from "@/content/clientPages";

const typewriter = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
});
const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
});
const tactMono = JetBrains_Mono({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-tact-mono",
  display: "swap",
});
const handwriting = Caveat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});
const fell = IM_Fell_DW_Pica({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fell",
  display: "swap",
});

const STAGE = "#0A0A0F";
const KRAFT = "#C9A36A";
const MANILA = "#E8D9B0";
const MANILA_DARK = "#C9A36A";
const MANILA_LIGHT = "#E8D9B0";
const CREAM = "#F5EBD0";
const INK = "#3A2F22";
const STAMP_RED = "#B23A30";
const STAMP_BLUE = "#2A4FA0";
const STICKY_YELLOW = "#F7E27A";
const STICKY_BLUE = "#BFD9F2";
const WAX_RED = "#8B1E1A";
const OCHRE = "#B07D2D";

const PAPER_NOISE_URL = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.13 0 0 0 0 0.08 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

const MANILA_NOISE_URL = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.30 0 0 0 0 0.22 0 0 0 0 0.10 0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23m)'/></svg>")`;

type ModalKey =
  | "client-card"
  | "case-film"
  | "insight"
  | "full-brief"
  | "audio"
  | "exhibits"
  | "solution"
  | "infographic"
  | null;

function SilverPaperclip({
  className = "",
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 96"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
    >
      <path
        d="M28 8 C36 8, 36 22, 28 22 L14 22 C6 22, 6 36, 14 36 L26 36 C32 36, 32 46, 26 46 L16 46 C12 46, 12 52, 16 52 L24 52"
        stroke="#8a8a92"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 8 C36 8, 36 22, 28 22 L14 22 C6 22, 6 36, 14 36 L26 36 C32 36, 32 46, 26 46 L16 46 C12 46, 12 52, 16 52 L24 52"
        stroke="#d6d6db"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

function StampRoughFilter() {
  return (
    <svg aria-hidden className="absolute h-0 w-0" style={{ position: "absolute" }}>
      <filter id="stamp-rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
      </filter>
    </svg>
  );
}

function Stamp({
  children,
  color = STAMP_RED,
  rotate = -7,
  opacity = 0.82,
  className = "",
  size = 13,
}: {
  children: ReactNode;
  color?: string;
  rotate?: number;
  opacity?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={`select-none pointer-events-none ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        color,
        border: `2.5px solid ${color}`,
        padding: "4px 14px",
        fontFamily: "var(--font-fell), serif",
        letterSpacing: "0.18em",
        fontSize: `${size}px`,
        textTransform: "uppercase",
        opacity,
        boxShadow: `inset 0 0 6px ${color}22`,
        filter: "url(#stamp-rough)",
        background: "transparent",
      }}
    >
      {children}
    </div>
  );
}

function PolaroidLogo({
  config,
  onOpen,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open client card"
      className="group relative inline-block focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B07D2D]"
    >
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="relative"
      >
        <SilverPaperclip className="absolute -top-3 left-6 z-10 h-[60px] w-[26px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]" />
        <div
          className="rounded-[2px] p-2 pb-5"
          style={{
            background: "#fafaf6",
            boxShadow:
              "0 1px 0 rgba(0,0,0,0.06), 0 8px 18px -10px rgba(0,0,0,0.55)",
            width: 132,
          }}
        >
          <div
            className="flex h-[100px] w-full items-center justify-center"
            style={{ background: "#0c0c10" }}
          >
            <Image
              src={config.logoUrl}
              alt={`${config.clientName} monogram`}
              width={70}
              height={70}
              className="opacity-95"
            />
          </div>
          <div
            className="mt-2 text-center text-[8px] uppercase tracking-[0.28em]"
            style={{ color: INK, fontFamily: "var(--font-tact-mono), monospace" }}
          >
            Subject · MM
          </div>
        </div>
      </motion.div>
      <div
        className="mt-3 text-center text-[11px] uppercase tracking-[0.22em]"
        style={{ color: INK, fontFamily: "var(--font-tact-mono), monospace" }}
      >
        {config.clientName}
      </div>
    </button>
  );
}

function EvidencePhoto({
  youtubeId,
  onOpen,
  prefersReducedMotion,
}: {
  youtubeId: string;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="group relative block w-full">
      <motion.div
        whileHover={prefersReducedMotion || playing ? undefined : { y: -3 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="relative"
        style={{ transform: "rotate(-1.2deg)" }}
      >
        <SilverPaperclip
          className="absolute -top-4 left-1/2 z-10 h-[64px] w-[28px] -translate-x-1/2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]"
        />
        <div
          className="relative w-full overflow-hidden rounded-[2px] p-2"
          style={{
            background: "#fafaf6",
            boxShadow:
              "0 1px 0 rgba(0,0,0,0.06), 0 14px 24px -14px rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="relative aspect-video w-full overflow-hidden"
            style={{ background: "#0c0c10" }}
          >
            {!playing ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play case film inline"
                className="absolute inset-0 block w-full focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B07D2D]"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                  alt="Case film evidence poster"
                  fill
                  className="object-cover opacity-80 grayscale-[0.35] transition group-hover:opacity-95"
                  sizes="(max-width: 768px) 90vw, 480px"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: "rgba(255,255,255,0.9)",
                      background: "rgba(0,0,0,0.45)",
                    }}
                  >
                    <Play className="h-6 w-6 text-white" aria-hidden />
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title="Case film"
                allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            )}

            {/* EVIDENCE stamp persists in both poster + playing states */}
            <div className="pointer-events-none absolute bottom-2 left-2 z-10">
              <Stamp color={STAMP_RED} rotate={-3} size={10}>
                EVIDENCE
              </Stamp>
            </div>

            {/* Pop-out / expand button (always visible) */}
            <button
              type="button"
              onClick={onOpen}
              aria-label="Expand case film into modal"
              title="Expand"
              className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/55 backdrop-blur-sm transition hover:bg-black/80 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B07D2D]"
            >
              <Maximize2 className="h-4 w-4 text-white" aria-hidden />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ExhibitsThumbnails({
  config,
  onOpen,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open exhibits carousel"
      className="group relative block focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B07D2D]"
    >
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="relative"
      >
        <SilverPaperclip
          className={`absolute -top-3 z-10 h-[60px] w-[26px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)] ${
            Math.min(3, config.deck.count) === 1
              ? "left-1/2 -translate-x-1/2"
              : "left-6"
          }`}
        />
        <div
          className="grid gap-2 pt-3"
          style={{
            gridTemplateColumns: `repeat(${Math.min(3, config.deck.count)}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: Math.min(3, config.deck.count) }, (_, i) => i + 1).map((n) => {
            const padded = String(n).padStart(2, "0");
            const src = `/blueprints/decks/${config.deck.dir}/slide-${padded}.jpg`;
            const rot = n === 2 ? 1.5 : n === 1 ? -1.4 : 0.6;
            return (
              <div
                key={n}
                className="relative overflow-hidden rounded-[2px] p-1"
                style={{
                  background: "#fafaf6",
                  boxShadow: "0 8px 14px -10px rgba(0,0,0,0.45)",
                  transform: `rotate(${rot}deg)`,
                }}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`Blueprint exhibit slide ${n}`}
                    fill
                    className="object-cover grayscale-[0.4]"
                    sizes="120px"
                  />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-1 pb-0.5 text-center text-[8px] uppercase tracking-[0.25em]"
                  style={{ color: INK, fontFamily: "var(--font-tact-mono), monospace" }}
                >
                  Exh A · {padded}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </button>
  );
}

function CdHalfTucked({
  label,
  previewText,
  onOpen,
  prefersReducedMotion,
}: {
  label: string;
  previewText?: string;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      aria-label={`Open audio field tape: ${label}`}
      className="group relative z-40 block focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B07D2D]"
      style={{ isolation: "isolate" }}
    >
      {previewText ? (
        <StickyHoverPreview
          show={hovering}
          text={previewText}
          counterRotate={0}
          prefersReducedMotion={prefersReducedMotion}
        />
      ) : null}
      {/* Clip container shows only ~60% of disc (left side); rest is "tucked under page edge" */}
      <div
        className="relative h-[228px] overflow-hidden"
        style={{ width: 137 }}
      >
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { x: 18 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative h-[228px] w-[228px]"
          aria-hidden
        >
          <div
            className="relative h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #f1f1f3 0%, #d4d4dc 30%, #b8b8c2 65%, #969aa3 100%)",
              boxShadow:
                "0 12px 28px -14px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.18)",
            }}
          >
            {/* faint optical track grooves */}
            <div
              className="absolute inset-3 rounded-full"
              style={{
                background:
                  "repeating-radial-gradient(circle at center, rgba(0,0,0,0.06) 0 1px, transparent 1px 3px)",
              }}
            />
            {/* printable label area (cream center) — same shape & content as modal disc, scaled for the half-tucked size */}
            <div
              className="absolute left-1/2 top-1/2 flex h-[98px] w-[98px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
              style={{
                background: "#f5ebd0",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
              }}
            >
              <span
                aria-hidden
                style={{
                  color: "#1a1a1a",
                  fontFamily: "var(--font-handwriting), cursive",
                  fontSize: "13px",
                  lineHeight: 1.1,
                  transform: "rotate(-6deg)",
                  letterSpacing: "0.02em",
                  textAlign: "center",
                }}
              >
                Customer<br />Journey
              </span>
              <span
                aria-hidden
                style={{
                  marginTop: 14,
                  color: "#1a1a1a",
                  fontFamily: "var(--font-handwriting), cursive",
                  fontSize: "10px",
                  opacity: 0.85,
                  transform: "rotate(-6deg)",
                }}
              >
                06.07 &middot; 19:14
              </span>
            </div>
            {/* spindle hole — sits between the two label lines, like a real CD */}
            <div
              className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: STAGE, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.55)" }}
            />
          </div>
        </motion.div>
      </div>
      <div
        aria-hidden
        className="mt-1 text-center"
        style={{
          color: STAMP_BLUE,
          fontFamily: "var(--font-handwriting), cursive",
          fontSize: "12px",
          transform: "rotate(-4deg)",
          background: "rgba(245,235,208,0.85)",
          padding: "2px 6px",
          borderRadius: "2px",
          maxWidth: 150,
          lineHeight: 1.15,
          textWrap: "balance",
        }}
      >
        {label}
      </div>
    </button>
  );
}

function WaxSealSvg({
  pulse,
  uniqueId = "seal-arc-env",
  emblemUrl,
}: {
  pulse: boolean;
  uniqueId?: string;
  emblemUrl?: string;
}) {
  return (
    <motion.div
      className="relative h-[92px] w-[92px]"
      animate={
        pulse
          ? {
              boxShadow: [
                "0 0 0 0 rgba(139,30,26,0.6)",
                "0 0 0 14px rgba(139,30,26,0)",
              ],
            }
          : undefined
      }
      transition={pulse ? { repeat: Infinity, duration: 3, ease: "easeOut" } : undefined}
      style={{ borderRadius: "50%" }}
    >
      <div
        className="relative flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #B83228 0%, ${WAX_RED} 70%, #5C1410 100%)`,
          boxShadow:
            "0 4px 10px -2px rgba(0,0,0,0.5), inset 0 -4px 6px rgba(0,0,0,0.35), inset 0 4px 6px rgba(255,255,255,0.15)",
        }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <path id={uniqueId} d="M 14 50 A 36 36 0 0 1 86 50" />
          </defs>
          <text
            fontFamily="var(--font-fell), serif"
            fontSize="9"
            letterSpacing="3"
            fill="#F5E6C8"
            opacity={0.92}
          >
            <textPath href={`#${uniqueId}`} startOffset="50%" textAnchor="middle">
              CONFIDENTIAL
            </textPath>
          </text>
        </svg>
        {emblemUrl ? (
          <img
            src={emblemUrl}
            alt=""
            aria-hidden
            className="h-[36px] w-[36px] select-none"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 1px 0 rgba(0,0,0,0.35)) drop-shadow(0 -1px 0 rgba(255,255,255,0.15))",
              opacity: 0.92,
            }}
            draggable={false}
          />
        ) : (
          <div
            className="text-[18px] font-bold tracking-widest"
            style={{
              color: "#F5E6C8",
              fontFamily: "var(--font-fell), serif",
              textShadow: "0 1px 1px rgba(0,0,0,0.4)",
            }}
          >
            MM
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SolutionEnvelope({
  config,
  onOpen,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open solution letter"
      className="group relative block focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B07D2D]"
    >
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { x: 6, rotate: -1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="relative"
        style={{
          width: 280,
          height: 170,
          background: `linear-gradient(180deg, ${MANILA_LIGHT} 0%, ${KRAFT} 100%)`,
          boxShadow:
            "0 14px 26px -14px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(60,40,20,0.18)",
          borderRadius: 3,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: MANILA_NOISE_URL, opacity: 0.35, mixBlendMode: "multiply" }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0"
          style={{
            height: 28,
            background: "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0))",
          }}
        />
        <div
          className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.28em]"
          style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
        >
          FOR YOUR EYES ONLY
        </div>
        <div
          aria-hidden
          className="absolute left-5 top-[34px]"
          style={{
            width: 168,
            height: 1,
            background: INK,
            opacity: 0.35,
          }}
        />
        {config.recipientLastName ? (
          <>
            <div
              className="absolute left-5 top-[44px] text-[13px] tracking-[0.18em]"
              style={{
                color: INK,
                fontFamily: "var(--font-typewriter), monospace",
                fontWeight: 600,
              }}
            >
              {[config.recipientHonorific, config.recipientLastName.toUpperCase()]
                .filter(Boolean)
                .join(" ")}
            </div>
            <div
              className="absolute left-5 top-[68px] text-[11px]"
              style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
            >
              RE: SOLUTION TO THE CASE
            </div>
          </>
        ) : (
          <div
            className="absolute left-5 top-12 text-[11px]"
            style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
          >
            RE: SOLUTION TO THE CASE
          </div>
        )}
        <div className="absolute right-3 bottom-3">
          <WaxSealSvg
            pulse={!prefersReducedMotion}
            uniqueId="seal-arc-env"
            emblemUrl={config.sealEmblemUrl}
          />
        </div>
      </motion.div>
    </button>
  );
}

function StickyHoverPreview({
  show,
  text,
  counterRotate,
  prefersReducedMotion,
}: {
  show: boolean;
  text: string;
  counterRotate: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.92 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.92 }}
          transition={{ duration: prefersReducedMotion ? 0.12 : 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 whitespace-nowrap"
          style={{
            top: "-58px",
            transform: `translateX(-50%) rotate(${counterRotate}deg)`,
            transformOrigin: "center",
          }}
          aria-hidden
        >
          <div
            className="rounded-sm border px-3 py-2 text-[11px] uppercase tracking-[0.18em]"
            style={{
              background: "#F5EBD0",
              borderColor: "rgba(58,47,34,0.35)",
              color: "#3A2F22",
              fontFamily: "var(--font-tact-mono), monospace",
              boxShadow: "0 8px 18px -8px rgba(0,0,0,0.5)",
            }}
          >
            {text}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function YellowStickyInsight({
  quote,
  onOpen,
  prefersReducedMotion,
}: {
  quote: string;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className="relative z-40"
      style={{ transform: "rotate(22deg)", isolation: "isolate" }}
    >
      <StickyHoverPreview
        show={hovering}
        text="Click to read the full field note →"
        counterRotate={-22}
        prefersReducedMotion={prefersReducedMotion}
      />
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        aria-label="Open key insight"
        className="group relative block focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B07D2D]"
      >
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -1, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="w-[216px] p-4 leading-snug"
          style={{
            background: STICKY_YELLOW,
            color: "#2A2410",
            fontFamily: "var(--font-handwriting), cursive",
            boxShadow:
              "0 1px 0 rgba(0,0,0,0.06), 0 14px 24px -10px rgba(0,0,0,0.55)",
          }}
        >
          <div className="text-[17px] uppercase tracking-[0.18em]">Key insight:</div>
          <div className="mt-1 text-[20px]">{quote}</div>
        </motion.div>
      </button>
    </div>
  );
}

function BlueStickyAction({
  label,
  onOpen,
  prefersReducedMotion,
}: {
  label: string;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className="relative z-40"
      style={{ transform: "rotate(-6deg)", isolation: "isolate" }}
    >
      <StickyHoverPreview
        show={hovering}
        text="Click to open the full creative brief →"
        counterRotate={6}
        prefersReducedMotion={prefersReducedMotion}
      />
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        aria-label="Open full creative brief"
        className="group relative block focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B07D2D]"
      >
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: 0, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="w-[204px] p-4 leading-snug"
          style={{
            background: STICKY_BLUE,
            color: "#1A2340",
            fontFamily: "var(--font-handwriting), cursive",
            boxShadow:
              "0 1px 0 rgba(0,0,0,0.06), 0 14px 24px -10px rgba(0,0,0,0.55)",
          }}
        >
          <div className="text-[22px] font-bold">{label}</div>
        </motion.div>
      </button>
    </div>
  );
}

function useFocusTrap(active: boolean, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;
    const FOCUSABLE =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    root.addEventListener("keydown", onKey);
    return () => root.removeEventListener("keydown", onKey);
  }, [active, ref]);
}

function ModalShell({
  open,
  onClose,
  ariaLabel,
  ariaLabelledBy,
  children,
  prefersReducedMotion,
  panelClassName = "",
  fullscreen = false,
  backdropColor,
}: {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  prefersReducedMotion: boolean;
  panelClassName?: string;
  fullscreen?: boolean;
  backdropColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(open, ref);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restore focus to the element that opened the modal (WCAG 2.4.3/2.4.7)
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        try {
          previouslyFocused.focus();
        } catch {
          // ignore — element may have unmounted
        }
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  const animation = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      };

  const containerClass = fullscreen
    ? "fixed inset-0 z-[100] flex items-center justify-center"
    : "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8";

  const panelClass = fullscreen
    ? `relative h-full w-full overflow-auto ${panelClassName}`
    : `relative max-h-[92vh] w-full max-w-[920px] overflow-auto ${panelClassName}`;

  const bg = backdropColor ?? "rgba(58,47,34,0.65)";

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      {...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : { "aria-label": ariaLabel })}
      className={containerClass}
      style={{ background: bg, backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.div className={panelClass} {...animation}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-[110] inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white shadow-lg hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function TacticalFieldRow({
  index,
  label,
  value,
}: {
  index: string;
  label: string;
  value: string;
}) {
  return (
    <div className="border-t-2 border-dashed pt-4" style={{ borderColor: "rgba(58,47,34,0.30)" }}>
      <div
        className="text-[9px] font-black uppercase tracking-[0.22em]"
        style={{
          color: "rgba(58,47,34,0.65)",
          fontFamily: "var(--font-tact-mono), monospace",
        }}
      >
        {`${index} // ${label}`}
      </div>
      <p
        className="mt-2 text-[15px] leading-relaxed"
        style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
      >
        {value}
      </p>
    </div>
  );
}

function ClientCardModal({
  config,
  onClose,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabel="Client card"
      prefersReducedMotion={prefersReducedMotion}
    >
      <article
        className="relative border-4 p-6 md:p-10"
        style={{
          background: MANILA_LIGHT,
          borderColor: INK,
          boxShadow: "12px 12px 0 0 rgba(58,47,34,0.85)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: MANILA_NOISE_URL,
            opacity: 0.35,
            mixBlendMode: "multiply",
          }}
        />
        <header className="relative mb-6">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.32em]"
            style={{
              color: OCHRE,
              fontFamily: "var(--font-tact-mono), monospace",
            }}
          >
            {"// CLIENT CARD"}
          </div>
          <div
            className="mt-1 text-[14px] font-black uppercase tracking-[0.22em]"
            style={{
              color: INK,
              fontFamily: "var(--font-tact-mono), monospace",
            }}
          >
            CASE NO. {config.caseNumber}
          </div>
          <h2
            className="mt-4 text-2xl md:text-3xl"
            style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
          >
            {config.clientName}
          </h2>
          <div
            className="mt-1 text-[11px] uppercase tracking-[0.32em]"
            style={{
              color: "rgba(58,47,34,0.7)",
              fontFamily: "var(--font-tact-mono), monospace",
            }}
          >
            {config.tagline}
          </div>
        </header>
        <div className="relative space-y-5">
          <TacticalFieldRow index="01" label="TARGET" value={config.headline} />
          <TacticalFieldRow index="02" label="FRICTION" value={config.painPoint} />
          <TacticalFieldRow index="03" label="AUTOMATION" value={config.creativeIssue} />
          <TacticalFieldRow index="04" label="DELIVERY" value={config.objective} />
          <TacticalFieldRow index="05" label="DELIVERABLES" value={config.deliverables} />
        </div>
      </article>
    </ModalShell>
  );
}

function CaseFilmModal({
  youtubeId,
  onClose,
  prefersReducedMotion,
}: {
  youtubeId: string;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabel="Case film"
      prefersReducedMotion={prefersReducedMotion}
    >
      <div className="relative">
        <div aria-hidden className="absolute left-1/2 -top-12 -translate-x-1/2 flex items-end gap-6">
          <span
            className="block"
            style={{
              width: 2,
              height: 56,
              background: "#aaa",
              transform: "rotate(-22deg)",
              transformOrigin: "bottom center",
              boxShadow: "0 0 0 0.5px rgba(0,0,0,0.4)",
            }}
          />
          <span
            className="block"
            style={{
              width: 2,
              height: 56,
              background: "#aaa",
              transform: "rotate(22deg)",
              transformOrigin: "bottom center",
              boxShadow: "0 0 0 0.5px rgba(0,0,0,0.4)",
            }}
          />
        </div>
        <div
          className="relative"
          style={{
            background:
              "linear-gradient(180deg, #d8c39a 0%, #b89a6a 55%, #8b6e3f 100%)",
            padding: "22px 22px 56px",
            borderRadius: "14px 14px 18px 18px / 14px 14px 22px 22px",
            boxShadow:
              "0 24px 60px -20px rgba(0,0,0,0.8), 0 6px 12px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)",
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "32px / 28px",
              background: "#0a0a0a",
              boxShadow: "inset 0 0 0 6px #1a1a1a, inset 0 0 40px rgba(0,0,0,0.85)",
              aspectRatio: "16 / 11",
            }}
          >
            <iframe
              title="Case film"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            {/* CRT scanlines */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(180deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)",
                mixBlendMode: "overlay",
                opacity: 0.5,
              }}
            />
          </div>
          <div className="absolute left-0 right-0 bottom-2 flex items-center justify-between px-6">
            <span
              className="text-[10px] uppercase tracking-[0.28em]"
              style={{
                color: "#3a2a14",
                fontFamily: "var(--font-typewriter), monospace",
              }}
            >
              CH 47 · THE CASE FILM
            </span>
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className="block rounded-full"
                style={{
                  width: 18,
                  height: 18,
                  background: "radial-gradient(circle at 30% 30%, #f1d99a, #6e4f1f 70%)",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.5)",
                }}
              />
              <span
                aria-hidden
                className="block rounded-full"
                style={{
                  width: 18,
                  height: 18,
                  background: "radial-gradient(circle at 30% 30%, #f1d99a, #6e4f1f 70%)",
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.5)",
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function InsightModal({
  config,
  onClose,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabel="Key insight"
      prefersReducedMotion={prefersReducedMotion}
      panelClassName="max-w-[520px]"
    >
      <div
        className="relative p-10"
        style={{
          background: STICKY_YELLOW,
          color: "#2A2410",
          fontFamily: "var(--font-handwriting), cursive",
          boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
          transform: "rotate(-1deg)",
        }}
      >
        <div className="text-[18px] uppercase tracking-[0.2em]">Key Insight</div>
        <p className="mt-5 text-[28px] leading-tight">{config.insightQuote}</p>
        {config.insightAttribution && (
          <div
            className="mt-8 text-[14px]"
            style={{
              color: "#5A4A2A",
              fontFamily: "var(--font-typewriter), monospace",
            }}
          >
            — {config.insightAttribution}
          </div>
        )}
      </div>
    </ModalShell>
  );
}

function BriefField({
  label,
  value,
  check,
}: {
  label: string;
  value: ReactNode;
  check?: boolean;
}) {
  return (
    <div className="relative mt-5 first:mt-0">
      <div className="flex items-baseline gap-3">
        <span
          className="shrink-0 text-[10.5px] uppercase tracking-[0.18em]"
          style={{
            color: INK,
            fontFamily: "var(--font-tact-mono), monospace",
          }}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="flex-1 self-end translate-y-[2px]"
          style={{
            borderBottom: `1px solid ${INK}`,
            opacity: 0.55,
            height: 1,
          }}
        />
      </div>
      <p
        className="mt-2 text-[14px] leading-[1.65]"
        style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
      >
        {value}
      </p>
      {check && (
        <span
          aria-hidden
          className="absolute -right-1 top-0 select-none"
          style={{ color: STAMP_RED, transform: "rotate(-12deg)" }}
        >
          <Check className="h-6 w-6" strokeWidth={2.4} />
        </span>
      )}
    </div>
  );
}

function FullBriefModal({
  config,
  onClose,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabel="Full creative brief"
      prefersReducedMotion={prefersReducedMotion}
      panelClassName="max-w-[760px]"
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: "translate(14px, 18px) rotate(1.6deg)",
            zIndex: 0,
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background: CREAM,
              boxShadow:
                "0 10px 30px -10px rgba(0,0,0,0.55), 0 2px 6px -2px rgba(0,0,0,0.4)",
              backgroundImage: PAPER_NOISE_URL,
              backgroundBlendMode: "multiply",
              backgroundSize: "220px 220px",
            }}
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(79,111,166,0.42), rgba(79,111,166,0.22))",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>
        <div
          className="relative p-8 md:p-12"
          style={{
            background: CREAM,
            transform: "rotate(-2deg)",
            zIndex: 1,
            boxShadow:
              "0 22px 50px -18px rgba(0,0,0,0.6), 0 4px 10px -2px rgba(0,0,0,0.35)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: PAPER_NOISE_URL,
              opacity: 0.35,
              mixBlendMode: "multiply",
            }}
          />
          <header className="relative">
            <div
              className="text-center text-[11px] uppercase tracking-[0.45em]"
              style={{
                color: INK,
                fontFamily: "var(--font-fell), serif",
                opacity: 0.85,
              }}
            >
              MARTELLI &amp; CO. · CREATIVE DEPARTMENT
            </div>
            <div
              className="mt-1 h-px w-full"
              style={{ background: INK, opacity: 0.4 }}
            />
            <h2
              className="mt-3 text-2xl"
              style={{
                color: INK,
                fontFamily: "var(--font-typewriter), monospace",
              }}
            >
              Creative Brief
            </h2>
          </header>
          <div className="relative mt-6">
            <BriefField label="Client" value={config.clientName} check />
            <BriefField label="Project" value={config.headline} />
            <BriefField
              label="Background"
              value={config.background ?? "—"}
            />
            <BriefField label="Creative Issue" value={config.creativeIssue} />
            <BriefField label="Objective" value={config.objective} check />
            <BriefField label="Target" value={config.target ?? "—"} />
            <BriefField label="Tone" value={config.tone ?? "—"} />
            <BriefField label="Deliverables" value={config.deliverables} />
            <BriefField label="Timing" value={config.timing ?? "—"} />
          </div>
          <div className="relative mt-8 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  width: 44,
                  height: 44,
                  border: `1.5px solid ${INK}`,
                  fontFamily: "var(--font-handwriting), cursive",
                  fontSize: 22,
                  color: INK,
                  transform: "rotate(-4deg)",
                }}
              >
                MM
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ color: INK, opacity: 0.7, fontFamily: "var(--font-tact-mono), monospace" }}
              >
                M. Martelli · Creative Lead
              </span>
            </div>
            <Stamp color={STAMP_RED} rotate={-8} opacity={0.6}>
              APPROVED
            </Stamp>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function AudioModal({
  audioUrl,
  audioCaption,
  audioCaptionEyebrow,
  audioDuration,
  onClose,
  prefersReducedMotion,
}: {
  audioUrl: string;
  audioCaption?: string;
  audioCaptionEyebrow?: string;
  audioDuration?: string;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnd);
    // Auto-play on open. The click that opened the modal counts as a user
    // gesture, so browser autoplay policies allow this. If a browser still
    // blocks it (rare), the native controls let the user start manually.
    el.play().catch(() => {});
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (playing) {
      controls.start({
        rotate: 360,
        transition: { repeat: Infinity, duration: 3.2, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [playing, controls, prefersReducedMotion]);

  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabel="Field recording"
      prefersReducedMotion={prefersReducedMotion}
      panelClassName="max-w-[560px]"
    >
      <div
        className="relative flex flex-col items-center p-8 md:p-12"
        style={{
          background: MANILA_LIGHT,
          boxShadow: "0 24px 60px -18px rgba(0,0,0,0.65)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: MANILA_NOISE_URL,
            opacity: 0.3,
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="relative flex items-baseline gap-3 text-[11px] font-bold uppercase tracking-[0.32em]"
          style={{ color: INK, fontFamily: "var(--font-tact-mono), monospace" }}
        >
          <span>{"// FIELD RECORDING"}</span>
          {audioDuration ? (
            <span style={{ opacity: 0.75 }}>· {audioDuration}</span>
          ) : null}
        </div>
        <motion.div
          animate={controls}
          className="relative mt-6 h-[280px] w-[280px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #f1f1f3 0%, #d4d4dc 30%, #b8b8c2 65%, #969aa3 100%)",
            boxShadow:
              "0 22px 40px -18px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.18)",
          }}
          aria-hidden
        >
          {/* faint optical track grooves */}
          <div
            className="absolute inset-6 rounded-full"
            style={{
              background:
                "repeating-radial-gradient(circle at center, rgba(0,0,0,0.05) 0 1px, transparent 1px 4px)",
            }}
          />
          {/* printable label area (cream center) with Sharpie title */}
          <div
            className="absolute left-1/2 top-1/2 flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
            style={{
              background: "#f5ebd0",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
            }}
          >
            <span
              style={{
                color: "#1a1a1a",
                fontFamily: "var(--font-handwriting), cursive",
                fontSize: "16px",
                lineHeight: 1.1,
                transform: "rotate(-6deg)",
                letterSpacing: "0.02em",
                textAlign: "center",
              }}
            >
              Customer<br />Journey
            </span>
            <span
              style={{
                marginTop: 6,
                color: "#1a1a1a",
                fontFamily: "var(--font-handwriting), cursive",
                fontSize: "12px",
                opacity: 0.85,
                transform: "rotate(-6deg)",
              }}
            >
              06.07 &middot; 19:14
            </span>
          </div>
          {/* spindle hole */}
          <div
            className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: STAGE, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)" }}
          />
        </motion.div>
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          controls
          className="relative mt-6 w-full max-w-md"
          aria-label="Overview audio recording"
        />
        {audioCaption || audioCaptionEyebrow ? (
          <div className="relative mt-5 max-w-md text-center">
            {audioCaptionEyebrow ? (
              <div
                className="mb-2 text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{
                  color: INK,
                  fontFamily: "var(--font-tact-mono), monospace",
                  opacity: 0.85,
                }}
              >
                {`// ${audioCaptionEyebrow}`}
              </div>
            ) : null}
            {audioCaption ? (
              <p
                className="text-[14px] leading-[1.65]"
                style={{
                  color: INK,
                  fontFamily: "var(--font-typewriter), monospace",
                }}
              >
                {audioCaption}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </ModalShell>
  );
}

function ExhibitsModal({
  config,
  onClose,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  const [slideIdx, setSlideIdx] = useState(0);
  const total = config.deck.count;
  const padded = useMemo(() => String(slideIdx + 1).padStart(2, "0"), [slideIdx]);
  const src = `/blueprints/decks/${config.deck.dir}/slide-${padded}.jpg`;

  const prev = useCallback(() => setSlideIdx((v) => (v - 1 + total) % total), [total]);
  const next = useCallback(() => setSlideIdx((v) => (v + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const letter = String.fromCharCode(65 + slideIdx + 1);

  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabelledBy="exhibits-modal-title"
      prefersReducedMotion={prefersReducedMotion}
      fullscreen
      backdropColor="rgba(232,217,176,0.96)"
      panelClassName="flex items-center justify-center p-4 sm:p-8"
    >
      <h2 id="exhibits-modal-title" className="sr-only">
        Exhibits — Slide {slideIdx + 1} of {total}
      </h2>
      <div
        className="relative w-full max-w-[1100px] rounded-md p-4 md:p-6"
        style={{
          background: "linear-gradient(180deg, #D4B07A 0%, #C9A36A 100%)",
          boxShadow:
            "0 24px 50px -16px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(60,40,20,0.25)",
        }}
      >
        <div
          className="relative rounded-sm p-3 md:p-4 overflow-hidden"
          style={{
            background: "#EBDDB5",
            boxShadow:
              "inset 0 0 0 1px rgba(60,40,20,0.08), 0 6px 16px -8px rgba(0,0,0,0.3)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: PAPER_NOISE_URL,
              opacity: 0.35,
              mixBlendMode: "multiply",
            }}
          />
          <div
            className="absolute top-3 left-4 z-10 text-[10px] uppercase tracking-[0.22em]"
            style={{
              color: "rgba(58,47,34,0.65)",
              fontFamily: "var(--font-fell), serif",
            }}
          >
            Exhibit {letter}
          </div>
          {/* Wax seal CONFIDENTIAL corner badge */}
          <div
            className="absolute top-3 right-12 z-10 origin-top-right"
            style={{ transform: "scale(0.55)" }}
          >
            <WaxSealSvg
              pulse={false}
              uniqueId={`seal-arc-exhibit-${slideIdx}`}
              emblemUrl={config.sealEmblemUrl}
            />
          </div>
          <div className="absolute top-3 right-[110px] z-10">
            <Stamp color={STAMP_RED} rotate={-6} size={11}>
              Filed
            </Stamp>
          </div>
          <div className="relative aspect-[1400/782] overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={padded}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={
                    total === 1
                      ? `Exhibit ${letter} blueprint`
                      : `Blueprint slide ${slideIdx + 1} of ${total}`
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 1100px"
                  className="object-contain"
                  priority={slideIdx === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div
            className="mt-3 text-center text-[11px] uppercase tracking-[0.2em]"
            style={{
              color: "rgba(58,47,34,0.7)",
              fontFamily: "var(--font-fell), serif",
            }}
          >
            {total > 1 ? `Slide ${slideIdx + 1} of ${total}` : "Single exhibit"}
          </div>
          {config.exhibitNarrative ? (
            <div className="mx-auto mt-5 max-w-[680px] border-t pt-4" style={{ borderColor: "rgba(58,47,34,0.18)" }}>
              <div
                className="mb-2 text-[10px] uppercase tracking-[0.32em]"
                style={{
                  color: "rgba(58,47,34,0.65)",
                  fontFamily: "var(--font-tact-mono), monospace",
                }}
              >
                {"// CASE OFFICER'S NOTE"}
              </div>
              <p
                className="text-[13px] leading-[1.7]"
                style={{
                  color: INK,
                  fontFamily: "var(--font-typewriter), monospace",
                }}
              >
                {config.exhibitNarrative}
              </p>
            </div>
          ) : null}
        </div>

        {total > 1 ? (
        <>
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="group absolute -left-3 top-1/2 -translate-y-1/2 md:-left-6"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border shadow-md transition-transform group-hover:-translate-y-0.5"
            style={{
              background: CREAM,
              borderColor: "rgba(58,47,34,0.3)",
              color: INK,
            }}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </div>
          <SilverPaperclip className="absolute -top-3 left-1/2 h-[44px] w-[20px] -translate-x-1/2" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="group absolute -right-3 top-1/2 -translate-y-1/2 md:-right-6"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border shadow-md transition-transform group-hover:-translate-y-0.5"
            style={{
              background: CREAM,
              borderColor: "rgba(58,47,34,0.3)",
              color: INK,
            }}
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </div>
          <SilverPaperclip className="absolute -top-3 left-1/2 h-[44px] w-[20px] -translate-x-1/2" />
        </button>
        </>
        ) : null}
      </div>
    </ModalShell>
  );
}

function InfographicThumbnail({
  imageUrl,
  label,
  previewText,
  onOpen,
  prefersReducedMotion,
}: {
  imageUrl: string;
  label?: string;
  previewText?: string;
  onOpen: () => void;
  prefersReducedMotion: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="relative z-30 inline-block" style={{ isolation: "isolate" }}>
      {previewText ? (
        <StickyHoverPreview
          show={hovering}
          text={previewText}
          counterRotate={2}
          prefersReducedMotion={prefersReducedMotion}
        />
      ) : null}
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        aria-label="Open the Founder's Growth Architecture infographic"
        className="group relative block focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B07D2D]"
      >
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -1.5, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="relative"
          style={{ transform: "rotate(-2deg)" }}
        >
          <SilverPaperclip className="absolute -top-3 left-6 z-10 h-[52px] w-[22px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]" />
          <div
            className="relative w-[280px] p-2"
            style={{
              background: "#fafaf6",
              boxShadow:
                "0 1px 0 rgba(0,0,0,0.06), 0 14px 24px -14px rgba(0,0,0,0.55)",
            }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: "#0c0c10" }}>
              <Image
                src={imageUrl}
                alt="Founder's Growth Architecture infographic preview"
                fill
                sizes="280px"
                className="object-cover transition group-hover:opacity-95"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              <div className="absolute bottom-2 right-2">
                <Stamp color={STAMP_BLUE} rotate={-3} size={9}>
                  Schema
                </Stamp>
              </div>
            </div>
            {label ? (
              <div
                className="mt-2 text-center text-[9px] uppercase tracking-[0.3em]"
                style={{
                  color: "rgba(58,47,34,0.7)",
                  fontFamily: "var(--font-tact-mono), monospace",
                }}
              >
                {label}
              </div>
            ) : null}
          </div>
        </motion.div>
      </button>
    </div>
  );
}

function InfographicModal({
  imageUrl,
  headerLabel,
  caption,
  onClose,
  prefersReducedMotion,
}: {
  imageUrl: string;
  headerLabel?: string;
  caption?: string;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabel="Founder's Growth Architecture infographic"
      prefersReducedMotion={prefersReducedMotion}
      fullscreen
      backdropColor="rgba(232,217,176,0.96)"
      panelClassName="flex items-start justify-center p-4 sm:p-8"
    >
      <div
        className="relative w-full max-w-[1100px] rounded-md p-4 md:p-6"
        style={{
          background: "linear-gradient(180deg, #D4B07A 0%, #C9A36A 100%)",
          boxShadow:
            "0 24px 50px -16px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(60,40,20,0.25)",
        }}
      >
        <div
          className="relative rounded-sm p-3 md:p-4"
          style={{
            background: "#EBDDB5",
            boxShadow:
              "inset 0 0 0 1px rgba(60,40,20,0.08), 0 6px 16px -8px rgba(0,0,0,0.3)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: PAPER_NOISE_URL,
              opacity: 0.35,
              mixBlendMode: "multiply",
            }}
          />
          <div
            className="absolute top-3 left-4 z-10 text-[10px] uppercase tracking-[0.22em]"
            style={{
              color: "rgba(58,47,34,0.65)",
              fontFamily: "var(--font-fell), serif",
            }}
          >
            {headerLabel ?? "Schema · Architecture Overview"}
          </div>
          <div className="absolute top-3 right-4 z-10">
            <Stamp color={STAMP_RED} rotate={-6} size={11}>
              Filed
            </Stamp>
          </div>
          <div className="relative mt-7 overflow-hidden bg-white">
            <Image
              src={imageUrl}
              alt="Founder's Growth Architecture — HubSpot Lifecycle & Data Governance Framework"
              width={2000}
              height={2000}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="block h-auto w-full"
              priority
            />
          </div>
          {caption ? (
            <div
              className="mx-auto mt-5 max-w-[680px] border-t pt-4"
              style={{ borderColor: "rgba(58,47,34,0.18)" }}
            >
              <div
                className="mb-2 text-center text-[10px] uppercase tracking-[0.32em]"
                style={{
                  color: "rgba(58,47,34,0.65)",
                  fontFamily: "var(--font-tact-mono), monospace",
                }}
              >
                {"// CASE OFFICER'S NOTE"}
              </div>
              <p
                className="text-center text-[13px] leading-[1.7]"
                style={{
                  color: INK,
                  fontFamily: "var(--font-typewriter), monospace",
                }}
              >
                {caption}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </ModalShell>
  );
}

function SolutionLetterModal({
  config,
  onClose,
  prefersReducedMotion,
}: {
  config: PageConfig;
  onClose: () => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <ModalShell
      open
      onClose={onClose}
      ariaLabel="Solution letter"
      prefersReducedMotion={prefersReducedMotion}
      panelClassName="max-w-[720px]"
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-sm p-7 md:p-10"
        style={{
          background: CREAM,
          boxShadow:
            "0 24px 50px -16px rgba(0,0,0,0.7), 0 1px 0 #e8e0cc, 0 3px 0 #ddd3b8, 0 5px 0 #cfc4a5, 0 8px 20px -4px rgba(0,0,0,0.25)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-sm"
          style={{
            backgroundImage: PAPER_NOISE_URL,
            opacity: 0.18,
            mixBlendMode: "multiply",
          }}
        />
        <div
          aria-hidden
          className="absolute left-3 top-7 bottom-7 flex flex-col justify-between"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "rgba(10,10,15,0.3)" }}
            />
          ))}
        </div>
        <div className="absolute right-6 top-6">
          <Stamp color={STAMP_RED} rotate={-10} opacity={0.45} size={16}>
            SOLVED
          </Stamp>
        </div>
        <div className="relative pl-6">
          <div
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{
              color: INK,
              fontFamily: "var(--font-fell), serif",
              opacity: 0.75,
            }}
          >
            From the desk of M. Martelli
          </div>
          <p
            className="mt-6 text-[15px] leading-[1.7]"
            style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
          >
            DEAR {config.recipientFirstName.toUpperCase()},
          </p>
          <p
            className="mt-4 text-[15px] leading-[1.8] whitespace-pre-line"
            style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
          >
            {config.solutionLetterBody}
          </p>
          <div className="mt-8">
            <div
              className="text-[15px]"
              style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
            >
              — Matt Martelli
            </div>
            <div
              className="mt-1 text-[34px] leading-none"
              style={{
                color: INK,
                fontFamily: "var(--font-handwriting), cursive",
                transform: "rotate(-3deg)",
                display: "inline-block",
              }}
            >
              Matt Martelli
            </div>
          </div>
          <div className="mt-8">
            <a
              href={config.bookingUrl ?? "#book"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex items-center gap-2 border-[2.5px] px-5 py-2.5 text-[12px] uppercase tracking-[0.32em] transition hover:translate-y-[-1px]"
              style={{
                color: STAMP_RED,
                borderColor: STAMP_RED,
                fontFamily: "var(--font-fell), serif",
                background: "transparent",
                boxShadow: "inset 0 0 6px rgba(178,58,48,0.18)",
              }}
            >
              [ SCHEDULE THE WALKTHROUGH
              <ArrowRight className="h-4 w-4" aria-hidden />
              ]
            </a>
          </div>
        </div>
      </motion.div>
    </ModalShell>
  );
}

function FolderTopBand() {
  return (
    <div
      className="mb-6 inline-flex items-center gap-2 rounded-sm border bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.32em]"
      style={{
        borderColor: "rgba(255,235,200,0.15)",
        color: "rgba(255,235,200,0.7)",
        fontFamily: "var(--font-tact-mono), monospace",
      }}
    >
      INTERNAL FILE ROOM · DRAWER 04
    </div>
  );
}

function FolderTab({
  config,
}: {
  config: PageConfig;
}) {
  return (
    <div
      className="absolute left-8 z-20"
      style={{
        top: "-40px",
        background: `linear-gradient(180deg, ${MANILA_LIGHT} 0%, ${MANILA_DARK} 100%)`,
        clipPath: "polygon(6% 0%, 94% 0%, 100% 65%, 100% 100%, 0% 100%, 0% 65%)",
        padding: "10px 28px 18px",
        boxShadow:
          "0 -3px 6px -2px rgba(0,0,0,0.3), 0 6px 14px -5px rgba(0,0,0,0.55)",
        minWidth: "min(300px, calc(100% - 32px))",
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.4em]"
        style={{ color: INK, fontFamily: "var(--font-tact-mono), monospace" }}
      >
        Case No. {config.caseNumber}
      </div>
      <div
        className="mt-0.5 text-[14px] font-bold tracking-[0.18em]"
        style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
      >
        {config.clientName}
      </div>
    </div>
  );
}

function ThreeHolePunch() {
  return (
    <div
      aria-hidden
      className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 space-y-16 lg:block"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-4 w-4 rounded-full"
          style={{
            background: "rgba(0,0,0,0.5)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
          }}
        />
      ))}
    </div>
  );
}

function FolderSpread({
  config,
  openModal,
  openInfographic,
  prefersReducedMotion,
}: {
  config: PageConfig;
  openModal: (key: ModalKey) => void;
  openInfographic: (idx: number) => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="relative w-full" style={{ perspective: "1800px" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 h-10 w-[88%] -translate-x-1/2 rounded-[50%] blur-xl"
        style={{ background: "rgba(0,0,0,0.55)" }}
      />
      <div
        className="relative grid w-full grid-cols-1 overflow-hidden rounded-[6px] lg:grid-cols-2"
        style={{
          minHeight: "min(640px, 80vh)",
          background: `linear-gradient(180deg, ${MANILA_LIGHT} 0%, ${MANILA} 100%)`,
          boxShadow:
            "0 30px 60px -25px rgba(0,0,0,0.7), 0 10px 22px -8px rgba(0,0,0,0.55)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{ backgroundImage: MANILA_NOISE_URL, opacity: 0.35 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 lg:block"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(40,25,8,0.45) 0%, rgba(40,25,8,0) 70%)",
          }}
        />

        <ThreeHolePunch />

        <div className="absolute right-3 top-6 z-10 sm:right-6">
          <Stamp color={STAMP_RED} rotate={-9} size={18}>
            CONFIDENTIAL
          </Stamp>
        </div>

        <div className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
          <Stamp color={STAMP_BLUE} rotate={-2} size={11}>
            DATE RECEIVED · {config.caseDate}
          </Stamp>
        </div>

        <section
          className="relative p-6 sm:p-10"
          aria-labelledby="brief-section-title"
        >
          <div className="relative mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-start">
            <PolaroidLogo
              config={config}
              onOpen={() => openModal("client-card")}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

          <div
            className="relative mt-8 rounded-sm p-5 sm:p-6"
            style={{
              background: CREAM,
              boxShadow:
                "0 1px 0 rgba(0,0,0,0.06), 0 6px 14px -10px rgba(0,0,0,0.4), 0 18px 28px -22px rgba(0,0,0,0.4)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-sm"
              style={{
                backgroundImage: PAPER_NOISE_URL,
                opacity: 0.3,
                mixBlendMode: "multiply",
              }}
            />
            <div className="absolute right-2 top-2 sm:-right-2">
              <Stamp color={STAMP_RED} rotate={8} size={14} opacity={0.78}>
                DRAFT
              </Stamp>
            </div>
            {/* Blue sticky on the left margin, pointing right toward the CLIENT field — sits below the title so it doesn't block it */}
            <div className="absolute -left-16 top-24 z-30 hidden md:block">
              <BlueStickyAction
                label="READ FULL BRIEF →"
                onOpen={() => openModal("full-brief")}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
            <div
              className="relative text-[10px] uppercase tracking-[0.45em]"
              style={{ color: INK, fontFamily: "var(--font-tact-mono), monospace", opacity: 0.75 }}
            >
              Internal Memorandum
            </div>
            <h2
              id="brief-section-title"
              className="relative mt-1 text-2xl"
              style={{ color: INK, fontFamily: "var(--font-typewriter), monospace" }}
            >
              Creative Brief
            </h2>
            <div
              className="relative mt-1 h-px w-full"
              style={{ background: INK, opacity: 0.6 }}
            />
            <div className="relative mt-5 space-y-4" style={{ color: INK }}>
              <div>
                <div
                  className="mb-1 inline-block border-b text-[10px] uppercase tracking-[0.32em]"
                  style={{
                    fontFamily: "var(--font-tact-mono), monospace",
                    color: INK,
                    borderColor: INK,
                  }}
                >
                  Client
                </div>
                <div
                  className="text-[14px] leading-[1.6]"
                  style={{
                    fontFamily: "var(--font-typewriter), monospace",
                    color: INK,
                  }}
                >
                  {config.clientName}
                </div>
              </div>
              <div>
                <div
                  className="mb-1 inline-block border-b text-[10px] uppercase tracking-[0.32em]"
                  style={{
                    fontFamily: "var(--font-tact-mono), monospace",
                    color: INK,
                    borderColor: INK,
                  }}
                >
                  Project
                </div>
                <div
                  className="text-[14px] leading-[1.6]"
                  style={{
                    fontFamily: "var(--font-typewriter), monospace",
                    color: INK,
                  }}
                >
                  {config.headline}
                </div>
              </div>
              <div>
                <div
                  className="mb-1 inline-block border-b text-[10px] uppercase tracking-[0.32em]"
                  style={{
                    fontFamily: "var(--font-tact-mono), monospace",
                    color: INK,
                    borderColor: INK,
                  }}
                >
                  Pain Point
                </div>
                <div
                  className="text-[14px] leading-[1.6]"
                  style={{
                    fontFamily: "var(--font-typewriter), monospace",
                    color: INK,
                  }}
                >
                  {config.painPoint}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: absolute-positioned sticky in top-right of left page */}
          <div className="absolute right-2 top-32 z-10 hidden sm:block">
            <YellowStickyInsight
              quote={config.insightQuote}
              onOpen={() => openModal("insight")}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Mobile: inline yellow sticky so the entry point isn't lost on phones */}
          <div className="relative mt-8 flex justify-start pl-2 sm:hidden">
            <div style={{ transform: "rotate(-15deg)" }}>
              <YellowStickyInsight
                quote={config.insightQuote}
                onOpen={() => openModal("insight")}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>

          {/* Mobile/tablet: inline blue sticky at the bottom of the brief, since the absolute one is desktop-only */}
          <div className="relative mt-10 flex justify-end md:hidden">
            <BlueStickyAction
              label="READ FULL BRIEF →"
              onOpen={() => openModal("full-brief")}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Easter eggs: one or more infographic thumbnails on the left page */}
          {config.infographics && config.infographics.length > 0 ? (
            <div className="relative mt-10 flex flex-wrap justify-center gap-6 sm:justify-start sm:pl-2">
              {config.infographics.map((info, idx) => (
                <InfographicThumbnail
                  key={info.url + idx}
                  imageUrl={info.url}
                  label={info.label}
                  previewText={info.hoverPreview}
                  onOpen={() => openInfographic(idx)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          ) : null}
        </section>

        <section
          className="relative p-6 sm:p-10"
          aria-labelledby="film-section-title"
        >
          <div
            className="relative rounded-sm p-5 sm:p-6"
            style={{
              background: CREAM,
              boxShadow:
                "0 1px 0 rgba(0,0,0,0.06), 0 6px 14px -10px rgba(0,0,0,0.4), 0 18px 28px -22px rgba(0,0,0,0.4)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-sm"
              style={{
                backgroundImage: PAPER_NOISE_URL,
                opacity: 0.3,
                mixBlendMode: "multiply",
              }}
            />
            <header className="relative">
              <div
                className="text-[10px] uppercase tracking-[0.45em]"
                style={{
                  color: INK,
                  fontFamily: "var(--font-tact-mono), monospace",
                  opacity: 0.75,
                }}
              >
                Exhibit · A
              </div>
              <h2
                className="mt-1 text-2xl"
                style={{
                  color: INK,
                  fontFamily: "var(--font-typewriter), monospace",
                }}
              >
                Case Film
              </h2>
              <div className="mt-1 h-px w-full" style={{ background: INK, opacity: 0.6 }} />
            </header>

            <div className="relative mt-4">
              <EvidencePhoto
                youtubeId={config.youtubeId}
                onOpen={() => openModal("case-film")}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            <div
              className="relative mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.32em]"
              style={{
                color: INK,
                fontFamily: "var(--font-tact-mono), monospace",
                opacity: 0.8,
              }}
            >
              <span>Recovered · {config.caseDate}</span>
              <span>Run time · 00:58</span>
            </div>

            <p
              className="relative mt-4 text-[13px] leading-[1.65]"
              style={{
                color: INK,
                fontFamily: "var(--font-typewriter), monospace",
              }}
            >
              {config.subheadline}
            </p>
          </div>

          <div className="relative mt-6 grid grid-cols-1 items-end gap-6 sm:grid-cols-2 sm:gap-4">
            <div className="relative -ml-2 sm:-ml-4" style={{ marginTop: -28 }}>
              <CdHalfTucked
                label={config.audioLabel ?? "FIELD RECORDING · INTERVIEW"}
                previewText={config.cdHoverPreview}
                onOpen={() => openModal("audio")}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
            <div className="relative">
              <ExhibitsThumbnails
                config={config}
                onOpen={() => openModal("exhibits")}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>

          <div className="relative mt-6 flex justify-end pr-2">
            <SolutionEnvelope
              config={config}
              onOpen={() => openModal("solution")}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </section>
      </div>
      {/* Tab sits OUTSIDE the overflow-hidden grid so it can protrude above the folder edge */}
      <FolderTab config={config} />
    </div>
  );
}

export default function CaseFile({ config }: { config: PageConfig }) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const [modal, setModal] = useState<ModalKey>(null);
  const [activeInfoIdx, setActiveInfoIdx] = useState(0);
  const close = useCallback(() => setModal(null), []);
  const open = useCallback((key: ModalKey) => setModal(key), []);
  const openInfographic = useCallback((idx: number) => {
    setActiveInfoIdx(idx);
    setModal("infographic");
  }, []);
  const activeInfo = config.infographics?.[activeInfoIdx];

  const cssVars: CSSProperties = {
    ["--ink" as string]: INK,
    ["--stamp" as string]: STAMP_RED,
    ["--manila" as string]: MANILA,
    ["--manila-dark" as string]: MANILA_DARK,
    ["--manila-light" as string]: MANILA_LIGHT,
    ["--cream" as string]: CREAM,
    ["--accent" as string]: config.primaryColor,
  };

  return (
    <main
      className={`${typewriter.variable} ${courier.variable} ${tactMono.variable} ${handwriting.variable} ${fell.variable} min-h-screen w-full`}
      style={{ ...cssVars, background: STAGE, color: INK }}
    >
      <StampRoughFilter />
      <div
        className="relative min-h-screen w-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #1b1208 0%, #0a0703 60%, #000 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 0%, rgba(255,210,140,0.18), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            opacity: 0.18,
            backgroundImage: `repeating-linear-gradient(
              92deg,
              rgba(75,45,15,0.55) 0px,
              rgba(40,22,8,0.0) 2px,
              rgba(40,22,8,0.0) 7px,
              rgba(75,45,15,0.35) 9px
            )`,
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 pb-24 pt-10 sm:px-8 sm:pt-16">
          <FolderTopBand />
          <FolderSpread
            config={config}
            openModal={open}
            openInfographic={openInfographic}
            prefersReducedMotion={reduced}
          />
          <footer
            className="mt-16 w-full border-t pt-6 text-center text-[10px] uppercase tracking-[0.35em]"
            style={{
              borderColor: "rgba(255,235,200,0.1)",
              color: "rgba(255,235,200,0.4)",
              fontFamily: "var(--font-tact-mono), monospace",
            }}
          >
            File {config.caseNumber} · Property of the Case Room · Return after viewing
          </footer>
        </div>
      </div>

      <AnimatePresence>
        {modal === "client-card" && (
          <ClientCardModal
            key="client-card"
            config={config}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        )}
        {modal === "case-film" && (
          <CaseFilmModal
            key="case-film"
            youtubeId={config.youtubeId}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        )}
        {modal === "insight" && (
          <InsightModal
            key="insight"
            config={config}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        )}
        {modal === "full-brief" && (
          <FullBriefModal
            key="full-brief"
            config={config}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        )}
        {modal === "audio" && (
          <AudioModal
            key="audio"
            audioUrl={config.audioUrl}
            audioCaption={config.audioCaption}
            audioCaptionEyebrow={config.audioCaptionEyebrow}
            audioDuration={config.audioDuration}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        )}
        {modal === "exhibits" && (
          <ExhibitsModal
            key="exhibits"
            config={config}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        )}
        {modal === "solution" && (
          <SolutionLetterModal
            key="solution"
            config={config}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        )}
        {modal === "infographic" && activeInfo ? (
          <InfographicModal
            key={`infographic-${activeInfoIdx}`}
            imageUrl={activeInfo.url}
            headerLabel={activeInfo.headerLabel}
            caption={activeInfo.caption}
            onClose={close}
            prefersReducedMotion={reduced}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
