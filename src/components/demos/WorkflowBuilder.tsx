"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Node {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
}

const NODES: Node[] = [
  { id: "cron", label: "Cron Trigger", icon: "⏰", x: 40, y: 50 },
  { id: "chrome", label: "Open Chrome", icon: "🌐", x: 220, y: 50 },
  { id: "ai", label: "AI Generate", icon: "✨", x: 400, y: 50 },
  { id: "post", label: "Post Content", icon: "📤", x: 580, y: 50 },
];

const EDGES = [
  { from: "cron", to: "chrome" },
  { from: "chrome", to: "ai" },
  { from: "ai", to: "post" },
];

const NODE_W = 120;
const NODE_H = 56;
const CANVAS_H = 160;

export function WorkflowBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayIndexRef = useRef(0);

  const getNodeCenter = useCallback((node: Node) => ({
    x: node.x + NODE_W / 2,
    y: CANVAS_H / 2,
  }), []);

  const drawEdges = useCallback((ctx: CanvasRenderingContext2D, active: string | null) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    EDGES.forEach((edge) => {
      const fromNode = NODES.find((n) => n.id === edge.from)!;
      const toNode = NODES.find((n) => n.id === edge.to)!;
      const from = getNodeCenter(fromNode);
      const to = getNodeCenter(toNode);

      const isActive =
        active === edge.from || active === edge.to;

      ctx.beginPath();
      ctx.moveTo(from.x + NODE_W / 2 - 4, from.y);
      ctx.lineTo(to.x - NODE_W / 2 + 4, to.y);
      ctx.strokeStyle = isActive ? "#C8A97E" : "#D4C5B0";
      ctx.lineWidth = isActive ? 2 : 1.5;
      ctx.stroke();

      // Arrow head
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      const arrowX = to.x - NODE_W / 2 + 4;
      const arrowY = to.y;
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - 8 * Math.cos(angle - 0.4), arrowY - 8 * Math.sin(angle - 0.4));
      ctx.lineTo(arrowX - 8 * Math.cos(angle + 0.4), arrowY - 8 * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fillStyle = isActive ? "#C8A97E" : "#D4C5B0";
      ctx.fill();
    });
  }, [getNodeCenter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawEdges(ctx, activeNode);
  }, [activeNode, drawEdges]);

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setAutoPlay(true);
    }, 3000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    setAutoPlay(false);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = null;
    autoPlayIndexRef.current = 0;
  }, []);

  useEffect(() => {
    startIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [startIdleTimer]);

  useEffect(() => {
    if (!autoPlay) return;

    autoPlayRef.current = setInterval(() => {
      const idx = autoPlayIndexRef.current;
      setActiveNode(NODES[idx].id);
      autoPlayIndexRef.current = (idx + 1) % NODES.length;
    }, 800);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay]);

  const handleNodeClick = (nodeId: string) => {
    stopAutoPlay();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setActiveNode((prev) => (prev === nodeId ? null : nodeId));
    startIdleTimer();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-ivory-warm border border-ivory-linen p-4 overflow-hidden select-none"
      style={{ minHeight: 200 }}
    >
      <p className="text-xs tracking-label text-gold-bronze mb-3 uppercase">
        Workflow DAG
      </p>

      {/* Canvas for edges */}
      <div className="relative" style={{ height: CANVAS_H }}>
        <canvas
          ref={canvasRef}
          width={740}
          height={CANVAS_H}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Nodes */}
        {NODES.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className="absolute flex flex-col items-center justify-center gap-1 rounded-xl border transition-all duration-200 cursor-pointer"
              style={{
                left: node.x,
                top: "50%",
                transform: `translateY(-50%) scale(${isActive ? 1.08 : 1})`,
                width: NODE_W,
                height: NODE_H,
                zIndex: 1,
                background: isActive ? "#2A2318" : "#FFFFF0",
                borderColor: isActive ? "#C8A97E" : "#EDE5D8",
                borderWidth: isActive ? 2 : 1,
                boxShadow: isActive
                  ? "0 0 0 4px rgba(200,169,126,0.2), 0 4px 16px rgba(42,35,24,0.12)"
                  : "0 4px 24px rgba(42,35,24,0.04)",
              }}
            >
              {isActive && (
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-pulse"
                  style={{ zIndex: 2 }}
                />
              )}
              <span className="text-lg leading-none">{node.icon}</span>
              <span
                className="text-xs font-medium leading-tight text-center px-1"
                style={{ color: isActive ? "#C8A97E" : "#2A2318" }}
              >
                {node.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 text-xs text-gold-bronze/60 text-center">
        {autoPlay ? "Auto-playing…" : "Click a node to highlight"}
      </div>
    </div>
  );
}
