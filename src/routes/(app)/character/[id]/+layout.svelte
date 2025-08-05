<script lang="ts">
	import Dialog from '$lib/components/dialog.svelte';
	import ToastProvider from '$lib/components/toast-provider.svelte';
	import type { Character } from '$lib/data';
	import { setChar } from '$lib/data/context.svelte';
	import { charProxy } from '$lib/serde/proxy';
	import { debounce, observeMutations } from '$lib/utils';

	import type { LayoutProps } from './$types';

	const { data, children }: LayoutProps = $props();

	const debouncedSave = debounce(async (char: Character) => {
		await data.db.saveCharacter(char);
		state.dirty = false;
	}, 1000);

	const state = $state({
		c: charProxy(
			observeMutations(data.character, (char) => {
				state.dirty = true;
				debouncedSave(char);
			}),
		),
		dirty: false,
	});

	setChar(state);
</script>

<div class="print:hidden">
	<Dialog />
	<ToastProvider />

	<div class="h-screen w-screen">
		{@render children()}
	</div>
</div>
