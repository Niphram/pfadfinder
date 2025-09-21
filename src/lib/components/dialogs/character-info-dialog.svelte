<script>
	import DialogBase from '$lib/atoms/dialog-base.svelte';

	import Input from '$lib/components/input/input.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Character Details">
	<Input
		name="characterName"
		label="Name"
		placeholder="Name"
		value={c.$.name}
	/>
</DialogBase>
