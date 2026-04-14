"use client";

import { useRef, useEffect, useState, useCallback } from "react";

type Status = "idle" | "processing" | "done";

const NUM_AGENTS = 10;

interface Agent {
  angle: number;
  radius: number;
  speed: number;
  active: boolean;
  activeDuration: number;
}

function buildAgents(): Agent[] {
  return Array.from({ length: NUM_AGENTS }, (_, i) => ({
    angle: (i / NUM_AGENTS) * Math.PI * 2,
    radius: 55 + (i % 3) * 20,
    speed: 0.006 + (i % 4) * 0.003,
    active: false,
    activeDuration: 0,
  }));
}

export function SwarmSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentsRef = useRef<Agent[]>(buildAgents());
  const animRef = useRef<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [coordinatorPulse, setCoordinatorPulse] = useState(false);
  const statusRef = useRef<Status>("idle");

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    ctx.clearRect(0, 0, W, H);

    const agents = agentsRef.current;

    // Update agent angles (orbit)
    agents.forEach((a) => {
      a.angle += a.speed;
      if (a.activeDuration > 0) a.activeDuration--;
    });

    // Draw connections
    agents.forEach((a) => {
      const ax = cx + Math.cos(a.angle) * a.radius;
      const ay = cy + Math.sin(a.angle) * a.radius;
      const isActive = a.activeDuration > 0;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ax, ay);
      ctx.strokeStyle = isActive
        ? "rgba(200,169,126,0.7)"
        : "rgba(200,169,126,0.15)";
      ctx.lineWidth = isActive ? 1.5 : 0.8;
      ctx.stroke();
    });

    // Draw agents
    agents.forEach((a) => {
      const ax = cx + Math.cos(a.angle) * a.radius;
      const ay = cy + Math.sin(a.angle) * a.radius;
      const isActive = a.activeDuration > 0;

      if (isActive) {
        ctx.beginPath();
        ctx.arc(ax, ay, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,169,126,0.15)";
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(ax, ay, 5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? "#C8A97E" : "rgba(200,169,126,0.5)";
      ctx.fill();
    });

    // Draw coordinator
    const pulseR = coordinatorPulse ? 18 : 14;
    ctx.beginPath();
    ctx.arc(cx, cy, pulseR + 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,169,126,0.1)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
    ctx.fillStyle = "#C8A97E";
    ctx.fill();

    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "#2A2318";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AI", cx, cy);

    animRef.current = requestAnimationFrame(draw);
  }, [coordinatorPulse]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  const runSwarm = useCallback(() => {
    if (statusRef.current === "processing") return;

    statusRef.current = "processing";
    setStatus("processing");
    setCoordinatorPulse(true);

    const agents = agentsRef.current;

    agents.forEach((_, i) => {
      setTimeout(() => {
        agents[i].activeDuration = 30; // ~600ms at ~50fps
      }, i * 200);
    });

    const totalTime = NUM_AGENTS * 200 + 800;
    setTimeout(() => {
      statusRef.current = "done";
      setStatus("done");
      setCoordinatorPulse(false);

      setTimeout(() => {
        statusRef.current = "idle";
        setStatus("idle");
      }, 2000);
    }, totalTime);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 w-full rounded-2xl bg-ivory-warm border border-ivory-linen p-4">
      <p className="text-xs tracking-label text-gold-bronze uppercase self-start">
        Agent Swarm
      </p>

      <canvas
        ref={canvasRef}
        width={280}
        height={220}
        className="rounded-xl"
        style={{ background: "#FAF7F0" }}
      />

      <div className="flex items-center gap-3">
        <button
          onClick={runSwarm}
          disabled={status === "processing"}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50"
          style={{
            background: "#2A2318",
            color: "#C8A97E",
            border: "1px solid #C8A97E",
          }}
        >
          {status === "processing" ? "Running…" : "Run Swarm →"}
        </button>

        <span className="text-xs font-mono text-gold-bronze">
          {status === "idle" && "● idle"}
          {status === "processing" && "◌ processing"}
          {status === "done" && "✓ Complete"}
        </span>
      </div>
    </div>
  );
}
