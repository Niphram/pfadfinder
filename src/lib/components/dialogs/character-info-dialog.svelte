<script>
	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Character Details';
</script>

<Input name="characterName" label="Name" placeholder="Name" bind:value={c.name} />
