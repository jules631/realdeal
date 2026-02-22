// TODO: Replace with real price history API (e.g. Rainforest API, Oxylabs)

export type Grade = "green" | "amber" | "red";

export interface EvidenceRow {
  key: string;
  value: string;
  sentiment: "good" | "warn" | "bad" | "neutral";
}

export interface ScoreResult {
  score: number;
  grade: Grade;
  heading: string;
  description: string;
  evidenceRows: EvidenceRow[];
  /** 13 numbers between 0–1, representing normalized prices over 180 days */
  pricePoints: number[];
  priceRange: string;
  buyLabel: string;
  /** 5 month label strings for the sparkline x-axis */
  months: string[];
}

// ---------------------------------------------------------------------------
// Mock data per retailer
// Replace this function body with a real API call when ready.
// ---------------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getScore(retailer: string, productName: string): ScoreResult {
  switch (retailer) {
    case "Nordstrom":
      return {
        score: 78,
        grade: "green",
        heading: "Real Deal",
        description:
          "This price is 12% below the 90-day average and hasn't been artificially inflated before the sale. The discount looks genuine.",
        evidenceRows: [
          { key: "Current price vs. 90-day avg", value: "−12%", sentiment: "good" },
          { key: "Days at this price or lower", value: "31 of 90", sentiment: "good" },
          { key: "Sale label accuracy", value: "Verified", sentiment: "good" },
          { key: "Price before sale window", value: "Stable ($265)", sentiment: "neutral" },
          { key: "Competitor price match", value: "Within 5%", sentiment: "good" },
        ],
        pricePoints: [0.85, 0.88, 0.9, 0.87, 0.85, 0.82, 0.84, 0.8, 0.75, 0.72, 0.71, 0.72, 0.68],
        priceRange: "$175 – $265",
        buyLabel: "Buy now — $189 →",
        months: ["Sep", "Oct", "Nov", "Dec", "Jan"],
      };

    case "Amazon":
      return {
        score: 91,
        grade: "green",
        heading: "Real Deal",
        description:
          "Price is at a 6-month low. The product has never been listed at a higher 'original' price before this discount.",
        evidenceRows: [
          { key: "Current price vs. 180-day low", value: "At lowest", sentiment: "good" },
          { key: "Price history inflation", value: "None detected", sentiment: "good" },
          { key: "Amazon Sale badge", value: "Accurate", sentiment: "good" },
          { key: "Third-party seller variance", value: "< 3%", sentiment: "good" },
          { key: "Coupon stacking", value: "Available", sentiment: "good" },
        ],
        pricePoints: [0.9, 0.92, 0.88, 0.85, 0.87, 0.84, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62],
        priceRange: "$42 – $89",
        buyLabel: "Buy now — $49 →",
        months: ["Sep", "Oct", "Nov", "Dec", "Jan"],
      };

    case "Walmart":
      return {
        score: 54,
        grade: "amber",
        heading: "Proceed with Caution",
        description:
          "The sale price is real, but the original price was temporarily bumped up 3 weeks ago — a common tactic to inflate the discount percentage.",
        evidenceRows: [
          { key: "Current price vs. 90-day avg", value: "−8%", sentiment: "good" },
          { key: "Price spike before sale", value: "Detected (+22%)", sentiment: "bad" },
          { key: "True discount (vs. real avg)", value: "~4%", sentiment: "warn" },
          { key: "Competitor lowest price", value: "$12 less at Amazon", sentiment: "warn" },
          { key: "Rollback badge", value: "Inflated baseline", sentiment: "bad" },
        ],
        pricePoints: [0.6, 0.62, 0.61, 0.63, 0.65, 0.68, 0.88, 0.9, 0.89, 0.87, 0.7, 0.68, 0.66],
        priceRange: "$38 – $74",
        buyLabel: "Buy now — $54 →",
        months: ["Sep", "Oct", "Nov", "Dec", "Jan"],
      };

    case "Target":
      return {
        score: 62,
        grade: "amber",
        heading: "Proceed with Caution",
        description:
          "The listed discount is partially genuine, but we've seen this item at a lower price in the past 60 days.",
        evidenceRows: [
          { key: "Current price vs. 60-day low", value: "+$9 above low", sentiment: "warn" },
          { key: "Sale frequency", value: "On sale 40% of the time", sentiment: "warn" },
          { key: "Original price accuracy", value: "Slightly inflated", sentiment: "bad" },
          { key: "RedCard discount potential", value: "Additional 5% off", sentiment: "good" },
          { key: "Price match available", value: "Yes", sentiment: "good" },
        ],
        pricePoints: [0.75, 0.72, 0.7, 0.68, 0.66, 0.68, 0.7, 0.72, 0.65, 0.63, 0.67, 0.68, 0.64],
        priceRange: "$55 – $110",
        buyLabel: "Buy now — $72 →",
        months: ["Sep", "Oct", "Nov", "Dec", "Jan"],
      };

    default:
      return {
        score: 18,
        grade: "red",
        heading: "Fake Sale",
        description:
          "The 'original' price was only used for a few days before the sale launched. The real everyday price is close to the current 'sale' price.",
        evidenceRows: [
          { key: "Days at 'original' price", value: "3 days", sentiment: "bad" },
          { key: "Price inflation before sale", value: "+68%", sentiment: "bad" },
          { key: "True discount", value: "< 2%", sentiment: "bad" },
          { key: "Historical low", value: "$24 less than now", sentiment: "bad" },
          { key: "Retailer reliability score", value: "Poor", sentiment: "bad" },
        ],
        pricePoints: [0.38, 0.4, 0.39, 0.41, 0.42, 0.44, 0.85, 0.9, 0.88, 0.86, 0.55, 0.54, 0.56],
        priceRange: "$29 – $95",
        buyLabel: "Buy now — $57 →",
        months: ["Sep", "Oct", "Nov", "Dec", "Jan"],
      };
  }
}
