<script lang="ts" context="module">
	// Needed to satisfy eslint
	type V = unknown;
	type T = unknown;
</script>

<script lang="ts" generics="V, T">
	export let name: string;

	export let label: string | undefined = undefined;

	export let options: readonly T[] = [];

	export let error = false;

	export let value: V;
</script>

<div class="form-control w-full">
	{#if label}
		<label for={name} class="label pb-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<select {name} class="select select-bordered w-full" class:select-error={error} bind:value>
		<slot name="once" />

		{#each options as option (option)}
			<slot {option} />
		{/each}
	</select>
</div>
