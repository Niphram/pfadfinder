<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { title } from '../dialog.svelte';

	import TextArea from '../input/text-area.svelte';

	const { c } = getChar();

	$title = 'Combat Maneuver Defense';
</script>

<TextArea bind:value={$c.combat.cmd.notes} name="cmdNotes" label="Notes" placeholder="Notes" />
