<script lang="ts">
	import { CHARGE_TYPES, Item, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import Number from '../input/number.svelte';
	import TextArea from '../input/text-area.svelte';

	export let list: Item[] = [];
	export let index: number;

	$: list && updateItems();

	function updateItems() {
		$c = $c;
	}

	function deleteItem() {
		list.splice(index, 1);
		list = list;
	}

	$title = 'Item';
</script>

<div class="flex flex-col gap-2">
	{#if index < list.length}
		<div class="form-control w-full">
			<label for="className" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="className"
				placeholder="Type here"
				class="input input-bordered w-full"
				bind:value={list[index].name}
			/>
		</div>

		<div class="flex flex-row gap-2">
			<Integer bind:value={list[index].quantity} name="itemQuantity" label="Quantity" noNegatives />
			<Number bind:value={list[index].weight} name="itemWeight" label="Weight" />
		</div>

		<div class="form-control">
			<label class="label cursor-pointer pb-0">
				<span class="label-text">Container?</span>
				<input
					type="checkbox"
					class="toggle"
					bind:checked={list[index].isContainer}
					disabled={list[index].children.length > 0 || list !== $c.equipment.items}
				/>
			</label>
		</div>

		{#if list[index].isContainer}
			<div class="form-control">
				<label class="label cursor-pointer pb-0">
					<span class="label-text">Equipped?</span>
					<input type="checkbox" class="toggle" bind:checked={list[index].equipped} />
				</label>
			</div>
		{/if}

		<div class="divider mb-0">
			<div class="flex flex-row items-center gap-2">
				<span>Charges</span>
				<select
					name="itemChargeType"
					class="select select-bordered select-sm"
					bind:value={list[index].chargeType}
				>
					{#each CHARGE_TYPES as chargeType}
						<option value={chargeType}>
							{$t(`equipment.chargeType.${chargeType}`)}
						</option>
					{/each}
				</select>
			</div>
		</div>

		{#if list[index].chargeType !== 'none'}
			<div class="flex flex-row gap-2">
				<Integer
					label="Remaining charges"
					name="itemCharges"
					noNegatives
					bind:value={list[index].remaining}
				/>

				{#if list[index].chargeType === 'perDay'}
					<Integer
						label="Per Day"
						name="itemChargesPerDay"
						noNegatives
						noZero
						bind:value={list[index].perDay}
					/>
				{/if}
			</div>
		{/if}

		<TextArea
			bind:value={list[index].description}
			name="itemNotes"
			placeholder="Description"
			label="Description"
		/>
	{/if}

	<button on:click={deleteItem} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
