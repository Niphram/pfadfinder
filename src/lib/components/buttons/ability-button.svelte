<script lang="ts">
	import { type AbilityKey } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';
	import { openDialog } from '../dialog.svelte';
	import AbilityDialog from '../dialogs/ability-dialog.svelte';

	const { c, p } = getChar();

	export let key: AbilityKey;

	$: temp = $p[key].temp;

	function notify() {
		const notifyLines = [];

		if ($c[key].damage > 0) {
			notifyLines.push(
				`Ability Damage: ${$c[key].damage} (-${Math.floor($c[key].damage / 2)} to mod)`,
			);
		}

		notifyLines.push($c[key].notes);

		macroNotify($t(`abilities.${key}.full`), notifyLines.join('\n'), $c);
	}
</script>

<button
	on:click={() => notify()}
	on:contextmenu|preventDefault={() => openDialog(AbilityDialog, { key })}
	class="btn h-min p-0"
>
	<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
		<div class="py-1 text-3xl font-extrabold" class:text-red-700={$c[key].damage > 0}>
			{withSign($c[key].mod.eval($c))}
		</div>
		<div class="py-1 text-xs decoration-wavy" class:underline={!!$c[key].notes}>
			{$p[key].totalNoTemp}{#if temp !== 0}<span
					class:text-red-700={temp < 0}
					class:text-green-700={temp > 0}
				>
					{withSign(temp)}
				</span>
			{/if}
		</div>
		<div class="py-1 uppercase decoration-wavy" class:underline={!!$c[key].notes}>
			{$t(`abilities.${key}.short`)}
		</div>
	</div>
</button>

<style></style>
