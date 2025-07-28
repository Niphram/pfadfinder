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
		small?: boolean;
	}

	let {
		noNegatives,
		noZero,
		noPositive,
		value = $bindable(),
		name,
		label,
		placeholder,
		small,
	}: Props = $props();

	let current = $state(value);

	let valid = $derived(
		Number.isInteger(current) &&
			!(noNegatives && current < 0) &&
			!(noZero && current === 0) &&
			!(noPositive && current > 0),
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
		class:input-xs={small}
		class:input-error={!valid}
		bind:value={current}
	/>
</Fieldset>
