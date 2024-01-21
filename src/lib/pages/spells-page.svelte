<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import SpellDialog from '$lib/components/dialogs/spell-dialog.svelte';
	import SpellLevelDialog from '$lib/components/dialogs/spell-level-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
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

			<SortableList
				class="flex flex-col items-center gap-1"
				options={{
					group: 'spells',
					handle: '.drag-handle',
					animation: 150,
					easing: 'cubic-bezier(1, 0, 0, 1)'
				}}
				bind:items={$c.spells[level].spells}
				keyProp="id"
				let:item={spell}
				let:index={spellIdx}
			>
				<div slot="fallback">No Spells</div>

				<div class="flex w-full flex-row items-stretch">
					<div class="drag-handle flex w-8 items-center justify-center md:w-12">
						<DragHandle />
					</div>
					<button
						class="btn grow"
						on:click={() => openDialog(SpellDialog, { spellIdx, spellLevel: level })}
						on:contextmenu|preventDefault={() =>
							openDialog(SpellDialog, { spellIdx, spellLevel: level })}
						>{spell.name}
					</button>
				</div>
			</SortableList>
		{/if}
	{/each}
</div>
