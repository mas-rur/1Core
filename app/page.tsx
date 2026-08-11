import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Header } from "@/components/layout/Header";
import { SwapCard } from "@/components/swap/SwapCard";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <AmbientBackground />
      <Header />

      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-16 pt-4 sm:gap-10">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-core-300">One route. Every source.</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ivory sm:text-4xl">
            Swap at the lowest cost, instantly.
          </h1>
          <p className="mt-3 text-sm text-ivory-muted">
            1Core scans 100+ exchanges through 0x and routes your trade through the single best path — so you never
            overpay for a swap.
          </p>
        </div>

        <SwapCard />
      </section>

      <footer className="relative z-10 px-6 pb-8 text-center text-xs text-ivory-faint">
        1Core is non-custodial — your keys, your funds, always. Prices via{" "}
        <a href="https://0x.org" target="_blank" rel="noreferrer" className="text-ivory-muted hover:text-core-300">
          0x
        </a>
        .
      </footer>
    </main>
  );
}
