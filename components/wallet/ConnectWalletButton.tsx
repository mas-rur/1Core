"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { ChevronDown, Wallet } from "lucide-react";
import { chainMeta } from "@/lib/chains";
import { truncateAddress } from "@/lib/utils";

export function ConnectWalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div aria-hidden={!ready} className={!ready ? "pointer-events-none opacity-0" : undefined}>
            {!connected ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={openConnectModal}
                className="flex items-center gap-2 rounded-full bg-core-700 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-colors hover:bg-core-600"
              >
                <Wallet size={15} strokeWidth={2} />
                Connect wallet
              </motion.button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                className="rounded-full bg-danger-600 px-5 py-2.5 text-sm font-medium text-white"
              >
                Wrong network
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openChainModal}
                  className="hidden items-center gap-1.5 rounded-full border border-surface-600 bg-surface-800 px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-core-500/50 hover:text-ink sm:flex"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: chainMeta[chain.id]?.accent ?? "#9C988C" }}
                  />
                  {chainMeta[chain.id]?.label ?? chain.name}
                  <ChevronDown size={12} strokeWidth={2} className="text-ink-faint" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={openAccountModal}
                  className="rounded-full border border-surface-600 bg-surface-800 px-4 py-2.5 text-sm font-medium text-ink shadow-hairline transition-colors hover:border-core-500/50"
                >
                  {truncateAddress(account.address)}
                </motion.button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
