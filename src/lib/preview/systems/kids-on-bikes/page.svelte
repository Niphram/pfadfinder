<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { KidsOnBikesCharacter } from './character';

	export let c: Writable<KidsOnBikesCharacter>;
</script>

<h1>Kids on Bikes</h1>

<input bind:value={$c.name} />
