<script lang="ts">
	import { c } from '$lib/state/character';

	import TextArea from '../input/text-area.svelte';
</script>

<h3 class="text-lg font-bold">Combat Maneuver Bonus</h3>

<TextArea bind:value={$c.combat.cmb.notes} name="cmbNotes" label="Notes" placeholder="Notes" />
