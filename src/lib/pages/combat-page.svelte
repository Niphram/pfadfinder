<script lang="ts">
	import { withSign } from '$lib/utils/format';
	import { c, p } from '$lib/data';

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
			label={withSign($p.combat.bab.mod)}
			caption="Base Attack Bonus"
			underline={!!$c.combat.bab.notes}
			on:click={() => macroNotify('Base Attack Bonus', $c.combat.bab.notes, $c)}
			on:contextmenu={() => openDialog(BabDialog, {})}
		/>
		<CaptionedButton
			label={withSign($p.combat.sr.total)}
			caption="Spell Resistance"
			underline={!!$c.combat.sr.notes}
			on:click={() => macroNotify('Spell Resistance', $c.combat.sr.notes, $c)}
			on:contextmenu={() => openDialog(SrDialog, {})}
		/>
		<CaptionedButton
			label={withSign($p.combat.cmb.mod)}
			caption="CMB"
			underline={!!$c.combat.cmb.notes}
			on:click={() => macroNotify('Combat Manouver Bonus', $c.combat.cmb.notes, $c)}
			on:contextmenu={() => openDialog(CmbDialog, {})}
		/>
		<CaptionedButton
			label={withSign($p.combat.cmd.mod)}
			caption="CMD"
			underline={!!$c.combat.cmd.notes}
			on:click={() => macroNotify('Combat Manouver Defense', $c.combat.cmd.notes, $c)}
			on:contextmenu={() => openDialog(CmdDialog, {})}
		/>
	</div>
</div>
