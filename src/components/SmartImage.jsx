import { useState } from "react";
// Shows the real photo if present in /public/images; otherwise a clearly neutral studio placeholder.
export default function SmartImage({ src, alt, className = "", eager }) {
  const [bad, setBad] = useState(false);
  if (!bad && src)
    return (
      <img
        className={className}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onError={() => setBad(true)}
      />
    );
  return (
    <div
      className={"ph " + className}
      role="img"
      aria-label={alt + " (image placeholder)"}
    >
      <svg viewBox="0 0 400 170" aria-hidden="true">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#343A43" />
            <stop offset=".5" stopColor="#D8DCE2" />
            <stop offset="1" stopColor="#343A43" />
          </linearGradient>
        </defs>
        <ellipse
          cx="200"
          cy="146"
          rx="170"
          ry="9"
          fill="rgba(255,255,255,.07)"
        />
        <path
          d="M24 128q4-24 52-30l42-27q40-22 100-18 46 3 76 28l44 8q40 8 42 38z"
          fill="#12151a"
          stroke="url(#g)"
          strokeWidth="2"
        />
        <path
          d="M130 74q30-14 80-12 36 2 58 22H120z"
          fill="rgba(216,220,226,.08)"
        />
        <circle
          cx="106"
          cy="130"
          r="20"
          fill="#08090B"
          stroke="url(#g)"
          strokeWidth="2"
        />
        <circle
          cx="302"
          cy="130"
          r="20"
          fill="#08090B"
          stroke="url(#g)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
