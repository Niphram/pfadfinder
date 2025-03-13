<script>
	import { ABILITY_KEYS, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Select from '../input/select.svelte';

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
