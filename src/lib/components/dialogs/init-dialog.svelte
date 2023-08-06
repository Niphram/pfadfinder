<script lang="ts">
	import { c } from '$lib/state/character';
</script>

<h3 class="text-lg font-bold">Initiative</h3>

<div class="form-control w-full max-w-xs">
	<label for="initMisc" class="label">
		<span class="label-text">Misc</span>
	</label>
	<input
		name="initMisc"
		type="number"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		bind:value={$c.initMisc}
	/>
</div>
