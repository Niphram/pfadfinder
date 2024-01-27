<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import SpellDialog from '$lib/components/dialogs/spell-dialog.svelte';
	import SpellLevelDialog from '$lib/components/dialogs/spell-level-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import { c, Spell, SPELL_LEVELS, type SpellLevel } from '$lib/data';
	import { parseTextWithMacros } from '$lib/macro/text';
	import { count } from '$lib/utils';

	function addSpell(level: SpellLevel) {
		$c.spells[level].spells.push(new Spell());
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

				<div class="flex w-full flex-row">
					<div class="drag-handle flex w-8 items-center justify-center md:w-12">
						<DragHandle />
					</div>

					<div class="collapse bg-base-200">
						<input
							class="min-h-0"
							type="checkbox"
							on:contextmenu|preventDefault={() =>
								openDialog(SpellDialog, { spellIdx, spellLevel: level })}
						/>
						<div class="collapse-title min-h-0 text-sm font-semibold">{spell.name}</div>
						<div class="collapse-content">
							<div
								class="grid grid-cols-[max-content_auto] gap-x-2 text-xs [&>*:nth-child(odd)]:font-bold [&>*:nth-child(odd)]:after:content-[':']"
							>
								{#if spell.school}
									<div>School</div>
									<div>{spell.school}</div>
								{/if}
								{#if spell.castingTime}
									<div>Casting Time</div>
									<div>{spell.castingTime}</div>
								{/if}

								{#if spell.components}
									<div>Components</div>
									<div>{spell.components}</div>
								{/if}

								{#if spell.range}
									<div>Range</div>
									<div>{spell.range}</div>
								{/if}

								{#if spell.targets}
									<div>Targets</div>
									<div>{spell.targets}</div>
								{/if}

								{#if spell.duration}
									<div>Duration</div>
									<div>{spell.duration}</div>
								{/if}

								{#if spell.effect}
									<div>Effect</div>
									<div>{spell.effect}</div>
								{/if}

								{#if spell.savingThrow.hasSave}
									{@const dcAbility = $c.spells.dcAbility}
									{@const abilityDc =
										(dcAbility ? $c[dcAbility].mod.eval($c) : 0) + $c.spells.dcBonus.eval($c)}
									{@const saveDc = 10 + idx + spell.savingThrow.dcMod + abilityDc}
									<div>Saving Throw</div>
									<div>{spell.savingThrow.effect} (DC {saveDc})</div>
								{/if}

								{#if spell.spellResistance}
									<div>Spell Resistance</div>
									<div>{spell.spellResistance}</div>
								{/if}
							</div>
							{#if spell.description}
								<div class="divider">Description</div>
								<p>{parseTextWithMacros(spell.description, $c)}</p>
							{/if}
						</div>
					</div>
				</div>
			</SortableList>
		{/if}
	{/each}
</div>
