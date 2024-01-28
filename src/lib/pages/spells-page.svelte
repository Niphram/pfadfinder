<script lang="ts">
	import Collapse from '$lib/atoms/collapse.svelte';
	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import SpellDialog from '$lib/components/dialogs/spell-dialog.svelte';
	import SpellLevelDialog from '$lib/components/dialogs/spell-level-dialog.svelte';
	import SpellLikeAbilityDialog from '$lib/components/dialogs/spell-like-ability-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import { SPELL_LEVELS, Spell, SpellLikeAbility, c, type SpellLevel } from '$lib/data';
	import { t } from '$lib/i18n';
	import { count } from '$lib/utils';

	function addSpell(level: SpellLevel) {
		$c.spells[level].spells.push(new Spell());
		$c.spells[level].spells = $c.spells[level].spells;
	}

	function addSLA() {
		$c.spells.spellLikeAbilities.push(new SpellLikeAbility());
		$c.spells.spellLikeAbilities = $c.spells.spellLikeAbilities;
	}

	function castSla(index: number) {
		if ($c.spells.spellLikeAbilities[index].remaining > 0)
			$c.spells.spellLikeAbilities[index].remaining--;
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
					<div
						class="drag-handle ml-2 flex w-6 items-center justify-center"
						role="button"
						tabindex="0"
					>
						<DragHandle />
					</div>

					<Collapse
						icon="arrow"
						on:contextmenu={() => openDialog(SpellDialog, { spellIdx, spellLevel: level })}
					>
						<span slot="title" class="text-sm font-semibold">{spell.name}</span>

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
							<MultilineMacro
								text={spell.description}
								class="mb-4 hyphens-auto text-justify text-sm last:mb-0"
							/>
						{/if}
					</Collapse>
				</div>
			</SortableList>
		{/if}
	{/each}

	<div class="divider">
		<button class="btn btn-secondary btn-xs" on:click={() => addSLA()}>Spell-Like Abilities</button>
	</div>

	<SortableList
		class="flex flex-col items-center gap-1"
		options={{
			group: 'spells',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)'
		}}
		bind:items={$c.spells.spellLikeAbilities}
		keyProp="id"
		let:item={sla}
		let:index={slaIndex}
	>
		<div slot="fallback">No Spell-Like Abilities</div>

		<div class="flex w-full flex-row">
			<div class="drag-handle ml-2 flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>

			<Collapse
				icon="arrow"
				on:contextmenu={() => openDialog(SpellLikeAbilityDialog, { slaIndex })}
			>
				<div slot="title" class="flex flex-row items-center">
					<div class="grow text-sm font-semibold">{sla.name}</div>
					<button
						class="btn btn-accent btn-xs w-16"
						on:click|stopPropagation={() => castSla(slaIndex)}
					>
						{sla.type === 'perDay' ?
							`${sla.remaining} of ${sla.perDay}`
						:	$t(`spell.slaType.${sla.type}`)}
					</button>
				</div>

				<div
					class="grid grid-cols-[max-content_auto] gap-x-2 text-xs [&>*:nth-child(odd)]:font-bold [&>*:nth-child(odd)]:after:content-[':']"
				>
					{#if sla.school}
						<div>School</div>
						<div>{sla.school}</div>
					{/if}
					{#if sla.castingTime}
						<div>Casting Time</div>
						<div>{sla.castingTime}</div>
					{/if}

					{#if sla.range}
						<div>Range</div>
						<div>{sla.range}</div>
					{/if}

					{#if sla.targets}
						<div>Targets</div>
						<div>{sla.targets}</div>
					{/if}

					{#if sla.duration}
						<div>Duration</div>
						<div>{sla.duration}</div>
					{/if}

					{#if sla.effect}
						<div>Effect</div>
						<div>{sla.effect}</div>
					{/if}

					{#if sla.savingThrow.hasSave}
						<div>Saving Throw</div>
						<div>{sla.savingThrow.effect} (DC {sla.savingThrow.dcMod})</div>
					{/if}

					{#if sla.spellResistance}
						<div>Spell Resistance</div>
						<div>{sla.spellResistance}</div>
					{/if}
				</div>
				{#if sla.description}
					<div class="divider">Description</div>
					<MultilineMacro
						text={sla.description}
						class="mb-4 hyphens-auto text-justify text-sm last:mb-0"
					/>
				{/if}
			</Collapse>
		</div>
	</SortableList>
</div>
