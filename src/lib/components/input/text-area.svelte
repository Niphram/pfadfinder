<script lang="ts">
	import type { StringWrapper } from '$lib/serde';

	import InputWrapper from '$lib/atoms/input-wrapper.svelte';

	interface Props {
		name: string;
		label?: string;
		placeholder?: string;
		rows?: number;

		// Not bindable, uses internal mutation
		value: StringWrapper<string>;
	}

	let { value, name, label, placeholder, rows = 10 }: Props = $props();

	const tempString = $derived(value.clone());

	const result = $derived(tempString.result());

	$effect.pre(() => {
		if (result.ok) {
			value.value = result.value;
		}
	});

	const hint = $derived(
		[value.options.minLength === 0 && 'optional', 'text']
			.filter(Boolean)
			.join(' '),
	);

	const feedback = $derived({
		feedback: result.error,
		feedbackClass: result.ok ? 'hidden' : 'text-error',
	});
</script>

<InputWrapper legend={label} {hint} {...feedback}>
	<textarea
		{name}
		{placeholder}
		{rows}
		class={[
			'textarea textarea-bordered w-full resize-none',
			!result.ok && 'input-error',
		]}
		bind:value={tempString.value}
	></textarea>
</InputWrapper>
