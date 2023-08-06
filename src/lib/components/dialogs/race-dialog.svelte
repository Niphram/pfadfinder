<script lang="ts">
	import { t } from '$lib/i18n';
	import { abilityKeys, c } from '$lib/state';
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
			<div class="form-control w-full">
				<label for="race{key}" class="label">
					<span class="label-text">{$t(`abilities.${key}.full`)}</span>
				</label>
				<input
					name="race{key}"
					type="number"
					placeholder={$t(`abilities.${key}.short`)}
					class="input input-bordered w-full"
					bind:value={$c.race.abilities[key]}
				/>
			</div>
		{/each}
	</div>

	<div class="form-control w-full">
		<label for="raceSpeed" class="label">
			<span class="label-text">Speed</span>
		</label>
		<input
			name="raceSpeed"
			type="number"
			placeholder="Speed"
			class="input input-bordered w-full"
			bind:value={$c.race.speed}
		/>
	</div>
</div>
