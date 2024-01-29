<script lang="ts">
	import { CHARGE_TYPES, c } from '$lib/data';
	import { t } from '$lib/i18n';

	import Button from '$lib/atoms/button.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import Number from '$lib/atoms/input/number.svelte';
	import Select from '$lib/atoms/input/select.svelte';
	import TextInput from '$lib/atoms/input/text-input.svelte';
	import Toggle from '$lib/atoms/input/toggle.svelte';
	import Column from '$lib/atoms/layout/column.svelte';
	import Row from '$lib/atoms/layout/row.svelte';

	import { title } from '../dialog.svelte';
	import TextArea from '../input/text-area.svelte';

	export let index: number;

	function deleteItem() {
		$c.equipment.items.splice(index, 1);
		$c.equipment.items = $c.equipment.items;
	}

	$title = 'Item';
</script>

<Column>
	{#if index < $c.equipment.items.length}
		<TextInput
			name="itemName"
			label="Name"
			placeholder="Item Name"
			bind:value={$c.equipment.items[index].name}
		/>

		<Row>
			<Number
				bind:value={$c.equipment.items[index].quantity}
				name="itemQuantity"
				label="Quantity"
				min={0}
				step={1}
			/>

			<Number
				min={0}
				bind:value={$c.equipment.items[index].weight}
				name="itemWeight"
				label="Weight"
			/>
		</Row>

		<Toggle id="itemEquipped" bind:checked={$c.equipment.items[index].equipped}>Equipped?</Toggle>

		<Divider>
			Charges
			<Select
				name="itemChargeType"
				size="sm"
				bind:value={$c.equipment.items[index].chargeType}
				options={CHARGE_TYPES}
				let:option
			>
				<option value={option}>{$t(`equipment.chargeType.${option}`)}</option>
			</Select>
		</Divider>

		{#if $c.equipment.items[index].chargeType !== 'none'}
			<Row>
				<Number
					label="Remaining charges"
					name="itemCharges"
					min={0}
					step={1}
					bind:value={$c.equipment.items[index].remaining}
				/>

				{#if $c.equipment.items[index].chargeType === 'perDay'}
					<Number
						label="Per Day"
						name="itemChargesPerDay"
						min={1}
						step={1}
						bind:value={$c.equipment.items[index].perDay}
					/>
				{/if}
			</Row>
		{/if}

		<TextArea
			bind:value={$c.equipment.items[index].description}
			name="itemNotes"
			placeholder="Description"
			label="Description"
		/>
	{/if}

	<Divider />

	<Button color="error" class="self-center uppercase" wide on:click={deleteItem}>Delete</Button>
</Column>
