<script lang="ts">
	export let id: string;
	export let checked: boolean;
</script>

<div class="form-control {$$props.class}">
	<label class="label cursor-pointer py-0">
		<span class="label-text"><slot /></span>
		<input {id} type="checkbox" class="toggle" bind:checked />
	</label>
</div>
