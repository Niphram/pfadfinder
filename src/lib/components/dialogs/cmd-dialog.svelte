<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Combat Maneuver Defense">
	<MacroNumber
		value={c.combat.cmd.$.bonus}
		name="cmdBonus"
		label="Bonus"
		placeholder="CMD Bonus"
	/>

	<MacroTextArea
		value={c.combat.cmd.$.notes}
		name="cmdNotes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
