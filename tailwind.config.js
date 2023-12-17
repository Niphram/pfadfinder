/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				retro: {
					...require('daisyui/src/theming/themes')['retro'],
					neutral: '#dbca9a',
					'neutral-content': '#282425'
				}
			},
			'dracula'
		]
	}
};
