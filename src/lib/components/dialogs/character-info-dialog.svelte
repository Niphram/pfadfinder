<script>
	import { c } from '$lib/state';
</script>

<h3>Character Details</h3>

<div class="form-control w-full">
	<label for="characterName" class="label">
		<span class="label-text">Name</span>
	</label>
	<input
		name="characterName"
		placeholder="Name"
		class="input input-bordered w-full"
		bind:value={$c.name}
	/>
</div>
