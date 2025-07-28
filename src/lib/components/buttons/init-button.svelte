<script lang="ts">
	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { getChar } from '$lib/data/context';
	import { withSign } from '$lib/utils';
	import { macroNotify } from '$lib/utils/notes';

	import { openDialog } from '../dialog.svelte';
	import InitDialog from '../dialogs/init-dialog.svelte';

	const { c, p } = getChar();
</script>

<CaptionedButton
	onclick={() => macroNotify('Initiative', $c.init.notes, $c)}
	oncontextmenu={() => openDialog(InitDialog, {})}
	underline={!!$c.init.notes}
	label={withSign($p.init.mod)}
	caption="Initiative"
/>
