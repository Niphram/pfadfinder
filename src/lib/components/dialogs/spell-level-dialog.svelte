<script lang="ts">
	import { c } from '$lib/data';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';

	title.set('Spells Config');

	const LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
</script>

<div>
	{#each LEVELS as level}
		<div class="divider">Level {level}</div>
		<div class="flex flex-row gap-1">
			<Integer bind:value={$c.spells[level].known} label="Known" name="known" noNegatives />
			<Integer bind:value={$c.spells[level].perDay} label="Per Day" name="perDay" noNegatives />
			<Integer
				bind:value={$c.spells[level].perDayBonus}
				label="Bonus"
				name="perDayBonus"
				noNegatives
			/>
		</div>
	{/each}
</div>
