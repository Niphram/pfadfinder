<script lang="ts">
	import { CHARGE_TYPES, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import Number from '../input/number.svelte';
	import TextArea from '../input/text-area.svelte';

	export let index: number;

	function deleteItem() {
		$c.equipment.items.splice(index, 1);
		$c.equipment.items = $c.equipment.items;
	}

	$title = 'Item';
</script>

<div class="flex flex-col gap-2">
	{#if index < $c.equipment.items.length}
		<div class="form-control w-full">
			<label for="className" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="className"
				placeholder="Type here"
				class="input input-bordered w-full"
				bind:value={$c.equipment.items[index].name}
			/>
		</div>

		<div class="flex flex-row gap-2">
			<Integer
				bind:value={$c.equipment.items[index].quantity}
				name="itemQuantity"
				label="Quantity"
				noNegatives
			/>
			<Number bind:value={$c.equipment.items[index].weight} name="itemWeight" label="Weight" />
		</div>

		<div class="form-control">
			<label class="label cursor-pointer pb-0">
				<span class="label-text">Equipped?</span>
				<input type="checkbox" class="toggle" bind:checked={$c.equipment.items[index].equipped} />
			</label>
		</div>

		<div class="divider mb-0">
			<div class="flex flex-row items-center gap-2">
				<span>Charges</span>
				<select
					name="itemChargeType"
					class="select select-bordered select-sm"
					bind:value={$c.equipment.items[index].chargeType}
				>
					{#each CHARGE_TYPES as chargeType}
						<option value={chargeType}>
							{$t(`equipment.chargeType.${chargeType}`)}
						</option>
					{/each}
				</select>
			</div>
		</div>

		{#if $c.equipment.items[index].chargeType !== 'none'}
			<div class="flex flex-row gap-2">
				<Integer
					label="Remaining charges"
					name="itemCharges"
					noNegatives
					bind:value={$c.equipment.items[index].remaining}
				/>

				{#if $c.equipment.items[index].chargeType === 'perDay'}
					<Integer
						label="Per Day"
						name="itemChargesPerDay"
						noNegatives
						noZero
						bind:value={$c.equipment.items[index].perDay}
					/>
				{/if}
			</div>
		{/if}

		<TextArea
			bind:value={$c.equipment.items[index].description}
			name="itemNotes"
			placeholder="Description"
			label="Description"
		/>
	{/if}

	<button on:click={deleteItem} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
