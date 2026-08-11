"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SettingsPopover({
  slippageBps,
  setSlippageBps,
  options,
}: {
  slippageBps: number;
  setSlippageBps: (bps: number) => void;
  options: readonly number[];
}) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-surface-600 bg-surface-800 px-3 py-1.5 text-xs font-medium text-ivory-muted transition-colors hover:border-core-500/50 hover:text-ivory"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M13 8a5 5 0 00-.08-.9l1.36-1.06-1.3-2.25-1.6.55a5 5 0 00-1.56-.9L9.5 2h-3l-.32 1.44a5 5 0 00-1.56.9l-1.6-.55-1.3 2.25L3.08 7.1A5 5 0 003 8c0 .3.03.6.08.9l-1.36 1.06 1.3 2.25 1.6-.55c.46.38.99.68 1.56.9L6.5 14h3l.32-1.44c.57-.22 1.1-.52 1.56-.9l1.6.55 1.3-2.25L12.92 8.9c.05-.3.08-.6.08-.9z"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
        {(slippageBps / 100).toFixed(2)}%
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-20 mt-2 w-60 rounded-xl2 border border-surface-600 bg-surface-800 p-3 shadow-glow-lg"
          >
            <p className="mb-2 text-xs font-medium text-ivory-muted">Slippage tolerance</p>
            <div className="flex gap-1.5">
              {options.map((bps) => (
                <button
                  key={bps}
                  onClick={() => {
                    setSlippageBps(bps);
                    setCustom("");
                  }}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors",
                    slippageBps === bps && !custom
                      ? "bg-core-700 text-white"
                      : "bg-surface-700 text-ivory-muted hover:text-ivory"
                  )}
                >
                  {(bps / 100).toFixed(1)}%
                </button>
              ))}
              <input
                value={custom}
                onChange={(e) => {
                  const v = e.target.value;
                  if (!/^\d*\.?\d*$/.test(v)) return;
                  setCustom(v);
                  const n = Number(v);
                  if (v && !Number.isNaN(n) && n > 0 && n <= 50) setSlippageBps(Math.round(n * 100));
                }}
                placeholder="Custom"
                className="w-16 rounded-lg border border-surface-600 bg-surface-900 px-2 text-center text-xs text-ivory placeholder:text-ivory-faint focus:border-core-500 focus:outline-none"
              />
            </div>
            {slippageBps < 50 && (
              <p className="mt-2 text-[11px] text-amber-400">Low slippage may cause failed transactions.</p>
            )}
            {slippageBps > 500 && <p className="mt-2 text-[11px] text-danger-500">High slippage — you may get a worse price.</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
