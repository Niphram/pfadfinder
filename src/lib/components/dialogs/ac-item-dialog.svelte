<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Number from '$lib/components/input/number.svelte';
	import Select from '$lib/components/input/select.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';

	import { getChar } from '$lib/data';

	interface Props {
		index: number;
	}

	let { index }: Props = $props();

	const { c } = $derived(getChar());

	const bonusKeys = [
		'acBonus',
		'ffBonus',
		'touchBonus',
		'natBonus',
		'defBonus',
		'dodBonus',
	] as const;

	function deleteAcItem() {
		c.equipment.acItems.splice(index, 1);
	}

	$title = 'Item';
</script>

<div class="flex flex-col gap-2">
	{#if index < c.equipment.acItems.length}
		<Input
			name="className"
			label="Name"
			placeholder="Type here"
			value={c.equipment.acItems[index].$.name}
		/>

		<Toggle
			name="itemEquipped"
			label="Equipped?"
			bind:checked={c.equipment.acItems[index].equipped}
		/>

		<div class="grid grid-cols-3 gap-2">
			{#each bonusKeys as key (key)}
				<Number
					value={c.equipment.acItems[index].$[key]}
					name="class{key}"
					label={$t(`equipment.acBonuses.${key}.short`)}
				/>
			{/each}
		</div>

		<Select
			value={c.equipment.acItems[index].$.type}
			name="itemType"
			label="Type"
			translate={(key) => $t(`equipment.armorType.${key}`)}
		/>

		<div class="grid grid-cols-3 gap-2">
			<Number
				value={c.equipment.acItems[index].$.chkPenalty}
				name="chkPenalty"
				label={$t(`equipment.penalties.chkPenalty.short`)}
			/>
			<Number
				value={c.equipment.acItems[index].$.maxDexBonus}
				name="maxDexBonus"
				label={$t(`equipment.penalties.maxDexBonus.short`)}
			/>
			<Number
				value={c.equipment.acItems[index].$.spellFailure}
				name="spellFailure"
				label={$t(`equipment.penalties.spellFailure.short`)}
			/>
		</div>

		<MacroTextArea
			value={c.equipment.acItems[index].$.notes}
			name="acItemNotes"
			placeholder="Notes"
			label="Notes"
		/>
	{/if}

	<button onclick={deleteAcItem} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
