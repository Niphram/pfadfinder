<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import SkillDialog from '$lib/components/dialogs/skill-dialog.svelte';
	import SkillVariantsDialog from '$lib/components/dialogs/skill-variants-dialog.svelte';
	import { t } from '$lib/i18n';
	import { c, getSkillMod, skillKeys } from '$lib/state';
	import { withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';
</script>

<div class="flex flex-col gap-2">
	{#each skillKeys as key (key)}
		{#each $c.skills[key].variants as variant, index}
			<button
				class="w-full"
				on:click={() => macroNotify($t(`skills.${key}`), variant.notes, $c)}
				on:contextmenu|preventDefault={() => openDialog(SkillDialog, { key, index })}
			>
				<div class="btn btn-ghost join btn-sm flex flex-row gap-0 p-0">
					<div class="join-item flex items-center bg-secondary">
						<span class="w-16">{variant.classSkill ? 'c' : ''}</span>
					</div>
					<div class="join-item flex flex-grow items-center bg-base-200">
						<span
							class="join-item flex-grow align-middle decoration-wavy"
							class:underline={variant.notes}
							>{$t(`skills.${key}`)}{variant.type ? ` (${variant.type})` : ''}</span
						>
					</div>
					<div class="join-item flex items-center bg-secondary">
						<span class="join-item w-16 bg-secondary align-middle"
							>{withSign(getSkillMod($c, key, index))}</span
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
