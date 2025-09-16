<script lang="ts">
	import Fieldset from '$lib/components/input/fieldset.svelte';

	interface Props {
		value: string;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		rows?: number;
	}

	let { value = $bindable(), name, label, placeholder, rows = 10 }: Props = $props();
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
