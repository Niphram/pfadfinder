<script lang="ts">
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Initiative">
	<MacroNumber
		value={c.init.$.misc}
		name="initMisc"
		label="Misc"
		placeholder="Initiative Misc"
	/>

	<MacroTextArea
		value={c.init.$.notes}
		name="notes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
