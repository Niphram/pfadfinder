<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { KidsOnBikesCharacter } from './character';

	export let character: Writable<KidsOnBikesCharacter>;
</script>

<h1>Kids on Bikes</h1>

<input bind:value={$character.name} />
