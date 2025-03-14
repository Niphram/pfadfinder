<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { title } from '../dialog.svelte';

	import TextArea from '../input/text-area.svelte';

	const { c } = getChar();

	$title = 'Combat Maneuver Bonus';
</script>

<TextArea bind:value={$c.combat.cmb.notes} name="cmbNotes" label="Notes" placeholder="Notes" />
