"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Fill = { source: string; proportionBps: string };

const PALETTE = ["#141310", "#4A4842", "#7A776C", "#A29D90", "#C6C2B4"];

export function RouteVisualizer({ fills, loading }: { fills?: Fill[]; loading?: boolean }) {
  const segments = useMemo(() => {
    if (!fills || fills.length === 0) return [];
    return fills
      .map((f, i) => ({ ...f, pct: Number(f.proportionBps) / 100, color: PALETTE[i % PALETTE.length] }))
      .sort((a, b) => b.pct - a.pct);
  }, [fills]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-xl2 border border-surface-700 bg-surface-800/60 px-3.5 py-3">
        <div className="h-2 flex-1 animate-pulse rounded-full bg-surface-600" />
        <span className="text-xs text-ink-faint">Finding best route…</span>
      </div>
    );
  }

  if (segments.length === 0) return null;

  return (
    <div className="rounded-xl2 border border-surface-700 bg-surface-800/60 px-3.5 py-3">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface-700">
        <div className="flex h-full w-full">
          {segments.map((s, i) => (
            <motion.div
              key={s.source + i}
              className="h-full"
              style={{ background: s.color, width: `${s.pct}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            />
          ))}
        </div>
        <motion.div
          className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
        {segments.slice(0, 4).map((s, i) => (
          <span key={s.source + i} className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
            {s.source.replace(/_/g, " ")} · {s.pct.toFixed(0)}%
          </span>
        ))}
        {segments.length > 4 && <span className="text-[11px] text-ink-faint">+{segments.length - 4} more</span>}
      </div>
    </div>
  );
}
