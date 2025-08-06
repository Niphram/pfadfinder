<script>
	import { getChar } from '$lib/data/context';
	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';

	const { c } = $derived(getChar());

	$title = 'Character Details';
</script>

<Input name="characterName" label="Name" placeholder="Name" bind:value={c.name} />
