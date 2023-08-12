<script lang="ts">
	import { t } from '$lib/i18n';
	import { c } from '$lib/state';
	import { armorTypes } from '$lib/state/char-types/equipment';
	import Integer from '../input/integer.svelte';
	import Select from '../input/select.svelte';
	import TextArea from '../input/text-area.svelte';

	export let index = 0;

	const bonusKeys = [
		'acBonus',
		'ffBonus',
		'touchBonus',
		'natBonus',
		'defBonus',
		'dodBonus'
	] as const;

	const penaltyKeys = ['chkPenalty', 'maxDexBonus', 'spellFailure'] as const;

	function deleteAcItem() {
		$c.equipment.ac.items.splice(index, 1);
		$c.equipment.ac.items = $c.equipment.ac.items;
	}
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-lg font-bold">Item</h3>

	{#if index < $c.equipment.ac.items.length}
		<div class="form-control w-full max-w-xs">
			<label for="className" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="className"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={$c.equipment.ac.items[index].name}
			/>
		</div>

		<div class="form-control">
			<label class="label cursor-pointer pb-0">
				<span class="label-text">Equipped?</span>
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$c.equipment.ac.items[index].equipped}
				/>
			</label>
		</div>

		<div class="grid grid-cols-3 gap-2">
			{#each bonusKeys as key}
				<Integer
					bind:value={$c.equipment.ac.items[index][key]}
					name="class{key}"
					label={$t(`equipment.acBonuses.${key}.short`)}
				/>
			{/each}
		</div>

		<Select
			bind:value={$c.equipment.ac.items[index].type}
			name="itemType"
			label="Type"
			options={armorTypes}
			let:option
		>
			<option value={option}>{$t(`equipment.armorType.${option}`)}</option>
		</Select>

		<div class="grid grid-cols-3 gap-2">
			{#each penaltyKeys as key}
				<Integer
					bind:value={$c.equipment.ac.items[index][key]}
					name="class{key}"
					label={$t(`equipment.penalties.${key}.short`)}
				/>
			{/each}
		</div>

		<TextArea
			bind:value={$c.equipment.ac.items[index].notes}
			name="acItemNotes"
			placeholder="Notes"
			label="Notes"
		/>
	{/if}

	<button on:click={deleteAcItem} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
