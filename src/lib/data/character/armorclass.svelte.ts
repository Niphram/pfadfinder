import { ClassSerializer, derive, enumeration, macro, string } from '$lib/serde';

import type { AbilityKey } from './abilities.svelte';
import { Character } from './character.svelte';

export class ArmorClass extends ClassSerializer {
	primaryAbility = enumeration<AbilityKey>('dex');

	secondaryAbility = enumeration<AbilityKey | undefined, true>(undefined, { optional: true });

	bonusAc = macro('0');

	bonusTouch = macro('0');

	bonusFf = macro('0');

	notes = string('', { maxLength: 2000 });

	readonly abilityMod = derive<Character>((c) => {
		const primaryMax = this.primaryAbility.value === 'dex' ? c.equipment.maxDexBonus : Infinity;
		const secondaryMax = this.secondaryAbility.value === 'dex' ? c.equipment.maxDexBonus : Infinity;

		return (
			Math.min(c[this.primaryAbility.value].mod, primaryMax) +
			(this.secondaryAbility.value ? Math.min(c[this.secondaryAbility.value].mod, secondaryMax) : 0)
		);
	});

	readonly total = derive<Character>(
		(c) => 10 + c.ac.abilityMod + c.equipment.acBonus + this.bonusAc.eval(c),
	);

	readonly touch = derive<Character>((c) => 10 + c.ac.abilityMod + this.bonusTouch.eval(c));

	readonly flatFooted = derive<Character>(
		(c) => 10 + c.equipment.acBonus + Math.min(c.ac.abilityMod, 0) + this.bonusFf.eval(c),
	);
}
