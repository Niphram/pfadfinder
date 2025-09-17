<script>
	import { t } from '$lib/i18n';

	import Divider from '$lib/atoms/divider.svelte';

	import { title } from '$lib/components/dialog.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import Select from '$lib/components/input/select.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';

	import { ABILITY_KEYS, getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Armor Class';
</script>

<Select
	name="acPrimaryAbility"
	label="Primary Ability"
	options={ABILITY_KEYS}
	bind:value={c.ac.primaryAbility}
>
	{#snippet children({ option: key })}
		<option value={key}>
			{$t(`abilities.${key}.full`)}
		</option>
	{/snippet}
</Select>

<Select
	name="acSecondaryAbility"
	label="Secondary Ability"
	options={ABILITY_KEYS}
	noneOption="None"
	bind:value={c.ac.secondaryAbility}
>
	{#snippet children({ option: key })}
		<option value={key}>
			{$t(`abilities.${key}.full`)}
		</option>
	{/snippet}
</Select>

<Divider />

<MacroNumber name="bonusAc" label="Bonus to AC" value={c.ac.$.bonusAc} />

<MacroNumber name="bonusTouch" label="Bonus to touch AC" value={c.ac.$.bonusTouch} />

<MacroNumber name="bonusFf" label="Bonus to flat-footed AC" value={c.ac.$.bonusFf} />

<TextArea name="acNotes" label="Notes" rows={5} value={c.ac.$.notes} />
