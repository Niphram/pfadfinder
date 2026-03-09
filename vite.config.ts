import path from 'node:path';

import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import license from 'rollup-plugin-license';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		license({
			thirdParty: {
				output: {
					file: path.join(__dirname, 'static', 'licenses.json'),
					template: (dependencies) => JSON.stringify(dependencies, null, 2),
				},
			},
		}),
	],
	define: {
		__BUILD_DATE__: JSON.stringify(
			new Date().toISOString().replace(/[^0-9]/g, ''),
		),
	},
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
		],
	},
});
