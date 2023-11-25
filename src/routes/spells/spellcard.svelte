<script lang="ts">
	import { fitText } from '$lib/actions/fit-text';
	import type { Spell } from '$lib/pathfinder-data/spells';

	export let spell: Spell;
</script>

<div class="h-[9cm] w-[6cm] rounded-md border bg-red-500 p-1 text-[5pt]">
	<div class="flex h-full w-full flex-col rounded-lg border bg-white p-1">
		<div class="h-5 w-full text-center" use:fitText={{ maxSize: 16 }}>{spell.name}</div>
		<div class="divider my-0" />
		<div use:fitText class="min-h-0 p-1 text-justify">{@html spell.description_formatted}</div>
	</div>
</div>
