<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Base Attack Bonus">
	<MacroTextArea
		value={c.combat.bab.$.notes}
		name="babNotes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
