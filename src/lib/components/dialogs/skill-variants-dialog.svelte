<script lang="ts">
	import { c } from '$lib/data';
	import { Skill, type SkillKey } from '$lib/data/character/skills';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';

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
	{#each skills as key}
		<div class="divider">{$t(`skills.${key}`)}</div>

		{#each $c.skills[key].skills as skill, idx}
			<div class="flex w-full flex-row gap-2">
				<div>
					<input class="input input-bordered w-full" bind:value={skill.name} />
				</div>
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
