<script lang="ts">
	export let value: string;

	export let name: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;
</script>

<div class="form-control w-full">
	<label for={name} class="label pb-0">
		<span class="label-text">{label}</span>
	</label>
	<input {name} {placeholder} class="input input-bordered w-full" bind:value />
</div>
