<script lang="ts">
	import { t } from '$lib/i18n';
	import { macroNotify, preventDefault } from '$lib/utils';

	import { openDialog } from '$lib/components/dialog.svelte';
	import PersonaScoreDialog from '$lib/components/dialogs/persona-facet-dialog.svelte';
	import TextArea from '$lib/components/input/text-area.svelte';

	import { FACET_KEYS, getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<div class="flex flex-col">
	<div class="divider">Facets</div>

	<div class="grid w-full grid-cols-2 gap-2 md:grid-cols-3">
		{#each FACET_KEYS as key (key)}
			<button
				class="btn h-min p-0"
				onclick={() =>
					macroNotify($t(`persona.${key}`), c.persona[key].notes, c)}
				oncontextmenu={preventDefault(() =>
					openDialog(PersonaScoreDialog, { key }),
				)}
			>
				<div
					class="divide-base-100 flex w-full flex-col divide-y-2 text-center"
				>
					<div class="py-1 text-3xl font-extrabold">{c.persona[key].rank}</div>
					<div
						class="py-1 uppercase decoration-wavy"
						class:underline={!!c.persona[key].notes}
					>
						{$t(`persona.${key}`)}
					</div>
				</div>
			</button>
		{/each}
	</div>

	<div class="divider">Notes</div>

	<TextArea
		name="notes"
		label="Notes"
		value={c.persona.$.notes}
		rows={10}
		placeholder="Notes"
	/>
</div>
