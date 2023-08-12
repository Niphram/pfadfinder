<script>
	import { openDialog } from '$lib/components/dialog.svelte';
	import AcItemDialog from '$lib/components/dialogs/ac-item-dialog.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';
	import { c } from '$lib/state';
	import { makeDefaultAcItem } from '$lib/state/char-types/equipment';
	import { macroNotify } from '$lib/utils/notes';

	function addAcItem() {
		$c.equipment.ac.items.push(makeDefaultAcItem());
		$c.equipment.ac.items = $c.equipment.ac.items;

		openDialog(AcItemDialog, { index: $c.equipment.ac.items.length - 1 });
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

	<TextArea bind:value={$c.money.other} name="valuables" placeholder="Other Valuables" rows={1} />

	<div class="divider">Gear</div>
	<div class="divider">
		<div class="flex flex-row gap-2">
			AC Items
			<button class="btn btn-secondary btn-xs" on:click={addAcItem}>Add</button>
		</div>
	</div>

	<div class="flex flex-col gap-2">
		{#each $c.equipment.ac.items as item, idx}
			<button
				class="btn btn-sm"
				class:bg-base-300={item.equipped}
				class:underline={item.equipped}
				on:click={() => macroNotify(item.name, item.notes, $c)}
				on:contextmenu|preventDefault={() => openDialog(AcItemDialog, { index: idx })}
			>
				{item.name}
			</button>
		{/each}
	</div>
</div>
