import type { Metadata } from "next";
import Playbook from "./Playbook";

export const metadata: Metadata = {
  title: "Strategic Alignment Playbook",
  description:
    "An interactive, two-pane walkthrough of Matt Martelli's production AI systems — load live demos and full case studies side by side.",
  alternates: { canonical: "/playbook" },
  openGraph: {
    type: "profile",
    title: "Strategic Alignment Playbook · Matt Martelli",
    description:
      "An interactive, two-pane walkthrough of Matt Martelli's production AI systems — load live demos and full case studies side by side.",
    url: "/playbook",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Alignment Playbook · Matt Martelli",
    description:
      "An interactive, two-pane walkthrough of Matt Martelli's production AI systems — load live demos and full case studies side by side.",
  },
};

export default function PlaybookPage() {
  return <Playbook />;
}
