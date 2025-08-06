<script lang="ts">
	import Self from './nested-equipment-list.svelte';

	import Collapse from './atoms/collapse.svelte';
	import { openDialog } from './components/dialog.svelte';
	import ItemDialog from './components/dialogs/item-dialog.svelte';
	import DragHandle from './components/icons/drag-handle.svelte';

	import SortableList from './components/sortable-list.svelte';
	import { type Item } from './data';
	import { getChar } from './data/context.svelte';
	import { t } from './i18n';
	import { macroNotify } from './utils/notes';
	import { preventDefault, stopPropagation } from './utils';
	import type { SerdeProxy } from './serde/proxy';

	const { c } = $derived(getChar());

	interface Props {
		items: SerdeProxy<Item>[];
		class?: string;
		disabled?: boolean;
		parentId?: string;
	}

	let {
		items = $bindable(),
		class: className = '',
		disabled = false,
		parentId = 'items',
	}: Props = $props();

	// If the moved item is a container and the target is another container, block move
	function onMove(item: SerdeProxy<Item>, target: SerdeProxy<Item>[]) {
		return !item.isContainer || target === c.equipment.items;
	}
</script>

{#key items.length}
	<SortableList
		bind:items
		keyPrefix={parentId}
		options={{
			group: 'items',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			fallbackOnBody: true,
			swapThreshold: 0.65,
		}}
		{onMove}
		keyProp="id"
		{disabled}
		class="flex flex-col gap-2 {className}"
	>
		{#snippet children(props)}
			<div class="flex w-full flex-auto flex-row">
				<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
					<DragHandle />
				</div>

				{#if !props.item.isContainer}
					<button
						class="btn btn-sm md:btn-md min-w-0 flex-auto truncate"
						onclick={stopPropagation(() => macroNotify(props.item.name, props.item.description, c))}
						oncontextmenu={stopPropagation(
							preventDefault(() => openDialog(ItemDialog, { list: items, index: props.index })),
						)}
					>
						<span class="truncate">
							{props.item.quantity}x {props.item.name}
						</span>
					</button>
					{#if props.item.chargeType !== 'none'}
						<button
							class="btn btn-accent btn-sm md:btn-md ml-2 w-28 px-2"
							onclick={stopPropagation(
								() => items[props.index].remaining > 0 && items[props.index].remaining--,
							)}
						>
							{props.item.remaining}{#if props.item.chargeType === 'perDay'}
								/{props.item.perDay}
							{/if} charges
						</button>
					{/if}
				{:else}
					<Collapse
						icon="arrow"
						bind:open={items[props.index].containerOpen}
						ontoggle={(open) => (items[props.index].containerOpen = open)}
						oncontextmenu={() => openDialog(ItemDialog, { list: items, index: props.index })}
					>
						{#snippet title()}
							<span class="text-sm font-semibold" class:underline={props.item.equipped}>
								{props.item.name}
							</span>
							<span class="badge badge-md">
								{$t('equipment.items', props.item.children.length)}
							</span>
						{/snippet}

						{#snippet children({ open })}
							<Self
								bind:items={props.item.children}
								parentId={props.item.id}
								disabled={!open}
								class="bg-base-100 rounded-lg p-2 pl-0"
							/>
						{/snippet}
					</Collapse>
				{/if}
			</div>
		{/snippet}
	</SortableList>
{/key}
