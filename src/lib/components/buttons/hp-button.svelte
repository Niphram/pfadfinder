<script lang="ts">
	import Button from '$lib/atoms/button.svelte';
	import { getChar } from '$lib/data/context';

	const { c } = getChar();

	// TODO: Improve this so nonlethal-damage is somehow visible here
	// Also improve display of temporary hitpoints

	$: currentHp = $c.hp.current.eval($c) - $c.hp.nonlethalDamage;
</script>

<Button on:click class="flex h-full p-2" color="accent">
	<div class="flex flex-col justify-center text-center">
		<div class="text-xs">Hit Points</div>
		<div class="text-lg">
			{currentHp}/{$c.hp.max.eval($c)}
			{#if $c.hp.temp > 0}
				<span class="text-blue-500"> ({$c.hp.temp})</span>
			{/if}
		</div>
	</div>
</Button>
