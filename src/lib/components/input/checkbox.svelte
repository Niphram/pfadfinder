<script lang="ts">
	import type { ChangeEventHandler, ClassValue } from 'svelte/elements';

	import Fieldset from './fieldset.svelte';

	interface Props {
		checked: boolean;
		name: string;
		label?: string | undefined;
		class?: ClassValue | undefined;
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
