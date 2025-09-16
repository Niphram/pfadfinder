<script lang="ts">
	import { title } from '$lib/components/dialog.svelte';
	import MacroInteger from '$lib/components/input/macro-integer.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());

	$title = 'Spell Resistance';
</script>

<MacroInteger bind:value={c.combat.sr.$base.expr} name="srBase" label="Base" placeholder="Base" />
<MacroInteger bind:value={c.combat.sr.$misc.expr} name="srMisc" label="Misc" placeholder="Misc" />

<MacroTextArea bind:value={c.combat.sr.notes} name="srNotes" label="Notes" placeholder="Notes" />
