"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  tag: Tag = "p",
  stagger = 0.08,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");
    gsap.set(words, { opacity: 0, y: 12 });

    const tween = gsap.to(words, {
      opacity: 1,
      y: 0,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [stagger]);

  const words = text.split(" ");

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={containerRef as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block">
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
