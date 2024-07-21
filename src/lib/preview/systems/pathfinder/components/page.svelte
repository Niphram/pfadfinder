<script lang="ts">
	import type { PathfinderCharacter } from '../data/character';

	export let character: PathfinderCharacter;
</script>

<h1>Pathfinder</h1>

<input bind:value={character.name} />
