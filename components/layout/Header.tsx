import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";
import { CoreMark } from "./CoreMark";

export function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
      <div className="flex items-center gap-2.5">
        <CoreMark size={30} />
        <span className="font-display text-lg font-semibold tracking-tight text-ink">1Core</span>
      </div>
      <ConnectWalletButton />
    </header>
  );
}
