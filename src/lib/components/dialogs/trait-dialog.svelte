<script lang="ts">
	import { c } from '$lib/data';
	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';

	export let index: number;

	function deleteTrait() {
		$c.traits.splice(index, 1);
		$c.traits = $c.traits;
	}

	$title = 'Feature/Trait';
</script>

<div class="flex flex-col gap-2">
	{#if index < $c.traits.length}
		<div class="form-control w-full">
			<label for="traitName" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="traitName"
				placeholder="Type here"
				class="input input-bordered w-full"
				bind:value={$c.traits[index].name}
			/>
		</div>

		<MacroInteger
			bind:value={$c.traits[index].perDay.expr}
			name="traitPerDay"
			label="Per Day"
			placeholder="Uses per day"
			optional
		/>

		<div class="form-control w-full">
			<label for="traitDescription" class="label pb-0">
				<span class="label-text">Description</span>
			</label>
			<textarea
				name="traitDescription"
				placeholder="Enter Description"
				class="textarea textarea-bordered w-full"
                                rows="10"
				bind:value={$c.traits[index].description}
			/>
		</div>
	{/if}

	<button on:click={deleteTrait} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
