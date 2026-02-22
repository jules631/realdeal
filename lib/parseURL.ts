export interface ParsedURL {
  retailer: string;
  productName: string;
  displayURL: string;
}

/**
 * Detect retailer name from URL hostname.
 */
function detectRetailer(hostname: string): string {
  const h = hostname.toLowerCase().replace(/^www\./, "");
  if (h.includes("amazon")) return "Amazon";
  if (h.includes("walmart")) return "Walmart";
  if (h.includes("target")) return "Target";
  if (h.includes("nordstrom")) return "Nordstrom";
  if (h.includes("bestbuy")) return "Best Buy";
  if (h.includes("costco")) return "Costco";
  if (h.includes("newegg")) return "Newegg";

  // Capitalize first segment of hostname (e.g. "ebay.com" → "Ebay")
  const firstSegment = h.split(".")[0];
  return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
}

/**
 * Extract a raw product slug from the URL pathname based on retailer.
 */
function extractSlug(retailer: string, pathname: string): string | null {
  let match: RegExpMatchArray | null = null;

  switch (retailer) {
    case "Nordstrom": {
      match = pathname.match(/\/s\/([^\/\?]+)/);
      return match ? match[1] : null;
    }
    case "Amazon": {
      match = pathname.match(/\/([^\/]+)\/dp\//);
      return match ? match[1] : null;
    }
    case "Walmart": {
      match = pathname.match(/\/ip\/([^\/\?]+)/);
      return match ? match[1] : null;
    }
    case "Target": {
      match = pathname.match(/\/p\/([^\/\-\?]+(?:-[^\/\-\?]+)*)\/-\//);
      return match ? match[1] : null;
    }
    case "Best Buy": {
      match = pathname.match(/\/site\/([^\/]+)\/[0-9]+\.p/);
      return match ? match[1] : null;
    }
    default: {
      // Fallback: longest path segment that isn't purely numeric and is >4 chars
      const segments = pathname.split("/").filter(Boolean);
      const best = segments
        .filter((s) => !/^\d+$/.test(s) && s.length > 4)
        .sort((a, b) => b.length - a.length)[0];
      return best ?? null;
    }
  }
}

/**
 * Convert a URL slug (hyphens/underscores) to a human-readable title.
 * Trims to 80 characters.
 */
function slugToTitle(slug: string): string {
  const title = slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return title.length > 80 ? title.slice(0, 77) + "…" : title;
}

/**
 * Parse an e-commerce product URL and return structured metadata.
 * Returns null if the URL is not valid.
 */
export function parseURL(rawURL: string): ParsedURL | null {
  let url: URL;
  try {
    url = new URL(rawURL);
  } catch {
    return null;
  }

  const retailer = detectRetailer(url.hostname);
  const slug = extractSlug(retailer, url.pathname);
  const productName = slug ? slugToTitle(slug) : "Unknown Product";

  // Truncate display URL to keep the UI clean
  const displayURL =
    rawURL.length > 60 ? rawURL.slice(0, 57) + "…" : rawURL;

  return { retailer, productName, displayURL };
}
