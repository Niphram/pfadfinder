<script>
	import { c } from '$lib/data';
	import { title } from '../dialog.svelte';

	$title = 'Character Details';
</script>

<div class="form-control w-full">
	<label for="characterName" class="label pb-0">
		<span class="label-text">Name</span>
	</label>
	<input
		name="characterName"
		placeholder="Name"
		class="input input-bordered w-full"
		bind:value={$c.name}
	/>
</div>
