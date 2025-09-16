<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	interface Props {
		index: number;
	}

	let { index }: Props = $props();

	const { c } = $derived(getChar());

	function deleteTrait() {
		c.traits.splice(index, 1);
	}

	$title = 'Feature/Trait';
</script>

<div class="flex flex-col gap-2">
	{#if index < c.traits.length}
		<Input
			name="traitName"
			label="Name"
			placeholder="Type here"
			bind:value={c.traits[index].name}
		/>

		<MacroInteger
			bind:value={c.traits[index].$perDay.expr}
			name="traitPerDay"
			label="Per Day"
			placeholder="Uses per day"
			optional
		/>

		<MacroTextArea
			name="traitDescription"
			label="Description"
			rows={10}
			bind:value={c.traits[index].description}
		/>
	{/if}

	<button onclick={deleteTrait} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
