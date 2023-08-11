<script lang="ts">
	import { t } from '$lib/i18n';
	import { abilityKeys, c, type SaveKey } from '$lib/state';
	import Integer from '../input/integer.svelte';
	import TextArea from '../input/text-area.svelte';

	export let key: SaveKey = 'fort';
</script>

<h3 class="text-lg font-bold">{$t(`saves.${key}.full`)}</h3>

<div class="form-control w-full">
	<label for="saveBaseAbility" class="label">
		<span class="label-text">Base Ability</span>
	</label>
	<select name="saveBaseAbility" class="select select-bordered w-full" bind:value={$c[key].ability}>
		{#each abilityKeys as key}
			<option value={key}>{$t(`abilities.${key}.full`)}</option>
		{/each}
	</select>
</div>

<Integer bind:value={$c[key].misc} name="saveMisc" label="Misc" />
<Integer bind:value={$c[key].bonus} name="saveBonus" label="Temp Mod" />

<TextArea bind:value={$c[key].notes} name="saveNotes" label="Notes" placeholder="Notes" />
