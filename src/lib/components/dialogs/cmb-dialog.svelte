<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Combat Maneuver Bonus';
</script>

<MacroTextArea
	value={c.combat.cmb.$.notes}
	name="cmbNotes"
	label="Notes"
	placeholder="Notes"
/>
