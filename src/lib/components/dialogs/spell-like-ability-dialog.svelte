<script lang="ts">
	import { t } from '$lib/i18n';
	import { preventDefault } from '$lib/utils';

	import Divider from '$lib/atoms/divider.svelte';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Number from '$lib/components/input/number.svelte';
	import Select from '$lib/components/input/select.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';

	import { getChar, SPELL_ATTACK_TYPE, SPELL_LIKE_COUNT_TYPES, SpellAttackDamage } from '$lib/data';

	const { c } = $derived(getChar());

	interface Props {
		slaIndex: number;
	}

	let { slaIndex }: Props = $props();

	function deleteSLA() {
		c.spells.spellLikeAbilities.splice(slaIndex, 1);
	}

	function addDamageToSLA() {
		c.spells.spellLikeAbilities[slaIndex].$.damage.value.push(new SpellAttackDamage());
	}

	function removeDamageFromSLA(idx: number) {
		c.spells.spellLikeAbilities[slaIndex].damage.splice(idx, 1);
	}

	$title = 'Spell-Like Ability';
</script>

<div class="flex flex-col gap-2">
	{#if slaIndex < c.spells.spellLikeAbilities.length}
		<Input
			name="slaName"
			label="Name"
			placeholder="Name"
			value={c.spells.spellLikeAbilities[slaIndex].$.name}
		/>

		<Divider>
			<span>Type</span>
			<Select
				name="slaType"
				options={SPELL_LIKE_COUNT_TYPES}
				bind:value={c.spells.spellLikeAbilities[slaIndex].type}
				size="small"
			>
				{#snippet children({ option: slaType })}
					<option value={slaType}>
						{$t(`spell.slaType.${slaType}`)}
					</option>
				{/snippet}
			</Select>
		</Divider>

		{#if c.spells.spellLikeAbilities[slaIndex].type === 'perDay'}
			<div class="flex flex-row gap-2">
				<Number
					label="Remaining charges"
					name="slaCharges"
					value={c.spells.spellLikeAbilities[slaIndex].$.remaining}
				/>

				<Number
					label="Per Day"
					name="slaChargesPerDay"
					value={c.spells.spellLikeAbilities[slaIndex].$.perDay}
				/>
			</div>
		{/if}

		<Input
			name="spellSchool"
			label="School"
			placeholder="School/Domain/Elemental"
			value={c.spells.spellLikeAbilities[slaIndex].$.school}
		/>

		<Input
			name="classAndLevel"
			label="Class/Level"
			placeholder="Sorcerer/Wizard 3"
			value={c.spells.spellLikeAbilities[slaIndex].$.classAndLevel}
		/>

		<Input
			name="castingTime"
			label="Casting Time"
			placeholder="1 standard action"
			value={c.spells.spellLikeAbilities[slaIndex].$.castingTime}
		/>

		<Input
			name="range"
			label="Range"
			placeholder="Long (400 ft. + 40 ft./level)"
			value={c.spells.spellLikeAbilities[slaIndex].$.range}
		/>

		<Input
			name="area"
			label="Area"
			placeholder="20-ft.-radius spread"
			value={c.spells.spellLikeAbilities[slaIndex].$.area}
		/>

		<Input
			name="targets"
			label="Targets"
			placeholder="up to five creatures"
			value={c.spells.spellLikeAbilities[slaIndex].$.targets}
		/>

		<Input
			name="effect"
			label="Effect"
			placeholder="Heal 1d6+CasterLevel"
			value={c.spells.spellLikeAbilities[slaIndex].$.effect}
		/>

		<Input
			name="duration"
			label="Duration"
			placeholder="Instantaneous"
			value={c.spells.spellLikeAbilities[slaIndex].$.duration}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Saving Throw
				<Toggle
					name="savingThrow"
					bind:checked={c.spells.spellLikeAbilities[slaIndex].savingThrow.hasSave}
				/>
			</div>
		</div>

		{#if c.spells.spellLikeAbilities[slaIndex].savingThrow.hasSave}
			<Input
				name="saveEffect"
				label="Effect"
				placeholder="Reflex Half"
				value={c.spells.spellLikeAbilities[slaIndex].savingThrow.$.effect}
			/>

			<Number
				label="DC"
				name="saveDc"
				value={c.spells.spellLikeAbilities[slaIndex].savingThrow.$.dcMod}
			/>
		{/if}

		<Input
			name="sr"
			label="Spell Resistance"
			value={c.spells.spellLikeAbilities[slaIndex].$.spellResistance}
		/>

		<Divider>
			Attack
			<Toggle name="attack" bind:checked={c.spells.spellLikeAbilities[slaIndex].attack.hasAttack} />
		</Divider>

		{#if c.spells.spellLikeAbilities[slaIndex].attack.hasAttack}
			<div class="flex flex-row gap-2">
				<Select
					bind:value={c.spells.spellLikeAbilities[slaIndex].attack.type}
					name="spellAttackType"
					label="Type"
					options={SPELL_ATTACK_TYPE}
				>
					{#snippet children({ option })}
						<option value={option}>{$t(`spell.attackType.${option}`)}</option>
					{/snippet}
				</Select>
				<Number
					label="Attack Mod"
					name="attackBonus"
					value={c.spells.spellLikeAbilities[slaIndex].attack.$.mod}
				/>
			</div>

			<div class="flex flex-row gap-2">
				<Number
					label="Critical Range"
					name="critRange"
					value={c.spells.spellLikeAbilities[slaIndex].attack.$.critRange}
				/>
				<Number
					label="Multiplier"
					name="critMult"
					value={c.spells.spellLikeAbilities[slaIndex].attack.$.critMultiplier}
				/>
			</div>
		{/if}

		<Divider>
			Damage
			<button class="btn btn-secondary btn-xs" onclick={preventDefault(addDamageToSLA)}>Add</button>
		</Divider>

		{#each c.spells.spellLikeAbilities[slaIndex].damage as damage, damageIdx (damageIdx)}
			<div class="flex flex-row items-center gap-2">
				<Input name="spellDamage" placeholder="1d6" value={damage.$.damage} />
				<Input name="damageTyoe" placeholder="Fire" value={damage.$.type} />
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
			value={c.spells.spellLikeAbilities[slaIndex].$.description}
		/>
	{/if}

	<button onclick={deleteSLA} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
