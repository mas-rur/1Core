import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

/** 0x / most aggregators use this sentinel address to mean "native gas token". */
export const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as const;

export type Token = {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  chainId: number;
  /** Deterministic monogram color — no external logo dependency. */
  tint: string;
};

const native = (chainId: number, symbol: string, name: string, tint: string): Token => ({
  symbol,
  name,
  address: NATIVE_TOKEN_ADDRESS,
  decimals: 18,
  chainId,
  tint,
});

export const TOKENS: Record<number, Token[]> = {
  [mainnet.id]: [
    native(mainnet.id, "ETH", "Ethereum", "#627EEA"),
    { symbol: "WETH", name: "Wrapped Ether", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18, chainId: mainnet.id, tint: "#8FA8F5" },
    { symbol: "USDC", name: "USD Coin", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, chainId: mainnet.id, tint: "#2775CA" },
    { symbol: "USDT", name: "Tether USD", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6, chainId: mainnet.id, tint: "#26A17B" },
    { symbol: "DAI", name: "Dai Stablecoin", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18, chainId: mainnet.id, tint: "#F5AC37" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, chainId: mainnet.id, tint: "#F7931A" },
  ],
  [arbitrum.id]: [
    native(arbitrum.id, "ETH", "Ethereum", "#28A0F0"),
    { symbol: "USDC", name: "USD Coin", address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", decimals: 6, chainId: arbitrum.id, tint: "#2775CA" },
    { symbol: "USDT", name: "Tether USD", address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", decimals: 6, chainId: arbitrum.id, tint: "#26A17B" },
    { symbol: "ARB", name: "Arbitrum", address: "0x912CE59144191C1204E64559FE8253a0e49E6548", decimals: 18, chainId: arbitrum.id, tint: "#28A0F0" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", decimals: 8, chainId: arbitrum.id, tint: "#F7931A" },
  ],
  [base.id]: [
    native(base.id, "ETH", "Ethereum", "#0052FF"),
    { symbol: "USDC", name: "USD Coin", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", decimals: 6, chainId: base.id, tint: "#2775CA" },
    { symbol: "cbBTC", name: "Coinbase Wrapped BTC", address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf", decimals: 8, chainId: base.id, tint: "#F7931A" },
    { symbol: "DAI", name: "Dai Stablecoin", address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", decimals: 18, chainId: base.id, tint: "#F5AC37" },
  ],
  [optimism.id]: [
    native(optimism.id, "ETH", "Ethereum", "#FF0420"),
    { symbol: "USDC", name: "USD Coin", address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", decimals: 6, chainId: optimism.id, tint: "#2775CA" },
    { symbol: "OP", name: "Optimism", address: "0x4200000000000000000000000000000000000042", decimals: 18, chainId: optimism.id, tint: "#FF0420" },
    { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095", decimals: 8, chainId: optimism.id, tint: "#F7931A" },
  ],
  [polygon.id]: [
    native(polygon.id, "POL", "Polygon", "#8247E5"),
    { symbol: "USDC", name: "USD Coin", address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", decimals: 6, chainId: polygon.id, tint: "#2775CA" },
    { symbol: "USDT", name: "Tether USD", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6, chainId: polygon.id, tint: "#26A17B" },
    { symbol: "WETH", name: "Wrapped Ether", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", decimals: 18, chainId: polygon.id, tint: "#8FA8F5" },
  ],
};

export function tokensForChain(chainId: number | undefined): Token[] {
  if (!chainId) return TOKENS[mainnet.id];
  return TOKENS[chainId] ?? TOKENS[mainnet.id];
}

export function isNative(address: string) {
  return address.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase();
}
