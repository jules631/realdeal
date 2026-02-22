import type { Grade } from "@/lib/getScore";

interface ScoreCardProps {
  score: number;
  grade: Grade;
  heading: string;
  description: string;
}

const gradeStyles: Record<
  Grade,
  { bg: string; text: string; headingColor: string; scoreRing: string }
> = {
  green: {
    bg: "bg-deal-green-bg",
    text: "text-deal-green",
    headingColor: "text-deal-green",
    scoreRing: "ring-deal-green/20",
  },
  amber: {
    bg: "bg-deal-amber-bg",
    text: "text-deal-amber",
    headingColor: "text-deal-amber",
    scoreRing: "ring-deal-amber/20",
  },
  red: {
    bg: "bg-deal-red-bg",
    text: "text-deal-red",
    headingColor: "text-deal-red",
    scoreRing: "ring-deal-red/20",
  },
};

export default function ScoreCard({
  score,
  grade,
  heading,
  description,
}: ScoreCardProps) {
  const styles = gradeStyles[grade];

  return (
    <div className={`rounded-2xl p-5 flex gap-5 items-start ${styles.bg}`}>
      {/* Score circle */}
      <div
        className={`shrink-0 w-[88px] h-[88px] bg-surface rounded-full flex flex-col items-center justify-center shadow-card-sm ring-4 ${styles.scoreRing}`}
      >
        <span
          className={`font-fraunces text-3xl font-semibold leading-none ${styles.text}`}
        >
          {score}
        </span>
        <span className="text-text-muted text-xs font-jakarta mt-0.5">
          /100
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 pt-1">
        <p
          className={`font-fraunces text-xl font-semibold leading-tight ${styles.headingColor}`}
        >
          {heading}
        </p>
        <p className="text-text-secondary text-sm font-jakarta leading-relaxed mt-1.5">
          {description}
        </p>
      </div>
    </div>
  );
}
