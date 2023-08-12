<script lang="ts">
	import { c } from '$lib/state/character';
	import MacroInteger from '../input/macro-integer.svelte';
	import TextArea from '../input/text-area.svelte';
</script>

<h3 class="text-lg font-bold">Initiative</h3>

<MacroInteger
	bind:value={$c.init.misc}
	name="initMisc"
	label="Misc"
	placeholder="Initiative Misc"
/>

<TextArea bind:value={$c.init.notes} name="notes" label="Notes" placeholder="Notes" />
