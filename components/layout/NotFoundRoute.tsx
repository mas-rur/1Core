"use client";

import { motion } from "framer-motion";

export function NotFoundRoute() {
  return (
    <div className="relative flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-core-300/50 bg-core-100 font-display text-sm font-semibold text-core-900">
        A
      </span>

      <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
        <line x1="4" y1="12" x2="52" y2="12" stroke="#141310" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
        <line x1="68" y1="12" x2="116" y2="12" stroke="#D6D2C4" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
        <motion.g
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }}
          style={{ originX: "60px", originY: "12px" }}
        >
          <circle cx="60" cy="12" r="9" fill="#C0362A" fillOpacity="0.1" />
          <path d="M56 8l8 8M64 8l-8 8" stroke="#C0362A" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </svg>

      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-600 bg-surface-800 font-display text-sm font-semibold text-ink-faint">
        B
      </span>
    </div>
  );
}
