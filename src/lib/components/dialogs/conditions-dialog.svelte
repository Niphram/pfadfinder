<script>
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import { getChar } from '$lib/data';

	import Toggle from '../input/toggle.svelte';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Conditions (work in progress)">
	<Toggle name="blinded" label="Blinded" bind:checked={c.conditions.blinded} />
</DialogBase>
