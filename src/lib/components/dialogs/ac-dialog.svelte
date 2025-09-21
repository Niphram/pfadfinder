<script>
	import { t } from '$lib/i18n';

	import DialogBase from '$lib/atoms/dialog-base.svelte';
	import Divider from '$lib/atoms/divider.svelte';

	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import Select from '$lib/components/input/select.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<DialogBase title="Armor Class">
	<Select
		name="acPrimaryAbility"
		label="Primary Ability"
		value={c.ac.$.primaryAbility}
		translate={(key) => $t(`abilities.${key}.full`)}
	/>

	<Select
		name="acSecondaryAbility"
		label="Secondary Ability"
		value={c.ac.$.secondaryAbility}
		translate={(key) => (key ? $t(`abilities.${key}.full`) : 'None')}
	/>

	<Divider />

	<MacroNumber name="bonusAc" label="Bonus to AC" value={c.ac.$.bonusAc} />

	<MacroNumber
		name="bonusTouch"
		label="Bonus to touch AC"
		value={c.ac.$.bonusTouch}
	/>

	<MacroNumber
		name="bonusFf"
		label="Bonus to flat-footed AC"
		value={c.ac.$.bonusFf}
	/>

	<TextArea name="acNotes" label="Notes" rows={5} value={c.ac.$.notes} />
</DialogBase>
