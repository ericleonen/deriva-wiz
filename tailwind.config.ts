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
				easy: "var(--theme-easy)",
				intermediate: "var(--theme-intermediate)",
				hard: "var(--theme-hard)"
			},
			boxShadow: {
				DEFAULT: "4px 4px black",
				sm: "2px 2px black"
			}
		},
	},
	plugins: [],
} satisfies Config;
