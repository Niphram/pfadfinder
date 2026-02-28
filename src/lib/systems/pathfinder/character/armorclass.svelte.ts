import {
	ClassSerializer,
	derive,
	enumeration,
	macro,
	string,
} from '$lib/serde';

import { ABILITY_KEYS } from './abilities.svelte';
import { Character } from './character.svelte';

export class ArmorClass extends ClassSerializer {
	primaryAbility = enumeration(ABILITY_KEYS, 'dex');

	secondaryAbility = enumeration(ABILITY_KEYS, null, { optional: true });

	bonusAc = macro('0');

	bonusTouch = macro('0');

	bonusFf = macro('0');

	notes = string('', { maxLength: 2000 });

	readonly abilityMod = derive<Character>((c) => {
		let primaryAbilityMod = c[this.primaryAbility.value].mod;
		if (this.primaryAbility.value === 'dex') {
			if (c.conditions.looseAcDexBonus) {
				primaryAbilityMod = Math.min(0, primaryAbilityMod);
			}

			primaryAbilityMod = Math.min(primaryAbilityMod, c.equipment.maxDexBonus);
		}

		let secondaryAbilityMod =
			this.secondaryAbility.value ? c[this.secondaryAbility.value].mod : 0;
		if (this.secondaryAbility.value === 'dex') {
			if (c.conditions.looseAcDexBonus) {
				secondaryAbilityMod = Math.min(0, secondaryAbilityMod);
			}

			secondaryAbilityMod = Math.min(
				secondaryAbilityMod,
				c.equipment.maxDexBonus,
			);
		}

		return primaryAbilityMod + secondaryAbilityMod;
	});

	readonly total = derive<Character>(
		(c) =>
			10 +
			c.ac.abilityMod +
			c.equipment.acBonus +
			this.bonusAc.eval(c) +
			c.conditions.acMod,
	);

	readonly touch = derive<Character>(
		(c) => 10 + c.ac.abilityMod + this.bonusTouch.eval(c) + c.conditions.acMod,
	);

	readonly flatFooted = derive<Character>(
		(c) =>
			10 +
			c.equipment.acBonus +
			Math.min(c.ac.abilityMod, 0) +
			this.bonusFf.eval(c) +
			c.conditions.acMod,
	);

	readonly affectedByCondition = derive<Character, boolean>((c) => {
		// Todo, make this better
		return c.conditions.looseAcDexBonus || c.conditions.acMod !== 0;
	});
}
