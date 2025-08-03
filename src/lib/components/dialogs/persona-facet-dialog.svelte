<script lang="ts">
	import type { FacetKey } from '$lib/data/character/persona.svelte';
	import { getChar } from '$lib/data/context.svelte';
	import { t } from '$lib/i18n';

	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

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
