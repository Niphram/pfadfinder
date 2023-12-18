<script lang="ts">
	import { ABILITY_KEYS, ATTACK_TYPES, c } from '$lib/data';
	import { title } from '../dialog.svelte';
	import MacroInteger from '../input/macro-integer.svelte';
	import Select from '../input/select.svelte';
	import TextArea from '../input/text-area.svelte';

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
		<div class="form-control w-full">
			<label for="className" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="className"
				placeholder="Type here"
				class="input input-bordered w-full"
				bind:value={$c.combat.attacks[index].name}
			/>
		</div>

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
				<MacroInteger
					placeholder="20"
					label="Critical Range"
					name="critRange"
					bind:value={$c.combat.attacks[index].attack.critRange.expr}
				></MacroInteger>

				<div class="form-control w-full">
					<label for="attackRange" class="label pb-0">
						<span class="label-text">Range</span>
					</label>
					<input
						name="attackRange"
						placeholder="5 feet"
						class="input input-bordered w-full"
						bind:value={$c.combat.attacks[index].attack.range}
					/>
				</div>
			</div>
		{/if}

		<div class="divider">
			<div class="flex flex-row gap-2">
				Damage
				<input type="checkbox" class="toggle" bind:checked={$c.combat.attacks[index].hasDamage} />
			</div>
		</div>

		{#if $c.combat.attacks[index].hasDamage}
			<div class="form-control w-full">
				<label for="damage" class="label pb-0">
					<span class="label-text">Damage</span>
				</label>
				<input
					name="damage"
					placeholder="1d6 Piercing + STR"
					class="input input-bordered w-full"
					bind:value={$c.combat.attacks[index].damage.damage}
				/>
			</div>
		{/if}

		<TextArea
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
