<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import SkillDialog from '$lib/components/dialogs/skill-dialog.svelte';
	import SkillVariantsDialog from '$lib/components/dialogs/skill-variants-dialog.svelte';
	import { SKILL_KEYS } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { mapSum, withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';

	const { c, p } = getChar();

	$: skillRanks = mapSum(
		Object.keys($c.skills).map((k) => $c.skills[k]),
		(sg) => sg.ranks,
	);
</script>

<div class="flex flex-col gap-2">
	<div class="divider">Skills (Ranks {skillRanks}/{$c.classes.ranks.eval($c)})</div>

	{#each SKILL_KEYS as key (key)}
		{#each $c.skills[key].skills as variant, index (index)}
			{@const ability = $c.skills[key].skills[index].ability}
			{@const penalty = $p[ability].skillCheckMod !== $p[ability].mod}

			{@const skillTags = [penalty && '!', variant.classSkill && 'c', variant.ranks > 0 && 't']
				.filter(Boolean)
				.join(', ')}

			<button
				class="w-full"
				on:click={() =>
					macroNotify(
						$t(`skills.${key}`),
						variant.notes + (penalty ? '\n\nApplied penalty due to armor' : ''),
						$c,
					)}
				on:contextmenu|preventDefault={() => openDialog(SkillDialog, { key, index })}
			>
				<div class="btn btn-ghost join btn-sm flex flex-row gap-1 p-0">
					<div
						class="join-item bg-accent text-accent-content flex items-center"
						class:bg-warning={penalty}
					>
						<span class="w-16">{skillTags}</span>
					</div>
					<div class="join-item bg-base-200 text-base-content flex grow items-center">
						<span
							class="join-item grow align-middle decoration-wavy"
							class:underline={variant.notes}
							>{$t(`skills.${key}`)}{variant.name ? ` (${variant.name})` : ''}</span
						>
					</div>
					<div
						class="join-item bg-accent text-accent-content flex items-center"
						class:bg-warning={penalty}
					>
						<span class="join-item w-16 align-middle"
							>{withSign($p.skills[key].skills[index].mod)}</span
						>
					</div>
				</div>
			</button>
		{/each}
	{/each}

	<div class="divider">Config</div>

	<button
		on:click={() => openDialog(SkillVariantsDialog, {})}
		class="btn btn-primary w-min self-center">Skill Variants</button
	>
</div>
