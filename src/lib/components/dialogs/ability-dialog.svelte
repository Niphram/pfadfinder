<script lang="ts">
	import { Ability } from '$lib/data';
	import { t } from '$lib/i18n';
	import type { SerdeProxy } from '$lib/serde/proxy';

	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

	interface Props {
		ability: SerdeProxy<Ability>;
	}

	let { ability }: Props = $props();

	$title = $t(`abilities.${ability.key}.full`);
</script>

<MacroInteger
	bind:value={ability.$base.expr}
	name="abilityBase"
	label="Base Ability Score"
	noNegatives
/>
<MacroInteger bind:value={ability.$bonus.expr} name="abilityBonus" label="Bonus" />
<MacroInteger bind:value={ability.$temp.expr} name="abilityTemp" label="Temp" />
<Integer bind:value={ability.damage} name="abilityDamage" label="Damage" noNegatives />

<MacroTextArea
	bind:value={ability.notes}
	label="Notes"
	name="abilityNotes"
	placeholder="Enter Notes"
	rows={10}
/>
