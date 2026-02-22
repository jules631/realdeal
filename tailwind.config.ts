import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDFAF6",
        surface: "#FFFFFF",
        accent: "#C17B3A",
        "accent-dark": "#9E6330",
        "text-primary": "#1C1712",
        "text-secondary": "#6B5E4E",
        "text-muted": "#A8998A",
        border: "#EDE4D7",
        // Sentiment colors
        "deal-green": "#1D7A4F",
        "deal-green-bg": "#EBF7F1",
        "deal-amber": "#92600A",
        "deal-amber-bg": "#FEF6E7",
        "deal-red": "#A02020",
        "deal-red-bg": "#FDECEC",
      },
      fontFamily: {
        fraunces: ["Fraunces", "Georgia", "serif"],
        jakarta: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(28,23,18,0.07)",
        "card-sm": "0 1px 6px 0 rgba(28,23,18,0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
