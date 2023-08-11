<script lang="ts">
	export let value: string;

	export let name: string;
	export let label: string;
	export let placeholder: string | undefined = undefined;

	export let rows = 3;
</script>

<div class="form-control w-full">
	<label for={name} class="label">
		<span class="label-text">{label}</span>
	</label>
	<textarea {name} {placeholder} class="textarea textarea-bordered w-full" {rows} bind:value />
</div>
