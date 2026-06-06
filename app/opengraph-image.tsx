import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0F",
          backgroundImage:
            "radial-gradient(60% 60% at 50% 0%, rgba(34,211,238,0.16), transparent 70%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontFamily: "monospace",
            letterSpacing: 4,
            color: "#22D3EE",
            textTransform: "uppercase",
          }}
        >
          AI Systems Architect · Marketing Operations Leader
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#E6EDF3",
            maxWidth: 980,
          }}
        >
          I specialize in designing business systems powered by AI.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#9BA7B4" }}>
          Frameworks evolve. Business outcomes remain.
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#22D3EE,#6366F1)",
              color: "#0A0A0F",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 30, color: "#E6EDF3", fontWeight: 600 }}>
            Matt Martelli
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
