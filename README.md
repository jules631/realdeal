# RealDeal 🛍️

**Is that sale actually a deal?**

Paste any product URL. Get a confidence score on whether the discount is real or artificially inflated.

🔗 [Live Demo](https://realdeal.vercel.app) &nbsp;|&nbsp; [Report an Issue](https://github.com/jules631/realdeal/issues)

---

## The Problem

Every year, retailers play the same game. Prices get quietly raised 30–40% in the weeks before Black Friday, Prime Day, or holiday sales — then "discounted" back to where they were. The result looks like a deal. It isn't.

Existing tools like Camelcamelcamel show you a price history chart, but they put the burden on you to interpret it. Most people don't have time to study a graph. They just want to know: **should I buy this right now?**

RealDeal makes that call for you.

---

## What It Does

1. **Paste any product URL** from Amazon, Walmart, Target, Nordstrom, Best Buy, and more
2. **We analyze 180 days of price history** and look for inflation patterns before the current sale
3. **You get a Deal Confidence Score** (0–100) with a plain-English verdict and supporting evidence

| Score | Verdict | Meaning |
|-------|---------|---------|
| 75–100 | ✅ Real Deal | Genuine discount, buy with confidence |
| 40–74 | ⚠️ Proceed with Caution | Some inflation signals, consider waiting |
| 0–39 | 🚨 Fake Sale | Price was artificially inflated before this "discount" |

---

## Why This Matters

US e-commerce spending exceeds $1 trillion annually. Studies show that up to 60% of "sale" prices during major retail events are the same or higher than regular prices. RealDeal exists to give consumers the transparency they deserve.

---

## How It's Built

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Price Data | Rainforest API |
| Deployment | Vercel |

### Architecture

```
User pastes URL
      ↓
URL Parser → extracts retailer + product name from path slug
      ↓
Price History API → fetches 180 days of pricing data
      ↓
Scoring Engine → detects inflation patterns, calculates confidence score
      ↓
Result UI → renders score, evidence table, sparkline chart
```

### Scoring Logic

The Deal Confidence Score is calculated by analyzing:

- **Pre-sale price inflation** — did the price spike in the 30 days before this discount?
- **Historical average** — how does the current price compare to the 90/180-day average?
- **Price volatility** — how many times has the price changed recently?
- **Discount authenticity** — is the "original price" a real price the item ever held?

### Key Files

```
app/
  page.tsx              # Landing page
  result/page.tsx       # Result page
lib/
  parseURL.ts           # Extracts retailer + product name from any e-commerce URL
  getScore.ts           # Scoring engine (replace mock with real API here)
components/
  ScoreCard.tsx         # Verdict card with confidence score
  Sparkline.tsx         # SVG price history chart
  EvidenceTable.tsx     # Evidence breakdown rows
```

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/jules631/realdeal.git
cd realdeal

# Install dependencies
npm install

# Add your API key
cp .env.example .env.local
# Add RAINFOREST_API_KEY=your_key_here to .env.local

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Roadmap

- [x] URL parsing for major retailers
- [x] Deal confidence scoring engine
- [x] Price history sparkline chart
- [ ] Real price history API integration (Rainforest API)
- [ ] Price drop email alerts
- [ ] Browser extension
- [ ] Fake sale pattern detection using ML classification
- [ ] Support for international retailers

---

## The Bigger Idea

RealDeal started as a portfolio project exploring a real consumer pain point in fintech and e-commerce. The longer-term vision is an ML classification model trained on historical price manipulation patterns — moving from rule-based scoring to a model that can detect novel inflation tactics as retailers evolve their strategies.

---

## Background

Built by [Jules631](https://github.com/jules631) — an engineer and product manager with a background in electrical and computer engineering. This project was built to explore the intersection of price intelligence, consumer trust, and applied ML in fintech.

---

## License

MIT
