"use client";

import { useEffect, useRef } from "react";

const ROMAN = ["12","1","2","3","4","5","6","7","8","9","10","11"];

export function SeikoWatchIllustration() {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      const now = new Date();
      const s = now.getSeconds() + now.getMilliseconds() / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      if (secondRef.current)
        secondRef.current.setAttribute(
          "transform",
          `rotate(${s * 6} 200 200)`,
        );
      if (minuteRef.current)
        minuteRef.current.setAttribute(
          "transform",
          `rotate(${m * 6} 200 200)`,
        );
      if (hourRef.current)
        hourRef.current.setAttribute(
          "transform",
          `rotate(${h * 30} 200 200)`,
        );

      raf = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(raf);
  }, []);

  const numerals = ROMAN.map((label, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const r = 150;
    const x = 200 + Math.cos(angle) * r;
    const y = 200 + Math.sin(angle) * r;
    return (
      <text
        key={label}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-zinc-700 dark:fill-zinc-300"
        style={{
          fontFamily: "'Space Mono', sans-serif",
          fontSize: "18px",
          fontWeight: 900,
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </text>
    );
  });

  return (
    <div className="relative flex w-full items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="h-auto w-full max-w-[420px] select-none"
        role="img"
        aria-label="Analog watch"
      >
        <circle
          cx="200"
          cy="200"
          r="178"
          fill="none"
          className="stroke-zinc-400/50 dark:stroke-zinc-600/60"
          strokeWidth="1.5"
        />

        {numerals}

        <g ref={hourRef}>
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="118"
            className="stroke-zinc-700 dark:stroke-zinc-200"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        <g ref={minuteRef}>
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="80"
            className="stroke-zinc-700 dark:stroke-zinc-200"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        <g ref={secondRef}>
          <line
            x1="200"
            y1="210"
            x2="200"
            y2="70"
            className="stroke-zinc-500 dark:stroke-zinc-400"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        <circle
          cx="200"
          cy="200"
          r="3"
          className="dark:fill-zinc-100 fill-zinc-700"
        />
      </svg>
    </div>
  );
}
