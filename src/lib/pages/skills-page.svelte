<script lang="ts">
	import Button from '$lib/atoms/button.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import Column from '$lib/atoms/layout/column.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import SkillDialog from '$lib/components/dialogs/skill-dialog.svelte';
	import SkillVariantsDialog from '$lib/components/dialogs/skill-variants-dialog.svelte';
	import { SKILL_KEYS, c, p } from '$lib/data';
	import { t } from '$lib/i18n';
	import { mapSum, withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';

	$: skillRanks = mapSum(
		Object.keys($c.skills).map((k) => $c.skills[k]),
		(sg) => sg.ranks
	);
</script>

<Column gap="lg">
	<Divider>Skills (Ranks {skillRanks}/{$c.classes.ranks.eval($c)})</Divider>

	<Column gap="md">
		{#each SKILL_KEYS as key (key)}
			{#each $c.skills[key].skills as variant, index}
				{@const skillTags = [variant.classSkill && 'c', variant.ranks > 0 && 't']
					.filter(Boolean)
					.join(', ')}

				<button
					class="w-full"
					on:click={() => macroNotify($t(`skills.${key}`), variant.notes, $c)}
					on:contextmenu|preventDefault={() => openDialog(SkillDialog, { key, index })}
				>
					<div class="btn btn-ghost join btn-sm flex flex-row gap-1 p-0">
						<div class="join-item flex items-center bg-accent text-accent-content">
							<span class="w-16">
								{skillTags}
							</span>
						</div>
						<div class="join-item flex flex-grow items-center bg-base-200 text-base-content">
							<span
								class="join-item flex-grow align-middle decoration-wavy"
								class:underline={variant.notes}
							>
								{$t(`skills.${key}`)}{variant.name ? ` (${variant.name})` : ''}
							</span>
						</div>
						<div class="join-item flex items-center bg-accent text-accent-content">
							<span class="join-item w-16 align-middle">
								{withSign($p.skills[key].skills[index].mod)}
							</span>
						</div>
					</div>
				</button>
			{/each}
		{/each}
	</Column>

	<Divider>Config</Divider>

	<Button
		color="primary"
		class="w-max self-center"
		on:click={() => openDialog(SkillVariantsDialog, {})}>Skill Variants</Button
	>
</Column>
