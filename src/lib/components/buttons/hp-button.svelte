<script lang="ts">
	import Button from '$lib/atoms/button.svelte';
	import { getChar } from '$lib/data/context';

	const { c } = getChar();
</script>

<Button on:click class="flex h-full p-2" color="accent">
	<div class="flex flex-col justify-center text-center">
		<div class="text-xs">Hit Points</div>
		<div class="text-lg">
			{$c.hp.current}/{$c.hp.max}
			{#if $c.hp.temp > 0}
				<span class="text-blue-500"> ({$c.hp.temp})</span>
			{/if}
		</div>
	</div>
</Button>
