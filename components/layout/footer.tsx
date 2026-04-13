export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-[var(--border)] border-t px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="section-label">© {year} — All rights reserved</span>
        <span className="section-label">
          Designed &amp; engineered with obsession{" "}
          <span className="text-[var(--accent)]">◆</span>
        </span>
      </div>
    </footer>
  );
}
