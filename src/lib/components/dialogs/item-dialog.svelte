<script lang="ts">
	import { t } from '$lib/i18n';
	import type { SerdeProxy } from '$lib/serde/proxy';

	import Divider from '$lib/atoms/divider.svelte';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Number from '$lib/components/input/number.svelte';
	import Select from '$lib/components/input/select.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';

	import { getChar, Item } from '$lib/data';

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
		<Input
			name="itemName"
			label="Name"
			placeholder="Type here"
			value={list[index].$.name}
		/>

		<div class="flex flex-row gap-2">
			<Number
				value={list[index].$.quantity}
				name="itemQuantity"
				label="Quantity"
			/>
			<Number value={list[index].$.weight} name="itemWeight" label="Weight" />
		</div>

		<Toggle
			name="isContainer"
			label="Container?"
			bind:checked={list[index].isContainer}
			disabled={list[index].children.length > 0 || list !== c.equipment.items}
		/>

		{#if list[index].isContainer}
			<Toggle
				name="isEquipped"
				label="Equipped?"
				bind:checked={list[index].equipped}
			/>
		{/if}

		<Divider>
			<span>Charges</span>
			<Select
				name="itemChargeType"
				class="select-sm"
				value={list[index].$.chargeType}
				translate={(key) => $t(`equipment.chargeType.${key}`)}
			/>
		</Divider>

		{#if list[index].chargeType !== 'none'}
			<div class="flex flex-row gap-2">
				<Number
					label="Remaining charges"
					name="itemCharges"
					value={list[index].$.remaining}
				/>

				{#if list[index].chargeType === 'perDay'}
					<Number
						label="Per Day"
						name="itemChargesPerDay"
						value={list[index].$.perDay}
					/>
				{/if}
			</div>
		{/if}

		<MacroTextArea
			value={list[index].$.description}
			name="itemNotes"
			placeholder="Description"
			label="Description"
		/>
	{/if}

	<button
		onclick={deleteItem}
		class="btn btn-error mt-4 w-max self-center uppercase"
	>
		Delete
	</button>
</div>
