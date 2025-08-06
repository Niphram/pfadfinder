<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	import Button from '$lib/atoms/button.svelte';
	import { getChar } from '$lib/data/context';

	const { c } = $derived(getChar());

	interface Props {
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}

	let { onclick }: Props = $props();

	// TODO: Improve this so nonlethal-damage is somehow visible here
	// Also improve display of temporary hitpoints

	let currentHp = $derived(c.hp.current - c.hp.nonlethalDamage);
</script>

<Button {onclick} class="flex h-full p-2" color="accent">
	<div class="flex flex-col justify-center text-center">
		<div class="text-xs">Hit Points</div>
		<div class="text-lg">
			{currentHp}/{c.hp.max}
			{#if c.hp.temp > 0}
				<span class="text-blue-500"> ({c.hp.temp})</span>
			{/if}
		</div>
	</div>
</Button>
