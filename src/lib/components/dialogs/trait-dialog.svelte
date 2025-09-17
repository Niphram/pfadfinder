<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
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
		<Input name="traitName" label="Name" placeholder="Type here" value={c.traits[index].$.name} />

		<MacroNumber
			value={c.traits[index].$.perDay}
			name="traitPerDay"
			label="Per Day"
			placeholder="Uses per day"
		/>

		<MacroTextArea
			name="traitDescription"
			label="Description"
			rows={10}
			value={c.traits[index].$.description}
		/>
	{/if}

	<button onclick={deleteTrait} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
