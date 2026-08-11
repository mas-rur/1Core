import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportedChains } from "./chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId && typeof window !== "undefined") {
  // Non-fatal in dev so the UI still renders; swaps just won't have a WalletConnect QR flow.
  console.warn(
    "[1Core] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Get a free project ID at cloud.reown.com."
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: "1Core",
  projectId: projectId || "MISSING_PROJECT_ID",
  chains: supportedChains,
  ssr: true,
});
