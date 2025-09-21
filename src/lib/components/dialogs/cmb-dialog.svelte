<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Combat Maneuver Bonus">
	<MacroTextArea
		value={c.combat.cmb.$.notes}
		name="cmbNotes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
