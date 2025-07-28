<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { evalNode } from '$lib/macro/evaluate';
	import { Parser } from '$lib/macro/parser';
	import { computeMacroStyle } from '$lib/text/macro-text-style';
	import Fieldset from './fieldset.svelte';
	import RichInput from './rich-input.svelte';

	const { c } = getChar();

	interface Props {
		noNegatives?: boolean;
		noZero?: boolean;
		noPositive?: boolean;
		optional?: boolean;
		value: string;
		name: string;
		label: string;
		placeholder?: string | undefined;
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
	}: Props = $props();

	let current = $state(value);
	let parsed = $derived(evalNode(Parser.parse(current), $c));

	let valid = $derived(
		(!current && optional) ||
			(Number.isInteger(parsed) &&
				!(noNegatives && parsed < 0) &&
				!(noZero && parsed === 0) &&
				!(noPositive && parsed > 0)),
	);

	$effect.pre(() => {
		if (valid) {
			value = current;
		}
	});
</script>

<Fieldset legend={label}>
	<RichInput
		{name}
		bind:value={current}
		class={[!valid && 'input-error']}
		{placeholder}
		computeTextStyle={computeMacroStyle}
	/>
</Fieldset>
