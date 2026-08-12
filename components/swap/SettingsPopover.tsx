"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, SlidersHorizontal } from "lucide-react";
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
        className="flex items-center gap-1.5 rounded-full border border-surface-600 bg-surface-800 px-3 py-1.5 text-xs font-medium text-ink-muted shadow-hairline transition-colors hover:border-core-500/50 hover:text-ink"
      >
        <SlidersHorizontal size={13} strokeWidth={2} />
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
            <p className="mb-2 text-xs font-medium text-ink-muted">Slippage tolerance</p>
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
                      : "bg-surface-700 text-ink-muted hover:text-ink"
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
                className="w-16 rounded-lg border border-surface-600 bg-surface-900 px-2 text-center text-xs text-ink placeholder:text-ink-faint focus:border-core-500 focus:outline-none"
              />
            </div>
            {slippageBps < 50 && (
              <p className="mt-2 flex items-center gap-1 text-[11px] text-amber-700">
                <AlertTriangle size={11} strokeWidth={2} />
                Low slippage may cause failed transactions.
              </p>
            )}
            {slippageBps > 500 && (
              <p className="mt-2 flex items-center gap-1 text-[11px] text-danger-500">
                <AlertTriangle size={11} strokeWidth={2} />
                High slippage — you may get a worse price.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
