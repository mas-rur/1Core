import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Page-level background scale — warm paper, never stark/cold white.
        paper: {
          DEFAULT: "#FFFFFF",
          subtle: "#FBFAF7",
          muted: "#F2F0E9",
        },
        // Card fills, hairline borders and dividers.
        surface: {
          900: "#FFFFFF",
          800: "#FCFBF7",
          700: "#EDEAE1",
          600: "#DCD7C9",
          500: "#B7B2A2",
        },
        // Brand accent — the "core", now pure black/graphite instead of blue.
        core: {
          950: "#000000",
          900: "#0A0A09",
          800: "#161613",
          700: "#131311", // primary — buttons, CTAs
          600: "#2B2A26", // hover
          500: "#464540", // interactive mid-tone
          400: "#6E6C63",
          300: "#8F8C81", // muted accent labels
          200: "#C6C2B4",
          100: "#EFEDE5",
        },
        success: {
          500: "#15803D",
          600: "#116932",
        },
        danger: {
          500: "#C0362A",
          600: "#A32C21",
        },
        // Text scale — "ink" on paper.
        ink: {
          DEFAULT: "#141310",
          muted: "#6B6860",
          faint: "#A29D90",
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
        glow: "0 0 0 1px rgba(20,19,16,0.06), 0 10px 28px -10px rgba(20,19,16,0.28)",
        "glow-lg": "0 0 0 1px rgba(20,19,16,0.07), 0 24px 64px -16px rgba(20,19,16,0.32)",
        card: "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 2px 4px rgba(20,19,16,0.03), 0 24px 48px -24px rgba(20,19,16,0.18)",
        hairline: "0 0 0 1px rgba(20,19,16,0.08)",
      },
      backgroundImage: {
        grain: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/><feColorMatrix type=%22matrix%22 values=%220 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
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
