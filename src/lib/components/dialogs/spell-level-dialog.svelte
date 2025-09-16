<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import Select from '$lib/components/input/select.svelte';

	import { ABILITY_KEYS, getChar, SPELL_LEVELS } from '$lib/data';

	const { c } = $derived(getChar());

	title.set('Spells Config');
</script>

<div class="divider">
	<div class="flex flex-row gap-2">Spell DC</div>
</div>

<Select
	name="dcAbility"
	label="DC Ability"
	options={ABILITY_KEYS}
	noneOption="-"
	bind:value={c.spells.dcAbility}
>
	{#snippet children({ option: key })}
		<option value={key}>
			{$t(`abilities.${key}.full`)}
		</option>
	{/snippet}
</Select>

<MacroNumber placeholder="0" label="DC Bonus" name="dcBonus" value={c.spells.$dcBonus} />

<div>
	{#each SPELL_LEVELS as level, idx (level)}
		<div class="divider">Level {idx}</div>
		<div class="flex flex-row gap-1">
			<Integer bind:value={c.spells[level].known} label="Known" name="known" noNegatives />
			<Integer bind:value={c.spells[level].perDay} label="Per Day" name="perDay" noNegatives />
			<Integer
				bind:value={c.spells[level].perDayBonus}
				label="Bonus"
				name="perDayBonus"
				noNegatives
			/>
		</div>
	{/each}
</div>
