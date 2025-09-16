<script lang="ts">
	import { CHARGE_TYPES, Item } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import type { SerdeProxy } from '$lib/serde/proxy';

	import Divider from '../../atoms/divider.svelte';
	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';
	import Integer from '../input/integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';
	import Number from '../input/number.svelte';
	import Select from '../input/select.svelte';
	import Toggle from '../input/toggle.svelte';

	interface Props {
		list?: SerdeProxy<Item>[];
		index: number;
	}

	let { list = $bindable([]), index }: Props = $props();

	const { c } = $derived(getChar());

	function deleteItem() {
		list.splice(index, 1);
	}

	$title = 'Item';
</script>

<div class="flex flex-col gap-2">
	{#if index < list.length}
		<Input name="itemName" label="Name" placeholder="Type here" bind:value={list[index].name} />

		<div class="flex flex-row gap-2">
			<Integer bind:value={list[index].quantity} name="itemQuantity" label="Quantity" noNegatives />
			<Number bind:value={list[index].weight} name="itemWeight" label="Weight" />
		</div>

		<Toggle
			name="isContainer"
			label="Container?"
			bind:checked={list[index].isContainer}
			disabled={list[index].children.length > 0 || list !== c.equipment.items}
		/>

		{#if list[index].isContainer}
			<Toggle name="isEquipped" label="Equipped?" bind:checked={list[index].equipped} />
		{/if}

		<Divider>
			<span>Charges</span>
			<Select
				name="itemChargeType"
				size="small"
				options={CHARGE_TYPES}
				bind:value={list[index].chargeType}
			>
				{#snippet children({ option: value })}
					<option {value}>{$t(`equipment.chargeType.${value}`)}</option>
				{/snippet}
			</Select>
		</Divider>

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

		<MacroTextArea
			bind:value={list[index].description}
			name="itemNotes"
			placeholder="Description"
			label="Description"
		/>
	{/if}

	<button onclick={deleteItem} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
