<script lang="ts">
	import { c } from '$lib/state/character';

	import Integer from '../input/integer.svelte';
	import TextArea from '../input/text-area.svelte';
</script>

<h3 class="text-lg font-bold">Spell Resistance</h3>

<Integer bind:value={$c.combat.sr.base} name="srBase" label="Base" placeholder="Base" />
<Integer bind:value={$c.combat.sr.misc} name="srMisc" label="Misc" placeholder="Misc" />

<TextArea bind:value={$c.combat.sr.notes} name="srNotes" label="Notes" placeholder="Notes" />
