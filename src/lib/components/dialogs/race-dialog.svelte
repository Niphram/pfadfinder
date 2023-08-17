<script lang="ts">
	import { ABILITY_KEYS, c } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';

	$title = 'Race';
</script>

<div class="flex flex-col gap-2">
	<div class="form-control w-full">
		<label for="raceName" class="label pb-0">
			<span class="label-text">Name</span>
		</label>
		<input
			name="raceName"
			placeholder="Race"
			class="input input-bordered w-full"
			bind:value={$c.race.name}
		/>
	</div>

	<div class="grid grid-cols-3 gap-2">
		{#each ABILITY_KEYS as key}
			<MacroInteger
				bind:value={$c.race[key].expr}
				name="race{key}"
				label={$t(`abilities.${key}.full`)}
				placeholder={$t(`abilities.${key}.short`)}
			/>
		{/each}
	</div>

	<MacroInteger
		bind:value={$c.race.speed.expr}
		name="raceSpeed"
		label="Speed"
		placeholder="Speed"
	/>
</div>
