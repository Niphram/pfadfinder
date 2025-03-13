<script lang="ts">
	import Fieldset from './fieldset.svelte';

	export let noNegatives = false;
	export let noZero = false;
	export let noPositive = false;

	export let value: number;

	export let name: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;

	export let small = false;

	let current = value;

	$: valid =
		Number.isInteger(current) &&
		!(noNegatives && current < 0) &&
		!(noZero && current === 0) &&
		!(noPositive && current > 0);

	$: if (valid) {
		value = current;
	}
</script>

<Fieldset legend={label}>
	<input
		{name}
		type="number"
		{placeholder}
		class="input input-bordered w-full"
		class:input-xs={small}
		class:input-error={!valid}
		bind:value={current}
	/>
</Fieldset>
