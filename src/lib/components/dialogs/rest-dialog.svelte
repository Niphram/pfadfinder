<script lang="ts">
	import { ABILITY_KEYS, Item, SPELL_LEVELS } from '$lib/data';
	import { getChar } from '$lib/data/context.svelte';
	import type { SerdeProxy } from '$lib/serde/proxy';

	import { title } from '../dialog.svelte';
	import Toggle from '../input/toggle.svelte';

	const { c } = $derived(getChar());

	$title = 'Rest';

	function rechargeItems(items: SerdeProxy<Item>[]) {
		items.forEach((item) => {
			item.recharge();
			rechargeItems(item.children);
		});
	}

	function rest8Hours() {
		// Heal
		if (c.settings.heal) c.hp.heal(c.classes.levels);
		if (c.settings.addConToHeal) c.hp.heal(Math.max(0, c.con.mod));

		// Heal ability damage
		if (c.settings.healAbilityDamage)
			ABILITY_KEYS.forEach((key) => (c[key].damage -= Math.sign(c[key].damage)));

		// Recharge all SLAs
		if (c.settings.rechargeSLA) c.spells.spellLikeAbilities.forEach((sla) => sla.recharge());

		// Recharge all features/traits
		if (c.settings.rechargeTraits) c.traits.forEach((trait) => trait.recharge());

		// Recharge all items
		if (c.settings.rechargeItems) rechargeItems(c.equipment.items);

		// Reset spell usage
		if (c.settings.resetSpellUsage) {
			SPELL_LEVELS.forEach((level) => c.spells[level].spells.forEach((spell) => (spell.used = 0)));
		}

		// Reset prepared spells
		if (c.settings.resetPreparedSpells) {
			SPELL_LEVELS.forEach((level) =>
				c.spells[level].spells.forEach((spell) => (spell.prepared = 0)),
			);
		}
	}
</script>

<div class="flex flex-col">
	<div class="divider">Options</div>

	<Toggle
		name="healLevel"
		label="Heal for 1 HP per level ({c.classes.levels} HP)"
		bind:checked={c.settings.heal}
	/>

	<Toggle
		name="addCon"
		label="Add CON when healing ({Math.max(0, c.con.mod)} HP)"
		bind:checked={c.settings.addConToHeal}
	/>

	<Toggle
		name="healAbilityDamage"
		label="Heal ability damage"
		bind:checked={c.settings.healAbilityDamage}
	/>

	<Toggle
		name="rechargeSLA"
		label="Recharge Spell-Like Abilities"
		bind:checked={c.settings.rechargeSLA}
	/>

	<Toggle name="rechargeTraits" label="Recharge traits" bind:checked={c.settings.rechargeTraits} />

	<Toggle name="rechargeItems" label="Recharge items" bind:checked={c.settings.rechargeItems} />

	<Toggle
		name="resetSpellsUsage"
		label="Reset spell usage"
		bind:checked={c.settings.resetSpellUsage}
	/>

	<Toggle
		name="resetPreparedSpells"
		label="Reset prepared spells"
		bind:checked={c.settings.resetPreparedSpells}
	/>

	<div class="divider"></div>

	<button class="btn" onclick={() => rest8Hours()}>8 hours</button>
</div>
