<script lang="ts">
	import { getChar } from '$lib/data/context';

	import { title } from '../dialog.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

	const { c } = $derived(getChar());

	$title = 'Combat Maneuver Bonus';
</script>

<MacroTextArea bind:value={c.combat.cmb.notes} name="cmbNotes" label="Notes" placeholder="Notes" />
