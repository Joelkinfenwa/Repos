/**
 * Token + font smoke-test page (PROMPT 1).
 * Renders an H1 and a primary button in the ALTR style to confirm the
 * design tokens and Hanken Grotesk are wired correctly.
 * This will be replaced by the "/" redirect logic in a later prompt.
 */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[600px] flex-col justify-center px-5">
      <p className="mb-3.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-text-3">
        Design system check
      </p>

      <h1 className="mb-1.5 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">
        ALTR portal. <span className="text-text-3">Tokens &amp; type are live.</span>
      </h1>

      <p className="mb-6 max-w-[46ch] text-[15px] text-text-2">
        Warm black &amp; white, Hanken Grotesk, status colours reserved for
        functional indicators. If this looks right, the foundation is solid.
      </p>

      {/* Primary CTA — ported from .cta in the portal prototype */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2.5 rounded-[var(--radius)] bg-text px-3.5 py-3.5 text-base font-bold text-bg transition-transform duration-100 hover:opacity-95 active:scale-[0.985]"
      >
        Primary action
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-[17px] w-[17px]"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      {/* Status indicator swatches — functional colours only */}
      <div className="mt-8 flex gap-4 text-xs font-bold uppercase tracking-[0.05em]">
        <span className="flex items-center gap-2 text-ok">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" /> ok
        </span>
        <span className="flex items-center gap-2 text-warn">
          <span className="h-1.5 w-1.5 rounded-full bg-warn" /> warn
        </span>
        <span className="flex items-center gap-2 text-alert">
          <span className="h-1.5 w-1.5 rounded-full bg-alert" /> alert
        </span>
      </div>
    </main>
  );
}
