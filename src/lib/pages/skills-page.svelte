<script lang="ts">
	import { t } from '$lib/i18n';
	import { macroNotify, preventDefault, withSign } from '$lib/utils';

	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import SkillDialog from '$lib/components/dialogs/skill-dialog.svelte';
	import SkillVariantsDialog from '$lib/components/dialogs/skill-variants-dialog.svelte';

	import { getChar, SKILL_KEYS } from '$lib/data';

	const { openDialog } = useDialog();
	const { c } = $derived(getChar());
</script>

<div class="flex flex-col gap-2">
	<div class="divider">
		Skills (Ranks {c.skills.skillRanks}/{c.classes.ranks})
	</div>

	{#each SKILL_KEYS as key (key)}
		{#each c.skills[key].skills as variant, index (index)}
			{@const ability = c.skills[key].skills[index].ability}
			{@const penalty = c[ability].skillCheckMod !== c[ability].mod}

			{@const skillTags = [
				penalty && '!',
				variant.classSkill && 'c',
				variant.ranks > 0 && 't',
			]
				.filter(Boolean)
				.join(', ')}

			<button
				class="w-full"
				onclick={() =>
					macroNotify(
						$t(`skills.${key}`),
						variant.notes + (penalty ? '\n\nApplied penalty due to armor' : ''),
						c,
					)}
				oncontextmenu={preventDefault(() =>
					openDialog(SkillDialog, { key, index }),
				)}
			>
				<div class="btn btn-ghost join btn-sm flex flex-row gap-1 p-0">
					<div
						class="join-item bg-accent text-accent-content flex items-center"
						class:bg-warning={penalty}
					>
						<span class="w-16">{skillTags}</span>
					</div>
					<div
						class="join-item bg-base-200 text-base-content flex grow items-center"
					>
						<span
							class="join-item grow align-middle decoration-wavy"
							class:underline={variant.notes}
							>{$t(`skills.${key}`)}{variant.name ?
								` (${variant.name})`
							:	''}</span
						>
					</div>
					<div
						class="join-item bg-accent text-accent-content flex items-center"
						class:bg-warning={penalty}
					>
						<span class="join-item w-16 align-middle"
							>{withSign(c.skills[key].skills[index].mod)}</span
						>
					</div>
				</div>
			</button>
		{/each}
	{/each}

	<div class="divider">Config</div>

	<button
		onclick={() => openDialog(SkillVariantsDialog, {})}
		class="btn btn-primary w-min self-center">Skill Variants</button
	>
</div>
