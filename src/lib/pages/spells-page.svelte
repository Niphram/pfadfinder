<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import SpellDialog from '$lib/components/dialogs/spell-dialog.svelte';
	import SpellLevelDialog from '$lib/components/dialogs/spell-level-dialog.svelte';
	import { c, Spell, SPELL_LEVELS, type SpellLevel } from '$lib/data';
	import { count } from '$lib/utils';

	function addSpell(level: SpellLevel) {
		$c.spells[level].spells.push(new Spell($c.spells[level]));
		$c.spells[level].spells = $c.spells[level].spells;
	}
</script>

<div>
	<div class="divider">
		<button class="btn btn-primary btn-sm" on:click={() => openDialog(SpellLevelDialog, {})}>
			Spells
		</button>
	</div>
	{#each SPELL_LEVELS as level, idx (level)}
		{#if $c.spells[level].perDay > 0}
			<div class="divider">
				<button class="btn btn-secondary btn-xs" on:click={() => addSpell(level)}
					>{count(idx)} Level - {$c.spells[level].totalPerDay.eval($c)} per day</button
				>
			</div>
			<div class="flex flex-col items-center gap-1">
				{#each $c.spells[level].spells as spell, spellIdx (spellIdx)}
					<button
						class="btn"
						on:click={() => openDialog(SpellDialog, { spellIdx, spellLevel: level })}
						on:contextmenu|preventDefault={() => openDialog(SpellDialog, { spellIdx, spellLevel: level })}
						>{spell.name}
					</button>
				{:else}
					<div>No Spells</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
