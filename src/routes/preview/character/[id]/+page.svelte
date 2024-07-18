<script lang="ts">
	import { page } from '$app/stores';

	import { loadCharacter } from '$lib/preview/character-store';
	import Pathfinder from './pathfinder.svelte';

	const loadedChar = loadCharacter($page.params.id);
</script>

{#await loadedChar}
	loading
{:then character}
	<Pathfinder {character} />
{/await}
