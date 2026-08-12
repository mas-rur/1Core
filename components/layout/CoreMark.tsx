"use client";

import { motion } from "framer-motion";

export function CoreMark({ size = 32 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
        <circle cx="16" cy="16" r="6.5" fill="url(#core-gradient)" />
        <defs>
          <radialGradient id="core-gradient" cx="0" cy="0" r="1" gradientTransform="translate(13 13) rotate(45) scale(9)">
            <stop stopColor="#3A3934" />
            <stop offset="1" stopColor="#0A0A09" />
          </radialGradient>
        </defs>
      </svg>
      <motion.svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="none"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="16" cy="16" r="14" stroke="#141310" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 5" />
        <circle cx="16" cy="2" r="1.6" fill="#141310" />
      </motion.svg>
    </div>
  );
}
