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
	{#each SPELL_LEVELS as spellLevel (spellLevel)}
		{#if $c.spells[spellLevel].perDay > 0}
			<div class="divider">
				<button class="btn btn-secondary btn-xs" on:click={() => addSpell(spellLevel)}
					>{count(spellLevel)} Level - {$c.spells[spellLevel].totalPerDay.eval($c)} per day</button
				>
			</div>
			<div class="flex flex-col items-center gap-1">
				{#each $c.spells[spellLevel].spells as spell, spellIdx (spellIdx)}
					<button
						class="btn"
						on:click={() => openDialog(SpellDialog, { spellIdx, spellLevel })}
						on:contextmenu|preventDefault={() => openDialog(SpellDialog, { spellIdx, spellLevel })}
						>{spell.name}
					</button>
				{:else}
					<div>No Spells</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
