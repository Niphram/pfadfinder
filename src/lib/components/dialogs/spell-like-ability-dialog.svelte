<script lang="ts">
	import { c, SPELL_ATTACK_TYPE, SPELL_LIKE_COUNT_TYPES, SpellAttackDamage } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';

	import Select from '../input/select.svelte';
	import TextArea from '../input/text-area.svelte';

	export let slaIndex: number;

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
		<div class="form-control w-full">
			<label for="spellName" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="spellName"
				placeholder="Name"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].name}
			/>
		</div>

		<div class="divider mb-0">
			<div class="flex flex-row items-center gap-2">
				<span>Type</span>
				<select
					name="slaType"
					class="select select-bordered select-sm"
					bind:value={$c.spells.spellLikeAbilities[slaIndex].type}
				>
					{#each SPELL_LIKE_COUNT_TYPES as slaType}
						<option value={slaType}>
							{$t(`spell.slaType.${slaType}`)}
						</option>
					{/each}
				</select>
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

		<div class="form-control w-full">
			<label for="spellSchool" class="label pb-0">
				<span class="label-text">School</span>
			</label>
			<input
				name="spellSchool"
				placeholder="School/Domain/Elemental"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].school}
			/>
		</div>

		<div class="form-control w-full">
			<label for="classAndLevel" class="label pb-0">
				<span class="label-text">Class/Level</span>
			</label>
			<input
				name="classAndLevel"
				placeholder="Sorcerer/Wizard 3"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].classAndLevel}
			/>
		</div>

		<div class="form-control w-full">
			<label for="castingTime" class="label pb-0">
				<span class="label-text">Casting Time</span>
			</label>
			<input
				name="castingTime"
				placeholder="1 standard action"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].castingTime}
			/>
		</div>

		<div class="form-control w-full">
			<label for="range" class="label pb-0">
				<span class="label-text">Range</span>
			</label>
			<input
				name="range"
				placeholder="Long (400 ft. + 40 ft./level)"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].range}
			/>
		</div>

		<div class="form-control w-full">
			<label for="area" class="label pb-0">
				<span class="label-text">Area</span>
			</label>
			<input
				name="area"
				placeholder="20-ft.-radius spread"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].area}
			/>
		</div>

		<div class="form-control w-full">
			<label for="targets" class="label pb-0">
				<span class="label-text">Targets</span>
			</label>
			<input
				name="targets"
				placeholder="up to five creatures"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].targets}
			/>
		</div>

		<div class="form-control w-full">
			<label for="effect" class="label pb-0">
				<span class="label-text">Effect</span>
			</label>
			<input
				name="effect"
				placeholder="Heal 1d6+CasterLevel"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].effect}
			/>
		</div>

		<div class="form-control w-full">
			<label for="duration" class="label pb-0">
				<span class="label-text">Duration</span>
			</label>
			<input
				name="duration"
				placeholder="Instantaneous"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].duration}
			/>
		</div>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Saving Throw
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$c.spells.spellLikeAbilities[slaIndex].savingThrow.hasSave}
				/>
			</div>
		</div>

		{#if $c.spells.spellLikeAbilities[slaIndex].savingThrow.hasSave}
			<input
				name="duration"
				placeholder="Reflex Half"
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].savingThrow.effect}
			/>

			<Integer
				label="DC"
				name="saveDc"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].savingThrow.dcMod}
			/>
		{/if}

		<div class="form-control w-full">
			<label for="duration" class="label pb-0">
				<span class="label-text">Spell Resistance</span>
			</label>
			<input
				name="duration"
				placeholder=""
				class="input input-bordered w-full"
				bind:value={$c.spells.spellLikeAbilities[slaIndex].spellResistance}
			/>
		</div>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Attack
				<input
					type="checkbox"
					class="toggle"
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
					let:option
				>
					<option value={option}>{$t(`spell.attackType.${option}`)}</option>
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
				<button class="btn btn-secondary btn-xs" on:click|preventDefault={addDamageToSLA}
					>Add</button
				>
			</div>
		</div>

		{#each $c.spells.spellLikeAbilities[slaIndex].damage as damage, damageIdx (damageIdx)}
			<div class="flex flex-row gap-2">
				<input
					name="spellDamage"
					placeholder="1d6"
					class="input input-bordered w-full"
					bind:value={damage.damage}
				/>
				<input
					name="damageType"
					placeholder="Fire"
					class="input input-bordered w-full"
					bind:value={damage.type}
				/>
				<button
					class="btn btn-warning"
					on:click|preventDefault={() => {
						removeDamageFromSLA(damageIdx);
					}}>Delete</button
				>
			</div>
		{/each}

		<TextArea
			name="spellDescription"
			label="Description"
			bind:value={$c.spells.spellLikeAbilities[slaIndex].description}
		/>
	{/if}

	<button on:click={deleteSLA} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
