<script lang="ts">
	import Fieldset from './fieldset.svelte';

	export let value: string;

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	export let rows = 10;
</script>

<Fieldset legend={label}>
	<textarea
		{name}
		{placeholder}
		class="textarea textarea-bordered w-full resize-none"
		{rows}
		bind:value
	></textarea>
</Fieldset>
