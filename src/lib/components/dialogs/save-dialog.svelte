<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';
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

<MacroInteger bind:value={c[key].$misc.expr} name="saveMisc" label="Misc" />
<MacroInteger bind:value={c[key].$bonus.expr} name="saveBonus" label="Temp Mod" />

<MacroTextArea bind:value={c[key].notes} name="saveNotes" label="Notes" placeholder="Notes" />
