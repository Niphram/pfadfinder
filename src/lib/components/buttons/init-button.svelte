<script lang="ts">
	import { macroNotify, withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import InitDialog from '$lib/components/dialogs/init-dialog.svelte';

	import { getChar } from '$lib/data';

	const { c } = $derived(getChar());
</script>

<CaptionedButton
	onclick={() => macroNotify('Initiative', c.init.notes, c)}
	oncontextmenu={() => openDialog(InitDialog, {})}
	underline={!!c.init.notes}
	label={withSign(c.init.mod)}
	caption="Initiative"
/>
