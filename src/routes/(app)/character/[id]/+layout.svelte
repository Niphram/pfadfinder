<script lang="ts">
	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
	import { setChar } from '$lib/data/context.svelte';
	import { charProxy } from '$lib/serde/proxy';

	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();

	const state = $state({
		c: charProxy(data.character),
	});

	setChar(state);

	//const debouncedSave = debounce(async (char: Character) => {
	//	await data.db.saveCharacter(char);
	//}, 1000);
	//
	//onMount(() => {
	//	return data.character.subscribe((char) => {
	//		debouncedSave(char);
	//	});
	//});
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="h-screen w-screen">
		{@render children()}
	</div>
</div>
