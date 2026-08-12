"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return { x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, delay: 0.55 + i * 0.02 };
});

export function SuccessAnimation() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-success-500"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
          animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
        />
      ))}
      <svg viewBox="0 0 100 100" width={112} height={112}>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#E7E4DA" strokeWidth="5" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#15803D"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset="283"
          transform="rotate(-90 50 50)"
          className="animate-ring-draw"
        />
        <motion.path
          d="M32 52l13 13 24-27"
          fill="none"
          stroke="#15803D"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
