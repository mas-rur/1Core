import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

export const supportedChains = [mainnet, arbitrum, base, optimism, polygon] as const;

export const chainMeta: Record<number, { label: string; explorer: string; accent: string }> = {
  [mainnet.id]: { label: "Ethereum", explorer: "https://etherscan.io", accent: "#627EEA" },
  [arbitrum.id]: { label: "Arbitrum", explorer: "https://arbiscan.io", accent: "#28A0F0" },
  [base.id]: { label: "Base", explorer: "https://basescan.org", accent: "#0052FF" },
  [optimism.id]: { label: "Optimism", explorer: "https://optimistic.etherscan.io", accent: "#FF0420" },
  [polygon.id]: { label: "Polygon", explorer: "https://polygonscan.com", accent: "#8247E5" },
};

export function explorerTxUrl(chainId: number, hash: string) {
  const base = chainMeta[chainId]?.explorer ?? "https://etherscan.io";
  return `${base}/tx/${hash}`;
}
