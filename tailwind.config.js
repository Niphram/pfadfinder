const commonTheme = {
	'--rounded-box': '0.4rem',
	'--rounded-btn': '0.4rem',
	'--rounded-badge': '0.4rem',
	'--tab-radius': '0.4rem'
};

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
				light: {
					primary: '#EF9995',
					'primary-content': '#282425',
					secondary: '#A4CBB4',
					'secondary-content': '#282425',
					accent: '#DC8850',
					'accent-content': '#282425',
					neutral: '#2E282A',
					'neutral-content': '#EDE6D4',
					'base-100': '#ECE3CE',
					'base-200': '#DBCA9A',
					'base-content': '#282425',
					info: '#2563EB',
					success: '#16A34A',
					warning: '#D97706',
					error: 'oklch(65.72% 0.199 27.33)',
					...commonTheme
				}
			},
			{
				dark: {
					primary: '#FF79C6',
					secondary: '#BD93F9',
					accent: '#FFB86C',
					neutral: '#616584',
					'base-100': '#0B0B0F',
					'base-200': '#20222C',
					'base-300': '#363849',
					'base-content': '#F8F8F2',
					info: '#93C5FD',
					success: '#50FA7B',
					warning: '#FCD34D',
					error: 'FF5555',
					...commonTheme
				}
			}
		]
	}
};
