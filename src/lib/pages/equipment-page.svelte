<script lang="ts">
	import Sortable from 'sortablejs';

	import { openDialog } from '$lib/components/dialog.svelte';
	import { AcItem, Item, c } from '$lib/data';
	import { macroNotify } from '$lib/utils/notes';

	import AcItemDialog from '$lib/components/dialogs/ac-item-dialog.svelte';
	import ItemDialog from '$lib/components/dialogs/item-dialog.svelte';

	import Integer from '$lib/components/input/integer.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';

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

	let itemListEl: HTMLDivElement;
	$: if (itemListEl)
		Sortable.create(itemListEl, {
			group: 'items',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			onUpdate({ oldIndex = 0, newIndex = 0 }) {
				$c.equipment.items.splice(newIndex, 0, $c.equipment.items.splice(oldIndex, 1)[0]);
				$c.equipment.items = $c.equipment.items;
			}
		});
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

	<div class="flex flex-col gap-2" bind:this={itemListEl}>
		{#each $c.equipment.items as item, idx (item.id)}
			<div class="flex w-full flex-row items-center gap-2">
				<div class="drag-handle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
						/>
					</svg>
				</div>
				<button
					class="btn btn-sm flex-1 md:btn-md"
					class:underline={item.equipped}
					on:click={() => macroNotify(item.name, item.description, $c)}
					on:contextmenu|preventDefault={() => openDialog(ItemDialog, { index: idx })}
				>
					{item.name}
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
		{/each}
	</div>

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
