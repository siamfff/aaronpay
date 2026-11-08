import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          black: "#111111",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          400: "#9CA3AF",
          600: "#4B5563",
          800: "#1F2937",
        },
        bkash: "#E2136E",
        nagad: "#F7941D",
        rocket: "#8C3494",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        lg: "0 10px 25px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;