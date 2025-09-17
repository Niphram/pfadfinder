<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Number from '$lib/components/input/number.svelte';

	import { getChar, type FacetKey } from '$lib/data';

	interface Props {
		key?: FacetKey;
	}

	let { key = 'charm' }: Props = $props();

	const { c } = $derived(getChar());

	$title = $t(`persona.${key}`);
</script>

<Number value={c.persona[key].$.rank} label="Rank" name="facetRank" />

<MacroTextArea
	name="personaNotes"
	label="Notes"
	placeholder="Enter Notes"
	rows={10}
	value={c.persona[key].$.notes}
/>
