<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Combat Maneuver Defense">
	<MacroTextArea
		value={c.combat.cmd.$.notes}
		name="cmdNotes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
