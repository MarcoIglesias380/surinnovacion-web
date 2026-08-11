import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#020617",
        midnight: "#050816",
        electric: "#2563EB",
        ion: "#22D3EE",
        neural: "#7C3AED",
        pulse: "#EAF2FF",
        frost: "#EAF2FF"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Geist", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "soft-glow": "0 0 40px rgba(34, 211, 238, 0.16)",
        "violet-glow": "0 0 52px rgba(124, 58, 237, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
