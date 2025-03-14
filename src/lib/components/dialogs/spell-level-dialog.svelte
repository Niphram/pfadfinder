<script lang="ts">
	import { ABILITY_KEYS, SPELL_LEVELS } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import Select from '../input/select.svelte';

	const { c } = getChar();

	title.set('Spells Config');
</script>

<div class="divider">
	<div class="flex flex-row gap-2">Spell DC</div>
</div>

<div class="flex flex-row gap-1">
	<Select
		name="dcAbility"
		label="DC Ability"
		options={ABILITY_KEYS}
		noneOption="-"
		bind:value={$c.spells.dcAbility}
		let:option={key}
	>
		<option value={key}>
			{$t(`abilities.${key}.full`)}
		</option>
	</Select>

	<MacroInteger
		optional
		placeholder="0"
		label="DC Bonus"
		name="dcBonus"
		bind:value={$c.spells.dcBonus.expr}
	/>
</div>

<div>
	{#each SPELL_LEVELS as level, idx (level)}
		<div class="divider">Level {idx}</div>
		<div class="flex flex-row gap-1">
			<Integer bind:value={$c.spells[level].known} label="Known" name="known" noNegatives />
			<Integer bind:value={$c.spells[level].perDay} label="Per Day" name="perDay" noNegatives />
			<Integer
				bind:value={$c.spells[level].perDayBonus}
				label="Bonus"
				name="perDayBonus"
				noNegatives
			/>
		</div>
	{/each}
</div>
