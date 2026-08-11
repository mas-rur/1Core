# 1Core

Swap crypto at the lowest cost, instantly. 1Core aggregates 100+ liquidity sources through the [0x Swap API](https://0x.org) and connects to any wallet via WalletConnect (through RainbowKit), so every trade routes through the single best price.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, wagmi + viem, and RainbowKit.

## Features

- **Wallet connect** — WalletConnect, MetaMask, Coinbase Wallet, and more via RainbowKit
- **Best-price routing** — live indicative pricing and firm quotes from 0x's Swap API v2 (Settler / AllowanceHolder)
- **Multi-chain** — Ethereum, Arbitrum, Base, Optimism, Polygon
- **Clean, animated UI** — a swap terminal with a live route visualizer, slippage control, and price impact / minimum-received breakdown
- **Full transaction lifecycle UI** — approve → confirm → swap step tracker, a drawn-checkmark success animation, and a shake + X failure animation, each linking to the block explorer
- **Custom 404 page** themed around "no route found"
- **Server-side API key** — your 0x API key never reaches the browser; all calls go through Next.js route handlers

## Getting started

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Free at [cloud.reown.com](https://cloud.reown.com) (formerly WalletConnect Cloud) |
| `ZEROX_API_KEY` | Free at [dashboard.0x.org](https://dashboard.0x.org) |

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx            Swap terminal (home page)
  not-found.tsx        Custom 404
  api/price/route.ts    Indicative price proxy → 0x
  api/quote/route.ts    Firm, executable quote proxy → 0x
components/
  swap/                SwapCard, TokenRow, RouteVisualizer, SwapDetails, SettingsPopover, TokenSelectModal
  feedback/             StatusModal + Pending/Success/Failed animations
  wallet/               ConnectWalletButton (RainbowKit)
  layout/               Header, AmbientBackground, CoreMark, NotFoundRoute
hooks/
  useSwapQuote.ts       Price polling + approve/sign/send state machine
lib/
  tokens.ts             Curated token lists per chain
  zeroex.ts              Server-side 0x client
  wagmi.ts                wagmi/RainbowKit config
```

## How a swap executes

1. As the user types, the app debounces and calls `/api/price` for an indicative price (no wallet signature needed).
2. On submit, `/api/quote` returns a firm, executable quote, including the allowance target (AllowanceHolder or Permit2 contract — never the Settler contract itself, per 0x's guidance).
3. If the current ERC-20 allowance is insufficient, the app sends an `approve` transaction first and waits for it to confirm.
4. The app then sends the swap transaction returned by the quote and waits for the receipt.
5. Success shows a drawn checkmark with a link to the transaction on the relevant block explorer; failure (including a rejected signature) shows a red X with the reason and a retry button.

## Notes

- Token lists in `lib/tokens.ts` are a small curated set per chain — add more freely, they only need `address`, `decimals`, and a `tint` color for the generated monogram badge (no external logo images are used, so nothing ever breaks a broken-image icon).
- This app uses 0x's **AllowanceHolder** flow (simple approve-then-swap) rather than Permit2 gasless signatures, to keep the transaction flow easy to follow. If you want gasless approvals, switch `lib/zeroex.ts` to the `/swap/permit2/*` endpoints and sign the returned EIP-712 permit before sending the transaction.
- Slippage defaults to 1%, adjustable from the gear icon on the swap card.
- Colors and animation timings live in `tailwind.config.ts` — the brand primary is `#0D47A1`.
