"use client";

import { motion } from "framer-motion";
import { CoreMark } from "@/components/layout/CoreMark";

export function PendingAnimation() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <motion.svg
        viewBox="0 0 100 100"
        width={112}
        height={112}
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1B2436" strokeWidth="5" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#2F6FED"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="60 223"
        />
      </motion.svg>
      <CoreMark size={40} />
    </div>
  );
}
