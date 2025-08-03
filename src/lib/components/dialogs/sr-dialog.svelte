<script lang="ts">
	import { getChar } from '$lib/data/context.svelte';

	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

	const { c } = $derived(getChar());

	$title = 'Spell Resistance';
</script>

<MacroInteger bind:value={c.combat.sr.$base.expr} name="srBase" label="Base" placeholder="Base" />
<MacroInteger bind:value={c.combat.sr.$misc.expr} name="srMisc" label="Misc" placeholder="Misc" />

<MacroTextArea bind:value={c.combat.sr.notes} name="srNotes" label="Notes" placeholder="Notes" />
