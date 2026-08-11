"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { TokenBadge } from "@/components/ui/TokenBadge";
import type { Token } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function TokenSelectModal({
  open,
  onClose,
  tokens,
  excludeAddress,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  tokens: Token[];
  excludeAddress?: string;
  onSelect: (token: Token) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tokens.filter((t) => {
      if (t.address.toLowerCase() === excludeAddress?.toLowerCase()) return false;
      if (!q) return true;
      return t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q);
    });
  }, [tokens, query, excludeAddress]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/70 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[80vh] w-full max-w-sm overflow-hidden rounded-t-xl3 border border-surface-700 bg-surface-900 shadow-glow-lg sm:rounded-xl3"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-surface-700 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-ivory">Select a token</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-ivory-muted transition-colors hover:bg-surface-700 hover:text-ivory"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or symbol"
                className="w-full rounded-xl2 border border-surface-600 bg-surface-800 px-3.5 py-2.5 text-sm text-ivory placeholder:text-ivory-faint focus:border-core-500 focus:outline-none"
              />
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-ivory-muted">No tokens match &ldquo;{query}&rdquo;.</p>
              )}
              {filtered.map((token) => (
                <button
                  key={token.address}
                  onClick={() => {
                    onSelect(token);
                    setQuery("");
                    onClose();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl2 px-3 py-2.5 text-left transition-colors hover:bg-surface-700"
                  )}
                >
                  <TokenBadge token={token} size={34} />
                  <div>
                    <p className="text-sm font-medium text-ivory">{token.symbol}</p>
                    <p className="text-xs text-ivory-muted">{token.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
