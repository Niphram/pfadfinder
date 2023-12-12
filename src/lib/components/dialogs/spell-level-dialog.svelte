<script lang="ts">
	import { SPELL_LEVELS, c } from '$lib/data';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';

	title.set('Spells Config');
</script>

<div>
	{#each SPELL_LEVELS as level}
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
