<script lang="ts">
	import { ABILITY_KEYS, c, type SkillKey } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import TextArea from '../input/text-area.svelte';

	export let key: SkillKey = 'acrobatics';
	export let index = 0;

	let variant = $c.skills[key].skills[index].name ? ` (${$c.skills[key].skills[index].name})` : '';

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
			bind:checked={$c.skills[key].skills[index].classSkill}
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
			bind:value={$c.skills[key].skills[index].ability}
		>
			{#each ABILITY_KEYS as key}
				<option value={key}>{$t(`abilities.${key}.full`)}</option>
			{/each}
		</select>
	</div>
</div>

<div class="flex flex-row gap-2">
	<Integer bind:value={$c.skills[key].skills[index].ranks} name="skillRanks" label="Ranks" />
	<MacroInteger bind:value={$c.skills[key].skills[index].misc} name="skillMisc" label="Misc" />
	<MacroInteger bind:value={$c.skills[key].skills[index].temp} name="skillBonus" label="Temp Mod" />
</div>

<TextArea
	bind:value={$c.skills[key].skills[index].notes}
	name="skillNotes"
	label="Notes"
	placeholder="Notes"
/>
