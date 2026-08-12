"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { StatusModal } from "@/components/feedback/StatusModal";
import { useSwapEngine } from "@/hooks/useSwapQuote";
import { chainMeta } from "@/lib/chains";
import { isNative, tokensForChain, type Token } from "@/lib/tokens";
import { cn, formatAmount, safeParseUnits } from "@/lib/utils";
import { RouteVisualizer } from "./RouteVisualizer";
import { SettingsPopover } from "./SettingsPopover";
import { SwapDetails } from "./SwapDetails";
import { TokenRow } from "./TokenRow";
import { TokenSelectModal } from "./TokenSelectModal";

export function SwapCard() {
  const { address, chainId, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const tokenList = useMemo(() => tokensForChain(chainId), [chainId]);
  const [sellToken, setSellToken] = useState<Token>(tokenList[0]);
  const [buyToken, setBuyToken] = useState<Token>(tokenList[1] ?? tokenList[0]);
  const [sellAmount, setSellAmount] = useState("");
  const [selectSide, setSelectSide] = useState<"sell" | "buy" | null>(null);
  const [lastSummary, setLastSummary] = useState("");

  // Reset to sane defaults when the connected chain changes.
  useEffect(() => {
    const list = tokensForChain(chainId);
    setSellToken(list[0]);
    setBuyToken(list.find((t) => t.symbol === "USDC") ?? list[1] ?? list[0]);
    setSellAmount("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  const engine = useSwapEngine(sellToken, buyToken, sellAmount);
  const { data: sellBalance } = useBalance({
    address,
    token: isNative(sellToken.address) ? undefined : sellToken.address,
    query: { enabled: Boolean(address) },
  });

  const sellAmountRaw = safeParseUnits(sellAmount, sellToken.decimals);
  const insufficientBalance = Boolean(sellBalance && sellAmountRaw && sellAmountRaw > sellBalance.value);
  const buyAmountDisplay =
    engine.priceData?.buyAmount && engine.status === "ready"
      ? formatAmount(BigInt(engine.priceData.buyAmount), buyToken.decimals)
      : "";

  function flipTokens() {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount(buyAmountDisplay || "");
  }

  function handleSelect(token: Token) {
    if (selectSide === "sell") {
      if (token.address === buyToken.address) setBuyToken(sellToken);
      setSellToken(token);
    } else if (selectSide === "buy") {
      if (token.address === sellToken.address) setSellToken(buyToken);
      setBuyToken(token);
    }
  }

  async function handleCta() {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    setLastSummary(`Swapped ${sellAmount} ${sellToken.symbol} for ~${buyAmountDisplay} ${buyToken.symbol}`);
    await engine.executeSwap();
  }

  const ctaLabel = !isConnected
    ? "Connect wallet"
    : !sellAmount || sellAmount === "0"
    ? "Enter an amount"
    : insufficientBalance
    ? `Insufficient ${sellToken.symbol} balance`
    : engine.status === "loading-price"
    ? "Fetching price…"
    : engine.status === "price-error"
    ? "No route available"
    : engine.needsApproval
    ? `Approve & swap`
    : "Swap now";

  const ctaDisabled =
    isConnected &&
    (!sellAmount ||
      sellAmount === "0" ||
      insufficientBalance ||
      engine.status === "loading-price" ||
      engine.status === "price-error" ||
      engine.isBusy);

  return (
    <div className="relative w-full max-w-[440px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-xl3 border border-surface-700 bg-surface-900/90 p-5 shadow-card backdrop-blur-xl sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-display text-base font-semibold text-ink">Swap</h1>
          <SettingsPopover
            slippageBps={engine.slippageBps}
            setSlippageBps={engine.setSlippageBps}
            options={engine.slippageOptions}
          />
        </div>

        <div className="relative space-y-1.5">
          <TokenRow
            label="Sell"
            token={sellToken}
            amount={sellAmount}
            onAmountChange={setSellAmount}
            onOpenSelect={() => setSelectSide("sell")}
          />

          <div className="relative z-10 flex justify-center py-0.5">
            <motion.button
              whileHover={{ scale: 1.08, rotate: 180 }}
              whileTap={{ scale: 0.92 }}
              onClick={flipTokens}
              aria-label="Flip tokens"
              className="rounded-full border-4 border-surface-900 bg-surface-700 p-2 text-ink shadow-glow transition-colors hover:bg-core-700 hover:text-white"
            >
              <ArrowUpDown size={16} strokeWidth={1.8} />
            </motion.button>
          </div>

          <TokenRow
            label="Buy"
            token={buyToken}
            amount={buyAmountDisplay}
            onOpenSelect={() => setSelectSide("buy")}
            readOnly
            loading={engine.status === "loading-price"}
          />
        </div>

        <div className="mt-3 space-y-2.5">
          {(engine.priceData || engine.status === "loading-price") && (
            <RouteVisualizer fills={engine.priceData?.route?.fills} loading={engine.status === "loading-price"} />
          )}
          {engine.priceData && engine.status === "ready" && (
            <SwapDetails
              priceData={engine.priceData}
              sellToken={sellToken}
              buyToken={buyToken}
              slippageBps={engine.slippageBps}
              nativeSymbol={chainMeta[chainId ?? 1]?.label === "Polygon" ? "POL" : "ETH"}
            />
          )}
          {engine.errorMessage && engine.status === "price-error" && (
            <p className="rounded-xl2 border border-danger-600/30 bg-danger-600/10 px-3.5 py-2.5 text-xs text-danger-500">
              {engine.errorMessage}
            </p>
          )}
        </div>

        <motion.button
          whileHover={ctaDisabled ? undefined : { scale: 1.01 }}
          whileTap={ctaDisabled ? undefined : { scale: 0.98 }}
          disabled={ctaDisabled}
          onClick={handleCta}
          className={cn(
            "mt-4 w-full rounded-xl2 py-3.5 text-sm font-semibold transition-colors",
            ctaDisabled
              ? "cursor-not-allowed bg-surface-700 text-ink-faint"
              : "bg-core-700 text-white shadow-glow hover:bg-core-600"
          )}
        >
          {ctaLabel}
        </motion.button>

        <p className="mt-3 text-center text-[11px] text-ink-faint">
          Routed across 100+ liquidity sources by 0x · Best price, every time.
        </p>
      </motion.div>

      <TokenSelectModal
        open={selectSide !== null}
        onClose={() => setSelectSide(null)}
        tokens={tokenList}
        excludeAddress={selectSide === "sell" ? buyToken.address : sellToken.address}
        onSelect={handleSelect}
      />

      <StatusModal
        status={engine.status}
        needsApproval={engine.needsApproval}
        txHash={engine.txHash}
        chainId={chainId}
        errorMessage={engine.errorMessage}
        summary={lastSummary}
        onClose={() => {
          engine.reset();
          setSellAmount("");
        }}
        onRetry={() => engine.executeSwap()}
      />
    </div>
  );
}
