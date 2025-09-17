<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Select from '$lib/components/input/select.svelte';

	import { ABILITY_KEYS, getChar, type SaveKey } from '$lib/data';

	interface Props {
		key?: SaveKey;
	}

	let { key = 'fort' }: Props = $props();

	const { c } = $derived(getChar());

	$title = $t(`saves.${key}.full`);
</script>

<Select
	name="saveBaseAbility"
	label="Base Ability"
	options={ABILITY_KEYS}
	bind:value={c[key].ability}
>
	{#snippet children({ option: key })}
		<option value={key}>{$t(`abilities.${key}.full`)}</option>
	{/snippet}
</Select>

<MacroNumber value={c[key].$.misc} name="saveMisc" label="Misc" />
<MacroNumber value={c[key].$.bonus} name="saveBonus" label="Temp Mod" />

<MacroTextArea value={c[key].$.notes} name="saveNotes" label="Notes" placeholder="Notes" />
