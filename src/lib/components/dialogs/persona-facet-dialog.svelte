<script lang="ts">
	import type { FacetKey } from '$lib/data/character/persona';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';
	import TextArea from '../input/text-area.svelte';

	const { c } = getChar();

	export let key: FacetKey = 'charm';

	$title = $t(`persona.${key}`);
</script>

<Integer bind:value={$c.persona[key].rank} label="Rank" name="facetRank" noNegatives />

<TextArea
	name="personaNotes"
	label="Notes"
	placeholder="Enter Notes"
	rows={10}
	bind:value={$c.persona[key].notes}
/>
