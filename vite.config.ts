import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { createViteLicensePlugin } from 'rollup-license-plugin';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
	fmt: {
		useTabs: true,
		singleQuote: true,
		trailingComma: 'all',
		printWidth: 80,
		sortTailwindcss: {
			stylesheet: './src/app.css',
		},
		svelte: {},
		sortImports: {
			groups: [
				'side_effect',
				'builtin',
				'external',
				'sveltekit-types',
				'svelte-virtual',
				'lib',
				'lib-atoms',
				'lib-components',
				'lib-pages',
				'lib-data',
				'import',
			],
			customGroups: [
				{
					groupName: 'sveltekit-types',
					elementNamePattern: ['./$types'],
				},
				{
					groupName: 'lib-atoms',
					elementNamePattern: ['$lib/atoms', '$lib/atoms/**/*'],
				},
				{
					groupName: 'lib-components',
					elementNamePattern: ['$lib/components', '$lib/components/**/*'],
				},
				{
					groupName: 'lib-data',
					elementNamePattern: ['$lib/data', '$lib/data/**/*'],
				},
				{
					groupName: 'lib-pages',
					elementNamePattern: ['$lib/pages', '$lib/pages**/*'],
				},
				{
					groupName: 'lib',
					elementNamePattern: ['$lib', '$lib/**/*'],
				},
				{
					groupName: 'svelte-virtual',
					elementNamePattern: ['$*', '$*/**/*'],
				},
			],
		},
		sortPackageJson: true,
		ignorePatterns: [
			'.DS_Store',
			'node_modules',
			'/build',
			'/.svelte-kit',
			'/package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
		],
	},
	lint: {
		plugins: ['typescript', 'unicorn'],
		jsPlugins: [
			{
				name: 'vite-plus',
				specifier: 'vite-plus/oxlint-plugin',
			},
			'eslint-plugin-svelte',
		],
		options: {
			typeAware: true,
			// Currently clashes with svelte module imports
			// typeCheck: true,
		},
		categories: {
			correctness: 'error',
			perf: 'error',
			nursery: 'error',
		},
		env: {
			builtin: true,
			browser: true,
			node: true,
		},
		rules: {
			'eslint/no-unused-vars': [
				'error',
				{
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'eslint/no-unused-expressions': [
				'error',
				{
					allowShortCircuit: true,
				},
			],
			'eslint/no-undef': 'off',
			'typescript/strict-boolean-expressions': [
				'error',
				{
					allowNullableBoolean: true,
					allowNullableEnum: true,
					allowNullableNumber: true,
					allowNullableString: true,
				},
			],
			'typescript/no-unnecessary-type-assertion': 'error',
			'typescript/consistent-type-imports': 'error',
			'vite-plus/prefer-vite-plus-imports': 'error',
		},
	},
	plugins: lazyPlugins(() => [
		createViteLicensePlugin(),
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),

			paths: {
				base: process.argv.includes('dev')
					? ''
					: (process.env.BASE_PATH as `/${string}`),
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true,
			}),
		}),
	]),
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
					setupFiles: ['./src/lib/test-utils/vitest-setup-client.ts'],
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
