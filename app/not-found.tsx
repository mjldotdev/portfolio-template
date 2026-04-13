import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="section-label mb-6 block">404 — Not Found</span>
      <h1
        className="mb-4 font-display font-medium text-[var(--text)]"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
      >
        No Project
        <br />
        <em className="text-[var(--text-muted)]">Here.</em>
      </h1>
      <p className="mb-10 max-w-xs font-light text-[var(--text-muted)] text-sm leading-relaxed">
        That project doesn't exist — or hasn't shipped yet. Check back later.
      </p>
      <Link
        className="section-label hover:!text-[var(--accent)] inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-6 py-3 transition-all duration-300 hover:border-[var(--accent)]"
        href="/#work"
      >
        ← Back to Work
      </Link>
    </main>
  );
}
