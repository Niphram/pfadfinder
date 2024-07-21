<script lang="ts">
	import Collapse from './atoms/collapse.svelte';
	import { openDialog } from './components/dialog.svelte';
	import ItemDialog from './components/dialogs/item-dialog.svelte';
	import DragHandle from './components/icons/drag-handle.svelte';

	import SortableList from './components/sortable-list.svelte';
	import { c, type Item } from './data';
	import { t } from './i18n';
	import { macroNotify } from './utils/notes';

	export let items: Item[];

	let className: string = '';
	export { className as class };

	export let disabled = false;

	export let parentId = 'items';

	// If the moved item is a container and the target is another container, block move
	function onMove(item: Item, target: Item[]) {
		return !item.isContainer || target === $c.equipment.items;
	}
</script>

<SortableList
	bind:items
	keyPrefix={parentId}
	options={{
		group: 'items',
		handle: '.drag-handle',
		animation: 150,
		easing: 'cubic-bezier(1, 0, 0, 1)',
		fallbackOnBody: true,
		swapThreshold: 0.65
	}}
	{onMove}
	keyProp="id"
	{disabled}
	class="flex flex-col gap-2 {className}"
	let:item
	let:index
>
	<div class="flex w-full flex-auto flex-row">
		<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
			<DragHandle />
		</div>

		{#if !item.isContainer}
			<button
				class="btn btn-sm min-w-0 flex-auto truncate md:btn-md"
				on:click|stopPropagation={() => macroNotify(item.name, item.description, $c)}
				on:contextmenu|preventDefault|stopPropagation={() =>
					openDialog(ItemDialog, { list: items, index })}
			>
				<span class="truncate">
					{item.quantity}x {item.name}
				</span>
			</button>
			{#if item.chargeType !== 'none'}
				<button
					class="btn btn-accent btn-sm ml-2 w-28 px-2 md:btn-md"
					on:click|stopPropagation={() => items[index].remaining > 0 && items[index].remaining--}
				>
					{item.remaining}{#if item.chargeType === 'perDay'}
						/{item.perDay}
					{/if} charges
				</button>
			{/if}
		{:else}
			<Collapse
				icon="arrow"
				on:click={() => macroNotify(item.name, item.description, $c)}
				on:contextmenu={() => openDialog(ItemDialog, { list: items, index })}
				let:open
			>
				<svelte:fragment slot="title">
					<span class="text-sm font-semibold" class:underline={item.equipped}>
						{item.name}
					</span>
					<span class="badge badge-md">
						{$t('equipment.items', item.children.length)}
					</span>
				</svelte:fragment>

				<svelte:self
					bind:items={items[index].children}
					parentId={item.id}
					disabled={!open}
					class="rounded-lg bg-base-100 p-2 pl-0"
				/>
			</Collapse>
		{/if}
	</div>
</SortableList>
