"use client";

import { parseUnits } from "viem";
import { useAccount, useBalance } from "wagmi";
import { TokenBadge } from "@/components/ui/TokenBadge";
import type { Token } from "@/lib/tokens";
import { isNative } from "@/lib/tokens";
import { cn, formatAmount } from "@/lib/utils";

// Reserve a small gas buffer when "MAX" is tapped on a native-token balance.
const NATIVE_GAS_BUFFER = parseUnits("0.002", 18);

export function TokenRow({
  label,
  token,
  amount,
  onAmountChange,
  onOpenSelect,
  readOnly = false,
  loading = false,
  usdValue,
}: {
  label: string;
  token: Token;
  amount: string;
  onAmountChange?: (value: string) => void;
  onOpenSelect: () => void;
  readOnly?: boolean;
  loading?: boolean;
  usdValue?: string;
}) {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: isNative(token.address) ? undefined : token.address,
    query: { enabled: Boolean(address) },
  });

  return (
    <div className="rounded-xl2 border border-surface-700 bg-surface-800/60 p-4 transition-colors focus-within:border-core-500/60">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium uppercase tracking-wide text-ivory-faint">{label}</span>
        {address && (
          <button
            type="button"
            disabled={readOnly || !onAmountChange || !balance}
            onClick={() => {
              if (!balance) return;
              const max =
                isNative(token.address) && balance.value > NATIVE_GAS_BUFFER
                  ? balance.value - NATIVE_GAS_BUFFER
                  : balance.value;
              onAmountChange?.(formatAmount(max, balance.decimals, 8));
            }}
            className={cn(
              "font-tabular text-ivory-muted transition-colors",
              !readOnly && onAmountChange && balance && "hover:text-core-300"
            )}
          >
            Balance: {balance ? formatAmount(balance.value, balance.decimals, 6) : "0"}
            {!readOnly && onAmountChange && balance ? (
              <span className="ml-1.5 rounded bg-core-700/30 px-1.5 py-0.5 text-[10px] font-semibold text-core-300">
                MAX
              </span>
            ) : null}
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          inputMode="decimal"
          placeholder="0.0"
          value={amount}
          readOnly={readOnly}
          onChange={(e) => {
            const v = e.target.value;
            if (/^\d*\.?\d*$/.test(v)) onAmountChange?.(v);
          }}
          className={cn(
            "font-tabular w-full min-w-0 bg-transparent font-display text-3xl font-medium text-ivory placeholder:text-ivory-faint focus:outline-none",
            loading && "shimmer-text"
          )}
        />
        <button
          type="button"
          onClick={onOpenSelect}
          className="flex shrink-0 items-center gap-2 rounded-full border border-surface-600 bg-surface-700/70 py-1.5 pl-1.5 pr-3 transition-colors hover:border-core-500/50"
        >
          <TokenBadge token={token} size={26} />
          <span className="text-sm font-semibold text-ivory">{token.symbol}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="#8A93A6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-1.5 h-4 text-xs text-ivory-muted">{usdValue}</div>
    </div>
  );
}
