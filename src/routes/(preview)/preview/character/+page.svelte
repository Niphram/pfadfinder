<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';

	import { loadCharacter } from '$lib/preview/character-store';

	let id: string | null;
	beforeUpdate(() => {
		id = $page.url.searchParams.get('id');

		if (!id) {
			goto(`${base}/preview`);
		}
	});
</script>

{#if id}
	{#await loadCharacter(id)}
		loading
	{:then { character, SheetComponent }}
		<svelte:component this={SheetComponent} c={character} />
	{/await}
{/if}
