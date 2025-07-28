<script lang="ts">
	import { SPELL_ATTACK_TYPE, SPELL_LIKE_COUNT_TYPES, SpellAttackDamage } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { preventDefault } from '$lib/utils';

	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';
	import Integer from '../input/integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';
	import Select from '../input/select.svelte';
	import Toggle from '../input/toggle.svelte';

	const { c } = getChar();

	interface Props {
		slaIndex: number;
	}

	let { slaIndex }: Props = $props();

	function deleteSLA() {
		$c.spells.spellLikeAbilities.splice(slaIndex, 1);
		$c.spells.spellLikeAbilities = $c.spells.spellLikeAbilities;
	}

	function addDamageToSLA() {
		$c.spells.spellLikeAbilities[slaIndex].damage.push(new SpellAttackDamage());
		$c.spells.spellLikeAbilities[slaIndex].damage = $c.spells.spellLikeAbilities[slaIndex].damage;
	}

	function removeDamageFromSLA(idx: number) {
		$c.spells.spellLikeAbilities[slaIndex].damage.splice(idx, 1);
		$c.spells.spellLikeAbilities[slaIndex].damage = $c.spells.spellLikeAbilities[slaIndex].damage;
	}

	$title = 'Spell-Like Ability';
</script>

<div class="flex flex-col gap-2">
	{#if slaIndex < $c.spells.spellLikeAbilities.length}
		<Input
			name="slaName"
			label="Name"
			placeholder="Name"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].name}
		/>

		<div class="divider mb-0">
			<div class="flex flex-row items-center gap-2">
				<span>Type</span>
				<Select
					name="slaType"
					options={SPELL_LIKE_COUNT_TYPES}
					bind:value={$c.spells.spellLikeAbilities[slaIndex].type}
					size="small"
				>
					{#snippet children({ option: slaType })}
						<option value={slaType}>
							{$t(`spell.slaType.${slaType}`)}
						</option>
					{/snippet}
				</Select>
			</div>
		</div>

		{#if $c.spells.spellLikeAbilities[slaIndex].type === 'perDay'}
			<div class="flex flex-row gap-2">
				<Integer
					label="Remaining charges"
					name="slaCharges"
					noNegatives
					bind:value={$c.spells.spellLikeAbilities[slaIndex].remaining}
				/>

				<Integer
					label="Per Day"
					name="slaChargesPerDay"
					noNegatives
					noZero
					bind:value={$c.spells.spellLikeAbilities[slaIndex].perDay}
				/>
			</div>
		{/if}

		<Input
			name="spellSchool"
			label="School"
			placeholder="School/Domain/Elemental"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].school}
		/>

		<Input
			name="classAndLevel"
			label="Class/Level"
			placeholder="Sorcerer/Wizard 3"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].classAndLevel}
		/>

		<Input
			name="castingTime"
			label="Casting Time"
			placeholder="1 standard action"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].castingTime}
		/>

		<Input
			name="range"
			label="Range"
			placeholder="Long (400 ft. + 40 ft./level)"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].range}
		/>

		<Input
			name="area"
			label="Area"
			placeholder="20-ft.-radius spread"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].area}
		/>

		<Input
			name="targets"
			label="Targets"
			placeholder="up to five creatures"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].targets}
		/>

		<Input
			name="effect"
			label="Effect"
			placeholder="Heal 1d6+CasterLevel"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].effect}
		/>

		<Input
			name="duration"
			label="Duration"
			placeholder="Instantaneous"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].duration}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Saving Throw
				<Toggle
					name="savingThrow"
					bind:checked={$c.spells.spellLikeAbilities[slaIndex].savingThrow.hasSave}
				/>
			</div>
		</div>

		{#if $c.spells.spellLikeAbilities[slaIndex].savingThrow.hasSave}
			<Input
				name="saveEffect"
				label="Effect"
				placeholder="Reflex Half"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].savingThrow.effect}
			/>

			<Integer
				label="DC"
				name="saveDc"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].savingThrow.dcMod}
			/>
		{/if}

		<Input
			name="sr"
			label="Spell Resistance"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].spellResistance}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Attack
				<Toggle
					name="attack"
					bind:checked={$c.spells.spellLikeAbilities[slaIndex].attack.hasAttack}
				/>
			</div>
		</div>

		{#if $c.spells.spellLikeAbilities[slaIndex].attack.hasAttack}
			<div class="flex flex-row gap-2">
				<Select
					bind:value={$c.spells.spellLikeAbilities[slaIndex].attack.type}
					name="spellAttackType"
					label="Type"
					options={SPELL_ATTACK_TYPE}
				>
					{#snippet children({ option })}
						<option value={option}>{$t(`spell.attackType.${option}`)}</option>
					{/snippet}
				</Select>
				<Integer
					label="Attack Mod"
					name="attackBonus"
					bind:value={$c.spells.spellLikeAbilities[slaIndex].attack.mod}
				/>
			</div>

			<div class="flex flex-row gap-2">
				<Integer
					label="Critical Range"
					name="critRange"
					bind:value={$c.spells.spellLikeAbilities[slaIndex].attack.critRange}
				/>
				<Integer
					label="Multiplier"
					name="critMult"
					bind:value={$c.spells.spellLikeAbilities[slaIndex].attack.critMultiplier}
				/>
			</div>
		{/if}

		<div class="divider mb-0">
			<div class="flex flex-row gap-2">
				Damage
				<button class="btn btn-secondary btn-xs" onclick={preventDefault(addDamageToSLA)}
					>Add</button
				>
			</div>
		</div>

		{#each $c.spells.spellLikeAbilities[slaIndex].damage as damage, damageIdx (damageIdx)}
			<div class="flex flex-row items-center gap-2">
				<Input name="spellDamage" placeholder="1d6" bind:value={damage.damage} />
				<Input name="damageTyoe" placeholder="Fire" bind:value={damage.type} />
				<button
					class="btn btn-warning"
					onclick={preventDefault(() => {
						removeDamageFromSLA(damageIdx);
					})}>Delete</button
				>
			</div>
		{/each}

		<MacroTextArea
			name="spellDescription"
			label="Description"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].description}
		/>
	{/if}

	<button onclick={deleteSLA} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
