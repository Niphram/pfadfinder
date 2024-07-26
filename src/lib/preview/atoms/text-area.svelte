<script lang="ts">
	export let value: string;

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	export let rows = 10;

	export let resize: 'none' | 'horizontal' | 'vertical' | 'both' = 'none';
</script>

<div class="form-control w-full">
	{#if label}
		<label for={name} class="label pb-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<textarea
		{name}
		{placeholder}
		class="textarea textarea-bordered w-full"
		style:resize
		{rows}
		bind:value
	/>
</div>
