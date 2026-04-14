"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalLine {
  command?: string;
  output?: string;
}

interface TerminalBlockProps {
  lines: TerminalLine[];
  className?: string;
}

export function TerminalBlock({ lines, className = "" }: TerminalBlockProps) {
  const [visibleChars, setVisibleChars] = useState<number[]>(
    lines.map(() => 0)
  );
  const [currentLine, setCurrentLine] = useState(0);
  const [showOutput, setShowOutput] = useState<boolean[]>(
    lines.map(() => false)
  );
  const started = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          typeLine(0);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function typeLine(lineIdx: number) {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];
    const cmd = line.command || "";
    let charIdx = 0;

    const interval = setInterval(() => {
      charIdx++;
      setVisibleChars((prev) => {
        const next = [...prev];
        next[lineIdx] = charIdx;
        return next;
      });

      if (charIdx >= cmd.length) {
        clearInterval(interval);
        if (line.output) {
          setTimeout(() => {
            setShowOutput((prev) => {
              const next = [...prev];
              next[lineIdx] = true;
              return next;
            });
            setTimeout(() => {
              setCurrentLine(lineIdx + 1);
              typeLine(lineIdx + 1);
            }, 400);
          }, 300);
        } else {
          setTimeout(() => {
            setCurrentLine(lineIdx + 1);
            typeLine(lineIdx + 1);
          }, 200);
        }
      }
    }, 50 + Math.random() * 30);
  }

  return (
    <div
      ref={containerRef}
      className={`rounded-lg bg-espresso-deep p-6 font-mono text-sm ${className}`}
    >
      {lines.map((line, i) => (
        <div key={i} className={i > currentLine ? "hidden" : ""}>
          {line.command && (
            <div className="flex">
              <span className="text-gold">$ </span>
              <span className="text-gold/70">
                {line.command.slice(0, visibleChars[i])}
              </span>
              {i === currentLine &&
                visibleChars[i] < (line.command?.length ?? 0) && (
                  <span className="animate-pulse text-gold">▋</span>
                )}
            </div>
          )}
          {line.output && showOutput[i] && (
            <div className="text-gold/40 transition-opacity duration-300">
              {line.output}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
