<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Select from '$lib/components/input/select.svelte';

	import { FEAT_TYPES, getChar } from '$lib/data';

	interface Props {
		index: number;
	}

	let { index }: Props = $props();

	const { c } = $derived(getChar());

	function deleteFeat() {
		c.feats.splice(index, 1);
	}

	$title = 'Feat';
</script>

<div class="flex flex-col gap-2">
	{#if index < c.feats.length}
		<Input name="featName" label="Name" placeholder="Type here" value={c.feats[index].$.name} />

		<MacroTextArea
			name="featPrerequisites"
			label="Prerequisites"
			placeholder="Enter Prerequisites"
			rows={5}
			value={c.feats[index].$.prerequisites}
		/>

		<Select label="Type" name="featType" bind:value={c.feats[index].type} options={FEAT_TYPES}>
			{#snippet children({ option })}
				<option value={option}>{$t(`feats.type.${option}`)}</option>
			{/snippet}
		</Select>

		<MacroTextArea
			name="featBenefits"
			label="Benefits"
			placeholder="Enter Benefits"
			rows={5}
			value={c.feats[index].$.benefits}
		/>

		<MacroTextArea
			name="featNormal"
			label="Normal"
			placeholder="Enter Normal"
			rows={5}
			value={c.feats[index].$.normal}
		/>

		<MacroTextArea
			name="featSpecial"
			label="Special"
			placeholder="Enter Special"
			rows={5}
			value={c.feats[index].$.special}
		/>
	{/if}

	<button onclick={deleteFeat} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
