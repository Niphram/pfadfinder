<script
	lang="ts"
	generics="Values extends readonly (string|number)[], IsOptional extends boolean"
>
	import type { ClassValue } from 'svelte/elements';

	import type { EnumWrapper } from '$lib/serde';
	import type { Option } from '$lib/serde/optional';

	import InputWrapper from '$lib/atoms/input-wrapper.svelte';

	interface Props {
		name: string;
		label?: string;

		translate?: (value: Option<Values[number], IsOptional>) => string;

		class?: ClassValue;

		// Not bindable, uses internal mutation
		value: EnumWrapper<Values, IsOptional>;
	}

	let {
		name,
		label,

		translate,

		class: className,

		value = $bindable(),
	}: Props = $props();

	const tempEnum = $derived(value.clone());

	const result = $derived(tempEnum.result());

	$effect.pre(() => {
		if (result.ok) {
			value.value = result.value;
		}
	});

	const hint = 'select';

	const feedback = $derived({
		feedback: result.error,
		feedbackClass: result.ok ? 'hidden' : 'text-error',
	});
</script>

<InputWrapper legend={label} {hint} {...feedback}>
	<select
		{name}
		class={['select w-full appearance-none', className]}
		bind:value={tempEnum.value}
	>
		{#if value.options.optional}
			<option value={null}
				>{translate?.(null as Option<Values[number], IsOptional>) ??
					'-'}</option
			>
		{/if}
		{#each value.values as option (option)}
			<option value={option}>{translate?.(option) ?? `${option}`}</option>
		{/each}
	</select>
</InputWrapper>
