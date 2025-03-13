<script lang="ts">
	import { openDialog } from '$lib/components/dialog.svelte';
	import PersonaScoreDialog from '$lib/components/dialogs/persona-facet-dialog.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';
	import { c } from '$lib/data';
	import { FACET_KEYS } from '$lib/data/character/persona';
	import { t } from '$lib/i18n';
	import { macroNotify } from '$lib/utils/notes';
</script>

<div class="flex flex-col">
	<div class="divider">Facets</div>

	<div class="grid w-full grid-cols-2 gap-2 md:grid-cols-3">
		{#each FACET_KEYS as key (key)}
			<button
				class="btn h-min p-0"
				on:click={() => macroNotify($t(`persona.${key}`), $c.persona[key].notes, $c)}
				on:contextmenu|preventDefault={() => openDialog(PersonaScoreDialog, { key })}
			>
				<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
					<div class="py-1 text-3xl font-extrabold">{$c.persona[key].rank}</div>
					<div class="py-1 uppercase decoration-wavy" class:underline={!!$c.persona[key].notes}>
						{$t(`persona.${key}`)}
					</div>
				</div>
			</button>
		{/each}
	</div>

	<div class="divider">Notes</div>

	<TextArea name="notes" bind:value={$c.persona.notes} rows={10} placeholder="Notes" />
</div>
