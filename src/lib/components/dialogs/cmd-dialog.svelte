<script lang="ts">
	import { c } from '$lib/state/character';

	import TextArea from '../input/text-area.svelte';
</script>

<h3 class="text-lg font-bold">Combat Maneuver Defense</h3>

<TextArea bind:value={$c.combat.cmd.notes} name="cmdNotes" label="Notes" placeholder="Notes" />
