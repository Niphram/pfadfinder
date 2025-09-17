<script lang="ts" generics="IsOptional extends boolean">
	import { Macro } from '$lib/serde';
	import { computeMacroStyleWithError } from '$lib/text/macro-text-style';

	import InputWrapper from '$lib/atoms/input-wrapper.svelte';
	import RichInput from '$lib/atoms/rich-input.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	interface Props {
		name: string;
		label: string;
		placeholder?: string;

		value: Macro<IsOptional>;

		ignoreValidation?: boolean;
	}

	let {
		name,
		label,
		placeholder,

		// Not bindable, uses internal mutation
		value,

		ignoreValidation,
	}: Props = $props();

	const tempMacro = $derived(value.clone());

	const validateResult = $derived(tempMacro.result(c));
	const styleComputer = $derived(computeMacroStyleWithError(validateResult.error));

	$effect.pre(() => {
		if (ignoreValidation || validateResult.ok) {
			value.expr = tempMacro.expr;
		}
	});

	const hint = $derived(
		[value.options.optional && 'optional', 'macro', value.options.integer ? 'integer' : 'number']
			.filter(Boolean)
			.join(' '),
	);

	const feedback = $derived(
		validateResult.ok ?
			{
				feedback: `Evaluates to: ${validateResult.value ?? '-'}`,
				feedbackClass: '',
			}
		:	{
				feedback: validateResult.error.message,
				feedbackClass: 'text-error',
			},
	);
</script>

<InputWrapper legend={label} {hint} {...feedback}>
	<RichInput
		{name}
		bind:value={tempMacro.expr}
		class={[!validateResult.ok && 'input-error']}
		{placeholder}
		computeTextStyle={styleComputer}
	/>
</InputWrapper>
