<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { calculateNode } from '$lib/macro/evaluate';
	import { parse } from '$lib/macro/parser';
	import Fieldset from './fieldset.svelte';

	const { c } = getChar();

	export let noNegatives = false;
	export let noZero = false;
	export let noPositive = false;
	export let optional = false;

	export let value: string;

	export let name: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;

	let current = value;

	$: parsed = calculateNode(parse(current), $c);

	$: valid =
		(!current && optional) ||
		(Number.isInteger(parsed) &&
			!(noNegatives && parsed < 0) &&
			!(noZero && parsed === 0) &&
			!(noPositive && parsed > 0));

	$: if (valid) {
		value = current;
	}
</script>

<Fieldset legend={label}>
	<input
		{name}
		{placeholder}
		class="input input-bordered w-full"
		class:input-error={!valid}
		bind:value={current}
	/>
</Fieldset>
