<script lang="ts">
	import { t } from '$lib/i18n';
	import { abilityKeys, c, type SaveKey } from '$lib/state';

	export let key: SaveKey = 'fort';
</script>

<h3 class="text-lg font-bold">{$t(`saves.${key}.full`)}</h3>

<div class="form-control w-full">
	<label for="saveBaseAbility" class="label">
		<span class="label-text">Base Ability</span>
	</label>
	<select
		name="saveBaseAbility"
		class="select select-bordered w-full"
		bind:value={$c.saves[key].ability}
	>
		{#each abilityKeys as key}
			<option value={key}>{$t(`abilities.${key}.full`)}</option>
		{/each}
	</select>
</div>
<div class="form-control w-full max-w-xs">
	<label for="saveMisc" class="label">
		<span class="label-text">Misc</span>
	</label>
	<input
		name="saveMisc"
		type="number"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		bind:value={$c.saves[key].misc}
	/>
</div>
<div class="form-control w-full max-w-xs">
	<label for="saveTempMod" class="label">
		<span class="label-text">Temp Mod</span>
	</label>
	<input
		name="saveTempMod"
		type="number"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		bind:value={$c.saves[key].tempMod}
	/>
</div>
