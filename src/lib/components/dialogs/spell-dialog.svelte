<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { SPELL_ATTACK_TYPE, SpellAttackDamage, type SpellLevel } from '$lib/data';
	import { getChar } from '$lib/data/context';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Input from '../input/input.svelte';
	import Integer from '../input/integer.svelte';
	import MacroTextArea from '../input/macro-text-area.svelte';

	import Select from '../input/select.svelte';
	import Toggle from '../input/toggle.svelte';

	interface Props {
		spellLevel: SpellLevel;
		spellIdx: number;
	}

	let { spellLevel, spellIdx }: Props = $props();

	const { c } = getChar();

	function deleteSpell() {
		$c.spells[spellLevel].spells.splice(spellIdx, 1);
		$c.spells[spellLevel].spells = $c.spells[spellLevel].spells;
	}

	function addDamageToSpell() {
		$c.spells[spellLevel].spells[spellIdx].damage.push(new SpellAttackDamage());
		$c.spells[spellLevel].spells[spellIdx].damage = $c.spells[spellLevel].spells[spellIdx].damage;
	}

	function removeDamageFromSpell(idx: number) {
		$c.spells[spellLevel].spells[spellIdx].damage.splice(idx, 1);
		$c.spells[spellLevel].spells[spellIdx].damage = $c.spells[spellLevel].spells[spellIdx].damage;
	}

	$title = 'Spell';
</script>

<div class="flex flex-col gap-2">
	{#if spellIdx < $c.spells[spellLevel].spells.length}
		<Input
			name="spellName"
			label="Name"
			placeholder="Name"
			bind:value={$c.spells[spellLevel].spells[spellIdx].name}
		/>

		<div class="divider">Preperation</div>

		<div class="flex flex-row gap-2">
			<Integer
				label="Used today"
				name="spellUsage"
				bind:value={$c.spells[spellLevel].spells[spellIdx].used}
			/>
			<Integer
				label="Prepared today"
				name="spellPrepared"
				bind:value={$c.spells[spellLevel].spells[spellIdx].prepared}
			/>
		</div>

		<div class="divider">Details</div>

		<Toggle
			name="domainSpell"
			label="Domain?"
			bind:checked={$c.spells[spellLevel].spells[spellIdx].isDomainSpell}
		/>

		<Input
			name="spellSchool"
			label="School"
			placeholder="School/Domain/Elemental"
			bind:value={$c.spells[spellLevel].spells[spellIdx].school}
		/>

		<Input
			name="classAndLevel"
			label="Class/Level"
			placeholder="Sorcerer/Wizard 3"
			bind:value={$c.spells[spellLevel].spells[spellIdx].classAndLevel}
		/>

		<Input
			name="castingTime"
			label="Casting Time"
			placeholder="1 standard action"
			bind:value={$c.spells[spellLevel].spells[spellIdx].castingTime}
		/>

		<Input
			name="components"
			label="Components"
			placeholder="V, S, M (a ball of bat guano and sulfur)"
			bind:value={$c.spells[spellLevel].spells[spellIdx].components}
		/>

		<Input
			name="range"
			label="Range"
			placeholder="Long (400 ft. + 40 ft./level)"
			bind:value={$c.spells[spellLevel].spells[spellIdx].range}
		/>

		<Input
			name="area"
			label="Area"
			placeholder="20-ft.-radius spread"
			bind:value={$c.spells[spellLevel].spells[spellIdx].area}
		/>

		<Input
			name="targets"
			label="Targets"
			placeholder="up to five creatures"
			bind:value={$c.spells[spellLevel].spells[spellIdx].targets}
		/>

		<Input
			name="effect"
			label="Effect"
			placeholder="Heal 1d6+CasterLevel"
			bind:value={$c.spells[spellLevel].spells[spellIdx].effect}
		/>

		<Input
			name="duration"
			label="Duration"
			placeholder="Instantaneous"
			bind:value={$c.spells[spellLevel].spells[spellIdx].duration}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Saving Throw
				<Toggle
					name="savingThrow"
					bind:checked={$c.spells[spellLevel].spells[spellIdx].savingThrow.hasSave}
				/>
			</div>
		</div>

		{#if $c.spells[spellLevel].spells[spellIdx].savingThrow.hasSave}
			<Input
				name="savingThrowEffect"
				label="Effect"
				placeholder="Reflex Half"
				bind:value={$c.spells[spellLevel].spells[spellIdx].savingThrow.effect}
			/>

			<Integer
				label="DC Bonus"
				name="saveDcMod"
				bind:value={$c.spells[spellLevel].spells[spellIdx].savingThrow.dcMod}
			/>
		{/if}

		<Input
			name="sr"
			label="Spell Resistance"
			bind:value={$c.spells[spellLevel].spells[spellIdx].spellResistance}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Attack
				<Toggle
					name="attack"
					bind:checked={$c.spells[spellLevel].spells[spellIdx].attack.hasAttack}
				/>
			</div>
		</div>

		{#if $c.spells[spellLevel].spells[spellIdx].attack.hasAttack}
			<div class="flex flex-row gap-2">
				<Select
					bind:value={$c.spells[spellLevel].spells[spellIdx].attack.type}
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
					bind:value={$c.spells[spellLevel].spells[spellIdx].attack.mod}
				/>
			</div>

			<div class="flex flex-row gap-2">
				<Integer
					label="Critical Range"
					name="critRange"
					bind:value={$c.spells[spellLevel].spells[spellIdx].attack.critRange}
				/>
				<Integer
					label="Multiplier"
					name="critMult"
					bind:value={$c.spells[spellLevel].spells[spellIdx].attack.critMultiplier}
				/>
			</div>
		{/if}

		<div class="divider mb-0">
			<div class="flex flex-row gap-2">
				Damage
				<button class="btn btn-secondary btn-xs" onclick={preventDefault(addDamageToSpell)}
					>Add</button
				>
			</div>
		</div>

		{#each $c.spells[spellLevel].spells[spellIdx].damage as damage, damageIdx (damageIdx)}
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
					onclick={preventDefault(() => {
						removeDamageFromSpell(damageIdx);
					})}>Delete</button
				>
			</div>
		{/each}

		<MacroTextArea
			name="spellDescription"
			label="Description"
			bind:value={$c.spells[spellLevel].spells[spellIdx].description}
		/>
	{/if}

	<button onclick={deleteSpell} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
