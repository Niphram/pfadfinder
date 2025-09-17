<script lang="ts" module>
	const SIZES = {
		small: 'select-sm',
		medium: 'select-md',
		large: 'select-lg',
	};
</script>

<script lang="ts" generics="V, T">
	import type { Snippet } from 'svelte';

	import InputWrapper from '$lib/atoms/input-wrapper.svelte';

	interface Props {
		name: string;
		label?: string;
		options?: readonly T[];
		noneOption?: string;
		value: V;
		size?: keyof typeof SIZES;
		children?: Snippet<[{ option: T }]>;
	}

	let {
		name,
		label,
		options = [],
		noneOption,
		value = $bindable(),
		size = 'medium',
		children,
	}: Props = $props();
</script>

<InputWrapper legend={label} hint="select">
	<select {name} class={['select w-full', SIZES[size]]} bind:value>
		{#if noneOption}
			<option value={undefined}>{noneOption}</option>
		{/if}
		{#each options as option (option)}
			{@render children?.({ option })}
		{/each}
	</select>
</InputWrapper>
