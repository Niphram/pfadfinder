<script lang="ts">
	import { nanoid } from 'nanoid';

	export let value: number;
	export let max: number;

	const name = nanoid();

	function onClick(idx: number) {
		if (idx === value) {
			value--;
		} else {
			value = idx;
		}
	}
</script>

<div class="rating rating-lg w-min gap-1">
	{#key max}
		{#each { length: max + 1 } as _, idx (idx)}
			<input
				{name}
				type="radio"
				class="mask mask-parallelogram bg-accent"
				class:hidden={idx === 0}
				checked={idx === value}
				on:click={() => onClick(idx)}
			/>
		{/each}
	{/key}
</div>
