<script lang="ts">
	import { c } from '$lib/state/character';

	import TextArea from '../input/text-area.svelte';
</script>

<h3 class="text-lg font-bold">Base Attack Bonus</h3>

<TextArea bind:value={$c.combat.bab.notes} name="babNotes" label="Notes" placeholder="Notes" />
