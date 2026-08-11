import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070D",
          900: "#080B14",
          800: "#0C1120",
        },
        surface: {
          900: "#0F1420",
          800: "#141B2E",
          700: "#1B2436",
          600: "#26314A",
          500: "#33405D",
        },
        core: {
          950: "#04152E",
          900: "#082A5C",
          800: "#0B3A80",
          700: "#0D47A1", // brand — 1Core primary
          600: "#1257C4",
          500: "#2F6FED", // glow / interactive accent
          400: "#5A8DF2",
          300: "#8FB2F7",
          200: "#C2D6FB",
          100: "#E4EDFD",
        },
        success: {
          500: "#22C55E",
          600: "#16A34A",
        },
        danger: {
          500: "#EF4444",
          600: "#DC2626",
        },
        ivory: {
          DEFAULT: "#F3F5FA",
          muted: "#8A93A6",
          faint: "#4C5670",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(47,111,237,0.18), 0 8px 40px -8px rgba(13,71,161,0.55)",
        "glow-lg": "0 0 0 1px rgba(47,111,237,0.22), 0 20px 80px -12px rgba(13,71,161,0.65)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -20px rgba(0,0,0,0.65)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.05)" },
        },
        "pulse-line": {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" },
        },
        "ring-draw": {
          "0%": { strokeDashoffset: "283" },
          "100%": { strokeDashoffset: "0" },
        },
        "check-draw": {
          "0%": { strokeDashoffset: "48" },
          "100%": { strokeDashoffset: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
        "drift-slow": "drift 22s ease-in-out infinite",
        "pulse-line": "pulse-line 1.1s ease-out forwards",
        "ring-draw": "ring-draw 0.6s cubic-bezier(0.65,0,0.35,1) forwards",
        "check-draw": "check-draw 0.4s 0.5s cubic-bezier(0.65,0,0.35,1) forwards",
        shake: "shake 0.5s cubic-bezier(0.36,0.07,0.19,0.97)",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
