"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] hidden h-[120px] w-[120px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(200,169,126,0.12) 0%, transparent 70%)",
      }}
    />
  );
}
