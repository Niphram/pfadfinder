<script lang="ts">
	import { c } from '$lib/data';
	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import TextArea from '../input/text-area.svelte';

	$title = 'Initiative';
</script>

<MacroInteger
	bind:value={$c.init.misc.expr}
	name="initMisc"
	label="Misc"
	placeholder="Initiative Misc"
/>

<TextArea bind:value={$c.init.notes} name="notes" label="Notes" placeholder="Notes" />
