<script lang="ts">
	import { FEAT_TYPES } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';

	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';
	import Select from '../input/select.svelte';

	const { c } = getChar();

	export let index: number;

	function deleteFeat() {
		$c.feats.splice(index, 1);
		$c.feats = $c.feats;
	}

	$title = 'Feat';
</script>

<div class="flex flex-col gap-2">
	{#if index < $c.feats.length}
		<Input name="featName" label="Name" placeholder="Type here" bind:value={$c.feats[index].name} />

		<MacroTextArea
			name="featPrerequisites"
			label="Prerequisites"
			placeholder="Enter Prerequisites"
			rows={5}
			bind:value={$c.feats[index].prerequisites}
		/>

		<Select
			label="Type"
			name="featType"
			bind:value={$c.feats[index].type}
			options={FEAT_TYPES}
			let:option
		>
			<option value={option}>{$t(`feats.type.${option}`)}</option>
		</Select>

		<MacroTextArea
			name="featBenefits"
			label="Benefits"
			placeholder="Enter Benefits"
			rows={5}
			bind:value={$c.feats[index].benefits}
		/>

		<MacroTextArea
			name="featNormal"
			label="Normal"
			placeholder="Enter Normal"
			rows={5}
			bind:value={$c.feats[index].normal}
		/>

		<MacroTextArea
			name="featSpecial"
			label="Special"
			placeholder="Enter Special"
			rows={5}
			bind:value={$c.feats[index].special}
		/>
	{/if}

	<button on:click={deleteFeat} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
