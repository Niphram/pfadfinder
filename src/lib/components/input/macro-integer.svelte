<script lang="ts">
	import { c } from '$lib/data';
	import { calculateNode } from '$lib/macro/evaluate';
	import { parse } from '$lib/macro/parser';

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

<div class="form-control w-full">
	<label for={name} class="label pb-0">
		<span class="label-text">{label}</span>
	</label>
	<input
		{name}
		{placeholder}
		class="input input-bordered w-full"
		class:input-error={!valid}
		bind:value={current}
	/>
</div>
