<script lang="ts" module>
	import { type Snippet } from 'svelte';
	import { on } from 'svelte/events';
	import { MediaQuery } from 'svelte/reactivity';
	import { writable } from 'svelte/store';

	import { browser } from '$app/environment';

	import { isIn } from '$lib/utils';

	const STORAGE_KEY = 'theme';

	const THEMES = {
		light: {
			color: '#DBCA9A',
			background: '#ECE3CE',
		},
		dark: {
			color: '#20222C',
			background: '#0B0B0F',
		},
		wireframe: {
			color: '#f5f5f5',
			background: '#ffffff',
		},
	} satisfies Record<string, { color: string; background: string }>;

	export const THEME_KEYS = Object.keys(THEMES);
	export type ThemeKey = keyof typeof THEMES;

	const lightKey: ThemeKey = 'light';
	const darkKey: ThemeKey = 'dark';

	function browserOrDefault<T>(cb: () => T, fallback: T) {
		if (browser) return cb();
		else return fallback;
	}

	function themeOrNull(theme: string | null): ThemeKey | null {
		if (isIn(THEME_KEYS, theme)) return theme;
		else return null;
	}

	// Writable store that contains the theme key
	export let selectedTheme = writable(
		themeOrNull(
			browserOrDefault(() => window.localStorage.getItem(STORAGE_KEY), null),
		),
	);

	// Will never get unregistered
	if (browser) {
		// Update localstorage whenever theme changes
		selectedTheme.subscribe((theme) => {
			if (theme) window.localStorage.setItem(STORAGE_KEY, theme);
			else window.localStorage.removeItem(STORAGE_KEY);
		});

		// Listen to storage updates
		on(window, 'storage', (ev) => {
			// Abort if the event is for another key or the theme didn't actually change
			if (ev.key !== STORAGE_KEY) return;
			if (ev.newValue === ev.oldValue) return;

			selectedTheme.set(themeOrNull(ev.newValue));
		});
	}
</script>

<script lang="ts">
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	const darkPreferenceQuery = new MediaQuery('(prefers-color-scheme: dark)');

	const themeKey = $derived(
		$selectedTheme ? $selectedTheme
		: darkPreferenceQuery.current ? darkKey
		: lightKey,
	);

	const theme = $derived(THEMES[themeKey]);

	// Update theme attribute
	$effect.pre(() => {
		if (browser) {
			document.documentElement.setAttribute('data-theme', themeKey);
		}
	});
</script>

<svelte:head>
	<meta name="theme-color" content={theme.color} />
	<meta name="background-color" content={theme.background} />
</svelte:head>

{@render children?.()}
