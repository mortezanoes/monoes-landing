"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  maxTilt?: number;
}

export function MagneticCard({
  children,
  className = "",
  radius = 200,
  maxTilt = 8,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 150,
    damping: 15,
  });

  const reflectX = useTransform(mouseX, [0, 1], [0, 100]);
  const reflectY = useTransform(mouseY, [0, 1], [0, 100]);

  const gradientBackground = useMotionTemplate`radial-gradient(circle at ${reflectX}% ${reflectY}%, rgba(200,169,126,0.08) 0%, transparent 60%)`;

  function handleMouse(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > radius) {
      mouseX.set(0.5);
      mouseY.set(0.5);
      return;
    }

    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: gradientBackground }}
      />
    </motion.div>
  );
}
