<script lang="ts">
	export let name: string;

	export let label: string;
	export let placeholder: string | undefined = undefined;

	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;

	let className: string = '';
	export { className as class };

	export let value: number;
</script>

<div class="form-control w-full {className}">
	{#if label}
		<label for={name} class="label py-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		id={name}
		{name}
		{placeholder}
		type="number"
		class="input input-bordered w-full"
		step={step ?? 'any'}
		{min}
		{max}
		required
		bind:value
	/>
</div>
