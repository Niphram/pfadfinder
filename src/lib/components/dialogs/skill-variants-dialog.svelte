<script lang="ts">
	import { Skill, type SkillKey } from '$lib/data/character/skills';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';

	const { c } = getChar();

	function addSkill(skill: SkillKey) {
		$c.skills[skill].skills.push(new Skill(skill));
		$c.skills = $c.skills;
	}

	function removeSkill(skill: SkillKey, idx: number) {
		$c.skills[skill].skills.splice(idx, 1);
		$c.skills = $c.skills;
	}

	const skills = ['craft', 'perform', 'profession'] as const;

	$title = 'Variant Skills';
</script>

<div class="flex flex-col gap-2">
	{#each skills as key (key)}
		<div class="divider">{$t(`skills.${key}`)}</div>

		{#each $c.skills[key].skills as skill, idx (idx)}
			<div class="flex w-full flex-row items-center gap-2">
				<Input name="variant-{idx}" bind:value={skill.name} />
				<button
					on:click|preventDefault={() => {
						removeSkill(key, idx);
					}}
					class="btn btn-warning join-item">Delete</button
				>
			</div>
		{/each}
		<div class="flex flex-row justify-center">
			<button
				class="btn btn-circle btn-primary btn-sm"
				on:click|preventDefault={() => addSkill(key)}>+</button
			>
		</div>
	{/each}
</div>
