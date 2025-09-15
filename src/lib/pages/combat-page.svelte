<script lang="ts">
	import { Attack } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { parseTextWithMacros } from '$lib/macro/text';
	import { preventDefault } from '$lib/utils';
	import { withSign } from '$lib/utils/format';
	import { macroNotify } from '$lib/utils/notes';

	import Collapse from '$lib/atoms/collapse.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import MultilineMacro from '$lib/atoms/multiline-macro.svelte';
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
		<div
			class="grid w-full grid-flow-row grid-cols-[min-content_repeat(4,auto)] justify-stretch gap-y-2"
		>
			<div class="col-span-5 grid grid-cols-subgrid text-center text-sm font-bold text-neutral-500">
				<div></div>
				<div>Name</div>
				<div>Atk</div>
				<div>Crit Range</div>
				<div class="pr-12">Damage</div>
			</div>

			<SortableList
				class="col-span-5 grid grid-cols-subgrid gap-y-2"
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
					<div class="col-span-5 grid grid-cols-subgrid items-center">
						<div
							class="drag-handle flex w-6 items-center justify-center"
							role="button"
							tabindex="0"
						>
							<DragHandle />
						</div>

						<Collapse
							class="col-span-4 grid grid-cols-subgrid"
							titleClass="col-span-4 grid grid-cols-subgrid text-sm"
							contentClass="col-span-4 text-sm"
							icon="arrow"
							oncontextmenu={preventDefault(() => openDialog(AttackDialog, { index }))}
							bind:open={attack.open}
						>
							{#snippet title({ open })}
								<div class="col-span-4 grid grid-cols-subgrid items-center gap-x-2">
									<div
										class={[
											'text-ellipsis',
											'whitespace-nowrap',
											'overflow-hidden',
											open && 'col-span-4',
										]}
									>
										{attack.name}
									</div>
									{#if !open}
										<div class="text-center">
											{attack.hasAttack ? attack.attack.attacks.map(withSign).join('/') : '-'}
										</div>
										<div class="text-center">
											{(attack.hasAttack && attack.attack.critRange) || '-'}
										</div>
										<div
											class="text-center text-ellipsis"
											class:overflow-hidden={!open}
											class:whitespace-nowrap={!open}
										>
											{(attack.hasDamage && parseTextWithMacros(attack.damage.damage, c)) || '-'}
										</div>
									{/if}
								</div>
							{/snippet}

							{@const details = attack.details}
							{#if details.length > 0}
								<Divider class="my-0">Details</Divider>
								<div
									class="grid grid-cols-[max-content_auto] gap-x-2 text-xs [&>*:nth-child(odd)]:font-bold [&>*:nth-child(odd)]:after:content-[':']"
								>
									{#each details as [label, value] (label)}
										<div>{label}</div>
										<div>{value}</div>
									{/each}
								</div>
							{/if}
							{#if attack.showNotes && attack.notes}
								<Divider class="my-0">Notes</Divider>
								<MultilineMacro text={attack.notes}></MultilineMacro>
							{/if}
						</Collapse>
					</div>
				{/snippet}
			</SortableList>
		</div>
	{/if}
</div>
