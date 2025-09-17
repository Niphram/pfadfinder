<script lang="ts">
	import { t } from '$lib/i18n';
	import type { SerdeProxy } from '$lib/serde/proxy';

	import { title } from '$lib/components/dialog.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Number from '$lib/components/input/number.svelte';

	import { Ability } from '$lib/data';

	interface Props {
		ability: SerdeProxy<Ability>;
	}

	let { ability }: Props = $props();

	$title = $t(`abilities.${ability.key}.full`);
</script>

<div class="flex flex-col gap-2">
	<MacroNumber
		value={ability.$.base}
		name="abilityBase"
		label="Base Ability Score"
	/>
	<MacroNumber value={ability.$.bonus} name="abilityBonus" label="Bonus" />
	<MacroNumber value={ability.$.temp} name="abilityTemp" label="Temp" />
	<Number value={ability.$.damage} name="abilityDamage" label="Damage" />

	<MacroTextArea
		value={ability.$.notes}
		label="Notes"
		name="abilityNotes"
		placeholder="Enter Notes"
		rows={10}
	/>
</div>
