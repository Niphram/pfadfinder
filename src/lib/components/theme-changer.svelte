<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { readonly, writable } from 'svelte/store';

	const lightTheme = 'light';
	const darkTheme = 'dark';

	function persistDarkmode(value?: boolean) {
		if (value !== undefined) {
			window.localStorage.setItem('darkmode', `${value}`);
		} else {
			window.localStorage.removeItem('darkmode');
		}
	}

	const darkmodeStore = writable(false, (set) => {
		// Load theme from local storage
		if (browser) {
			// Check OS preferred color scheme
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				set(true);
			}

			const savedDarkMode = window.localStorage.getItem('darkmode');
			if (savedDarkMode === 'true') set(true);
			if (savedDarkMode === 'false') set(false);
		}
	});

	export const isDarkMode = readonly(darkmodeStore);

	export function toggleDarkMode() {
		darkmodeStore.update((current) => {
			persistDarkmode(!current);
			return !current;
		});
	}
</script>

<script lang="ts">
	$: themeColor = $isDarkMode ? '#20222C' : '#DBCA9A';
	$: backgroundColor = $isDarkMode ? '#0B0B0F' : '#ECE3CE';

	$: {
		if (browser) {
			document.body.setAttribute('data-theme', $isDarkMode ? darkTheme : lightTheme);
		}
	}
</script>

<svelte:head>
	<meta name="theme-color" content={themeColor} />
	<meta name="background-color" content={backgroundColor} />
</svelte:head>

<slot />
