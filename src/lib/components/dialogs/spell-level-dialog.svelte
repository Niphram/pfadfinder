<script lang="ts">
	import { ABILITY_KEYS, SPELL_LEVELS, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';

	title.set('Spells Config');
</script>

<div class="divider">
	<div class="flex flex-row gap-2">Spell DC</div>
</div>

<div class="flex flex-row gap-1">
	<div class="form-control w-full">
		<label for="dcAbility" class="label pb-0">
			<span class="label-text">DC Ability</span>
		</label>
		<select name="dcAbility" class="select select-bordered w-full" bind:value={$c.spells.dcAbility}>
			<option value={undefined}>-</option>
			{#each ABILITY_KEYS as key (key)}
				<option value={key}>
					{$t(`abilities.${key}.full`)}
				</option>
			{/each}
		</select>
	</div>
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
