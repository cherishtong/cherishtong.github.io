import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = { 200: '#b8cdcd', 600: '#337879', 900: '#1b3838', 950: '#162727' };
const gray = { 100: '#f4f7f7', 200: '#e9efef', 300: '#bdc4c3', 400: '#828f8e', 500: '#4f5b5a', 700: '#303b3a', 800: '#1e2929', 900: '#141919' };

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
			fontFamily:{
				dakai:['DaKai']
			}
		},
	},
	plugins: [starlightPlugin()],
};