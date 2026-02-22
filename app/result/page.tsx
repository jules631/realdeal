import Link from "next/link";
import { parseURL } from "@/lib/parseURL";
import { getScore } from "@/lib/getScore";
import ScoreCard from "@/components/ScoreCard";
import Sparkline from "@/components/Sparkline";
import EvidenceTable from "@/components/EvidenceTable";

interface ResultPageProps {
  searchParams: { url?: string };
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const rawURL = searchParams.url ?? "";
  const parsed = parseURL(rawURL);

  // Fallback if URL can't be parsed
  if (!parsed) {
    return (
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[580px] text-center">
          <p className="font-fraunces text-2xl text-text-primary mb-4">
            Hmm, that URL didn&apos;t work.
          </p>
          <p className="text-text-secondary font-jakarta text-sm mb-6">
            Make sure you paste a full product URL including https://
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-jakarta font-medium text-accent hover:text-accent-dark transition-colors"
          >
            ← Try another URL
          </Link>
        </div>
      </main>
    );
  }

  const { retailer, productName, displayURL } = parsed;
  const result = getScore(retailer, productName);

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="w-full max-w-[580px] mx-auto flex flex-col gap-5">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-jakarta font-medium text-text-secondary hover:text-text-primary transition-colors w-fit"
        >
          ← Check another
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-2">
          {/* Retailer badge */}
          <div className="flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
            <span className="text-xs font-jakarta font-semibold text-text-secondary uppercase tracking-wider">
              {retailer}
            </span>
          </div>

          {/* Product name */}
          <h1 className="font-fraunces text-2xl font-semibold text-text-primary leading-snug">
            {productName}
          </h1>

          {/* Truncated URL */}
          <p
            className="text-xs font-jakarta text-text-muted break-all"
            title={rawURL}
          >
            {displayURL}
          </p>
        </div>

        {/* Verdict card */}
        <ScoreCard
          score={result.score}
          grade={result.grade}
          heading={result.heading}
          description={result.description}
        />

        {/* Evidence section */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-jakarta font-semibold text-text-muted uppercase tracking-wider px-0.5">
            What we found
          </p>
          <EvidenceTable rows={result.evidenceRows} />
        </div>

        {/* Price history sparkline */}
        <Sparkline
          points={result.pricePoints}
          months={result.months}
          priceRange={result.priceRange}
        />

        {/* Action row */}
        <div className="flex gap-3">
          <a
            href={rawURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-accent hover:bg-accent-dark active:scale-[0.98] transition-all text-white font-jakarta font-semibold text-sm rounded-xl py-3 px-4 flex items-center justify-center gap-1 shadow-sm"
          >
            {result.buyLabel}
          </a>
          <button
            type="button"
            className="flex-1 border border-border hover:border-accent hover:text-accent text-text-secondary font-jakarta font-medium text-sm rounded-xl py-3 px-4 flex items-center justify-center gap-1.5 transition-colors bg-surface"
          >
            🔔 Set price alert
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] font-jakarta text-text-muted leading-relaxed pb-4">
          Price data is illustrative. RealDeal is a demo — always verify before
          purchasing.
        </p>
      </div>
    </main>
  );
}
