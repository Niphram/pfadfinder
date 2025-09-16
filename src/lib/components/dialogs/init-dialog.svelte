<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Initiative';
</script>

<MacroInteger
	bind:value={c.init.$misc.expr}
	name="initMisc"
	label="Misc"
	placeholder="Initiative Misc"
/>

<MacroTextArea bind:value={c.init.notes} name="notes" label="Notes" placeholder="Notes" />
