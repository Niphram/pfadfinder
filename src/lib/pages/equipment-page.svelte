<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import { AcItem, Item, c } from '$lib/data';
	import { macroNotify } from '$lib/utils/notes';

	import AcItemDialog from '$lib/components/dialogs/ac-item-dialog.svelte';
	import ItemDialog from '$lib/components/dialogs/item-dialog.svelte';

	import Integer from '$lib/components/input/integer.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';
	import NestedEquipmentList from '$lib/nested-equipment-list.svelte';

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

	<NestedEquipmentList bind:items={$c.equipment.items} class="ml-2"></NestedEquipmentList>

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
