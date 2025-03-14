<script lang="ts">
	import { getChar } from '$lib/data/context';
	import { title } from '../dialog.svelte';

	import TextArea from '../input/text-area.svelte';

	const { c } = getChar();

	$title = 'Base Attack Bonus';
</script>

<TextArea bind:value={$c.combat.bab.notes} name="babNotes" label="Notes" placeholder="Notes" />
