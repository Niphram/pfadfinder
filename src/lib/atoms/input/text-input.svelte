<script lang="ts">
	export let name: string;

	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	let className: string = '';
	export { className as class };

	export let value: string;
</script>

<div class="form-control w-full {className}">
	{#if label}
		<label for={name} class="label pb-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input id={name} {name} {placeholder} class="input input-bordered w-full" bind:value />
</div>
