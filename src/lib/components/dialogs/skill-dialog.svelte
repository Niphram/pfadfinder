<script lang="ts">
	import { t } from '$lib/i18n';
	import { abilityKeys, c, type SkillKeys } from '$lib/state';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import TextArea from '../input/text-area.svelte';

	export let key: SkillKeys = 'acrobatics';
	export let index = 0;

	let variant = $c.skills[key].variants[index].type
		? ` (${$c.skills[key].variants[index].type})`
		: '';

	$title = $t(`skills.${key}`) + variant;
</script>

<div class="flex flex-row gap-2">
	<div class="form-control">
		<label for="classSkill" class="label cursor-pointer pb-0">
			<span class="label-text">C?</span>
		</label>
		<input
			name="classSkill"
			type="checkbox"
			bind:checked={$c.skills[key].variants[index].classSkill}
			class="checkbox checkbox-lg"
		/>
	</div>

	<div class="form-control w-full">
		<label for="skillBaseAbility" class="label pb-0">
			<span class="label-text">Base Ability</span>
		</label>
		<select
			name="skillBaseAbility"
			class="select select-bordered select-sm w-full"
			bind:value={$c.skills[key].variants[index].ability}
		>
			{#each abilityKeys as key}
				<option value={key}>{$t(`abilities.${key}.full`)}</option>
			{/each}
		</select>
	</div>
</div>

<div class="flex flex-row gap-2">
	<Integer bind:value={$c.skills[key].variants[index].ranks} name="skillRanks" label="Ranks" />
	<MacroInteger bind:value={$c.skills[key].variants[index].misc} name="skillMisc" label="Misc" />
	<MacroInteger
		bind:value={$c.skills[key].variants[index].temp}
		name="skillBonus"
		label="Temp Mod"
	/>
</div>

<TextArea
	bind:value={$c.skills[key].variants[index].notes}
	name="skillNotes"
	label="Notes"
	placeholder="Notes"
/>
