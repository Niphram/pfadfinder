<script lang="ts" context="module">
	// Needed to satisfy eslint
	type V = unknown;
	type T = unknown;
</script>

<script lang="ts" generics="V, T">
	export let name: string;

	export let label: string | undefined = undefined;

	let className: string = '';
	export { className as class };

	export let value: V;
	export let options: readonly T[] = [];

	const SIZES = {
		xs: 'select-xs',
		sm: 'select-sm',
		md: 'select-md',
		lg: 'select-lg',
		xl: 'select-xl'
	};

	export let size: keyof typeof SIZES = 'md';
</script>

<label for={name} class="form-control w-full {className}">
	{#if label}
		<div class="label">
			<span class="label-text">{label}</span>
		</div>
	{/if}
	<select id={name} {name} class="select select-bordered {SIZES[size]}" bind:value>
		{#each options as option (option)}
			<slot {option} />
		{/each}
	</select>
</label>
