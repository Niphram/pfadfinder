<script lang="ts">
	import '../app.css';
	import './transition.css';

	import { onNavigate } from '$app/navigation';

	import DialogProvider from '$lib/components/dialog-provider.svelte';
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
	<DialogProvider>
		{@render children()}
	</DialogProvider>
</ThemeChanger>
