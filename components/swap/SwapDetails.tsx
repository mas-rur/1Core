"use client";

import { formatUnits } from "viem";
import type { PriceResponse } from "@/hooks/useSwapQuote";
import type { Token } from "@/lib/tokens";
import { cn, formatAmount } from "@/lib/utils";

export function SwapDetails({
  priceData,
  sellToken,
  buyToken,
  slippageBps,
  nativeSymbol,
}: {
  priceData: PriceResponse;
  sellToken: Token;
  buyToken: Token;
  slippageBps: number;
  nativeSymbol: string;
}) {
  const sellAmt = Number(formatUnits(BigInt(priceData.sellAmount), sellToken.decimals));
  const buyAmt = Number(formatUnits(BigInt(priceData.buyAmount), buyToken.decimals));
  const rate = sellAmt > 0 ? buyAmt / sellAmt : 0;

  const minReceived = (BigInt(priceData.buyAmount) * BigInt(10000 - slippageBps)) / 10000n;

  const impact = priceData.estimatedPriceImpact ? Number(priceData.estimatedPriceImpact) : null;
  const impactTone =
    impact === null ? "text-ink-muted" : impact > 3 ? "text-danger-500" : impact > 1 ? "text-amber-700" : "text-success-500";

  const networkFee =
    priceData.gas && priceData.gasPrice
      ? Number(formatUnits(BigInt(priceData.gas) * BigInt(priceData.gasPrice), 18))
      : null;

  return (
    <div className="space-y-2 rounded-xl2 border border-surface-700 bg-surface-800/40 px-3.5 py-3 text-xs">
      <Row label="Rate" value={`1 ${sellToken.symbol} ≈ ${rate.toFixed(6).replace(/0+$/, "").replace(/\.$/, "")} ${buyToken.symbol}`} />
      <Row
        label="Price impact"
        value={impact === null ? "—" : `${impact < 0.01 ? "<0.01" : impact.toFixed(2)}%`}
        valueClassName={impactTone}
      />
      <Row label={`Min. received (${(slippageBps / 100).toFixed(2)}% slippage)`} value={`${formatAmount(minReceived, buyToken.decimals)} ${buyToken.symbol}`} />
      <Row label="Network fee" value={networkFee !== null ? `~${networkFee.toFixed(5)} ${nativeSymbol}` : "—"} />
      <Row label="Route" value="Aggregated via 0x for best price" />
    </div>
  );
}

function Row({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink-faint">{label}</span>
      <span className={cn("font-tabular font-medium text-ink", valueClassName)}>{value}</span>
    </div>
  );
}
