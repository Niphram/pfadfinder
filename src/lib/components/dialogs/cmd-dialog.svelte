<script lang="ts">
	import { c } from '$lib/state/character';
	import { title } from '../dialog.svelte';

	import TextArea from '../input/text-area.svelte';

	$title = 'Combat Maneuver Defense';
</script>

<TextArea bind:value={$c.combat.cmd.notes} name="cmdNotes" label="Notes" placeholder="Notes" />
