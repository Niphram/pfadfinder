<script lang="ts">
	import { t } from '$lib/i18n';
	import { macroNotify, withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import SaveDialog from '$lib/components/dialogs/save-dialog.svelte';

	import { getChar, type SaveKey } from '$lib/data';

	interface Props {
		key: SaveKey;
	}

	let { key }: Props = $props();

	const { openDialog } = useDialog();
	const { c } = $derived(getChar());
</script>

<CaptionedButton
	onclick={() => macroNotify($t(`saves.${key}.full`), c[key].notes, c)}
	oncontextmenu={() => openDialog(SaveDialog, { key })}
	underline={!!c[key].notes}
	label={withSign(c[key].mod)}
	caption={$t(`saves.${key}.short`)}
/>
