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
        background: `linear-gradient(135deg, ${token.tint}CC, ${token.tint}55)`,
        boxShadow: `0 0 0 1px ${token.tint}40 inset`,
      }}
    >
      {token.symbol.slice(0, 2).toUpperCase()}
    </div>
  );
}
