import type { Config } from "tailwindcss";

/**
 * Design tokens for the "systems architect's command center" aesthetic.
 * Edit colors / spacing / radii / shadows here to retune the whole site.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Layered near-black backgrounds.
        // NOTE: named "night" (not "base") to avoid colliding with the
        // built-in `text-base` font-size utility.
        night: "#0A0A0F",
        surface: {
          DEFAULT: "#0D1117",
          elevated: "#12141C",
          raised: "#171A24",
        },
        line: {
          DEFAULT: "rgba(148, 163, 184, 0.12)",
          strong: "rgba(148, 163, 184, 0.22)",
        },
        // Text
        ink: {
          DEFAULT: "#E6EDF3",
          muted: "#9BA7B4",
          faint: "#697586",
        },
        // Primary accent (data flows, edges, active states, CTAs)
        accent: {
          DEFAULT: "#22D3EE",
          cyan: "#22D3EE",
          indigo: "#6366F1",
        },
        // Warm secondary — used sparingly for "human / outcome" highlights
        warm: {
          DEFAULT: "#F5A524",
          soft: "#FBBF6B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.625rem",
        lg: "0.875rem",
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        elevated: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 30px -12px rgba(0,0,0,0.7)",
        glow: "0 0 0 1px rgba(34,211,238,0.30), 0 0 48px -6px rgba(34,211,238,0.42)",
        "glow-indigo": "0 0 0 1px rgba(99,102,241,0.25), 0 0 40px -8px rgba(99,102,241,0.35)",
        lift: "0 1px 0 0 rgba(255,255,255,0.07) inset, 0 4px 20px -6px rgba(0,0,0,0.55), 0 0 40px -8px rgba(34,211,238,0.20), 0 12px 32px -14px rgba(0,0,0,0.45)",
        "lift-hover":
          "0 1px 0 0 rgba(255,255,255,0.09) inset, 0 8px 28px -8px rgba(0,0,0,0.5), 0 0 52px -6px rgba(34,211,238,0.32), 0 16px 40px -12px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #22D3EE 0%, #6366F1 100%)",
        "grid-faint":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
      },
      maxWidth: {
        content: "76rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "dash": {
          to: { strokeDashoffset: "-16" },
        },
        // Slow bright-yellow glow for the hero card's corner ribbon (#FACC15).
        "ribbon-pulse": {
          "0%, 100%": {
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.2), 0 0 0 0 rgba(250,204,21,0), 0 2px 5px -1px rgba(0,0,0,0.45)",
          },
          "50%": {
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.2), 0 0 22px 4px rgba(250,204,21,0.75), 0 2px 5px -1px rgba(0,0,0,0.45)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "ribbon-pulse": "ribbon-pulse 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
