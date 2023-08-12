<script lang="ts">
	import { c } from '$lib/state/character';
	import { title } from '../dialog.svelte';

	import TextArea from '../input/text-area.svelte';

	$title = 'Base Attack Bonus';
</script>

<TextArea bind:value={$c.combat.bab.notes} name="babNotes" label="Notes" placeholder="Notes" />
