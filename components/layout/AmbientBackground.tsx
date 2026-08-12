"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      {/* Hairline grid — the "ledger" texture */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #141310 1px, transparent 1px), linear-gradient(to bottom, #141310 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Paper grain for tactility */}
      <div className="grain-overlay absolute inset-0 opacity-60 mix-blend-multiply" />

      {/* Soft directional vignette instead of a colored glow */}
      <div className="mesh-glow absolute -inset-[10%]" />

      {/* Signature oversized compass ring, echoing the CoreMark — barely visible */}
      <motion.svg
        viewBox="0 0 600 600"
        className="absolute left-1/2 top-[-140px] h-[560px] w-[560px] -translate-x-1/2 opacity-[0.05] sm:h-[680px] sm:w-[680px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="300" cy="300" r="280" stroke="#141310" strokeWidth="1" fill="none" strokeDasharray="2 10" />
        <circle cx="300" cy="300" r="220" stroke="#141310" strokeWidth="1" fill="none" />
        <circle cx="300" cy="20" r="4" fill="#141310" />
      </motion.svg>

      {/* Fade to solid paper at the edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/50 to-paper" />
    </div>
  );
}
