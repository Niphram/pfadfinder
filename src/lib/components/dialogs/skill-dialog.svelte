<script lang="ts">
	import { ABILITY_KEYS, c, SpellLikeAbility, type SkillKey } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Checkbox from '../input/checkbox.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import Select from '../input/select.svelte';
	import TextArea from '../input/text-area.svelte';
	import Toggle from '../input/toggle.svelte';

	export let key: SkillKey = 'acrobatics';
	export let index = 0;

	let variant = $c.skills[key].skills[index].name ? ` (${$c.skills[key].skills[index].name})` : '';

	$title = $t(`skills.${key}`) + variant;
</script>

<div class="flex flex-row gap-2">
	<Checkbox
		classname="max-w-min"
		name="classSkill"
		label="C?"
		bind:checked={$c.skills[key].skills[index].classSkill}
	/>

	<Select
		name="skillBaseAbility"
		label="Base Ability"
		options={ABILITY_KEYS}
		bind:value={$c.skills[key].skills[index].ability}
		let:option={key}
		size="small"
	>
		<option value={key}>{$t(`abilities.${key}.full`)}</option>
	</Select>
</div>

<Toggle
	name="armorPenalty"
	label="Armor Penalty?"
	bind:checked={$c.skills[key].skills[index].penalty}
/>

<div class="flex flex-row gap-2">
	<Integer bind:value={$c.skills[key].skills[index].ranks} name="skillRanks" label="Ranks" />
	<MacroInteger bind:value={$c.skills[key].skills[index].misc.expr} name="skillMisc" label="Misc" />
	<MacroInteger
		bind:value={$c.skills[key].skills[index].temp.expr}
		name="skillBonus"
		label="Temp Mod"
	/>
</div>

<TextArea
	bind:value={$c.skills[key].skills[index].notes}
	name="skillNotes"
	label="Notes"
	placeholder="Notes"
/>
