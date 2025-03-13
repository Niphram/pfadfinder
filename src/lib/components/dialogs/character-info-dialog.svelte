<script>
	import { c } from '$lib/data';
	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';

	$title = 'Character Details';
</script>

<Input name="characterName" label="Name" placeholder="Name" bind:value={$c.name} />
