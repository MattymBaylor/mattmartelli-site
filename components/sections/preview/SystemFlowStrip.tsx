import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

export function SystemFlowStrip() {
  const { nodes } = site.systemFlow;

  return (
    <section aria-label="System flow" className="border-b border-line/60 py-8">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {nodes.map((node, i) => (
            <span key={node} className="flex items-center gap-3 sm:gap-4">
              <span className="rounded-lg border border-line bg-surface-elevated/70 px-4 py-2.5 font-display text-sm font-medium text-ink sm:text-base">
                {node}
              </span>
              {i < nodes.length - 1 && (
                <ArrowRight size={16} className="text-accent-cyan/50" aria-hidden />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}