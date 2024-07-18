<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import { loadCharacter } from '$lib/preview/character-store';
	import Pathfinder from './pathfinder.svelte';

	const id = $page.url.searchParams.get('id');
</script>

{#if id}
	{#await loadCharacter(id)}
		loading
	{:then character}
		<Pathfinder {character} />
	{/await}
{:else}
	Character not found!

	<a href="{base}/preview">Back to selection</a>
{/if}
