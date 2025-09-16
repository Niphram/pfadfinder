<script lang="ts">
	import Fieldset from '$lib/components/input/fieldset.svelte';

	interface Props {
		value: string;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
	}

	let { value = $bindable(), name, label, placeholder }: Props = $props();
</script>

<Fieldset legend={label}>
	<input {name} {placeholder} class="input input-bordered w-full" bind:value />
</Fieldset>
