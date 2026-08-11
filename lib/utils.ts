import { formatUnits, parseUnits } from "viem";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Parse a human-entered decimal string into on-chain base units, tolerating partial input. */
export function safeParseUnits(value: string, decimals: number): bigint | null {
  if (!value || Number.isNaN(Number(value))) return null;
  try {
    return parseUnits(value as `${number}`, decimals);
  } catch {
    return null;
  }
}

export function formatAmount(raw: bigint | undefined, decimals: number, maxFractionDigits = 6): string {
  if (raw === undefined) return "";
  const formatted = formatUnits(raw, decimals);
  const [whole, fraction = ""] = formatted.split(".");
  if (!fraction) return whole;
  return `${whole}.${fraction.slice(0, maxFractionDigits)}`.replace(/\.?0+$/, "") || whole;
}

export function formatUsd(value: number | string | undefined): string {
  if (value === undefined) return "—";
  const n = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 1 ? 4 : 2 }).format(n);
}

export function truncateAddress(address: string, size = 4): string {
  return `${address.slice(0, 2 + size)}…${address.slice(-size)}`;
}

export function debounce<Args extends unknown[]>(fn: (...args: Args) => void, ms: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return (...args: Args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}
