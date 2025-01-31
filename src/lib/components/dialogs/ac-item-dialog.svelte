<script lang="ts">
	import { ARMOR_TYPES, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import OptionalInteger from '../input/optional-integer.svelte';
	import Select from '../input/select.svelte';
	import TextArea from '../input/text-area.svelte';

	export let index: number;

	const bonusKeys = [
		'acBonus',
		'ffBonus',
		'touchBonus',
		'natBonus',
		'defBonus',
		'dodBonus'
	] as const;

	function deleteAcItem() {
		$c.equipment.acItems.splice(index, 1);
		$c.equipment.acItems = $c.equipment.acItems;
	}

	$title = 'Item';
</script>

<div class="flex flex-col gap-2">
	{#if index < $c.equipment.acItems.length}
		<div class="form-control w-full">
			<label for="className" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="className"
				placeholder="Type here"
				class="input input-bordered w-full"
				bind:value={$c.equipment.acItems[index].name}
			/>
		</div>

		<div class="form-control">
			<label class="label cursor-pointer pb-0">
				<span class="label-text">Equipped?</span>
				<input type="checkbox" class="toggle" bind:checked={$c.equipment.acItems[index].equipped} />
			</label>
		</div>

		<div class="grid grid-cols-3 gap-2">
			{#each bonusKeys as key}
				<Integer
					bind:value={$c.equipment.acItems[index][key]}
					name="class{key}"
					label={$t(`equipment.acBonuses.${key}.short`)}
				/>
			{/each}
		</div>

		<Select
			bind:value={$c.equipment.acItems[index].type}
			name="itemType"
			label="Type"
			options={ARMOR_TYPES}
			let:option
		>
			<option value={option}>{$t(`equipment.armorType.${option}`)}</option>
		</Select>

		<div class="grid grid-cols-3 gap-2">
			<Integer
				bind:value={$c.equipment.acItems[index].chkPenalty}
				noPositive
				name="chkPenalty"
				label={$t(`equipment.penalties.chkPenalty.short`)}
			/>
			<OptionalInteger
				bind:value={$c.equipment.acItems[index].maxDexBonus}
				name="maxDexBonus"
				label={$t(`equipment.penalties.maxDexBonus.short`)}
			/>
			<Integer
				bind:value={$c.equipment.acItems[index].spellFailure}
				name="spellFailure"
				label={$t(`equipment.penalties.spellFailure.short`)}
			/>
		</div>

		<TextArea
			bind:value={$c.equipment.acItems[index].notes}
			name="acItemNotes"
			placeholder="Notes"
			label="Notes"
		/>
	{/if}

	<button on:click={deleteAcItem} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
