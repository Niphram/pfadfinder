<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import { AcItem, Item } from '$lib/data';
	import { t } from '$lib/i18n';
	import { macroNotify } from '$lib/utils/notes';

	import AcItemDialog from '$lib/components/dialogs/ac-item-dialog.svelte';
	import ItemDialog from '$lib/components/dialogs/item-dialog.svelte';

	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import NestedEquipmentList from '$lib/nested-equipment-list.svelte';
	import { getChar } from '$lib/data/context';

	const { c } = getChar();

	function addItem() {
		$c.equipment.items.push(new Item());
		$c.equipment.items = $c.equipment.items;

		openDialog(ItemDialog, { list: $c.equipment.items, index: $c.equipment.items.length - 1 });
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

	<NestedEquipmentList bind:items={$c.equipment.items}></NestedEquipmentList>

	<div class="divider">
		<div class="flex flex-row gap-2">
			AC Items
			<button class="btn btn-secondary btn-xs" on:click={addAcItem}>Add</button>
		</div>
	</div>

	<SortableList
		bind:items={$c.equipment.acItems}
		options={{
			group: 'ac-items',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			fallbackOnBody: true,
			swapThreshold: 0.65,
		}}
		keyProp="id"
		class="flex flex-col gap-2"
		let:item
		let:index
	>
		<div class="flex w-full flex-auto flex-row">
			<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>
			<button
				class="btn btn-sm md:btn-md min-w-0 flex-auto truncate"
				on:click={() => macroNotify(item.name, item.notes, $c)}
				on:contextmenu|preventDefault={() => openDialog(AcItemDialog, { index })}
			>
				<span class="truncate" class:underline={item.equipped}>
					{item.name} ({$t(`equipment.armorType.${item.type}`)})
				</span>
			</button>
		</div>
	</SortableList>
</div>
