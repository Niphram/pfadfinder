<script lang="ts">
	import type { StringWrapper } from '$lib/serde';
	import { computeMacroInTextStyle } from '$lib/text/macro-text-style';

	import InputWrapper from '$lib/atoms/input-wrapper.svelte';
	import RichInput from '$lib/atoms/rich-input.svelte';

	interface Props {
		name: string;
		label: string;
		placeholder?: string;

		// Not bindable, uses internal mutation
		value: StringWrapper<string>;
	}

	let { name, label, placeholder, value }: Props = $props();

	const tempString = $derived(value.clone());

	// TODO: Validate macros in text and show errors
	const result = $derived(tempString.result());

	$effect.pre(() => {
		if (result.ok) {
			value.value = result.value;
		}
	});

	const hint = $derived(
		[value.options.minLength === 0 && 'optional', 'macro-text']
			.filter(Boolean)
			.join(' '),
	);

	const feedback = $derived({
		feedback: result.error,
		feedbackClass: result.ok ? 'hidden' : 'text-error',
	});
</script>

<InputWrapper legend={label} {hint} {...feedback}>
	<RichInput
		{name}
		{placeholder}
		class={[!result.ok && 'input-error']}
		computeTextStyle={computeMacroInTextStyle}
		bind:value={tempString.value}
	/>
</InputWrapper>
