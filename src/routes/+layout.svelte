<script lang="ts">
	import '../app.css';
	import './transition.css';

	import { onNavigate } from '$app/navigation';

	import ThemeChanger from '$lib/components/theme-changer.svelte';

	// Nice looking transitions (if supported)
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children } = $props();
</script>

<ThemeChanger>
	{@render children()}
</ThemeChanger>
