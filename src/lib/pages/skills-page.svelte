<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import SkillDialog from '$lib/components/dialogs/skill-dialog.svelte';
	import { t } from '$lib/i18n';
	import { c, skillKeys } from '$lib/state';
	import { withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';
</script>

<div class="flex flex-col gap-2">
	{#each skillKeys as key (key)}
		<button
			class="w-full"
			on:click={() => macroNotify($t(`skills.${key}`), $c.skills[key].notes, $c)}
			on:contextmenu|preventDefault={() => openDialog(SkillDialog, { key })}
		>
			<div class="btn btn-ghost join btn-md flex flex-row gap-0 p-0">
				<div class="join-item flex items-center bg-secondary">
					<span class="w-16">{$c.skills[key].classSkill ? 'Class Skill' : ''}</span>
				</div>
				<div class="join-item flex flex-grow items-center bg-base-200">
					<span class="join-item flex-grow align-middle">{$t(`skills.${key}`)}</span>
				</div>
				<div class="join-item flex items-center bg-secondary">
					<span class="join-item w-16 bg-secondary align-middle"
						>{withSign($c.skills[key].mod)}</span
					>
				</div>
			</div>
		</button>
	{/each}
</div>
