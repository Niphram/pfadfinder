<script lang="ts">
	import { c } from '$lib/state';
	import { withSign } from '$lib/utils/format';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import BabDialog from '$lib/components/dialogs/bab-dialog.svelte';
	import CmbDialog from '$lib/components/dialogs/cmb-dialog.svelte';
	import CmdDialog from '$lib/components/dialogs/cmd-dialog.svelte';
	import SrDialog from '$lib/components/dialogs/sr-dialog.svelte';
	import { macroNotify } from '$lib/utils/notes';
</script>

<div class="flex flex-col gap-4">
	<div class="divider">Mods</div>

	<div class="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
		<CaptionedButton
			label={withSign($c.combat.bab.mod)}
			caption="Base Attack Bonus"
			on:click={() => macroNotify('Base Attack Bonus', $c.combat.bab.notes, $c)}
			on:contextmenu={() => openDialog(BabDialog, {})}
		/>
		<CaptionedButton
			label={withSign($c.combat.sr.total)}
			caption="Spell Resistance"
			on:click={() => macroNotify('Spell Resistance', $c.combat.sr.notes, $c)}
			on:contextmenu={() => openDialog(SrDialog, {})}
		/>
		<CaptionedButton
			label={withSign($c.combat.cmb.mod)}
			caption="CMB"
			on:click={() => macroNotify('Combat Manouver Bonus', $c.combat.cmb.notes, $c)}
			on:contextmenu={() => openDialog(CmbDialog, {})}
		/>
		<CaptionedButton
			label={withSign($c.combat.cmd.mod)}
			caption="CMD"
			on:click={() => macroNotify('Combat Manouver Defense', $c.combat.cmd.notes, $c)}
			on:contextmenu={() => openDialog(CmdDialog, {})}
		/>
	</div>
</div>
