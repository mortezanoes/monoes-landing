"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TextReveal } from "@/components/ui/TextReveal";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#2A2318", "#2A2318", "#FFFFF0"]
  );

  const emblemy = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["#FFFFF0", "#FFFFF0", "#2A2318"]
  );

  const labelColor = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["#C8A97E", "#C8A97E", "#8B6914"]
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative py-32 md:py-48 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left: text */}
        <div className="space-y-8">
          <motion.p
            style={{ color: labelColor }}
            className="text-xs uppercase tracking-label"
          >
            The Philosophy
          </motion.p>

          <motion.div style={{ color: textColor }}>
            <TextReveal
              text="Mono — singular focus. Each tool does one thing with obsessive precision."
              tag="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-tight"
              stagger={0.06}
            />
          </motion.div>

          <motion.div style={{ color: textColor }} className="opacity-80">
            <TextReveal
              text="No cloud dependencies. No accounts. Just software that respects you."
              tag="p"
              className="text-lg md:text-xl font-light"
              stagger={0.04}
            />
          </motion.div>
        </div>

        {/* Right: parallax emblem */}
        <div className="flex items-center justify-center">
          <motion.div
            style={{ y: emblemy }}
            className="relative w-56 h-56 md:w-72 md:h-72"
          >
            <div
              className="w-full h-full rounded-full gold-gradient opacity-20 absolute inset-0 blur-3xl"
            />
            <div className="w-full h-full rounded-full overflow-hidden border border-gold/30">
              <Image
                src="/images/monkey/contemplative.jpg"
                alt="Monoes mascot"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
