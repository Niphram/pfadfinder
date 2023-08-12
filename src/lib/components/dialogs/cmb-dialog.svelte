<script lang="ts">
	import { c } from '$lib/state/character';
	import { title } from '../dialog.svelte';

	import TextArea from '../input/text-area.svelte';

	$title = 'Combat Maneuver Bonus';
</script>

<TextArea bind:value={$c.combat.cmb.notes} name="cmbNotes" label="Notes" placeholder="Notes" />
