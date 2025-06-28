<script lang="ts">
	import { type AbilityKey } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';

	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

	const { c } = getChar();

	export let key: AbilityKey = 'str';

	$title = $t(`abilities.${key}.full`);
</script>

<MacroInteger
	bind:value={$c[key].base.expr}
	name="abilityBase"
	label="Base Ability Score"
	noNegatives
/>
<MacroInteger bind:value={$c[key].bonus.expr} name="abilityBonus" label="Bonus" />
<MacroInteger bind:value={$c[key].temp.expr} name="abilityTemp" label="Temp" />
<Integer bind:value={$c[key].damage} name="abilityDamage" label="Damage" noNegatives />

<MacroTextArea
	bind:value={$c[key].notes}
	label="Notes"
	name="abilityNotes"
	placeholder="Enter Notes"
	rows={10}
/>
