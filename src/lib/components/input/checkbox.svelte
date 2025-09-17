<script lang="ts">
	import type { ChangeEventHandler, ClassValue } from 'svelte/elements';

	import Fieldset from '$lib/components/input/fieldset.svelte';

	interface Props {
		checked: boolean;
		name: string;
		label?: string;
		class?: ClassValue;
		disabled?: boolean;
		onchange?: ChangeEventHandler<HTMLInputElement>;
	}

	let {
		checked = $bindable(),
		name,
		label,
		class: classname,
		disabled,
		onchange,
	}: Props = $props();
</script>

<Fieldset legend={label} class={classname}>
	<input {name} type="checkbox" bind:checked class="checkbox checkbox-xl" {onchange} {disabled} />
</Fieldset>
