import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGES } from "@/content/clientPages";
import CaseFile from "./CaseFile";

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = PAGES[slug];
  if (!config) {
    return { title: "Case File · Not Found" };
  }
  const title = `Case File · ${config.clientName}`;
  const description = config.subheadline;
  const url = `/client/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = PAGES[slug];
  if (!config) {
    notFound();
  }
  return <CaseFile config={config} />;
}
