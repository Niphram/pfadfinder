<script lang="ts">
	import { c } from '$lib/data';
	import { title } from '../dialog.svelte';

	import MacroInteger from '../input/macro-integer.svelte';
	import TextArea from '../input/text-area.svelte';

	$title = 'Spell Resistance';
</script>

<MacroInteger bind:value={$c.combat.sr.base.expr} name="srBase" label="Base" placeholder="Base" />
<MacroInteger bind:value={$c.combat.sr.misc.expr} name="srMisc" label="Misc" placeholder="Misc" />

<TextArea bind:value={$c.combat.sr.notes} name="srNotes" label="Notes" placeholder="Notes" />
