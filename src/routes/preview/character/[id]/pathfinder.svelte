<script lang="ts">
	import type { PathfinderCharacter } from '$lib/preview/systems/pathfinder/data/character';
	import type { Writable } from 'svelte/store';

	export let character: Writable<PathfinderCharacter>;
</script>

<input bind:value={$character.name} />
Name: {$character.name}
Dex: {$character.dex}
