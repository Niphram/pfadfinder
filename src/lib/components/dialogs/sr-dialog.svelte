<script lang="ts">
	import { c } from '$lib/state/character';

	import MacroInteger from '../input/macro-integer.svelte';
	import TextArea from '../input/text-area.svelte';
</script>

<h3 class="text-lg font-bold">Spell Resistance</h3>

<MacroInteger bind:value={$c.combat.sr.base} name="srBase" label="Base" placeholder="Base" />
<MacroInteger bind:value={$c.combat.sr.misc} name="srMisc" label="Misc" placeholder="Misc" />

<TextArea bind:value={$c.combat.sr.notes} name="srNotes" label="Notes" placeholder="Notes" />
