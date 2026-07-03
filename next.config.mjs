import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root to this project (a parent-level lockfile exists).
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  // Vanity route: mattmartelli.com/tcpa → the Lead Hygiene & Compliance canvas.
  // A memorable link for the TCPA question Matt fields constantly ("go look at /tcpa").
  // Rewrite (not redirect) so the clean /tcpa URL stays in the address bar.
  async rewrites() {
    return [
      { source: "/tcpa", destination: "/architecture/lead-hygiene-canvas.html" },
      // /hq → the interactive Seinfeld HQ demo (full-page escape hatch for the
      // HQ Cam facade on small screens; also a memorable share link).
      { source: "/hq", destination: "/seinfeld-hq/index.html" },
    ];
  },
};

export default nextConfig;
