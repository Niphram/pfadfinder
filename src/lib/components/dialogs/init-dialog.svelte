<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Initiative';
</script>

<MacroNumber value={c.init.$misc} name="initMisc" label="Misc" placeholder="Initiative Misc" />

<MacroTextArea bind:value={c.init.notes} name="notes" label="Notes" placeholder="Notes" />
