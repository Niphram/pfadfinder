<script lang="ts">
	import { t } from '$lib/i18n';
	import { preventDefault } from '$lib/utils';

	import { title } from '$lib/components/dialog.svelte';
	import Input from '$lib/components/input/input.svelte';
	import MacroTextArea from '$lib/components/input/macro-text-area.svelte';
	import Number from '$lib/components/input/number.svelte';
	import Select from '$lib/components/input/select.svelte';
	import Toggle from '$lib/components/input/toggle.svelte';

	import { getChar, SpellAttackDamage, type SpellLevel } from '$lib/data';

	interface Props {
		spellLevel: SpellLevel;
		spellIdx: number;
	}

	let { spellLevel, spellIdx }: Props = $props();

	const { c } = $derived(getChar());

	function deleteSpell() {
		c.spells[spellLevel].spells.splice(spellIdx, 1);
	}

	function addDamageToSpell() {
		c.spells[spellLevel].spells[spellIdx].$.damage.value.push(
			new SpellAttackDamage(),
		);
	}

	function removeDamageFromSpell(idx: number) {
		c.spells[spellLevel].spells[spellIdx].damage.splice(idx, 1);
	}

	$title = 'Spell';
</script>

<div class="flex flex-col gap-2">
	{#if spellIdx < c.spells[spellLevel].spells.length}
		<Input
			name="spellName"
			label="Name"
			placeholder="Name"
			value={c.spells[spellLevel].spells[spellIdx].$.name}
		/>

		<div class="divider">Preperation</div>

		<div class="flex flex-row gap-2">
			<Number
				label="Used today"
				name="spellUsage"
				value={c.spells[spellLevel].spells[spellIdx].$.used}
			/>
			<Number
				label="Prepared today"
				name="spellPrepared"
				value={c.spells[spellLevel].spells[spellIdx].$.prepared}
			/>
		</div>

		<div class="divider">Details</div>

		<Toggle
			name="domainSpell"
			label="Domain?"
			bind:checked={c.spells[spellLevel].spells[spellIdx].isDomainSpell}
		/>

		<Input
			name="spellSchool"
			label="School"
			placeholder="School/Domain/Elemental"
			value={c.spells[spellLevel].spells[spellIdx].$.school}
		/>

		<Input
			name="classAndLevel"
			label="Class/Level"
			placeholder="Sorcerer/Wizard 3"
			value={c.spells[spellLevel].spells[spellIdx].$.classAndLevel}
		/>

		<Input
			name="castingTime"
			label="Casting Time"
			placeholder="1 standard action"
			value={c.spells[spellLevel].spells[spellIdx].$.castingTime}
		/>

		<Input
			name="components"
			label="Components"
			placeholder="V, S, M (a ball of bat guano and sulfur)"
			value={c.spells[spellLevel].spells[spellIdx].$.components}
		/>

		<Input
			name="range"
			label="Range"
			placeholder="Long (400 ft. + 40 ft./level)"
			value={c.spells[spellLevel].spells[spellIdx].$.range}
		/>

		<Input
			name="area"
			label="Area"
			placeholder="20-ft.-radius spread"
			value={c.spells[spellLevel].spells[spellIdx].$.area}
		/>

		<Input
			name="targets"
			label="Targets"
			placeholder="up to five creatures"
			value={c.spells[spellLevel].spells[spellIdx].$.targets}
		/>

		<Input
			name="effect"
			label="Effect"
			placeholder="Heal 1d6+CasterLevel"
			value={c.spells[spellLevel].spells[spellIdx].$.effect}
		/>

		<Input
			name="duration"
			label="Duration"
			placeholder="Instantaneous"
			value={c.spells[spellLevel].spells[spellIdx].$.duration}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Saving Throw
				<Toggle
					name="savingThrow"
					bind:checked={
						c.spells[spellLevel].spells[spellIdx].savingThrow.hasSave
					}
				/>
			</div>
		</div>

		{#if c.spells[spellLevel].spells[spellIdx].savingThrow.hasSave}
			<Input
				name="savingThrowEffect"
				label="Effect"
				placeholder="Reflex Half"
				value={c.spells[spellLevel].spells[spellIdx].savingThrow.$.effect}
			/>

			<Number
				label="DC Bonus"
				name="saveDcMod"
				value={c.spells[spellLevel].spells[spellIdx].savingThrow.$.dcMod}
			/>
		{/if}

		<Input
			name="sr"
			label="Spell Resistance"
			value={c.spells[spellLevel].spells[spellIdx].$.spellResistance}
		/>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Attack
				<Toggle
					name="attack"
					bind:checked={c.spells[spellLevel].spells[spellIdx].attack.hasAttack}
				/>
			</div>
		</div>

		{#if c.spells[spellLevel].spells[spellIdx].attack.hasAttack}
			<div class="flex flex-row gap-2">
				<Select
					value={c.spells[spellLevel].spells[spellIdx].attack.$.type}
					name="spellAttackType"
					label="Type"
					translate={(key) => $t(`spell.attackType.${key}`)}
				/>
				<Number
					label="Attack Mod"
					name="attackBonus"
					value={c.spells[spellLevel].spells[spellIdx].attack.$.mod}
				/>
			</div>

			<div class="flex flex-row gap-2">
				<Number
					label="Critical Range"
					name="critRange"
					value={c.spells[spellLevel].spells[spellIdx].attack.$.critRange}
				/>
				<Number
					label="Multiplier"
					name="critMult"
					value={c.spells[spellLevel].spells[spellIdx].attack.$.critMultiplier}
				/>
			</div>
		{/if}

		<div class="divider mb-0">
			<div class="flex flex-row gap-2">
				Damage
				<button
					class="btn btn-secondary btn-xs"
					onclick={preventDefault(addDamageToSpell)}>Add</button
				>
			</div>
		</div>

		{#each c.spells[spellLevel].spells[spellIdx].damage as damage, damageIdx (damageIdx)}
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
			value={c.spells[spellLevel].spells[spellIdx].$.description}
		/>
	{/if}

	<button
		onclick={deleteSpell}
		class="btn btn-error mt-4 w-max self-center uppercase"
	>
		Delete
	</button>
</div>
