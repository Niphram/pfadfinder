<script>
	import { ABILITY_KEYS } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';

	import Divider from '$lib/atoms/divider.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';
	import Select from '$lib/components/input/select.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';

	import { title } from '../dialog.svelte';

	const { c } = getChar();

	$title = 'Armor Class';
</script>

<Select
	name="acPrimaryAbility"
	label="Primary Ability"
	options={ABILITY_KEYS}
	bind:value={$c.ac.primaryAbility}
	let:option={key}
>
	<option value={key}>
		{$t(`abilities.${key}.full`)}
	</option>
</Select>

<Select
	name="acSecondaryAbility"
	label="Secondary Ability"
	options={ABILITY_KEYS}
	noneOption="None"
	bind:value={$c.ac.secondaryAbility}
	let:option={key}
>
	<option value={key}>
		{$t(`abilities.${key}.full`)}
	</option>
</Select>

<Divider />

<MacroInteger name="bonusAc" label="Bonus to AC" bind:value={$c.ac.bonusAc.expr} />

<MacroInteger name="bonusTouch" label="Bonus to touch AC" bind:value={$c.ac.bonusTouch.expr} />

<MacroInteger name="bonusFf" label="Bonus to flat-footed AC" bind:value={$c.ac.bonusFf.expr} />

<TextArea name="acNotes" label="Notes" rows={5} bind:value={$c.ac.notes} />
