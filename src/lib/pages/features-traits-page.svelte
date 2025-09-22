<script lang="ts">
	import { t } from '$lib/i18n';
	import { preventDefault, stopPropagation } from '$lib/utils';

	import Collapse from '$lib/atoms/collapse.svelte';
	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';

	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import FeatDialog from '$lib/components/dialogs/feat-dialog.svelte';
	import TraitDialog from '$lib/components/dialogs/trait-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';

	import { Feat, getChar, Trait } from '$lib/data';

	const { openDialog } = useDialog();
	const { c } = $derived(getChar());

	function addFeat() {
		c.$.feats.value.push(new Feat());

		openDialog(FeatDialog, { index: c.feats.length - 1 });
	}

	function addTrait() {
		c.$.traits.value.push(new Trait());

		openDialog(TraitDialog, { index: c.traits.length - 1 });
	}

	function useTrait(index: number) {
		if (c.traits[index].remaining > 0) c.traits[index].remaining--;
	}

	function refillTrait(index: number) {
		c.traits[index].remaining = c.traits[index].perDay ?? 0;
	}
</script>

<div class="flex flex-col gap-2">
	<div class="divider">
		<div class="flex flex-row gap-2">
			Feats
			<button class="btn btn-secondary btn-xs" onclick={addFeat}>Add</button>
		</div>
	</div>

	<SortableList
		bind:items={c.feats}
		options={{
			group: 'feats',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
		}}
		keyProp="id"
		class="flex flex-col gap-2"
	>
		{#snippet children({ item, index })}
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
					oncontextmenu={() => openDialog(FeatDialog, { index })}
					titleClass="overflow-hidden"
					bind:open={item.open}
				>
					{#snippet title({ open })}
						<div
							class={[
								'overflow-hidden text-sm font-semibold text-ellipsis',
								!open && 'whitespace-nowrap',
							]}
						>
							{item.name} ({$t(`feats.type.${item.type}`)})
						</div>
					{/snippet}

					<div class="flex flex-col gap-2">
						{#if item.benefits}
							<div class="divider my-0">Benefits</div>
							<MultilineMacro
								text={item.benefits}
								class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
							/>
						{/if}
						{#if item.normal}
							<div class="divider my-0">Normal</div>
							<MultilineMacro
								text={item.normal}
								class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
							/>
						{/if}
						{#if item.special}
							<div class="divider my-0">Special</div>
							<MultilineMacro
								text={item.special}
								class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
							/>
						{/if}
					</div>
				</Collapse>
			</div>
		{/snippet}
	</SortableList>

	<div class="divider">
		<div class="flex flex-row gap-2">
			Features/Traits
			<button class="btn btn-secondary btn-xs" onclick={addTrait}>Add</button>
		</div>
	</div>

	<SortableList
		bind:items={c.traits}
		options={{
			group: 'traits',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
		}}
		keyProp="id"
		class="flex flex-col gap-2"
	>
		{#snippet children({ item, index })}
			<div class="flex w-full flex-row items-stretch">
				<div
					class="drag-handle flex w-6 items-center justify-center"
					role="button"
					tabindex="0"
				>
					<DragHandle />
				</div>
				<Collapse
					bind:open={item.open}
					icon="arrow"
					titleClass="py-0! overflow-hidden"
					oncontextmenu={preventDefault(() =>
						openDialog(TraitDialog, { index }),
					)}
				>
					{#snippet title({ open })}
						<div class="flex flex-row items-center justify-between gap-2">
							<span
								class={[
									'overflow-hidden py-2 text-sm font-semibold text-ellipsis md:py-4',
									!open && 'whitespace-nowrap',
								]}>{item.name}</span
							>

							{#if item.perDay !== null}
								<button
									class="btn btn-accent btn-xs md:btn-md w-16 md:w-24"
									onclick={stopPropagation(() => useTrait(index))}
									oncontextmenu={stopPropagation(
										preventDefault(() => refillTrait(index)),
									)}
								>
									{item.remaining} of {item.perDay}
								</button>
							{/if}
						</div>
					{/snippet}

					<MultilineMacro
						text={item.description}
						class="mb-4 text-justify text-sm hyphens-auto last:mb-0"
					/>
				</Collapse>
			</div>
		{/snippet}
	</SortableList>
</div>
