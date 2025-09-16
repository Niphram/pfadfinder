<script lang="ts" generics="IsOptional extends boolean">
	import { Macro } from '$lib/serde';
	import { computeMacroStyleWithError } from '$lib/text/macro-text-style';

	import Fieldset from '$lib/components/input/fieldset.svelte';
	import RichInput from '$lib/components/input/rich-input.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	interface Props {
		name: string;
		label: string;
		placeholder?: string | undefined;

		value: Macro<IsOptional>;

		ignoreValidation?: boolean;
	}

	let {
		name,
		label,
		placeholder = undefined,

		value = $bindable(),

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
</script>

<Fieldset legend={label} class="gap-y-0">
	<RichInput
		{name}
		bind:value={tempMacro.expr}
		class={[!validateResult.ok && 'input-error']}
		{placeholder}
		computeTextStyle={styleComputer}
	/>
	<div class="flex flex-row justify-between">
		{#if validateResult.ok}
			<p class="label">Evaluates to: {validateResult.value ?? '-'}</p>
		{:else}
			<p class="label text-error">{validateResult.error.message}</p>
		{/if}

		<div class="tooltip tooltip-left" data-tip="This input allows macro syntax">
			<span class="badge badge-xs">{tempMacro.options.optional ? 'Optional Macro' : 'Macro'}</span>
		</div>
	</div>
</Fieldset>
