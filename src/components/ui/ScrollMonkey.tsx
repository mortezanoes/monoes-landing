"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollMonkey() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!started && window.scrollY > 50) {
        setStarted(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [started]);

  useEffect(() => {
    if (started && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [started]);

  return (
    <div className="fixed bottom-4 right-4 z-50 overflow-hidden rounded-2xl shadow-2xl"
         style={{ width: 100, height: 178 }}>
      <video
        ref={videoRef}
        src="/monkey_dance.mp4"
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
