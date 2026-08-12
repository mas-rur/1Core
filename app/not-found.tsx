import Link from "next/link";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { CoreMark } from "@/components/layout/CoreMark";
import { NotFoundRoute } from "@/components/layout/NotFoundRoute";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <AmbientBackground />

      <div className="mb-2 flex items-center gap-2 opacity-80">
        <CoreMark size={26} />
        <span className="font-display text-sm font-semibold text-ink">1Core</span>
      </div>

      <NotFoundRoute />

      <h1 className="mt-6 font-display text-2xl font-semibold text-ink sm:text-3xl">No route found for this page</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        404 — we checked every path and this one doesn&rsquo;t exist. It might have been moved, or the link was
        mistyped.
      </p>

      <Link
        href="/"
        className="mt-7 rounded-full bg-core-700 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-core-600"
      >
        Back to swap
      </Link>
    </main>
  );
}
