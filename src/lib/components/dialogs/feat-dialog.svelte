<script lang="ts">
	import { FEAT_TYPES, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Select from '../input/select.svelte';

	export let index: number;

	function deleteFeat() {
		$c.feats.splice(index, 1);
		$c.feats = $c.feats;
	}

	$title = 'Feat';
</script>

<div class="flex flex-col gap-2">
	{#if index < $c.feats.length}
		<div class="form-control w-full">
			<label for="featName" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="featName"
				placeholder="Type here"
				class="input input-bordered w-full"
				bind:value={$c.feats[index].name}
			/>
		</div>

		<div class="form-control w-full">
			<label for="featPrerequisites" class="label pb-0">
				<span class="label-text">Prerequisites</span>
			</label>
			<textarea
				name="featPrerequisites"
				placeholder="Enter Prerequisites"
				class="textarea textarea-bordered w-full"
				rows="5"
				bind:value={$c.feats[index].prerequisites}
			/>
		</div>

		<Select
			label="Type"
			name="featType"
			bind:value={$c.feats[index].type}
			options={FEAT_TYPES}
			let:option
		>
			<option value={option}>{$t(`feats.type.${option}`)}</option>
		</Select>

		<div class="form-control w-full">
			<label for="featBenefits" class="label pb-0">
				<span class="label-text">Benefits</span>
			</label>
			<textarea
				name="featBenefits"
				placeholder="Enter Benefits"
				class="textarea textarea-bordered w-full"
				rows="5"
				bind:value={$c.feats[index].benefits}
			/>
		</div>

		<div class="form-control w-full">
			<label for="featNormal" class="label pb-0">
				<span class="label-text">Normal</span>
			</label>
			<textarea
				name="featNormal"
				placeholder="Enter Normal"
				class="textarea textarea-bordered w-full"
				rows="5"
				bind:value={$c.feats[index].normal}
			/>
		</div>

		<div class="form-control w-full">
			<label for="featSpecial" class="label pb-0">
				<span class="label-text">Special</span>
			</label>
			<textarea
				name="featSpecial"
				placeholder="Enter Special"
				class="textarea textarea-bordered w-full"
				rows="5"
				bind:value={$c.feats[index].special}
			/>
		</div>
	{/if}

	<button on:click={deleteFeat} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
