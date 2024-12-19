import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        DEFAULT: "4px 4px black",
        sm: "2px 2px black"
      },
      keyframes: {
        levitate: {
          "0%, 100%": { transform: "translateY(0px)" },
          "33%": { transform: "translateY(8px)" },
          "66%": { transform: "translateY(-8px)" },
        }
      },
      animation: {
        levitate: 'levitate 1s linear infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
