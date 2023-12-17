<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { readonly, writable } from 'svelte/store';

	const lightTheme = 'retro';
	const darkTheme = 'dracula';

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

<div data-theme={$isDarkMode ? darkTheme : lightTheme}>
	<slot />
</div>
