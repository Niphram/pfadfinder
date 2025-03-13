<script lang="ts">
	import Fieldset from './fieldset.svelte';

	export let value: string;

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
</script>

<Fieldset legend={label}>
	<input {name} {placeholder} class="input input-bordered w-full" bind:value />
</Fieldset>
