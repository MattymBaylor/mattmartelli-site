"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  type Node,
  type Edge,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { SystemDiagram as SystemDiagramData } from "@/content/diagrams";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { SystemNode, type SystemNodeData } from "./SystemNode";
import { VerticalFlow } from "./VerticalFlow";
import { DetailPanel } from "./DetailPanel";

const nodeTypes = { system: SystemNode };

// Tighter horizontal spacing so the whole flow fits the full-width canvas
// at a readable scale — no panning needed to see it.
const NODE_GAP_X = 184;
const FIT_OPTIONS = { padding: 0.12 };

export function SystemDiagram({ diagram }: { diagram: SystemDiagramData }) {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const rfRef = useRef<ReactFlowInstance | null>(null);

  // Reset selection when switching diagrams.
  useEffect(() => {
    setActiveIndex(0);
  }, [diagram.id]);

  const sourceIds = useMemo(
    () => new Set(diagram.edges.map((e) => e.source)),
    [diagram]
  );
  const targetIds = useMemo(
    () => new Set(diagram.edges.map((e) => e.target)),
    [diagram]
  );

  const nodes: Node[] = useMemo(
    () =>
      diagram.nodes.map((n, i) => ({
        id: n.id,
        type: "system",
        position: { x: i * NODE_GAP_X, y: 0 },
        data: {
          label: n.label,
          kind: n.kind,
          index: i,
          isActive: i === activeIndex,
          hasSource: sourceIds.has(n.id),
          hasTarget: targetIds.has(n.id),
          onSelect: setActiveIndex,
        } satisfies SystemNodeData,
        draggable: false,
        selectable: false,
      })),
    [diagram, activeIndex, sourceIds, targetIds]
  );

  const edges: Edge[] = useMemo(
    () =>
      diagram.edges.map((e) => ({
        id: `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: !reduced,
        type: "smoothstep",
        labelStyle: {
          fill: "#9BA7B4",
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 10,
        },
        labelBgStyle: { fill: "#0D1117", fillOpacity: 0.85 },
        labelBgPadding: [4, 2] as [number, number],
        style: { stroke: "#22D3EE", strokeWidth: 1.75 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#22D3EE", width: 16, height: 16 },
      })),
    [diagram, reduced]
  );

  // Keep the whole flow framed when the container resizes or the diagram changes.
  const refit = useCallback(() => {
    rfRef.current?.fitView(FIT_OPTIONS);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const id = requestAnimationFrame(refit);
    window.addEventListener("resize", refit);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", refit);
    };
  }, [isDesktop, diagram.id, refit]);

  // Keyboard navigation across the accessible node rail.
  const onRailKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = diagram.nodes.length - 1;
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActiveIndex(next);
    const buttons = railRef.current?.querySelectorAll<HTMLButtonElement>("[data-rail-btn]");
    buttons?.[next]?.focus();
  };

  const activeNode = diagram.nodes[activeIndex];

  return (
    <div className="space-y-5">
      {isDesktop ? (
        <div className="surface-card overflow-hidden">
          {/* Full-width visual canvas — fits entirely, no panning required */}
          <div
            className="h-[420px] w-full"
            role="img"
            aria-label={`${diagram.title} flow diagram. ${diagram.nodes
              .map((n) => n.label)
              .join(" then ")}. Use the stage controls below to explore each step.`}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onInit={(instance) => {
                rfRef.current = instance;
                instance.fitView(FIT_OPTIONS);
              }}
              fitView
              fitViewOptions={FIT_OPTIONS}
              minZoom={0.3}
              maxZoom={1.5}
              nodesDraggable={false}
              nodesConnectable={false}
              nodesFocusable={false}
              edgesFocusable={false}
              elementsSelectable={false}
              zoomOnScroll={false}
              zoomOnDoubleClick={false}
              panOnScroll={false}
              panOnDrag={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#1b2230" />
              <Controls showInteractive={false} showFitView={false} className="!shadow-elevated" />
            </ReactFlow>
          </div>

          {/* Accessible, keyboard-operable stage rail */}
          <div className="border-t border-line p-3">
            <div
              ref={railRef}
              role="tablist"
              aria-label={`${diagram.title} stages`}
              aria-orientation="horizontal"
              className="flex flex-wrap gap-2"
            >
              {diagram.nodes.map((n, i) => {
                const selected = i === activeIndex;
                return (
                  <button
                    key={n.id}
                    data-rail-btn
                    role="tab"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={(e) => onRailKeyDown(e, i)}
                    className={`rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                      selected
                        ? "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan"
                        : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    <span className="text-ink-faint">{i + 1}.</span> {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        // Below the desktop breakpoint: a readable, tappable vertical flow.
        <VerticalFlow
          nodes={diagram.nodes}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          label={`${diagram.title} stages`}
        />
      )}

      <DetailPanel node={activeNode} step={activeIndex} total={diagram.nodes.length} />
    </div>
  );
}
