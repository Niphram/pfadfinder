<script lang="ts">
	import { c, SPELL_ATTACK_TYPE, SpellAttackDamage, type SpellLevel } from '$lib/data';
	import { t } from '$lib/i18n';
	import { title } from '../dialog.svelte';
	import Integer from '../input/integer.svelte';

	import Select from '../input/select.svelte';
	import TextArea from '../input/text-area.svelte';

	export let spellLevel: SpellLevel;
	export let spellIdx: number;

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
		<div class="form-control w-full">
			<label for="spellName" class="label pb-0">
				<span class="label-text">Name</span>
			</label>
			<input
				name="spellName"
				placeholder="Name"
				class="input input-bordered w-full"
				bind:value={$c.spells[spellLevel].spells[spellIdx].name}
			/>
		</div>

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

		<div class="form-control">
			<label class="label cursor-pointer pb-0">
				<span class="label-text">Domain?</span>
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$c.spells[spellLevel].spells[spellIdx].isDomainSpell}
				/>
			</label>
		</div>

		<div class="form-control w-full">
			<label for="spellSchool" class="label pb-0">
				<span class="label-text">School</span>
			</label>
			<input
				name="spellSchool"
				placeholder="School/Domain/Elemental"
				class="input input-bordered w-full"
				bind:value={$c.spells[spellLevel].spells[spellIdx].school}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].classAndLevel}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].castingTime}
			/>
		</div>

		<div class="form-control w-full">
			<label for="components" class="label pb-0">
				<span class="label-text">Components</span>
			</label>
			<input
				name="components"
				placeholder="V, S, M (a ball of bat guano and sulfur)"
				class="input input-bordered w-full"
				bind:value={$c.spells[spellLevel].spells[spellIdx].components}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].range}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].area}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].targets}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].effect}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].duration}
			/>
		</div>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Saving Throw
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$c.spells[spellLevel].spells[spellIdx].savingThrow.hasSave}
				/>
			</div>
		</div>

		{#if $c.spells[spellLevel].spells[spellIdx].savingThrow.hasSave}
			<input
				name="duration"
				placeholder="Reflex Half"
				class="input input-bordered w-full"
				bind:value={$c.spells[spellLevel].spells[spellIdx].savingThrow.effect}
			/>

			<Integer
				label="DC Bonus"
				name="saveDcMod"
				bind:value={$c.spells[spellLevel].spells[spellIdx].savingThrow.dcMod}
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
				bind:value={$c.spells[spellLevel].spells[spellIdx].spellResistance}
			/>
		</div>

		<div class="divider">
			<div class="flex flex-row gap-2">
				Attack
				<input
					type="checkbox"
					class="toggle"
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
					let:option
				>
					<option value={option}>{$t(`spell.attackType.${option}`)}</option>
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
				<button class="btn btn-secondary btn-xs" on:click|preventDefault={addDamageToSpell}
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
					on:click|preventDefault={() => {
						removeDamageFromSpell(damageIdx);
					}}>Delete</button
				>
			</div>
		{/each}

		<TextArea
			name="spellDescription"
			label="Description"
			bind:value={$c.spells[spellLevel].spells[spellIdx].description}
		/>
	{/if}

	<button on:click={deleteSpell} class="btn btn-error mt-4 w-max self-center uppercase">
		Delete
	</button>
</div>
