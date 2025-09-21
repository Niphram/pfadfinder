<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Spell Resistance">
	<MacroNumber
		value={c.combat.sr.$.base}
		name="srBase"
		label="Base"
		placeholder="Base"
	/>
	<MacroNumber
		value={c.combat.sr.$.misc}
		name="srMisc"
		label="Misc"
		placeholder="Misc"
	/>

	<MacroTextArea
		value={c.combat.sr.$.notes}
		name="srNotes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
