<script lang="ts">
	import { t } from '$lib/i18n';

	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Select from '$lib/components/input/select.svelte';

	import { getChar, type SaveKey } from '$lib/data';

	interface Props {
		key?: SaveKey;
	}

	let { key = 'fort' }: Props = $props();

	const { c } = $derived(getChar());
</script>

<DialogBase title={$t(`saves.${key}.full`)}>
	<Select
		name="saveBaseAbility"
		label="Base Ability"
		value={c[key].$.ability}
		translate={(key) => $t(`abilities.${key}.full`)}
	/>

	<MacroNumber value={c[key].$.misc} name="saveMisc" label="Misc" />
	<MacroNumber value={c[key].$.bonus} name="saveBonus" label="Temp Mod" />

	<MacroTextArea
		value={c[key].$.notes}
		name="saveNotes"
		label="Notes"
		placeholder="Notes"
	/>
</DialogBase>
