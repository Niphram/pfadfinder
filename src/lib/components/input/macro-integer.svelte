<script lang="ts">
	import { getChar } from '$lib/data/context';
	import type { RuntimeError } from '$lib/macro/errors';
	import { macro } from '$lib/serde';
	import { computeMacroStyleWithError } from '$lib/text/macro-text-style';
	import { Err, Ok, type Result } from '$lib/utils';

	import Fieldset from './fieldset.svelte';
	import RichInput from './rich-input.svelte';

	const { c } = $derived(getChar());

	interface Props {
		noNegatives?: boolean;
		noZero?: boolean;
		noPositive?: boolean;
		optional?: boolean;
		value: string;
		name: string;
		label: string;
		placeholder?: string | undefined;

		// When set, will always update bound value even when validation fails
		alwaysCommit?: boolean;
	}

	let {
		noNegatives = false,
		noZero = false,
		noPositive = false,
		optional = false,
		value = $bindable(),
		name,
		label,
		placeholder = undefined,

		alwaysCommit: noValidation,
	}: Props = $props();

	const tempMacro = $derived(macro(value));

	const evalResult: Result<number, RuntimeError> = $derived.by(() => {
		if (optional && !tempMacro.expr) return Ok(NaN);
		return tempMacro.evalE(c);
	});
	const styleComputer = $derived(computeMacroStyleWithError(evalResult.error));

	// TODO: Move this stuff into the macro itself so we can define validation inside the character
	const validateResult = $derived.by(() => {
		if (!tempMacro.expr) {
			if (optional) return Ok('empty value');
			else return Err('Input can not be empty');
		}

		if (!evalResult.ok) return Err(evalResult.error.message);

		if (!Number.isInteger(evalResult.value))
			return Err(`Result is not an integer (value is ${evalResult.value})`);
		if (noNegatives && evalResult.value < 0) return Err('Result can not be negative');
		if (noZero && evalResult.value === 0) return Err('Result can not be zero');
		if (noPositive && evalResult.value > 0) return Err('Result can not be positive');

		return Ok(evalResult.value);
	});

	$effect.pre(() => {
		if (noValidation || validateResult.ok) {
			value = tempMacro.expr;
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
			<p class="label">Evaluates to: {validateResult.value}</p>
		{:else}
			<p class="label text-error">{validateResult.error}</p>
		{/if}

		<div class="tooltip tooltip-left" data-tip="This input allows macro syntax">
			<span class="badge badge-xs">{optional ? 'Optional Macro' : 'Macro'}</span>
		</div>
	</div>
</Fieldset>
