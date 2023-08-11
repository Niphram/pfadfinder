<script lang="ts">
	import { t } from '$lib/i18n';
	import { abilityKeys, c, type SaveKey, type SkillKeys } from '$lib/state';
	import Integer from '../input/integer.svelte';
	import TextArea from '../input/text-area.svelte';

	export let key: SkillKeys = 'acrobatics';
</script>

<h3 class="text-lg font-bold">{$t(`skills.${key}`)}</h3>

<div class="form-control w-full">
	<label for="skillBaseAbility" class="label">
		<span class="label-text">Base Ability</span>
	</label>
	<select
		name="skillBaseAbility"
		class="select select-bordered w-full"
		bind:value={$c.skills[key].ability}
	>
		{#each abilityKeys as key}
			<option value={key}>{$t(`abilities.${key}.full`)}</option>
		{/each}
	</select>
</div>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">Class Skill</span>
		<input type="checkbox" class="toggle" bind:checked={$c.skills[key].classSkill} />
	</label>
</div>

<Integer bind:value={$c.skills[key].ranks} name="skillRanks" label="Ranks" />
<Integer bind:value={$c.skills[key].misc} name="skillMisc" label="Misc" />
<Integer bind:value={$c.skills[key].temp} name="skillBonus" label="Temp Mod" />

<TextArea bind:value={$c.skills[key].notes} name="skillNotes" label="Notes" placeholder="Notes" />
