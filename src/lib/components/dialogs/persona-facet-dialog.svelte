<script lang="ts">
	import { c } from '$lib/data';
	import type { FacetKey } from '$lib/data/character/persona';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';

	export let key: FacetKey = 'charm';

	$title = $t(`persona.${key}`);
</script>

<Integer bind:value={$c.persona[key].rank} label="Rank" name="facetRank" noNegatives />

<div class="form-control w-full">
	<label for="abilityNotes" class="label pb-0">
		<span class="label-text">Notes</span>
	</label>
	<textarea
		name="abilityNotes"
		placeholder="Enter Notes"
		class="textarea textarea-bordered w-full"
		rows="10"
		bind:value={$c.persona[key].notes}
	></textarea>
</div>
