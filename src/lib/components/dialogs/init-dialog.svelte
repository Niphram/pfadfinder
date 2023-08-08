<script lang="ts">
	import { c } from '$lib/state/character';
	import Integer from '../input/integer.svelte';
</script>

<h3 class="text-lg font-bold">Initiative</h3>

<Integer bind:value={$c.init.misc} name="initMisc" label="Misc" placeholder="Initiative Misc" />
