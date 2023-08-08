<script lang="ts">
	import { t } from '$lib/i18n';
	import { c, type AbilityKey } from '$lib/state';
	import Integer from '../input/integer.svelte';

	export let key: AbilityKey = 'str';
</script>

<h3 class="text-lg font-bold">{$t(`abilities.${key}.full`)}</h3>

<Integer bind:value={$c[key].base} name="abilityBase" label="Base Ability Score" noNegatives />
<Integer bind:value={$c[key].bonus} name="abilityBonus" label="Temp" />

<div class="form-control w-full max-w-xs">
	<label for="abilityNotes" class="label">
		<span class="label-text">Notes</span>
	</label>
	<textarea
		name="abilityNotes"
		placeholder="Enter Notes"
		class="textarea textarea-bordered w-full max-w-xs"
		rows="3"
		bind:value={$c[key].notes}
	/>
</div>
