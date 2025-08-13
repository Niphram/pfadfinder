<script lang="ts">
	import { Attack } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { parseTextWithMacros } from '$lib/macro/text';
	import { preventDefault } from '$lib/utils';
	import { withSign } from '$lib/utils/format';
	import { macroNotify } from '$lib/utils/notes';

	import CaptionedButton from '$lib/components/captioned-button.svelte';
	import { openDialog } from '$lib/components/dialog.svelte';
	import AttackDialog from '$lib/components/dialogs/attack-dialog.svelte';
	import BabDialog from '$lib/components/dialogs/bab-dialog.svelte';
	import CmbDialog from '$lib/components/dialogs/cmb-dialog.svelte';
	import CmdDialog from '$lib/components/dialogs/cmd-dialog.svelte';
	import SrDialog from '$lib/components/dialogs/sr-dialog.svelte';
	import DragHandle from '$lib/components/icons/drag-handle.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';

	const { c } = $derived(getChar());

	function addAttack() {
		c.combat.$attacks.value.push(new Attack());

		openDialog(AttackDialog, { index: c.combat.attacks.length - 1 });
	}
</script>

<div class="flex flex-col gap-4">
	<div class="divider">Mods</div>

	<div class="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
		<CaptionedButton
			label={withSign(c.combat.bab.mod)}
			caption="Base Attack Bonus"
			underline={!!c.combat.bab.notes}
			onclick={() => macroNotify('Base Attack Bonus', c.combat.bab.notes, c)}
			oncontextmenu={() => openDialog(BabDialog, {})}
		/>
		<CaptionedButton
			label={withSign(c.combat.sr.total)}
			caption="Spell Resistance"
			underline={!!c.combat.sr.notes}
			onclick={() => macroNotify('Spell Resistance', c.combat.sr.notes, c)}
			oncontextmenu={() => openDialog(SrDialog, {})}
		/>
		<CaptionedButton
			label={withSign(c.combat.cmb.mod)}
			caption="CMB"
			underline={!!c.combat.cmb.notes}
			onclick={() => macroNotify('Combat Manouver Bonus', c.combat.cmb.notes, c)}
			oncontextmenu={() => openDialog(CmbDialog, {})}
		/>
		<CaptionedButton
			label={c.combat.cmd.mod}
			caption="CMD"
			underline={!!c.combat.cmd.notes}
			onclick={() => macroNotify('Combat Manouver Defense', c.combat.cmd.notes, c)}
			oncontextmenu={() => openDialog(CmdDialog, {})}
		/>
	</div>

	<div class="divider">
		<div class="flex flex-row gap-2">
			Weapons/Attacks
			<button class="btn btn-secondary btn-xs" onclick={addAttack}>Add</button>
		</div>
	</div>

	{#if c.combat.attacks.length > 0}
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
					easing: 'cubic-bezier(1, 0, 0, 1)',
				}}
				bind:items={c.combat.attacks}
				keyProp="id"
			>
				{#snippet children({ item: attack, index })}
					<tr class="border-none text-center">
						<td class="drag-handle w-6 items-center justify-center px-0" role="button" tabindex="0">
							<DragHandle />
						</td>

						<td
							class="join-item bg-base-200 cursor-pointer rounded-l-md p-1"
							onclick={() => macroNotify(attack.name, attack.notes, c)}
							oncontextmenu={preventDefault(() => openDialog(AttackDialog, { index }))}
							>{attack.name}</td
						>
						<td
							class="join-item bg-base-200 cursor-pointer p-1"
							onclick={() => macroNotify(attack.name, attack.notes, c)}
							oncontextmenu={preventDefault(() => openDialog(AttackDialog, { index }))}
							>{attack.hasAttack ? attack.attack.attacks.map(withSign).join('/') : '-'}</td
						>
						<td
							class="join-item bg-base-200 cursor-pointer p-1"
							onclick={() => macroNotify(attack.name, attack.notes, c)}
							oncontextmenu={preventDefault(() => openDialog(AttackDialog, { index }))}
							>{(attack.hasAttack && attack.attack.critRange) || '-'}</td
						>
						<td
							class="join-item bg-base-200 cursor-pointer rounded-r-md p-1"
							onclick={() => macroNotify(attack.name, attack.notes, c)}
							oncontextmenu={preventDefault(() => openDialog(AttackDialog, { index }))}
							>{(attack.hasDamage && parseTextWithMacros(attack.damage.damage, c)) || '-'}</td
						>
					</tr>
				{/snippet}
			</SortableList>
		</table>
	{/if}
</div>
