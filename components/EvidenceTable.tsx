import type { EvidenceRow } from "@/lib/getScore";

interface EvidenceTableProps {
  rows: EvidenceRow[];
}

const sentimentStyles: Record<
  EvidenceRow["sentiment"],
  { text: string; dot: string }
> = {
  good: { text: "text-deal-green", dot: "bg-deal-green" },
  warn: { text: "text-deal-amber", dot: "bg-deal-amber" },
  bad: { text: "text-deal-red", dot: "bg-deal-red" },
  neutral: { text: "text-text-secondary", dot: "bg-text-muted" },
};

export default function EvidenceTable({ rows }: EvidenceTableProps) {
  return (
    <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
      {rows.map((row, i) => {
        const styles = sentimentStyles[row.sentiment];
        return (
          <div
            key={row.key}
            className={`flex items-center justify-between px-5 py-3.5 gap-4 ${
              i < rows.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="text-sm font-jakarta text-text-secondary">
              {row.key}
            </span>
            <span
              className={`flex items-center gap-1.5 text-sm font-jakarta font-medium shrink-0 ${styles.text}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
                aria-hidden="true"
              />
              {row.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
