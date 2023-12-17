<script lang="ts">
	import '../app.css';

	import ThemeChanger from '$lib/components/theme-changer.svelte';

	import { loaded } from '$lib/data';
</script>

<ThemeChanger>
	{#if $loaded && $loaded}
		<slot />
	{:else}
		<div class="h-screen w-screen">
			<div class="flex h-full w-full items-center justify-center">
				<span class="loading loading-dots loading-lg" />
			</div>
		</div>
	{/if}
</ThemeChanger>
