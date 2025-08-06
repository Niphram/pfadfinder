<script lang="ts">
	import { ABILITY_KEYS, type SaveKey } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';

	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';
	import Select from '../input/select.svelte';

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

<MacroInteger bind:value={c[key].$misc.expr} name="saveMisc" label="Misc" />
<MacroInteger bind:value={c[key].$bonus.expr} name="saveBonus" label="Temp Mod" />

<MacroTextArea bind:value={c[key].notes} name="saveNotes" label="Notes" placeholder="Notes" />
