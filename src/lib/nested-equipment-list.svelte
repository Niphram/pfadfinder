<script lang="ts">
	import Collapse from './atoms/collapse.svelte';
	import { openDialog } from './components/dialog.svelte';
	import ItemDialog from './components/dialogs/item-dialog.svelte';
	import DragHandle from './components/icons/drag-handle.svelte';

	import SortableList from './components/sortable-list.svelte';
	import { c, type Item } from './data';
	import { macroNotify } from './utils/notes';

	export let items: Item[];

	let className: string = '';
	export { className as class };

	export let disabled = false;
</script>

<SortableList
	bind:items
	options={{
		group: 'itemTest',
		handle: '.drag-handle',
		animation: 150,
		easing: 'cubic-bezier(1, 0, 0, 1)',
		fallbackOnBody: true,
		swapThreshold: 0.65
	}}
	keyProp="id"
	{disabled}
	class="flex flex-col gap-2 {className}"
	let:item
	let:index
>
	{#if !item.isContainer}
		<div class="flex w-full flex-row items-stretch">
			<div class="drag-handle ml-2 flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>
			<div class="flex grow flex-row items-stretch gap-2">
				<button
					class="btn btn-sm flex-1 md:btn-md"
					on:click|stopPropagation={() => macroNotify(item.name, item.description, $c)}
					on:contextmenu|preventDefault|stopPropagation={() =>
						openDialog(ItemDialog, { list: items, index })}
				>
					{item.quantity}x {item.name}
				</button>
				{#if item.chargeType !== 'none'}
					<button
						class="btn btn-accent btn-sm w-28 px-2 md:btn-md"
						on:click={() =>
							$c.equipment.items[index].remaining > 0 && $c.equipment.items[index].remaining--}
					>
						{item.remaining}{#if item.chargeType === 'perDay'}
							/{item.perDay}
						{/if} charges
					</button>
				{/if}
			</div>
		</div>
	{:else}
		<div class="flex w-full flex-row items-stretch">
			<div class="drag-handle ml-2 flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>

			<Collapse
				icon="arrow"
				on:click={() => macroNotify(item.name, item.description, $c)}
				on:contextmenu={() => openDialog(ItemDialog, { list: items, index })}
				let:open
			>
				<svelte:fragment slot="title">{item.name}</svelte:fragment>

				<svelte:self bind:items={items[index].children} disabled={!open} class="p-4 bg-base-100 rounded-lg" />
			</Collapse>
		</div>
	{/if}
</SortableList>
