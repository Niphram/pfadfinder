<script lang="ts">
	import Fieldset from './fieldset.svelte';

	interface Props {
		noNegatives?: boolean;
		noZero?: boolean;
		noPositive?: boolean;
		value: number;
		name: string;
		label: string;
		placeholder?: string | undefined;
		step?: number;
	}

	let {
		noNegatives = false,
		noZero = false,
		noPositive = false,
		value = $bindable(),
		name,
		label,
		placeholder = undefined,
		step = 0.001,
	}: Props = $props();

	let current = $state(value);

	let valid = $derived(
		!(noNegatives && current < 0) && !(noZero && current === 0) && !(noPositive && current > 0),
	);

	$effect.pre(() => {
		if (valid) {
			value = current;
		}
	});
</script>

<Fieldset legend={label}>
	<input
		{name}
		type="number"
		{placeholder}
		class="input input-bordered w-full"
		class:input-error={!valid}
		bind:value={current}
		{step}
	/>
</Fieldset>
