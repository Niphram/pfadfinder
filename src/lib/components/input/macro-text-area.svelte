<script lang="ts">
	import type { StringWrapper } from '$lib/serde';
	import { computeMacroInTextStyle } from '$lib/text/macro-text-style';

	import InputWrapper from '$lib/atoms/input-wrapper.svelte';
	import RichTextArea from '$lib/atoms/rich-text-area.svelte';

	interface Props {
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		rows?: number;

		// Not bindable, uses internal mutation
		value: StringWrapper<string>;
	}

	let { value, name, label, placeholder, rows = 10 }: Props = $props();

	const tempString = $derived(value.clone());

	// TODO: Validate macros in text and show errors
	const result = $derived(tempString.result());

	$effect.pre(() => {
		if (result.ok) {
			value.value = result.value;
		}
	});

	const hint = $derived(
		[value.options.minLength === 0 && 'optional', 'macro-text'].filter(Boolean).join(' '),
	);

	const feedback = $derived({
		feedback: result.error,
		feedbackClass: result.ok ? 'hidden' : 'text-error',
	});
</script>

<InputWrapper legend={label} {hint} {...feedback}>
	<RichTextArea
		{name}
		{placeholder}
		{rows}
		class={[!result.ok && 'input-error']}
		computeTextStyle={computeMacroInTextStyle}
		bind:value={tempString.value}
	/>
</InputWrapper>
