<script lang="ts" context="module">
	// Needed to satisfy eslint
	type V = unknown;
	type T = unknown;

	const SIZES = {
		small: 'select-sm',
		medium: 'select-md',
		large: 'select-lg',
	};
</script>

<script lang="ts" generics="V, T">
	import Fieldset from './fieldset.svelte';

	export let name: string;

	export let label: string | undefined = undefined;

	export let options: readonly T[] = [];

	export let noneOption: string | undefined = undefined;

	export let value: V;

	export let size: keyof typeof SIZES = 'medium';
</script>

<Fieldset legend={label}>
	<select {name} class={['select w-full', SIZES[size]]} bind:value>
		{#if noneOption}
			<option value={undefined}>{noneOption}</option>
		{/if}
		{#each options as option (option)}
			<slot {option} />
		{/each}
	</select>
</Fieldset>
