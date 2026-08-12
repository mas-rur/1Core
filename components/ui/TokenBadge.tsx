import { cn } from "@/lib/utils";
import type { Token } from "@/lib/tokens";

export function TokenBadge({ token, size = 32, className }: { token: Token; size?: number; className?: string }) {
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white", className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${token.tint}, ${token.tint}CC)`,
        boxShadow: `0 0 0 1px rgba(20,19,16,0.08), 0 1px 2px rgba(20,19,16,0.12)`,
      }}
    >
      {token.symbol.slice(0, 2).toUpperCase()}
    </div>
  );
}
