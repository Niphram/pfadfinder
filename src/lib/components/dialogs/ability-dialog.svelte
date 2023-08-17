<script lang="ts">
	import { c, type AbilityKey } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';

	export let key: AbilityKey = 'str';

	$title = $t(`abilities.${key}.full`);
</script>

<MacroInteger
	bind:value={$c[key].base.expr}
	name="abilityBase"
	label="Base Ability Score"
	noNegatives
/>
<MacroInteger bind:value={$c[key].bonus.expr} name="abilityBonus" label="Temp" />

<div class="form-control w-full max-w-xs">
	<label for="abilityNotes" class="label pb-0">
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
