"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, usePublicClient, useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { erc20Abi } from "@/lib/erc20";
import { isNative, type Token } from "@/lib/tokens";
import { safeParseUnits } from "@/lib/utils";
import { useDebounce } from "./useDebounce";

export type SwapStatus =
  | "idle"
  | "loading-price"
  | "ready"
  | "needs-approval"
  | "approving"
  | "building-quote"
  | "awaiting-signature"
  | "pending"
  | "success"
  | "error"
  | "price-error"; // a quote/price lookup failed — shown inline, not as a full-screen failure

export type ZeroExIssues = {
  allowance?: { spender: `0x${string}`; actual: string } | null;
  balance?: { token: string; actual: string; expected: string } | null;
  simulationIncomplete?: boolean;
};

export type PriceResponse = {
  buyAmount: string;
  sellAmount: string;
  estimatedPriceImpact?: string | null;
  gas?: string;
  gasPrice?: string;
  liquidityAvailable: boolean;
  issues?: ZeroExIssues;
  route?: { fills?: Array<{ source: string; proportionBps: string }> };
  totalNetworkFee?: string;
};

export type QuoteResponse = PriceResponse & {
  transaction: { to: `0x${string}`; data: `0x${string}`; value: string; gas: string; gasPrice?: string };
};

const SLIPPAGE_OPTIONS = [50, 100, 300] as const; // basis points: 0.5%, 1%, 3%

export function useSwapEngine(sellToken: Token, buyToken: Token, sellAmountInput: string) {
  const { address, chainId } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { sendTransactionAsync } = useSendTransaction();

  const [status, setStatus] = useState<SwapStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [priceData, setPriceData] = useState<PriceResponse | null>(null);
  const [slippageBps, setSlippageBps] = useState<number>(100);

  const debouncedAmount = useDebounce(sellAmountInput, 450);
  const sellAmountRaw = useMemo(
    () => safeParseUnits(debouncedAmount, sellToken.decimals),
    [debouncedAmount, sellToken.decimals]
  );

  const { data: allowance } = useReadContract({
    address: sellToken.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, priceData?.issues?.allowance?.spender ?? sellToken.address] : undefined,
    query: { enabled: Boolean(address) && !isNative(sellToken.address) && Boolean(priceData?.issues?.allowance) },
  });

  // Fetch an indicative price whenever the debounced input, pair, or chain changes.
  useEffect(() => {
    setErrorMessage(null);
    if (!sellAmountRaw || sellAmountRaw === 0n || !chainId) {
      setPriceData(null);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    setStatus("loading-price");

    const params = new URLSearchParams({
      chainId: String(chainId),
      sellToken: sellToken.address,
      buyToken: buyToken.address,
      sellAmount: sellAmountRaw.toString(),
      slippageBps: String(slippageBps),
      ...(address ? { taker: address } : {}),
    });

    fetch(`/api/price?${params.toString()}`, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Couldn't fetch a price for this pair.");
        setPriceData(data);
        setStatus(data.liquidityAvailable === false ? "price-error" : "ready");
        if (data.liquidityAvailable === false) setErrorMessage("No route with enough liquidity was found for this pair.");
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setPriceData(null);
        setStatus("price-error");
        setErrorMessage(err.message ?? "Couldn't fetch a price for this pair.");
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellAmountRaw, sellToken.address, buyToken.address, chainId, slippageBps, address]);

  const needsApproval = useMemo(() => {
    if (!priceData?.issues?.allowance || !sellAmountRaw) return false;
    if (allowance === undefined) return true;
    return allowance < sellAmountRaw;
  }, [priceData, allowance, sellAmountRaw]);

  const reset = useCallback(() => {
    setStatus("idle");
    setErrorMessage(null);
    setTxHash(null);
  }, []);

  const executeSwap = useCallback(async () => {
    if (!address || !chainId || !publicClient || !sellAmountRaw || sellAmountRaw === 0n) return;

    try {
      setErrorMessage(null);
      setStatus("building-quote");

      const params = new URLSearchParams({
        chainId: String(chainId),
        sellToken: sellToken.address,
        buyToken: buyToken.address,
        sellAmount: sellAmountRaw.toString(),
        slippageBps: String(slippageBps),
        taker: address,
      });

      const res = await fetch(`/api/quote?${params.toString()}`);
      const quote: QuoteResponse & { error?: string } = await res.json();
      if (!res.ok) throw new Error(quote.error ?? "Couldn't build a quote.");
      if (quote.liquidityAvailable === false) throw new Error("No route with enough liquidity was found.");

      const spender = quote.issues?.allowance?.spender;
      if (spender && !isNative(sellToken.address)) {
        const currentAllowance =
          allowance ??
          (await publicClient.readContract({
            address: sellToken.address,
            abi: erc20Abi,
            functionName: "allowance",
            args: [address, spender],
          }));

        if (currentAllowance < sellAmountRaw) {
          setStatus("approving");
          const approveHash = await writeContractAsync({
            address: sellToken.address,
            abi: erc20Abi,
            functionName: "approve",
            args: [spender, sellAmountRaw],
          });
          await publicClient.waitForTransactionReceipt({ hash: approveHash });
        }
      }

      setStatus("awaiting-signature");
      const hash = await sendTransactionAsync({
        to: quote.transaction.to,
        data: quote.transaction.data,
        value: BigInt(quote.transaction.value ?? "0"),
      });

      setTxHash(hash);
      setStatus("pending");

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status !== "success") throw new Error("The transaction reverted on-chain.");

      setStatus("success");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? /rejected|denied/i.test(err.message)
            ? "You rejected the request in your wallet."
            : err.message
          : "Something went wrong while swapping.";
      setErrorMessage(message);
      setStatus("error");
    }
  }, [
    address,
    chainId,
    publicClient,
    sellAmountRaw,
    sellToken.address,
    buyToken.address,
    slippageBps,
    allowance,
    writeContractAsync,
    sendTransactionAsync,
  ]);

  return {
    status,
    priceData,
    errorMessage,
    txHash,
    needsApproval,
    slippageBps,
    setSlippageBps,
    slippageOptions: SLIPPAGE_OPTIONS,
    executeSwap,
    reset,
    isBusy: ["building-quote", "approving", "awaiting-signature", "pending"].includes(status),
  };
}
