<script lang="ts">
	import { ABILITY_KEYS, Item, SPELL_LEVELS, c } from '$lib/data';
	import { title } from '../dialog.svelte';

	$title = 'Rest';

	function rechargeItems(items: Item[]) {
		items.forEach((item) => {
			item.recharge();
			rechargeItems(item.children);
		});
	}

	function rest8Hours() {
		// Heal
		if ($c.settings.heal) $c.hp.heal($c.classes.levels);
		if ($c.settings.addConToHeal) $c.hp.heal(Math.max(0, $c.con.mod.eval($c)));

		// Heal ability damage
		if ($c.settings.healAbilityDamage)
			ABILITY_KEYS.forEach((key) => ($c[key].damage -= Math.sign($c[key].damage)));

		// Recharge all SLAs
		if ($c.settings.rechargeSLA) $c.spells.spellLikeAbilities.forEach((sla) => sla.recharge());

		// Recharge all features/traits
		if ($c.settings.rechargeTraits) $c.traits.forEach((trait) => trait.recharge($c));

		// Recharge all items
		if ($c.settings.rechargeItems) rechargeItems($c.equipment.items);

		// Reset spell usage
		if ($c.settings.resetSpellUsage) {
			SPELL_LEVELS.forEach((level) => $c.spells[level].spells.forEach((spell) => (spell.used = 0)));
		}

		// Reset prepared spells
		if ($c.settings.resetPreparedSpells) {
			SPELL_LEVELS.forEach((level) =>
				$c.spells[level].spells.forEach((spell) => (spell.prepared = 0))
			);
		}

		$c = $c;
	}
</script>

<div class="flex flex-col">
	<div class="divider">Options</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Heal for 1 HP per level ({$c.classes.levels} HP)</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.heal} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Add CON when healing ({Math.max(0, $c.con.mod.eval($c))} HP)</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.addConToHeal} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Heal ability damage</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.healAbilityDamage} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Recharge Spell-Like Abilities</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.rechargeSLA} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Recharge traits</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.rechargeTraits} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Recharge items</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.rechargeItems} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Reset spell usage</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.resetSpellUsage} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer pb-0">
			<span class="label-text">Reset prepared spells</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.resetPreparedSpells} />
		</label>
	</div>

	<div class="divider" />

	<button class="btn" on:click={() => rest8Hours()}>8 hours</button>
</div>
