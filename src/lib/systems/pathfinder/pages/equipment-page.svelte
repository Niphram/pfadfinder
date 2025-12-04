<script lang="ts">
	import { t } from '$lib/i18n';
	import NestedEquipmentList from '$lib/nested-equipment-list.svelte';
	import { preventDefault, useMacroNotify } from '$lib/utils';

	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import AcItemDialog from '$lib/components/dialogs/ac-item-dialog.svelte';
	import ItemDialog from '$lib/components/dialogs/item-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import Number from '$lib/components/input/number.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';

	import { AcItem, getChar, Item } from '$lib/data';

	const { openDialog } = useDialog();
	const { macroNotify } = useMacroNotify();
	const { c } = $derived(getChar());

	function addItem() {
		c.equipment.$.items.value.push(new Item());

		openDialog(ItemDialog, {
			list: c.equipment.items,
			index: c.equipment.items.length - 1,
		});
	}

	function addAcItem() {
		c.equipment.$.acItems.value.push(new AcItem());

		openDialog(AcItemDialog, { index: c.equipment.acItems.length - 1 });
	}
</script>

<div class="flex flex-col gap-2">
	<div class="divider mb-0">Money</div>

	<div class="flex flex-row gap-2">
		<Number value={c.money.$.cp} label="CP" name="cp" placeholder="Copper" />
		<Number value={c.money.$.sp} label="SP" name="sp" placeholder="Silver" />
		<Number value={c.money.$.gp} label="GP" name="gp" placeholder="Gold" />
		<Number value={c.money.$.pp} label="PP" name="pp" placeholder="Platinum" />
	</div>

	<TextArea
		value={c.money.$.notes}
		name="valuables"
		label="Other valuables"
		placeholder="Other valuables"
		rows={1}
	/>

	<div class="divider">
		<div class="flex flex-row items-center gap-2">
			Gear
			<div class="badge badge-neutral badge-outline">
				{c.equipment.totalWeight} lb.
			</div>
			<button class="btn btn-secondary btn-xs" onclick={addItem}>Add</button>
		</div>
	</div>

	<NestedEquipmentList bind:items={c.equipment.items}></NestedEquipmentList>

	<div class="divider">
		<div class="flex flex-row gap-2">
			AC Items
			<button class="btn btn-secondary btn-xs" onclick={addAcItem}>Add</button>
		</div>
	</div>

	<SortableList
		bind:items={c.equipment.acItems}
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
	>
		{#snippet children({ item, index })}
			<div class="flex w-full flex-auto flex-row">
				<div
					class="drag-handle flex w-6 items-center justify-center"
					role="button"
					tabindex="0"
				>
					<DragHandle />
				</div>
				<button
					class="btn btn-sm md:btn-md min-w-0 flex-auto truncate"
					onclick={() => macroNotify(item.name, item.notes)}
					oncontextmenu={preventDefault(() =>
						openDialog(AcItemDialog, { index }),
					)}
				>
					<span class="truncate" class:underline={item.equipped}>
						{item.name} ({$t(`equipment.armorType.${item.type}`)})
					</span>
				</button>
			</div>
		{/snippet}
	</SortableList>
</div>
