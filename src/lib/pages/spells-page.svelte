<script lang="ts">
	import { SPELL_LEVELS, Spell, SpellLikeAbility, type SpellLevel } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { preventDefault, stopPropagation } from '$lib/utils';

	import { openDialog } from '$lib/components/dialog.svelte';
	import SpellDialog from '$lib/components/dialogs/spell-dialog.svelte';
	import SpellLevelDialog from '$lib/components/dialogs/spell-level-dialog.svelte';
	import SpellLikeAbilityDialog from '$lib/components/dialogs/spell-like-ability-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';

	import Button from '$lib/atoms/button.svelte';
	import Collapse from '$lib/atoms/collapse.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';

	const { c } = $derived(getChar());

	function openConfigDialog() {
		openDialog(SpellLevelDialog, {});
	}

	function addSpell(level: SpellLevel) {
		c.spells[level].$spells.value.push(new Spell());
	}

	function addSLA() {
		c.spells.$spellLikeAbilities.value.push(new SpellLikeAbility());
	}

	function castSpell(level: SpellLevel, index: number) {
		c.spells[level].spells[index].used++;
	}

	function castSla(index: number) {
		if (c.spells.spellLikeAbilities[index].remaining > 0)
			c.spells.spellLikeAbilities[index].remaining--;
	}
</script>

<div>
	<Divider>
		Spells
		<Button size="xs" color="primary" onclick={openConfigDialog}>Config</Button>
	</Divider>

	{#each SPELL_LEVELS as level, idx (level)}
		{#if c.spells[level].perDay > 0}
			<Divider>
				{$t(`spell.level.${level}`)}
				<Button size="xs" color="secondary" onclick={() => addSpell(level)}>Add</Button>
			</Divider>

			<div class="mb-2 flex flex-row justify-center gap-2">
				<div class="badge badge-primary">Used: {c.spells[level].used}</div>
				<div class="badge badge-secondary">
					Per Day: {c.spells[level].totalPerDay}
				</div>
				<div class="badge badge-neutral badge-outline">
					Prepared: {c.spells[level].prepared}
				</div>
			</div>

			<SortableList
				class="flex flex-col items-center gap-1"
				options={{
					group: `spells_${idx}`,
					handle: '.drag-handle',
					animation: 150,
					easing: 'cubic-bezier(1, 0, 0, 1)',
				}}
				bind:items={c.spells[level].spells}
				keyProp="id"
			>
				{#snippet fallback()}
					<div>No Spells</div>
				{/snippet}

				{#snippet children({ item: spell, index: spellIdx })}
					<div class="flex w-full flex-row">
						<div
							class="drag-handle flex w-6 items-center justify-center"
							role="button"
							tabindex="0"
						>
							<DragHandle />
						</div>

						<Collapse
							icon="arrow"
							oncontextmenu={() => openDialog(SpellDialog, { spellIdx, spellLevel: level })}
						>
							{#snippet title()}
								<div class="flex flex-row">
									<span class="grow text-sm font-semibold">{spell.name}</span>
									{#if spell.prepared > 0}
										<button
											class="btn btn-accent btn-xs w-16"
											onclick={stopPropagation(preventDefault(() => castSpell(level, spellIdx)))}
										>
											{spell.prepared - spell.used} / {spell.prepared}
										</button>
									{/if}
								</div>
							{/snippet}

							<div
								class="grid grid-cols-[max-content_auto] gap-x-2 text-xs [&>*:nth-child(odd)]:font-bold [&>*:nth-child(odd)]:after:content-[':']"
							>
								{#each spell.details(idx, c) as [label, value], i (i)}
									<div>{label}</div>
									<div>{value}</div>
								{/each}
							</div>

							{#if spell.description}
								<div class="divider">Description</div>
								<MultilineMacro
									text={spell.description}
									class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
								/>
							{/if}
						</Collapse>
					</div>
				{/snippet}
			</SortableList>
		{/if}
	{/each}

	<Divider>
		Spell-Like Abilities
		<Button size="xs" color="secondary" onclick={() => addSLA()}>Add</Button>
	</Divider>

	<SortableList
		class="flex flex-col items-center gap-1"
		options={{
			group: 'spellLikeAbilities',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
		}}
		bind:items={c.spells.spellLikeAbilities}
		keyProp="id"
	>
		{#snippet fallback()}
			<div>No Spell-Like Abilities</div>
		{/snippet}

		{#snippet children({ item: sla, index: slaIndex })}
			<div class="flex w-full flex-row">
				<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
					<DragHandle />
				</div>

				<Collapse
					icon="arrow"
					oncontextmenu={() => openDialog(SpellLikeAbilityDialog, { slaIndex })}
				>
					{#snippet title()}
						<div class="flex flex-row items-center">
							<div class="grow text-sm font-semibold">{sla.name}</div>
							<button
								class="btn btn-accent btn-xs w-16"
								onclick={stopPropagation(() => castSla(slaIndex))}
							>
								{sla.type === 'perDay' ?
									`${sla.remaining} of ${sla.perDay}`
								:	$t(`spell.slaType.${sla.type}`)}
							</button>
						</div>
					{/snippet}

					<div
						class="grid grid-cols-[max-content_auto] gap-x-2 text-xs [&>*:nth-child(odd)]:font-bold [&>*:nth-child(odd)]:after:content-[':']"
					>
						{#each sla.details as [label, value], i (i)}
							<div>{label}</div>
							<div>{value}</div>
						{/each}
					</div>
					{#if sla.description}
						<div class="divider">Description</div>
						<MultilineMacro
							text={sla.description}
							class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
						/>
					{/if}
				</Collapse>
			</div>
		{/snippet}
	</SortableList>
</div>
