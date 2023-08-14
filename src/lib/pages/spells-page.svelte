<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import SpellLevelDialog from '$lib/components/dialogs/spell-level-dialog.svelte';
	import { c } from '$lib/data';
	import { count } from '$lib/utils';

	const SPELL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
</script>

<div>
	<div class="divider">
		<button class="btn btn-primary btn-sm" on:click={() => openDialog(SpellLevelDialog, {})}>
			Spells
		</button>
	</div>
	{#each SPELL_LEVELS as level (level)}
		{#if $c.spells[level].perDay > 0}
			<div class="divider">
				<button class="btn btn-secondary btn-xs"
					>{count(level)} Level - {$c.spells[level].totalPerDay.eval($c)} per day</button
				>
			</div>
			<div class="flex flex-row items-center gap-1">
				{#each $c.spells[level].spells as spell}
					{spell.name}
				{:else}
					<div>No Spells</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
