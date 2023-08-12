<script lang="ts">
	import { t } from '$lib/i18n';
	import { abilityKeys, c } from '$lib/state';
	import MacroInteger from '../input/macro-integer.svelte';
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-lg font-bold">Race</h3>

	<div class="form-control w-full">
		<label for="raceName" class="label">
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
		{#each abilityKeys as key}
			<MacroInteger
				bind:value={$c.race[key]}
				name="race{key}"
				label={$t(`abilities.${key}.full`)}
				placeholder={$t(`abilities.${key}.short`)}
			/>
		{/each}
	</div>

	<MacroInteger bind:value={$c.race.speed} name="raceSpeed" label="Speed" placeholder="Speed" />
</div>
