import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pine: { DEFAULT: "#071329", 800: "#0C1D3D", 700: "#16337A" },
        paper: "#F2F6FC",
        ink: "#0B1730",
        muted: "#4A5B78",
        gold: { DEFAULT: "#4096FF", 600: "#1F6FEB" },
        mint: "#DCE8F8",
        line: "#D3DEEE",
      },
    },
  },
  plugins: [],
};
export default config;
