<script lang="ts">
	import { t } from '$lib/i18n';
	import { preventDefault, useMacroNotify, withSign } from '$lib/utils';

	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import AbilityDialog from '$lib/components/dialogs/ability-dialog.svelte';

	import { getChar, type AbilityKey } from '$lib/data';

	interface Props {
		key: AbilityKey;
	}

	let { key }: Props = $props();

	const { openDialog } = useDialog();
	const { macroNotify } = useMacroNotify();
	const { c } = $derived(getChar());

	let temp = $derived(c[key].temp);

	function notify() {
		const notifyLines = [];

		if (c[key].damage > 0) {
			notifyLines.push(
				`Ability Damage: ${c[key].damage} (-${Math.floor(c[key].damage / 2)} to mod)`,
			);
		}

		notifyLines.push(c[key].notes);

		macroNotify($t(`abilities.${key}.full`), notifyLines.join('\n'));
	}
</script>

<button
	onclick={() => notify()}
	oncontextmenu={preventDefault(() =>
		openDialog(AbilityDialog, { ability: c[key] }),
	)}
	class="btn h-min p-0"
>
	<div class="divide-base-100 flex w-full flex-col divide-y-2 text-center">
		<div
			class="py-1 text-3xl font-extrabold"
			class:text-red-700={c[key].damage > 0}
		>
			{withSign(c[key].mod)}
		</div>
		<div class="py-1 text-xs decoration-wavy" class:underline={!!c[key].notes}>
			{c[key].totalNoTemp}{#if temp !== 0}<span
					class:text-red-700={temp < 0}
					class:text-green-700={temp > 0}
				>
					{withSign(temp)}
				</span>
			{/if}
		</div>
		<div
			class="py-1 uppercase decoration-wavy"
			class:underline={!!c[key].notes}
		>
			{$t(`abilities.${key}.short`)}
		</div>
	</div>
</button>
