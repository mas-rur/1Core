"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SwapStatus } from "@/hooks/useSwapQuote";
import { explorerTxUrl } from "@/lib/chains";
import { truncateAddress } from "@/lib/utils";
import { FailedAnimation } from "./FailedAnimation";
import { PendingAnimation } from "./PendingAnimation";
import { SuccessAnimation } from "./SuccessAnimation";

const VISIBLE: SwapStatus[] = ["building-quote", "approving", "awaiting-signature", "pending", "success", "error"];

const STEP_LABEL: Partial<Record<SwapStatus, string>> = {
  "building-quote": "Preparing the best route…",
  approving: "Approve token access in your wallet",
  "awaiting-signature": "Confirm the swap in your wallet",
  pending: "Swapping on-chain…",
};

export function StatusModal({
  status,
  needsApproval,
  txHash,
  chainId,
  errorMessage,
  summary,
  onClose,
  onRetry,
}: {
  status: SwapStatus;
  needsApproval: boolean;
  txHash: `0x${string}` | null;
  chainId?: number;
  errorMessage: string | null;
  summary: string;
  onClose: () => void;
  onRetry: () => void;
}) {
  const open = VISIBLE.includes(status);
  const isTerminal = status === "success" || status === "error";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isTerminal ? onClose : undefined}
        >
          <motion.div
            className="w-full max-w-sm rounded-xl3 border border-surface-700 bg-surface-900 p-7 text-center shadow-glow-lg"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex justify-center">
              {status === "success" ? <SuccessAnimation /> : status === "error" ? <FailedAnimation /> : <PendingAnimation />}
            </div>

            <h2 className="mt-4 font-display text-lg font-semibold text-ink">
              {status === "success" ? "Swap complete" : status === "error" ? "Swap failed" : "Swapping"}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {status === "success" ? summary : status === "error" ? errorMessage ?? "Something went wrong." : STEP_LABEL[status]}
            </p>

            {!isTerminal && needsApproval && (
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-ink-faint">
                <StepDot active={status === "approving"} done={["awaiting-signature", "pending"].includes(status)} />
                <span>Approve</span>
                <span className="h-px w-4 bg-surface-600" />
                <StepDot active={status === "awaiting-signature"} done={status === "pending"} />
                <span>Confirm</span>
                <span className="h-px w-4 bg-surface-600" />
                <StepDot active={status === "pending"} done={false} />
                <span>Swap</span>
              </div>
            )}

            {txHash && chainId && (
              <a
                href={explorerTxUrl(chainId, txHash)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-core-700 hover:text-core-500"
              >
                View {truncateAddress(txHash)} on explorer
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            )}

            {isTerminal && (
              <div className="mt-6 flex gap-2">
                {status === "error" && (
                  <button
                    onClick={onRetry}
                    className="flex-1 rounded-full bg-core-700 py-2.5 text-sm font-medium text-white transition-colors hover:bg-core-600"
                  >
                    Try again
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 rounded-full border border-surface-600 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {status === "success" ? "Done" : "Close"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepDot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <span
      className={`h-1.5 w-1.5 rounded-full transition-colors ${
        done ? "bg-success-500" : active ? "bg-core-700 animate-pulse" : "bg-surface-600"
      }`}
    />
  );
}
