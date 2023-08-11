<script lang="ts">
	import { c, type CharPaths, type ICharacter } from '$lib/state';
	import type { Get } from '$lib/utils';
	import { substore } from '$lib/utils/stores';
	import TextArea from '../input/text-area.svelte';

	export let title: string;
	export let notesKey: keyof {
		[K in CharPaths as Get<ICharacter, K> extends string ? K : never]: never;
	};

	$: store = substore(c, notesKey ?? 'cha.notes');
</script>

<h3 class="text-lg font-bold">{title}</h3>

{#if notesKey}
	<TextArea bind:value={$store} name="notes" label="Notes" placeholder="Notes" />
{/if}
