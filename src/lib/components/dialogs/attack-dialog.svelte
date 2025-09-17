<script lang="ts">
	import { t } from '$lib/i18n';

	import Divider from '$lib/atoms/divider.svelte';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroNumber from '$lib/components/input/macro-number.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import MacroText from '$lib/components/input/macro-text.svelte';
	import Select from '$lib/components/input/select.svelte';

	import { ABILITY_KEYS, ATTACK_TYPES, getChar } from '$lib/data';

	interface Props {
		index: number;
	}

	let { index }: Props = $props();

	const { c } = $derived(getChar());

	const attackAbilities = ['none', ...ABILITY_KEYS];

	function deleteAttack() {
		c.combat.attacks.splice(index, 1);
	}

	$title = 'Weapon/Attack';
</script>

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
				<input type="checkbox" class="toggle" bind:checked={c.combat.attacks[index].hasAttack} />
			</div>
		</div>

		{#if c.combat.attacks[index].hasAttack}
			<div class="flex flex-row gap-1">
				<Select
					bind:value={c.combat.attacks[index].attack.baseModifier}
					name="attackBaseMod"
					label="Base"
					options={ATTACK_TYPES}
				>
					{#snippet children({ option })}
						<option value={option}>{$t(`combat.attackTypes.${option}`)}</option>
					{/snippet}
				</Select>
				<Select
					bind:value={c.combat.attacks[index].attack.abilityModifier}
					name="attackAbilityMod"
					label="Ability"
					options={attackAbilities}
				>
					{#snippet children({ option })}
						<option value={option}>{option}</option>
					{/snippet}
				</Select>
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
				<input type="checkbox" class="toggle" bind:checked={c.combat.attacks[index].hasDamage} />
			</div>
		</div>

		{#if c.combat.attacks[index].hasDamage}
			<MacroText
				name="damage"
				label="Damage"
				placeholder="1d6 Piercing + STR"
				value={c.combat.attacks[index].damage.$.damage}
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
			<input type="checkbox" bind:checked={c.combat.attacks[index].showNotes} class="toggle" />
		</label>
	{/if}

	<button onclick={deleteAttack} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
