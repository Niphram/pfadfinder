import { autoserialize } from 'cerialize';

import { Derive } from '../macros';
import type { AbilityKey } from './abilities';

export class ArmorClass {
	@autoserialize
	primaryAbility: AbilityKey = 'dex';

	@autoserialize
	secondaryAbility?: AbilityKey;

	readonly abilityMod = new Derive((c) => {
		const primaryMax = this.primaryAbility === 'dex' ? c.equipment.maxDexBonus : Infinity;
		const secondaryMax = this.secondaryAbility === 'dex' ? c.equipment.maxDexBonus : Infinity;

		return (
			Math.min(c[this.primaryAbility].mod.eval(c), primaryMax) +
			(this.secondaryAbility ? Math.min(c[this.secondaryAbility].mod.eval(c), secondaryMax) : 0)
		);
	});

	readonly total = new Derive((c) => 10 + c.ac.abilityMod.eval(c) + c.equipment.acBonus);

	readonly touch = new Derive((c) => 10 + c.ac.abilityMod.eval(c));

	readonly flatFooted = new Derive(
		(c) => 10 + c.equipment.acBonus + Math.min(c.ac.abilityMod.eval(c), 0)
	);
}
