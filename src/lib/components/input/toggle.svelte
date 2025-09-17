<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	import Fieldset from '$lib/components/input/fieldset.svelte';

	interface Props {
		checked: boolean;
		name: string;
		label?: string;
		disabled?: boolean;
		onchange?: ChangeEventHandler<HTMLInputElement>;
	}

	let {
		checked = $bindable(),
		name,
		label,
		disabled,
		onchange,
	}: Props = $props();
</script>

<Fieldset>
	<label class="fieldset-label">
		<input
			{name}
			type="checkbox"
			bind:checked
			class="toggle"
			{onchange}
			{disabled}
		/>
		{label}
	</label>
</Fieldset>
