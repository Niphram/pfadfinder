<script lang="ts">
	import { getChar } from '$lib/data/context.svelte';

	import { title } from '../dialog.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

	const { c } = $derived(getChar());

	$title = 'Base Attack Bonus';
</script>

<MacroTextArea bind:value={c.combat.bab.notes} name="babNotes" label="Notes" placeholder="Notes" />
