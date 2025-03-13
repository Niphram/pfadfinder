<script lang="ts">
	import Fieldset from './fieldset.svelte';

	export let checked: boolean;

	export let name: string;
	export let label: string | undefined = undefined;

	export let disabled: boolean = false;
</script>

<Fieldset>
	<label class="fieldset-label">
		<input {name} type="checkbox" bind:checked class="toggle" on:change {disabled} />
		{label}
	</label>
</Fieldset>
