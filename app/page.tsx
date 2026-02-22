"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please paste a product URL to continue.");
      return;
    }
    setError("");
    router.push(`/result?url=${encodeURIComponent(trimmed)}`);
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[580px] flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 1.5L10.854 6.396L16.059 6.545L12 9.854L13.416 15L9 12.15L4.584 15L6 9.854L1.941 6.545L7.146 6.396L9 1.5Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="font-fraunces text-xl font-semibold text-text-primary tracking-tight">
            RealDeal
          </span>
        </div>

        {/* Headline */}
        <div className="text-center">
          <h1 className="font-fraunces text-[2.25rem] leading-tight font-light text-text-primary">
            Is that sale{" "}
            <em className="not-italic text-accent font-normal italic">
              actually
            </em>{" "}
            a deal?
          </h1>
          <p className="mt-3 text-text-secondary font-jakarta text-base leading-relaxed max-w-md mx-auto">
            Paste any product link and we&apos;ll check the price history — so
            you know if you&apos;re really saving money.
          </p>
        </div>

        {/* Input card */}
        <div className="w-full bg-surface rounded-2xl shadow-card border border-border p-5">
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder="Paste a product URL here…"
              className={`w-full rounded-xl border px-4 py-3 font-jakarta text-sm text-text-primary placeholder:text-text-muted bg-cream outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/10 ${
                error ? "border-deal-red" : "border-border"
              }`}
              autoComplete="off"
              spellCheck={false}
            />
            {error && (
              <p className="mt-2 text-xs font-jakarta text-deal-red">{error}</p>
            )}
            <button
              type="submit"
              className="mt-3 w-full bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-jakarta font-semibold text-sm rounded-xl py-3 px-5 flex items-center justify-center gap-1.5 shadow-sm"
            >
              Check this deal →
            </button>
          </form>
        </div>

        {/* Supported retailers */}
        <p className="text-text-muted font-jakarta text-xs text-center">
          Works with{" "}
          {["Amazon", "Walmart", "Target", "Nordstrom", "Best Buy"].map(
            (r, i, arr) => (
              <span key={r}>
                <span className="text-text-secondary font-medium">{r}</span>
                {i < arr.length - 1 && (
                  <span className="mx-1.5 text-border">·</span>
                )}
              </span>
            )
          )}{" "}
          <span className="mx-1.5 text-border">·</span>
          <span>+ more</span>
        </p>
      </div>
    </main>
  );
}
