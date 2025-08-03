<script lang="ts">
	import { type SaveKey } from '$lib/data';
	import { getChar } from '$lib/data/context.svelte';
	import { t } from '$lib/i18n';
	import { withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';

	import CaptionedButton from '../captioned-button.svelte';
	import { openDialog } from '../dialog.svelte';
	import SaveDialog from '../dialogs/save-dialog.svelte';

	interface Props {
		key: SaveKey;
	}

	let { key }: Props = $props();

	const { c } = $derived(getChar());
</script>

<CaptionedButton
	onclick={() => macroNotify($t(`saves.${key}.full`), c[key].notes, c)}
	oncontextmenu={() => openDialog(SaveDialog, { key })}
	underline={!!c[key].notes}
	label={withSign(c[key].mod)}
	caption={$t(`saves.${key}.short`)}
/>
