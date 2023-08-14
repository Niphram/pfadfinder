<script lang="ts">
	import { t } from '$lib/i18n';
	import { withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { macroNotify } from '$lib/utils/notes';
	import { openDialog } from '../dialog.svelte';
	import SaveDialog from '../dialogs/save-dialog.svelte';
	import { c, p, type SaveKey } from '$lib/data';

	export let key: SaveKey;
</script>

<CaptionedButton
	on:click={() => macroNotify($t(`saves.${key}.full`), $c[key].notes, $c)}
	on:contextmenu={() => openDialog(SaveDialog, { key })}
	underline={!!$c[key].notes}
	label={withSign($p[key].mod)}
	caption={$t(`saves.${key}.short`)}
/>
