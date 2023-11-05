import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"header-blue": "#859DAF",
				lg: "#F5F5F5",
				g: "#D9D9D9",
				"dg-light": "#49515B",
				"dg-dark": "#373d44",
			},
			backgroundImage: {},
		},
	},
	plugins: [],
};
export default config;
