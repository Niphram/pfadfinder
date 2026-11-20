<script lang="ts">
	import '../app.css';
	import './transition.css';

	import type { LayoutProps } from './$types';

	import { onNavigate } from '$app/navigation';
	import { navigating } from '$app/state';

	import { initSettings } from '#lib/state/settings.svelte.ts';

	import DialogProvider from '#lib/components/dialog-provider.svelte';
	import BrokenScreen from '#lib/components/fun/broken-screen.svelte';
	import PageLoader from '#lib/components/page-loader.svelte';
	import ThemeChanger from '#lib/components/theme-changer.svelte';
	import ToastProvider from '#lib/components/toast-provider.svelte';

	// Nice looking transitions (if supported)
	onNavigate((navigation) => {
		if (navigation.shallow) return;
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children }: LayoutProps = $props();

	await initSettings();
</script>

<PageLoader loading={navigating.complete !== null} />

<ThemeChanger>
	<DialogProvider>
		<ToastProvider>
			<BrokenScreen />

			{@render children()}
		</ToastProvider>
	</DialogProvider>
</ThemeChanger>
