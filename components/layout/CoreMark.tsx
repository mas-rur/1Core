"use client";

import { motion } from "framer-motion";

export function CoreMark({ size = 32 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
        <circle cx="16" cy="16" r="6.5" fill="#0D47A1" />
        <circle cx="16" cy="16" r="6.5" fill="url(#core-gradient)" fillOpacity="0.9" />
        <defs>
          <radialGradient id="core-gradient" cx="0" cy="0" r="1" gradientTransform="translate(13 13) rotate(45) scale(9)">
            <stop stopColor="#8FB2F7" />
            <stop offset="1" stopColor="#0D47A1" />
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
        <circle cx="16" cy="16" r="14" stroke="#2F6FED" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 5" />
        <circle cx="16" cy="2" r="1.6" fill="#5A8DF2" />
      </motion.svg>
    </div>
  );
}
