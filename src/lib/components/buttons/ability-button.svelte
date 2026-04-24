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
		const notifyLines: string[] = [];

		if (c[key].damage > 0) {
			notifyLines.push(
				`Ability Damage: ${c[key].damage} (-${Math.floor(c[key].damage / 2)} to mod)`,
			);
		}

		notifyLines.push(c[key].notes);

		notifyLines.push(...c[key].conditionNotes);

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
	<div class="flex w-full flex-col divide-y-2 divide-base-100 text-center">
		<div
			class={[
				'py-1 text-3xl font-extrabold',
				c[key].damage > 0 && 'text-red-700',
			]}
		>
			{withSign(c[key].checkMod)}
		</div>
		<div class={['py-1 text-xs decoration-wavy', c[key].notes && 'underline']}>
			{c[key].totalNoTemp}{#if temp !== 0}<span
					class={[temp < 0 && 'text-red-700', temp > 0 && 'text-green-700']}
				>
					{withSign(temp)}
				</span>
			{/if}
		</div>
		<div
			class={['py-1 uppercase decoration-wavy', c[key].notes && 'underline']}
		>
			{$t(`abilities.${key}.short`)}
		</div>
	</div>
</button>
