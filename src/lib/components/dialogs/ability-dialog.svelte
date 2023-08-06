<script lang="ts">
	import { t } from '$lib/i18n';
	import { c, type AbilityKey } from '$lib/state';

	export let key: AbilityKey = 'str';
</script>

<h3 class="text-lg font-bold">{$t(`abilities.${key}.full`)}</h3>

<div class="form-control w-full max-w-xs">
	<label for="abilityBase" class="label">
		<span class="label-text">Base Ability Score</span>
	</label>
	<input
		name="abilityBase"
		type="number"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		bind:value={$c.abilities[key].base}
	/>
</div>
<div class="form-control w-full max-w-xs">
	<label for="abilityBonus" class="label">
		<span class="label-text">Temp</span>
	</label>
	<input
		name="abilityBonus"
		type="number"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		bind:value={$c.abilities[key].temp}
	/>
</div>
<div class="form-control w-full max-w-xs">
	<label for="abilityNotes" class="label">
		<span class="label-text">Notes</span>
	</label>
	<textarea
		name="abilityNotes"
		placeholder="Enter Notes"
		class="textarea textarea-bordered w-full max-w-xs"
		rows="3"
		bind:value={$c.abilities[key].notes}
	/>
</div>
