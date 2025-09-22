<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Combat Maneuver Bonus">
	<MacroNumber
		value={c.combat.cmb.$.bonus}
		name="cmbBonus"
		label="Bonus"
		placeholder="CMB Bonus"
	/>

	<MacroTextArea
		value={c.combat.cmb.$.notes}
		name="cmbNotes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
