<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Checkbox from '$lib/components/input/checkbox.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Number from '$lib/components/input/number.svelte';
	import Select from '$lib/components/input/select.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';

	import { getChar, type SkillKey } from '$lib/data';

	interface Props {
		key?: SkillKey;
		index?: number;
	}

	let { key = 'acrobatics', index = 0 }: Props = $props();

	const { c } = $derived(getChar());

	let variant = $derived(
		c.skills[key].skills[index].name ?
			` (${c.skills[key].skills[index].name})`
		:	'',
	);

	$effect(() => {
		$title = $t(`skills.${key}`) + variant;
	});
</script>

<div class="flex flex-row gap-2">
	<Checkbox
		class="max-w-min"
		name="classSkill"
		label="C?"
		bind:checked={c.skills[key].skills[index].classSkill}
	/>

	<Select
		name="skillBaseAbility"
		label="Base Ability"
		class="select-sm"
		value={c.skills[key].skills[index].$.ability}
		translate={(key) => $t(`abilities.${key}.full`)}
	/>
</div>

<Toggle
	name="armorPenalty"
	label="Armor Penalty?"
	bind:checked={c.skills[key].skills[index].penalty}
/>

<Number
	value={c.skills[key].skills[index].$.ranks}
	name="skillRanks"
	label="Ranks"
/>

<MacroNumber
	value={c.skills[key].skills[index].$.misc}
	name="skillMisc"
	label="Miscellaneous Bonus"
/>

<MacroNumber
	value={c.skills[key].skills[index].$.temp}
	name="skillBonus"
	label="Temporary Modifier"
/>

<MacroTextArea
	value={c.skills[key].skills[index].$.notes}
	name="skillNotes"
	label="Notes"
	placeholder="Notes"
/>
