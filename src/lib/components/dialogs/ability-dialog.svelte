<script lang="ts">
	import { t } from '$lib/i18n';
	import type { SerdeProxy } from '$lib/serde/proxy';

	import { title } from '$lib/components/dialog.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { Ability } from '$lib/data';

	interface Props {
		ability: SerdeProxy<Ability>;
	}

	let { ability }: Props = $props();

	$title = $t(`abilities.${ability.key}.full`);
</script>

<div class="flex flex-col gap-2">
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
</div>
