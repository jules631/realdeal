"use client";

interface SparklineProps {
  /** 0–1 normalized price points (13 values = ~every 2 weeks over 180 days) */
  points: number[];
  months: string[];
  priceRange: string;
}

const W = 500;
const H = 120;
const PAD = { top: 16, right: 16, bottom: 8, left: 16 };

function toCoords(points: number[]): [number, number][] {
  const n = points.length;
  return points.map((p, i) => {
    const x = PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
    // Invert Y: 0 = bottom, 1 = top
    const y = PAD.top + (1 - p) * (H - PAD.top - PAD.bottom);
    return [x, y];
  });
}

/**
 * Build a smooth cubic-bezier SVG path through the given coordinate pairs.
 * Uses cardinal spline approximation for a natural curve.
 */
function smoothPath(coords: [number, number][]): string {
  if (coords.length < 2) return "";
  const d: string[] = [`M ${coords[0][0]},${coords[0][1]}`];

  for (let i = 0; i < coords.length - 1; i++) {
    const [x0, y0] = coords[i];
    const [x1, y1] = coords[i + 1];
    const tension = 0.3;
    const cpx = x0 + (x1 - x0) * tension;
    d.push(`C ${cpx},${y0} ${x1 - (x1 - x0) * tension},${y1} ${x1},${y1}`);
  }
  return d.join(" ");
}

export default function Sparkline({ points, months, priceRange }: SparklineProps) {
  const coords = toCoords(points);
  const linePath = smoothPath(coords);
  const lastCoord = coords[coords.length - 1];

  // Area fill: close path along bottom
  const areaPath = `${linePath} L ${lastCoord[0]},${H - PAD.bottom} L ${PAD.left},${H - PAD.bottom} Z`;

  // Month label positions (evenly spaced across 5 labels)
  const monthPositions = months.map((_, i) => {
    const ratio = i / (months.length - 1);
    return PAD.left + ratio * (W - PAD.left - PAD.right);
  });

  return (
    <div className="bg-surface rounded-2xl shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-jakarta font-semibold text-text-muted uppercase tracking-wider">
          Price history · 180 days
        </span>
        <span className="text-xs font-jakarta text-text-muted">{priceRange}</span>
      </div>

      {/* SVG sparkline — responsive via viewBox */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C17B3A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#C17B3A" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaPath} fill="url(#sparkGrad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#C17B3A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dot at current (last) price */}
        <circle
          cx={lastCoord[0]}
          cy={lastCoord[1]}
          r="5"
          fill="#FFFFFF"
          stroke="#C17B3A"
          strokeWidth="2.5"
        />
      </svg>

      {/* Month labels */}
      <div className="relative mt-1" style={{ height: 16 }}>
        {months.map((label, i) => (
          <span
            key={label}
            className="absolute text-[10px] font-jakarta text-text-muted -translate-x-1/2"
            style={{
              left: `${(monthPositions[i] / W) * 100}%`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
