<script lang="ts">
	import { t } from '$lib/i18n';

	import { title } from '$lib/components/dialog.svelte';
	import Integer from '$lib/components/input/integer.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar, type FacetKey } from '$lib/data';

	interface Props {
		key?: FacetKey;
	}

	let { key = 'charm' }: Props = $props();

	const { c } = $derived(getChar());

	$title = $t(`persona.${key}`);
</script>

<Integer bind:value={c.persona[key].rank} label="Rank" name="facetRank" noNegatives />

<MacroTextArea
	name="personaNotes"
	label="Notes"
	placeholder="Enter Notes"
	rows={10}
	bind:value={c.persona[key].notes}
/>
