<script lang="ts" generics="IsOptional extends boolean">
	import type { NumberWrapper } from '$lib/serde';
	import Fieldset from './fieldset.svelte';

	interface Props {
		value: NumberWrapper<IsOptional>;
		name: string;
		label: string;
		placeholder?: string;
	}

	let { value = $bindable(), name, label, placeholder }: Props = $props();

	let current = $derived(value.value);

	let valid = $derived(value.satisfiedBy(current));

	$effect(() => {
		if (valid) value.value = current;
	});
</script>

<Fieldset legend={label}>
	<input
		bind:value={current}
		{name}
		type="number"
		{placeholder}
		class={['input input-bordered w-full', !valid && 'input-error']}
		min={value.options.min}
		max={value.options.max}
		step={value.options.integer ? 1 : undefined}
	/>
</Fieldset>
