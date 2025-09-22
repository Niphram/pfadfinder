<script lang="ts">
	import { t } from '$lib/i18n';

	import DialogBase from '$lib/atoms/dialog-base.svelte';
	import Divider from '$lib/atoms/divider.svelte';

	import Input from '$lib/components/input/input.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import MacroText from '$lib/components/input/macro-text.svelte';
	import Select from '$lib/components/input/select.svelte';

	import { getChar } from '$lib/data';

	interface Props {
		index: number;
	}

	let { index }: Props = $props();

	const { c } = $derived(getChar());

	function deleteAttack() {
		c.combat.attacks.splice(index, 1);
	}
</script>

<DialogBase title="Weapon/Attack">
	<div class="flex flex-col gap-2">
		{#if index < c.combat.attacks.length}
			<Input
				name="className"
				label="Name"
				placeholder="Type here"
				value={c.combat.attacks[index].$.name}
			/>

			<div class="divider">
				<div class="flex flex-row gap-2">
					Attack
					<input
						type="checkbox"
						class="toggle"
						bind:checked={c.combat.attacks[index].hasAttack}
					/>
				</div>
			</div>

			{#if c.combat.attacks[index].hasAttack}
				<div class="flex flex-row gap-1">
					<Select
						value={c.combat.attacks[index].attack.$.baseModifier}
						name="attackBaseMod"
						label="Base"
						translate={(key) => $t(`combat.attackTypes.${key}`)}
					/>
					<Select
						value={c.combat.attacks[index].attack.$.abilityModifier}
						name="attackAbilityMod"
						label="Ability"
						translate={(key) => (key ? $t(`abilities.${key}.short`) : 'None')}
					/>
				</div>

				<MacroNumber
					placeholder="0"
					label="Attack Bonus"
					name="attackBonusMod"
					value={c.combat.attacks[index].attack.$.bonusModifier}
				/>

				<div class="flex flex-row gap-1">
					<Input
						name="attackCritRange"
						label="Critical Range"
						placeholder="19-20"
						value={c.combat.attacks[index].attack.$.critRange}
					/>

					<Input
						name="attackRange"
						label="Range"
						placeholder="5 feet"
						value={c.combat.attacks[index].attack.$.range}
					/>
				</div>
			{/if}

			<div class="divider">
				<div class="flex flex-row gap-2">
					Damage
					<input
						type="checkbox"
						class="toggle"
						bind:checked={c.combat.attacks[index].hasDamage}
					/>
				</div>
			</div>

			{#if c.combat.attacks[index].hasDamage}
				<MacroText
					name="damage"
					label="Damage"
					placeholder="1d6 Piercing + STR"
					value={c.combat.attacks[index].damage.$.damage}
				/>

				<MacroTextArea
					name="damageNotes"
					label="Damage Notes"
					placeholder="Additional notes (damage type etc.)"
					rows={3}
					value={c.combat.attacks[index].damage.$.notes}
				/>
			{/if}

			<Divider>Notes</Divider>

			<MacroTextArea
				value={c.combat.attacks[index].$.notes}
				name="acItemNotes"
				placeholder="Notes"
				label="Notes"
			/>

			<label class="label">
				Show notes in overview
				<input
					type="checkbox"
					bind:checked={c.combat.attacks[index].showNotes}
					class="toggle"
				/>
			</label>
		{/if}

		<button
			onclick={deleteAttack}
			class="btn btn-error mt-4 w-max self-center uppercase"
		>
			Delete
		</button>
	</div>
</DialogBase>
