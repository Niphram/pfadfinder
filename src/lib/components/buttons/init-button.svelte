<script lang="ts">
	import { withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { macroNotify } from '$lib/utils/notes';
	import { openDialog } from '../dialog.svelte';
	import InitDialog from '../dialogs/init-dialog.svelte';
	import { getChar } from '$lib/data/context';

	const { c, p } = getChar();
</script>

<CaptionedButton
	on:click={() => macroNotify('Initiative', $c.init.notes, $c)}
	on:contextmenu={() => openDialog(InitDialog, {})}
	underline={!!$c.init.notes}
	label={withSign($p.init.mod)}
	caption="Initiative"
/>
