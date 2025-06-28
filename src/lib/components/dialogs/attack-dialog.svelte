<script lang="ts">
	import { ABILITY_KEYS, ATTACK_TYPES } from '$lib/data';
	import { getChar } from '$lib/data/context';

	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';
	import Select from '../input/select.svelte';

	const { c } = getChar();

	export let index: number;

	const attackAbilities = ['none', ...ABILITY_KEYS];

	function deleteAttack() {
		$c.combat.attacks.splice(index, 1);
		$c.combat.attacks = $c.combat.attacks;
	}

	$title = 'Weapon/Attack';
</script>

<div class="flex flex-col gap-2">
	{#if index < $c.combat.attacks.length}
		<Input
			name="className"
			label="Name"
			placeholder="Type here"
			bind:value={$c.combat.attacks[index].name}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Attack
				<input type="checkbox" class="toggle" bind:checked={$c.combat.attacks[index].hasAttack} />
			</div>
		</div>

		{#if $c.combat.attacks[index].hasAttack}
			<div class="flex flex-row gap-1">
				<Select
					bind:value={$c.combat.attacks[index].attack.baseModifier}
					name="attackBaseMod"
					label="Base"
					options={ATTACK_TYPES}
					let:option
				>
					<option value={option}>{option}</option>
				</Select>
				<Select
					bind:value={$c.combat.attacks[index].attack.abilityModifier}
					name="attackAbilityMod"
					label="Ability"
					options={attackAbilities}
					let:option
				>
					<option value={option}>{option}</option>
				</Select>
				<MacroInteger
					optional
					placeholder="0"
					label="Bonus"
					name="attackBonusMod"
					bind:value={$c.combat.attacks[index].attack.bonusModifier.expr}
				></MacroInteger>
			</div>

			<div class="flex flex-row gap-1">
				<Input
					name="attackCritRange"
					label="Critical Range"
					placeholder="19-20"
					bind:value={$c.combat.attacks[index].attack.critRange}
				/>

				<Input
					name="attackRange"
					label="Range"
					placeholder="5 feet"
					bind:value={$c.combat.attacks[index].attack.range}
				/>
			</div>
		{/if}

		<div class="divider">
			<div class="flex flex-row gap-2">
				Damage
				<input type="checkbox" class="toggle" bind:checked={$c.combat.attacks[index].hasDamage} />
			</div>
		</div>

		{#if $c.combat.attacks[index].hasDamage}
			<Input
				name="damage"
				label="Damage"
				placeholder="1d6 Piercing + STR"
				bind:value={$c.combat.attacks[index].damage.damage}
			/>
		{/if}

		<MacroTextArea
			bind:value={$c.combat.attacks[index].notes}
			name="acItemNotes"
			placeholder="Notes"
			label="Notes"
		/>
	{/if}

	<button on:click={deleteAttack} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
