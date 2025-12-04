<script lang="ts">
	import { useMacroNotify, withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { useDialog } from '$lib/components/dialog-provider.svelte';
	import InitDialog from '$lib/components/dialogs/init-dialog.svelte';

	import { getChar } from '$lib/data';

	const { openDialog } = useDialog();
	const { macroNotify } = useMacroNotify();
	const { c } = $derived(getChar());
</script>

<CaptionedButton
	onclick={() => macroNotify('Initiative', c.init.notes)}
	oncontextmenu={() => openDialog(InitDialog, {})}
	underline={!!c.init.notes}
	label={withSign(c.init.mod)}
	caption="Initiative"
/>
