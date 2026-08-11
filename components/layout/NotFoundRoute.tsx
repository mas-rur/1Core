"use client";

import { motion } from "framer-motion";

export function NotFoundRoute() {
  return (
    <div className="relative flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-core-500/40 bg-core-700/20 font-display text-sm font-semibold text-core-200">
        A
      </span>

      <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
        <line x1="4" y1="12" x2="52" y2="12" stroke="#2F6FED" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
        <line x1="68" y1="12" x2="116" y2="12" stroke="#33405D" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
        <motion.g
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }}
          style={{ originX: "60px", originY: "12px" }}
        >
          <circle cx="60" cy="12" r="9" fill="#EF4444" fillOpacity="0.12" />
          <path d="M56 8l8 8M64 8l-8 8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </svg>

      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-600 bg-surface-800 font-display text-sm font-semibold text-ivory-faint">
        B
      </span>
    </div>
  );
}
