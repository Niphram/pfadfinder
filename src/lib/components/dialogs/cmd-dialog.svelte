<script lang="ts">
	import { getChar } from '$lib/data/context';

	import { title } from '../dialog.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

	const { c } = $derived(getChar());

	$title = 'Combat Maneuver Defense';
</script>

<MacroTextArea bind:value={c.combat.cmd.notes} name="cmdNotes" label="Notes" placeholder="Notes" />
