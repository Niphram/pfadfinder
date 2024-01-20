<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import { AcItem, Item, c } from '$lib/data';
	import { macroNotify } from '$lib/utils/notes';

	import AcItemDialog from '$lib/components/dialogs/ac-item-dialog.svelte';
	import ItemDialog from '$lib/components/dialogs/item-dialog.svelte';

	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';

	function addItem() {
		$c.equipment.items.push(new Item());
		$c.equipment.items = $c.equipment.items;

		openDialog(ItemDialog, { index: $c.equipment.items.length - 1 });
	}

	function addAcItem() {
		$c.equipment.acItems.push(new AcItem());
		$c.equipment.acItems = $c.equipment.acItems;

		openDialog(AcItemDialog, { index: $c.equipment.acItems.length - 1 });
	}
</script>

<div class="flex flex-col gap-2">
	<div class="divider mb-0">Money</div>

	<div class="flex flex-row gap-2">
		<Integer bind:value={$c.money.cp} label="CP" name="cp" placeholder="Copper" />
		<Integer bind:value={$c.money.sp} label="SP" name="sp" placeholder="Silver" />
		<Integer bind:value={$c.money.gp} label="GP" name="gp" placeholder="Gold" />
		<Integer bind:value={$c.money.pp} label="PP" name="pp" placeholder="Platinum" />
	</div>

	<TextArea bind:value={$c.money.notes} name="valuables" placeholder="Other Valuables" rows={1} />

	<div class="divider">
		<div class="flex flex-row items-center gap-2">
			Gear
			<div class="badge badge-neutral badge-outline">{$c.equipment.totalWeight} lb.</div>
			<button class="btn btn-secondary btn-xs" on:click={addItem}>Add</button>
		</div>
	</div>

	<SortableList
		bind:items={$c.equipment.items}
		options={{
			group: 'items',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)'
		}}
		keyProp="id"
		class="flex flex-col gap-2"
		let:item
		let:index
	>
		<div class="flex w-full flex-row items-stretch">
			<div class="drag-handle flex w-8 items-center justify-center md:w-12">
				<DragHandle />
			</div>
			<div class="flex grow flex-row items-stretch gap-2">
				<button
					class="btn btn-sm flex-1 md:btn-md"
					on:click={() => macroNotify(item.name, item.description, $c)}
					on:contextmenu|preventDefault={() => openDialog(ItemDialog, { index })}
				>
					{item.quantity}x <span class:underline={item.equipped}>{item.name}</span>
				</button>
				{#if item.hasCharges}
					<button
						class="btn btn-accent btn-sm w-24 md:btn-md"
						on:click={() => {
							item.charges -= 1;
						}}
						on:contextmenu|preventDefault={() => {
							item.charges += 1;
						}}
					>
						{item.charges} charges
					</button>
				{/if}
			</div>
		</div>
	</SortableList>

	<div class="divider">
		<div class="flex flex-row gap-2">
			AC Items
			<button class="btn btn-secondary btn-xs" on:click={addAcItem}>Add</button>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		{#each $c.equipment.acItems as item, idx}
			<button
				class="btn btn-sm"
				class:underline={item.equipped}
				on:click={() => macroNotify(item.name, item.notes, $c)}
				on:contextmenu|preventDefault={() => openDialog(AcItemDialog, { index: idx })}
			>
				{item.name}
			</button>
		{/each}
	</div>
</div>
