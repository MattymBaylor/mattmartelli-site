import { ImageResponse } from "next/og";
import { caseStudy as cs } from "@/content/caseStudy";

export const alt = cs.meta.title;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0A0A0F",
          backgroundImage:
            "radial-gradient(60% 60% at 50% 0%, rgba(99,102,241,0.18), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontFamily: "monospace",
              letterSpacing: 4,
              color: "#22D3EE",
              textTransform: "uppercase",
            }}
          >
            Flagship Case Study · Matt Martelli
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.06,
              color: "#E6EDF3",
              maxWidth: 1040,
              letterSpacing: -1,
            }}
          >
            Designing Multi-Agent Systems Businesses Actually Understand
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#9BA7B4",
              lineHeight: 1.35,
              maxWidth: 980,
            }}
          >
            Agent architecture, voice AI, automation, CRM integration, human handoffs — one operating model people can run.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(155,167,180,0.18)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg,#22D3EE,#6366F1)",
                color: "#0A0A0F",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              M
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: 26, color: "#E6EDF3", fontWeight: 600 }}>
                Matt Martelli
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: "#9BA7B4",
                  fontFamily: "monospace",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                mattmartelli.com / seinfeld-hq
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              fontSize: 18,
              fontFamily: "monospace",
              letterSpacing: 2,
              color: "#9BA7B4",
              textTransform: "uppercase",
            }}
          >
            <span>Architecture</span>
            <span style={{ color: "#22D3EE" }}>·</span>
            <span>Voice AI</span>
            <span style={{ color: "#22D3EE" }}>·</span>
            <span>Automation</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
