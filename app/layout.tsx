import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { site } from "@/content/site";
import "./globals.css";

// Google Analytics 4 measurement ID. NOTE: this is currently growthmindset.ai's
// tag (G-K90LREJCJF), reused on mattmartelli.com — traffic pools into that GA
// property, so split the two sites by hostname in GA. When a dedicated
// mattmartelli.com data stream exists, just swap its G- id in here.
const GA_ID = "G-K90LREJCJF";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: {
    default: site.meta.title,
    template: "%s · Matt Martelli",
  },
  description: site.meta.description,
  applicationName: "Matt Martelli",
  authors: [{ name: site.meta.name }],
  creator: site.meta.name,
  keywords: [
    "AI Systems Architect",
    "Agentic Systems",
    "Multi-Agent Architecture",
    "Voice AI",
    "Marketing Operations",
    "CRM Architecture",
    "Revenue Operations",
    "AI Automation",
    "Matt Martelli",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicons/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicons/favicon-32x32.png",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
  openGraph: {
    type: "website",
    url: site.meta.url,
    title: site.meta.title,
    description: site.meta.description,
    siteName: site.meta.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#06070B",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.meta.name,
  url: site.meta.url,
  image: `${site.meta.url}/headshot.jpg`,
  jobTitle: site.meta.jobTitle,
  email: `mailto:${site.meta.email}`,
  telephone: site.meta.phone,
  description: site.meta.description,
  worksFor: {
    "@type": "Organization",
    name: site.meta.company.name,
    url: site.meta.company.url,
  },
  sameAs: [site.meta.linkedin, site.meta.company.url],
  knowsAbout: [
    "AI Automation",
    "Agentic Systems",
    "Multi-Agent Architecture",
    "Voice AI",
    "Marketing Operations",
    "CRM Architecture",
    "Workflow Automation",
    "Revenue Operations",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
