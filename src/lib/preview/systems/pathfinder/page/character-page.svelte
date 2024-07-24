<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { Class, type PathfinderCharacter } from '../data';

	export let c: Writable<PathfinderCharacter>;

	function addClass() {
		$c.classes.list.push(new Class());
		$c = $c;
	}
</script>

<div class="flex flex-col gap-4">
	<div class="divider">Race</div>

	<div class="divider">Classes</div>

	<button class="btn btn-warning" on:click={addClass}>Todo</button>
</div>
