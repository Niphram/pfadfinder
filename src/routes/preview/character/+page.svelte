<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import { loadCharacter } from '$lib/preview/character-store';

	const id = $page.url.searchParams.get('id');

	if (!id) goto(`${base}/preview`);
</script>

{#if id}
	{#await loadCharacter(id)}
		loading
	{:then { character, SheetComponent }}
		<svelte:component this={SheetComponent} {character} />
	{/await}
{:else}
	Character not found!

	<a href="{base}/preview">Back to selection</a>
{/if}
