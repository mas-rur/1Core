"use client";

import { motion } from "framer-motion";

export function FailedAnimation() {
  return (
    <motion.div
      className="flex h-28 w-28 items-center justify-center"
      animate={{ x: [0, -6, 6, -4, 4, 0] }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <svg viewBox="0 0 100 100" width={112} height={112}>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#E7E4DA" strokeWidth="5" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#C0362A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset="283"
          transform="rotate(-90 50 50)"
          className="animate-ring-draw"
        />
        <motion.path
          d="M37 37l26 26M63 37L37 63"
          fill="none"
          stroke="#C0362A"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}
