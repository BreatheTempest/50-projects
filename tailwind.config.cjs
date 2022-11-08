/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		gridTemplateColumns: {
			'fill-40': 'repeat(auto-fit, minmax(300px, 1fr))',
		},
	},
	plugins: [],
};
