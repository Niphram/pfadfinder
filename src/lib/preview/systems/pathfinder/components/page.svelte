<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { PathfinderCharacter } from '../data/character';

	export let character: Writable<PathfinderCharacter>;
</script>

<h1>Pathfinder</h1>

<input bind:value={$character.name} />
