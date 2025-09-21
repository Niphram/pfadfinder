<script lang="ts">
	import '../app.css';
	import './transition.css';

	import { onNavigate } from '$app/navigation';
	import { navigating } from '$app/state';

	import DialogProvider from '$lib/components/dialog-provider.svelte';
	import PageLoader from '$lib/components/page-loader.svelte';
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

<div class="h-screen min-h-screen w-screen min-w-screen">
	<PageLoader loading={navigating.complete !== null} />

	<ThemeChanger>
		<DialogProvider>
			{@render children()}
		</DialogProvider>
	</ThemeChanger>
</div>
