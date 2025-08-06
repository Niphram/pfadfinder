<script lang="ts">
	import { getChar } from '$lib/data/context';

	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

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
