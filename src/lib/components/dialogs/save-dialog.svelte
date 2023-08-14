<script lang="ts">
	import { ABILITY_KEYS, c, type SaveKey } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import TextArea from '../input/text-area.svelte';

	export let key: SaveKey = 'fort';

	$title = $t(`saves.${key}.full`);
</script>

<div class="form-control w-full">
	<label for="saveBaseAbility" class="label pb-0">
		<span class="label-text">Base Ability</span>
	</label>
	<select name="saveBaseAbility" class="select select-bordered w-full" bind:value={$c[key].ability}>
		{#each ABILITY_KEYS as key}
			<option value={key}>{$t(`abilities.${key}.full`)}</option>
		{/each}
	</select>
</div>

<MacroInteger bind:value={$c[key].misc} name="saveMisc" label="Misc" />
<MacroInteger bind:value={$c[key].bonus} name="saveBonus" label="Temp Mod" />

<TextArea bind:value={$c[key].notes} name="saveNotes" label="Notes" placeholder="Notes" />
