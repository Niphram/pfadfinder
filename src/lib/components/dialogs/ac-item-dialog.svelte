<script lang="ts">
	import { ARMOR_TYPES } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';
	import Integer from '../input/integer.svelte';
	import OptionalInteger from '../input/optional-integer.svelte';
	import Select from '../input/select.svelte';
	import TextArea from '../input/text-area.svelte';
	import Toggle from '../input/toggle.svelte';

	const { c } = getChar();

	export let index: number;

	const bonusKeys = [
		'acBonus',
		'ffBonus',
		'touchBonus',
		'natBonus',
		'defBonus',
		'dodBonus',
	] as const;

	function deleteAcItem() {
		$c.equipment.acItems.splice(index, 1);
		$c.equipment.acItems = $c.equipment.acItems;
	}

	$title = 'Item';
</script>

<div class="flex flex-col gap-2">
	{#if index < $c.equipment.acItems.length}
		<Input
			name="className"
			label="Name"
			placeholder="Type here"
			bind:value={$c.equipment.acItems[index].name}
		/>

		<Toggle
			name="itemEquipped"
			label="Equipped?"
			bind:checked={$c.equipment.acItems[index].equipped}
		/>

		<div class="grid grid-cols-3 gap-2">
			{#each bonusKeys as key (key)}
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
