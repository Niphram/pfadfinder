<script lang="ts">
	import '../../app.css';

	import { onMount } from 'svelte';

	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
	import { c, Character, dirty, loaded, overwriteSave, p } from '$lib/data';
	import { setChar } from '$lib/data/context';
	import { debounce } from '$lib/utils';

	let { children, data } = $props();

	// Global character while migrating all the logic
	setChar(c, p, dirty, loaded, overwriteSave);

	// Mirror character to new multi-char db
	const debouncedSave = debounce((char: Character) => {
		data.db.saveCharacter(char);
	}, 1000);

	onMount(() => {
		return c.subscribe(debouncedSave);
	});
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="h-screen w-screen">
		{#if $loaded && $loaded}
			{@render children?.()}
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<span class="loading loading-dots loading-lg"></span>
			</div>
		{/if}
	</div>
</div>
