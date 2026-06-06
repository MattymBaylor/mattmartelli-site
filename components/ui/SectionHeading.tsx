import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h2>
        {sub && <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{sub}</p>}
        {children}
      </div>
    </Reveal>
  );
}
