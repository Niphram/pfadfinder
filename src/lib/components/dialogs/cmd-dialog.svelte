<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Combat Maneuver Defense';
</script>

<MacroTextArea bind:value={c.combat.cmd.notes} name="cmdNotes" label="Notes" placeholder="Notes" />
