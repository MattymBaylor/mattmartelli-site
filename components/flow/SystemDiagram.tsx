"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { SystemDiagram as SystemDiagramData } from "@/content/diagrams";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { SystemNode, type SystemNodeData } from "./SystemNode";
import { DetailPanel } from "./DetailPanel";

const nodeTypes = { system: SystemNode };

const NODE_GAP_X = 210;

export function SystemDiagram({ diagram }: { diagram: SystemDiagramData }) {
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

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
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="surface-card overflow-hidden">
        {/* Visual diagram — pointer/touch interactive */}
        <div
          className="h-[300px] w-full sm:h-[360px]"
          role="img"
          aria-label={`${diagram.title} flow diagram. ${diagram.nodes
            .map((n) => n.label)
            .join(" then ")}. Use the controls below to explore each stage.`}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.18 }}
            minZoom={0.4}
            maxZoom={1.4}
            nodesDraggable={false}
            nodesConnectable={false}
            nodesFocusable={false}
            edgesFocusable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            panOnScroll={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1b2230" />
            <Controls showInteractive={false} className="!shadow-elevated" />
          </ReactFlow>
        </div>

        {/* Accessible, keyboard-operable node rail (also the mobile stack/scroll fallback) */}
        <div className="border-t border-line p-3">
          <div
            ref={railRef}
            role="tablist"
            aria-label={`${diagram.title} stages`}
            aria-orientation="horizontal"
            className="flex gap-2 overflow-x-auto pb-1"
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
                  className={`shrink-0 rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors ${
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

      <DetailPanel node={activeNode} step={activeIndex} total={diagram.nodes.length} />
    </div>
  );
}
