<script>
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import { getChar } from '$lib/data';

	import Number from '../input/number.svelte';
	import Toggle from '../input/toggle.svelte';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Conditions (work in progress)">
	<Toggle name="blinded" label="Blinded" bind:checked={c.conditions.blinded} />

	<Toggle
		name="cowering"
		label="Cowering"
		bind:checked={c.conditions.cowering}
	/>

	<Toggle name="dazzled" label="Dazzled" bind:checked={c.conditions.dazzled} />

	<Number
		name="negative_levels"
		label="Negativ Levels/Energy Drain"
		value={c.conditions.$.negative_levels}
	/>
</DialogBase>
