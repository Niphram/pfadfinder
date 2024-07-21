<script lang="ts">
	import type { KidsOnBikesCharacter } from './character';

	export let character: KidsOnBikesCharacter;
</script>

<h1>Kids on Bikes</h1>

<input bind:value={character.name} />
