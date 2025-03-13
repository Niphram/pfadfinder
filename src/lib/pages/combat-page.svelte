<script lang="ts">
	import { withSign } from '$lib/utils/format';
	import { Attack, c, p } from '$lib/data';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import BabDialog from '$lib/components/dialogs/bab-dialog.svelte';
	import CmbDialog from '$lib/components/dialogs/cmb-dialog.svelte';
	import CmdDialog from '$lib/components/dialogs/cmd-dialog.svelte';
	import SrDialog from '$lib/components/dialogs/sr-dialog.svelte';
	import { macroNotify } from '$lib/utils/notes';
	import AttackDialog from '$lib/components/dialogs/attack-dialog.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import { parseTextWithMacros } from '$lib/macro/text';

	function addAttack() {
		$c.combat.attacks.push(new Attack());
		$c.combat.attacks = $c.combat.attacks;

		openDialog(AttackDialog, { index: $c.combat.attacks.length - 1 });
	}
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
			label={$p.combat.cmd.mod}
			caption="CMD"
			underline={!!$c.combat.cmd.notes}
			on:click={() => macroNotify('Combat Manouver Defense', $c.combat.cmd.notes, $c)}
			on:contextmenu={() => openDialog(CmdDialog, {})}
		/>
	</div>

	<div class="divider">
		<div class="flex flex-row gap-2">
			Weapons/Attacks
			<button class="btn btn-secondary btn-xs" on:click={addAttack}>Add</button>
		</div>
	</div>

	{#if $c.combat.attacks.length > 0}
		<table class="table border-separate border-spacing-y-2">
			<thead>
				<tr class="border-none text-center">
					<th class="px-0"></th>
					<th class="p-1">Name</th>
					<th class="p-1">Atk</th>
					<th class="p-1">Crit Range</th>
					<th class="p-1">Damage</th>
				</tr>
			</thead>
			<SortableList
				element="tbody"
				options={{
					group: 'attack',
					handle: '.drag-handle',
					animation: 150,
					easing: 'cubic-bezier(1, 0, 0, 1)'
				}}
				bind:items={$c.combat.attacks}
				keyProp="id"
				let:item={attack}
				let:index
			>
				<tr class="border-none text-center">
					<td class="drag-handle w-6 items-center justify-center px-0" role="button" tabindex="0">
						<DragHandle />
					</td>

					<td
						class="join-item bg-base-200 cursor-pointer rounded-l-md p-1"
						on:click={() => macroNotify(attack.name, attack.notes, $c)}
						on:contextmenu|preventDefault={() => openDialog(AttackDialog, { index })}
						>{attack.name}</td
					>
					<td
						class="join-item bg-base-200 cursor-pointer p-1"
						on:click={() => macroNotify(attack.name, attack.notes, $c)}
						on:contextmenu|preventDefault={() => openDialog(AttackDialog, { index })}
						>{attack.hasAttack ? withSign(attack.attackBonus.eval($c)) : '-'}</td
					>
					<td
						class="join-item bg-base-200 cursor-pointer p-1"
						on:click={() => macroNotify(attack.name, attack.notes, $c)}
						on:contextmenu|preventDefault={() => openDialog(AttackDialog, { index })}
						>{(attack.hasAttack && attack.attack.critRange) || '-'}</td
					>
					<td
						class="join-item bg-base-200 cursor-pointer rounded-r-md p-1"
						on:click={() => macroNotify(attack.name, attack.notes, $c)}
						on:contextmenu|preventDefault={() => openDialog(AttackDialog, { index })}
						>{(attack.hasDamage && parseTextWithMacros(attack.damage.damage, $c)) || '-'}</td
					>
				</tr>
			</SortableList>
		</table>
	{/if}
</div>
