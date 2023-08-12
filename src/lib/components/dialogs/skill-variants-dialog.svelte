<script lang="ts">
	import { t } from '$lib/i18n';
	import { c, makeSkillVariant, type SkillKeys } from '$lib/state';
	import { title } from '../dialog.svelte';

	function addSkill(skill: SkillKeys) {
		$c.skills[skill].variants.push(makeSkillVariant(skill));
		$c.skills = $c.skills;
	}

	function removeSkill(skill: SkillKeys, idx: number) {
		$c.skills[skill].variants.splice(idx, 1);
		$c.skills = $c.skills;
	}

	const skills = ['craft', 'perform', 'profession'] as const;

	$title = 'Variant Skills';
</script>

<div class="flex flex-col gap-2">
	{#each skills as key}
		<div class="divider">{$t(`skills.${key}`)}</div>

		{#each $c.skills[key].variants as skill, idx}
			<div class="flex w-full flex-row gap-2">
				<div>
					<input class="input input-bordered w-full" bind:value={skill.type} />
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
