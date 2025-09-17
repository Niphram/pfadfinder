<script lang="ts" generics="IsOptional extends boolean">
	import type { NumberWrapper } from '$lib/serde';

	import InputWrapper from '$lib/atoms/input-wrapper.svelte';

	interface Props {
		name: string;
		label: string;
		placeholder?: string;

		// Not bindable, uses internal mutation
		value: NumberWrapper<IsOptional>;
	}

	let { name, label, placeholder, value }: Props = $props();

	const tempNumber = $derived(value.clone());

	const result = $derived(tempNumber.result());

	$effect.pre(() => {
		if (result.ok) {
			value.value = result.value;
		}
	});

	const hint = $derived(
		[value.options.optional && 'optional', value.options.integer ? 'integer' : 'number']
			.filter(Boolean)
			.join(' '),
	);

	const feedback = $derived({
		feedback: result.error,
		feedbackClass: result.ok ? 'hidden' : 'text-error',
	});
</script>

<InputWrapper legend={label} {hint} {...feedback}>
	<input
		{name}
		type="number"
		{placeholder}
		class={['input input-bordered w-full', !result.ok && 'input-error']}
		bind:value={tempNumber.value}
		min={value.options.min}
		max={value.options.max}
		step={value.options.integer ? 1 : 0.001}
		required={!value.options.optional}
	/>
</InputWrapper>
