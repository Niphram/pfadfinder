<script lang="ts">
	import { c, p, type AbilityKey } from '$lib/data';
	import { t } from '$lib/i18n';
	import { withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';
	import { openDialog } from '../dialog.svelte';
	import AbilityDialog from '../dialogs/ability-dialog.svelte';

	export let key: AbilityKey;
</script>

<button
	on:click={() => macroNotify($t(`abilities.${key}.full`), $c[key].notes, $c)}
	on:contextmenu|preventDefault={() => openDialog(AbilityDialog, { key })}
	class="btn btn-neutral h-min p-0"
>
	<div class="flex w-full flex-col divide-y-2 divide-base-100 text-center">
		<div class="py-1 text-3xl font-extrabold">{withSign($c[key].mod.eval($c))}</div>
		<div class="py-1 text-xs decoration-wavy" class:underline={!!$c[key].notes}>
			{$p[key].total}
		</div>
		<div class="py-1 uppercase decoration-wavy" class:underline={!!$c[key].notes}>
			{$t(`abilities.${key}.short`)}
		</div>
	</div>
</button>

<style></style>
