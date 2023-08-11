<script lang="ts">
	import { c } from '$lib/state';
	import { withSign } from '$lib/utils';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { macroNotify } from '$lib/utils/notes';
	import { openDialog } from '../dialog.svelte';
	import InitDialog from '../dialogs/init-dialog.svelte';
</script>

<CaptionedButton
	on:click={() => macroNotify('Initiative', $c.init.notes, $c)}
	on:contextmenu={() => openDialog(InitDialog, {})}
	label={withSign($c.init.mod)}
	caption="Initiative"
/>
